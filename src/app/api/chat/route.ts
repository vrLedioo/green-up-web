import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { INTENTS } from "@/lib/chatbot-intents";

export async function POST(req: Request) {
  try {
    const { messages, locale } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { text: "Ju lutem konfiguroni GEMINI_API_KEY në .env.local për të përdorur asistentin AI." },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Build the system instructions from intents
    const intentsInfo = INTENTS.map((intent) => {
      return `- ${intent.id}: ${intent.response.en} (SQ: ${intent.response.sq}, DE: ${intent.response.de})`;
    }).join("\n");

    const systemPrompt = `You are the GreenUp virtual assistant. GreenUp is an elevator company in Kosovo.
You must answer questions naturally, as a helpful customer support agent.
Always respond in the user's preferred language (currently: ${locale}).
If the user asks in Albanian, reply in Albanian. If English, in English. If German, in German.
Keep your answers relatively concise, friendly, and use emojis occasionally.
IMPORTANT: Do NOT use markdown formatting (no asterisks, no bold, no lists). Just use plain text and newlines.
Here is the core information about the company:
${intentsInfo}

Do not invent information. If asked something outside of the elevator business, politely decline and say you can only help with GreenUp services.`;

    // Convert messages to Gemini history format
    const history = messages.slice(0, -1).map((msg: any) => ({
      role: msg.role === "bot" ? "model" : "user",
      parts: [{ text: msg.text }],
    }));

    const lastMessage = messages[messages.length - 1].text;

    const chat = model.startChat({
      history,
      systemInstruction: {
        role: "system",
        parts: [{ text: systemPrompt }],
      },
    });

    const result = await chat.sendMessage(lastMessage);
    const text = result.response.text();

    return NextResponse.json({ text });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { text: "Pati një problem gjatë lidhjes me serverin tonë. Ju lutem provoni përsëri." },
      { status: 500 }
    );
  }
}
