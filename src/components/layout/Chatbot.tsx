"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "@/lib/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import {
  matchIntent,
  getIntentById,
  intentDisplayLabel,
  type ActionButton,
} from "@/lib/chatbot-intents";
import type { Locale } from "@/lib/i18n";

type Message = {
  id: string;
  role: "bot" | "user";
  text: string;
  actions?: ActionButton[];
  followUps?: string[];
};

const BRAND_GREEN = "#2D6A4F";
const BRAND_GREEN_MID = "#40916C";
const BRAND_GOLD = "#C9A84C";

export default function Chatbot() {
  const locale = useLocale() as Locale;
  const t = useTranslations("chatbot");
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasSeenButton, setHasSeenButton] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const makeWelcome = useCallback(
    (): Message => ({
      id: `welcome-${locale}-${Date.now()}`,
      role: "bot",
      text: t("welcome"),
      followUps: ["services_overview", "quote", "emergency_info", "faq_intent"],
    }),
    [locale, t]
  );

  useEffect(() => {
    setMessages([makeWelcome()]);
  }, [locale, makeWelcome]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  useEffect(() => {
    const timer = setTimeout(() => setHasSeenButton(true), 6000);
    return () => clearTimeout(timer);
  }, []);

  function pushUser(text: string) {
    setMessages((prev) => [
      ...prev,
      { id: `u-${Date.now()}`, role: "user", text },
    ]);
  }

  async function respondTo(text: string) {
    setIsTyping(true);
    try {
      const historyMsg = [...messages, { role: "user", text }];
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: historyMsg, locale }),
      });
      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          id: `b-${Date.now()}`,
          role: "bot",
          text: data.text || t("fallback"),
        },
      ]);
    } catch (e) {
      console.error(e);
      setMessages((prev) => [
        ...prev,
        {
          id: `b-${Date.now()}`,
          role: "bot",
          text: t("fallback"),
          followUps: ["services_overview", "quote", "contact_info", "faq_intent"],
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  }

  function handleSend(raw: string) {
    const text = raw.trim();
    if (!text || isTyping) return;
    pushUser(text);
    setInput("");
    respondTo(text);
  }

  function handleFollowUp(intentId: string) {
    if (isTyping) return;
    const intent = getIntentById(intentId);
    if (!intent) return;
    const label = intentDisplayLabel(intent, locale);
    pushUser(label);
    setIsTyping(true);
    setTimeout(() => {
      const botMsg: Message = {
        id: `b-${Date.now()}`,
        role: "bot",
        text: intent.response[locale],
        actions: intent.actions,
        followUps: intent.followUps,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 400 + Math.random() * 400);
  }

  function handleAction(action: ActionButton) {
    if (action.type === "navigate") {
      router.push(action.value as never);
      if (typeof window !== "undefined" && window.innerWidth < 640) {
        setIsOpen(false);
      }
    } else if (action.type === "call") {
      window.location.href = `tel:${action.value}`;
    } else if (action.type === "email") {
      window.location.href = `mailto:${action.value}`;
    }
  }

  function handleReset() {
    setMessages([makeWelcome()]);
  }

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="chatbot-trigger"
            onClick={() => setIsOpen(true)}
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-5 left-5 z-40 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-2xl cursor-pointer sm:bottom-6 sm:left-6"
            style={{
              background: `linear-gradient(135deg, ${BRAND_GREEN}, ${BRAND_GREEN_MID})`,
              boxShadow: "0 10px 30px rgba(45,106,79,0.45), 0 0 0 1px rgba(201,168,76,0.3)",
            }}
            aria-label={t("open")}
          >
            <MessageCircle className="h-6 w-6" />
            {!hasSeenButton && (
              <span
                className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full animate-ping"
                style={{ background: BRAND_GOLD }}
              />
            )}
            <span
              className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full"
              style={{ background: BRAND_GOLD }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chatbot-panel"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed z-50 flex flex-col overflow-hidden bg-white shadow-2xl
              bottom-0 left-0 right-0 h-[100dvh] rounded-none
              sm:bottom-6 sm:left-6 sm:right-auto sm:h-[620px] sm:max-h-[calc(100vh-3rem)] sm:w-[380px] sm:rounded-2xl"
            style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.25)" }}
            role="dialog"
            aria-label={t("title")}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-4 py-3 text-white"
              style={{
                background: `linear-gradient(135deg, ${BRAND_GREEN}, ${BRAND_GREEN_MID})`,
                borderBottom: `1px solid ${BRAND_GOLD}`,
              }}
            >
              <div
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  border: `1px solid ${BRAND_GOLD}`,
                }}
              >
                <Sparkles className="h-5 w-5" style={{ color: BRAND_GOLD }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-serif text-lg font-semibold leading-tight">
                  {t("title")}
                </div>
                <div className="flex items-center gap-1.5 text-xs opacity-85">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-300" />
                  {t("subtitle")}
                </div>
              </div>
              <button
                onClick={handleReset}
                className="rounded-full p-1.5 text-white/80 transition-colors hover:bg-white/10 hover:text-white cursor-pointer"
                aria-label={t("reset")}
                title={t("reset")}
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1.5 text-white/80 transition-colors hover:bg-white/10 hover:text-white cursor-pointer"
                aria-label={t("close")}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto bg-[#F8FAF9] px-4 py-4"
            >
              {messages.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  msg={msg}
                  locale={locale}
                  onFollowUp={handleFollowUp}
                  onAction={handleAction}
                  disabled={isTyping}
                />
              ))}
              {isTyping && <TypingIndicator />}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="flex items-center gap-2 border-t border-gray-200 bg-white px-3 py-3"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t("placeholder")}
                className="flex-1 rounded-full border border-gray-200 bg-[#F8FAF9] px-4 py-2.5 text-sm text-[#1B1B1B] placeholder:text-gray-400 focus:border-[#40916C] focus:outline-none focus:ring-2 focus:ring-[#40916C]/20"
                disabled={isTyping}
                aria-label={t("placeholder")}
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${BRAND_GOLD}, #b8882a)`,
                  boxShadow: "0 4px 10px rgba(201,168,76,0.35)",
                }}
                aria-label={t("send")}
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MessageBubble({
  msg,
  locale,
  onFollowUp,
  onAction,
  disabled,
}: {
  msg: Message;
  locale: Locale;
  onFollowUp: (id: string) => void;
  onAction: (a: ActionButton) => void;
  disabled: boolean;
}) {
  const isBot = msg.role === "bot";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex ${isBot ? "justify-start" : "justify-end"}`}
    >
      <div className={`flex max-w-[85%] flex-col gap-2 ${isBot ? "items-start" : "items-end"}`}>
        <div
          className={`whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
            isBot
              ? "rounded-tl-sm bg-white text-[#1B1B1B] shadow-sm ring-1 ring-gray-100"
              : "rounded-tr-sm text-white"
          }`}
          style={
            !isBot
              ? { background: `linear-gradient(135deg, ${BRAND_GREEN}, ${BRAND_GREEN_MID})` }
              : undefined
          }
        >
          {msg.text}
        </div>

        {isBot && msg.actions && msg.actions.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {msg.actions.map((action, idx) => (
              <button
                key={`${action.type}-${idx}`}
                onClick={() => onAction(action)}
                disabled={disabled}
                className="rounded-full border px-3 py-1.5 text-xs font-medium transition-all cursor-pointer hover:shadow-md disabled:opacity-50"
                style={{
                  borderColor: BRAND_GOLD,
                  background: `linear-gradient(135deg, ${BRAND_GOLD}, #b8882a)`,
                  color: "#fff",
                }}
              >
                {action.label[locale]}
              </button>
            ))}
          </div>
        )}

        {isBot && msg.followUps && msg.followUps.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {msg.followUps.map((id) => {
              const intent = getIntentById(id);
              if (!intent) return null;
              return (
                <button
                  key={id}
                  onClick={() => onFollowUp(id)}
                  disabled={disabled}
                  className="rounded-full border border-[#40916C]/30 bg-white px-3 py-1 text-xs text-[#2D6A4F] transition-all cursor-pointer hover:border-[#40916C] hover:bg-[#2D6A4F] hover:text-white disabled:opacity-50"
                >
                  {intentDisplayLabel(intent, locale)}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-start"
    >
      <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-white px-4 py-3 shadow-sm ring-1 ring-gray-100">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="inline-block h-2 w-2 rounded-full bg-[#40916C]"
            animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
            transition={{
              duration: 0.9,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
