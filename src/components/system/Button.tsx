import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "text" | "icon";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  icon?: ReactNode;
};

const variantClassNames: Record<ButtonVariant, string> = {
  primary: "bg-text text-surface hover:bg-clay active:bg-clay/90",
  secondary: "border border-border bg-surface text-text hover:border-text/30 active:bg-surface-muted",
  ghost: "bg-transparent text-text hover:bg-surface-muted active:bg-border/60",
  text: "min-h-0 px-0 text-text underline-offset-4 hover:underline active:text-clay",
  icon: "border border-border bg-surface text-text hover:border-text/30 active:bg-surface-muted"
};

const sizeClassNames: Record<ButtonSize, string> = {
  sm: "min-h-11 px-4 text-sm",
  md: "min-h-12 px-5 text-sm",
  lg: "min-h-14 px-7 text-base"
};

export function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  icon,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const isIconOnly = variant === "icon";

  return (
    <button
      className={[
        "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors duration-200 ease-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus disabled:cursor-not-allowed disabled:opacity-45",
        variantClassNames[variant],
        isIconOnly ? "min-h-11 min-w-11 px-0" : sizeClassNames[size],
        className
      ].join(" ")}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      {...props}
    >
      {isLoading ? (
        <span className="h-4 w-4 rounded-full border border-current border-t-transparent motion-safe:animate-spin" />
      ) : (
        icon
      )}
      {isIconOnly ? <span className="sr-only">{children}</span> : children}
    </button>
  );
}

