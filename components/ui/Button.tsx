"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "gold";
type Size = "sm" | "md" | "lg" | "icon";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  asChild?: boolean;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-br from-brightPurple to-primaryPurple text-offWhite hover:brightness-110 active:brightness-100 shadow-glow hover:shadow-glow border border-transparent",
  secondary:
    "bg-softLavender text-primaryPurple hover:bg-lavender/60 border border-lavender/50 shadow-soft",
  ghost:
    "bg-transparent text-brandText hover:bg-softLavender border border-transparent",
  outline:
    "bg-transparent text-primaryPurple border border-lavender hover:bg-softLavender",
  gold:
    "bg-softGold text-deepPurple hover:bg-[#e6c97e] border border-transparent shadow-soft",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm gap-2 rounded-xl",
  md: "h-12 px-6 text-sm md:text-base gap-2 rounded-2xl",
  lg: "h-14 px-8 text-base gap-3 rounded-3xl",
  icon: "h-12 w-12 rounded-2xl",
};

const base =
  "relative inline-flex items-center justify-center font-medium select-none whitespace-nowrap " +
  "transition-colors transition-transform duration-200 ease-out " +
  "active:scale-[0.98] " +
  "disabled:opacity-60 disabled:cursor-not-allowed " +
  "motion-reduce:transition-none motion-reduce:transform-none motion-reduce:active:scale-100";

function mergeClass(a?: string, b?: string) {
  return [a, b].filter(Boolean).join(" ") || undefined;
}

function mergeRefs<T>(
  ...refs: Array<React.ForwardedRef<T> | React.MutableRefObject<T | null> | undefined>
) {
  return (node: T | null) => {
    for (const ref of refs) {
      if (!ref) continue;
      if (typeof ref === "function") {
        ref(node);
      } else {
        (ref as React.MutableRefObject<T | null>).current = node;
      }
    }
  };
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      asChild = false,
      "aria-busy": ariaBusy,
      ...props
    },
    ref
  ) {
    const classes = cn(base, variants[variant], sizes[size], className);
    const effectiveDisabled = disabled || loading;
    const busy = ariaBusy ?? (loading || undefined);

    const inner = (
      <>
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin shrink-0" aria-hidden />
        ) : (
          leftIcon
        )}
        {children}
        {!loading && rightIcon}
      </>
    );

    if (asChild) {
      const child = React.Children.only(children) as React.ReactElement<{
        className?: string;
        disabled?: boolean;
        "aria-busy"?: boolean | "true" | "false";
        ref?: React.Ref<HTMLElement | SVGElement | unknown>;
      }>;
      if (child?.type === React.Fragment) {
        return (
          <button
            ref={ref}
            aria-busy={busy}
            disabled={effectiveDisabled}
            className={classes}
            {...props}
          >
            {inner}
          </button>
        );
      }
      return React.cloneElement(child, {
        className: cn(child.props.className, classes),
        disabled: child.props.disabled ?? effectiveDisabled,
        "aria-busy": (child.props["aria-busy"] ?? busy) as
          | boolean
          | "true"
          | "false"
          | undefined,
        ref: mergeRefs(ref as React.MutableRefObject<unknown>, child.props.ref),
        ...props,
      } as unknown as React.Attributes & Record<string, unknown>);
    }

    return (
      <button
        ref={ref}
        aria-busy={busy}
        disabled={effectiveDisabled}
        className={classes}
        {...props}
      >
        {inner}
      </button>
    );
  }
);

Button.displayName = "Button";
void mergeClass;
