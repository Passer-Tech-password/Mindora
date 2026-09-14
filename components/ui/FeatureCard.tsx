import * as React from "react";
import { cn } from "@/lib/utils";
import * as LucideIcons from "lucide-react";

interface FeatureCardProps {
  icon?: React.ReactNode;
  iconName?: string;
  title: string;
  description?: string;
  bullets?: string[];
  className?: string;
  iconClassName?: string;
}

function getIcon(name: string): React.ComponentType<{ className?: string }> {
  const lookup: Record<string, keyof typeof LucideIcons> = {
    smile: "Smile",
    "smile-plus": "SmilePlus",
    quote: "Quote",
    headphones: "Headphones",
    users: "Users",
    flame: "Flame",
    bookmark: "Bookmark",
    sparkles: "Sparkles",
    "shield-check": "ShieldCheck",
    shield: "Shield",
    heart: "Heart",
    "heart-handshake": "HeartHandshake",
    moon: "Moon",
    wind: "Wind",
    zap: "Zap",
    trophy: "Trophy",
    sunrise: "Sunrise",
    sprout: "Sprout",
  };
  const resolved = lookup[name] ?? "Sparkles";
  return (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[
    resolved
  ] ?? LucideIcons.Sparkles;
}

export function FeatureCard({
  icon,
  iconName,
  title,
  description,
  bullets,
  className,
  iconClassName,
}: FeatureCardProps) {
  const Icon = iconName ? getIcon(iconName) : null;
  return (
    <div
      className={cn(
        "group relative rounded-3xl bg-offWhite border border-softLavender/70 p-6 md:p-8 shadow-card hover:shadow-glow transition-all duration-300 hover:-translate-y-1",
        className
      )}
    >
      <div
        className={cn(
          "inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-softLavender to-lavender/60 text-primaryPurple mb-5 group-hover:scale-105 transition-transform",
          iconClassName
        )}
      >
        {icon ?? (Icon ? <Icon className="h-7 w-7" /> : null)}
      </div>
      <h3 className="text-xl font-semibold text-brandText tracking-tight">
        {title}
      </h3>
      {description && (
        <p className="mt-3 text-brandSecondaryText leading-relaxed text-sm md:text-base">
          {description}
        </p>
      )}
      {bullets && bullets.length > 0 && (
        <ul className="mt-5 space-y-2.5">
          {bullets.map((b) => (
            <li
              key={b}
              className="flex items-start gap-2.5 text-sm md:text-[15px] text-brandText/80"
            >
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brightPurple" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
