import { type ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "gold" | "outline-white" | "outline-green" | "solid-green";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  children: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const variants: Record<Variant, string> = {
  gold: "bg-gold text-dark font-semibold hover:bg-yellow-500 shadow-lg shadow-gold/20",
  "outline-white":
    "border border-white text-white hover:bg-white hover:text-green-primary",
  "outline-green":
    "border border-green-primary text-green-primary hover:bg-green-primary hover:text-white",
  "solid-green":
    "bg-green-primary text-white hover:bg-green-medium shadow-lg shadow-green-primary/30",
};

export default function Button({
  href,
  onClick,
  variant = "solid-green",
  children,
  className,
  type = "button",
  disabled,
}: ButtonProps) {
  const base =
    "inline-flex items-center gap-2 px-6 py-3 font-semibold text-sm tracking-wide transition-all duration-300 rounded-sm cursor-pointer";
  const classes = cn(base, variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
}
