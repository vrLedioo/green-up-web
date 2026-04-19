import { type ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "gold" | "ghost-light" | "ghost-green" | "solid-green";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  children: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const variantClass: Record<Variant, string> = {
  gold: "btn-gold",
  "ghost-light": "btn-ghost-light",
  "ghost-green": "btn-ghost-green",
  "solid-green": "btn-solid-green",
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
  const classes = cn("btn-base", variantClass[variant], className);

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
      className={cn(classes, disabled && "opacity-60 cursor-not-allowed")}
    >
      {children}
    </button>
  );
}
