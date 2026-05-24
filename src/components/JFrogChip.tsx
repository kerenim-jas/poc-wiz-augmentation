"use client";

import type { AugType } from "@/lib/findings";
import { GitCompare, Bug, Clock, FileCode } from "lucide-react";
import { cn } from "@/lib/cn";

const TYPE_CONFIG: Record<
  AugType,
  { label: string; icon: React.ReactNode; bg: string; fg: string; border: string }
> = {
  INTEGRITY_VIOLATION: {
    label: "Integrity violation",
    icon: <GitCompare className="h-3 w-3" />,
    bg: "var(--aug-violation-bg)",
    fg: "var(--aug-violation)",
    border: "var(--aug-violation)",
  },
  MALICIOUS_PKG: {
    label: "Malicious package",
    icon: <Bug className="h-3 w-3" />,
    bg: "var(--aug-malicious-bg)",
    fg: "var(--aug-malicious)",
    border: "var(--aug-malicious)",
  },
  NEWLY_APPLICABLE: {
    label: "Newly applicable",
    icon: <Clock className="h-3 w-3" />,
    bg: "var(--aug-newcve-bg)",
    fg: "var(--aug-newcve)",
    border: "var(--aug-newcve)",
  },
  SAST: {
    label: "SAST",
    icon: <FileCode className="h-3 w-3" />,
    bg: "var(--aug-sast-bg)",
    fg: "var(--aug-sast)",
    border: "var(--aug-sast)",
  },
};

/**
 * Small JFrog logo (frog mark) — inline SVG so we don't ship an asset.
 * Renders in the JFrog brand green so it's instantly recognizable.
 */
export function JFrogLogo({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      {/* simplified frog silhouette */}
      <circle cx="5" cy="6" r="2" />
      <circle cx="11" cy="6" r="2" />
      <path d="M3 9c0 3.5 2.5 5 5 5s5-1.5 5-5c0-1-.5-2-1.5-2.5C11 5.5 9.5 6 8 6s-3-.5-3.5-1.5C3.5 7 3 8 3 9z" />
    </svg>
  );
}

export function JFrogChip({
  type,
  label,
  size = "sm",
  variant = "soft",
}: {
  type: AugType;
  /** Optional override for the chip text */
  label?: string;
  size?: "xs" | "sm" | "md";
  variant?: "soft" | "outline" | "icon-only";
}) {
  const config = TYPE_CONFIG[type];
  const text = label ?? config.label;

  if (variant === "icon-only") {
    return (
      <span
        title={`JFrog: ${text}`}
        className={cn(
          "inline-flex items-center justify-center rounded-full",
          size === "xs" ? "h-4 w-4" : size === "sm" ? "h-5 w-5" : "h-6 w-6"
        )}
        style={{ background: config.bg, color: config.fg }}
      >
        {config.icon}
      </span>
    );
  }

  const sizeClasses =
    size === "xs"
      ? "h-4 px-1.5 text-[9px] gap-1"
      : size === "sm"
        ? "h-5 px-1.5 text-[10px] gap-1"
        : "h-6 px-2 text-[11px] gap-1.5";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded font-medium whitespace-nowrap",
        sizeClasses,
        variant === "outline" && "border"
      )}
      style={{
        background: variant === "soft" ? config.bg : "transparent",
        color: config.fg,
        borderColor: variant === "outline" ? config.border : undefined,
      }}
    >
      <span className="flex items-center gap-1">
        <JFrogLogo className={size === "xs" ? "h-2.5 w-2.5" : "h-3 w-3"} />
        {config.icon}
      </span>
      <span>{text}</span>
    </span>
  );
}

/**
 * Generic "Augmented by JFrog" indicator (no specific use case).
 * Used in the Insights Summary when we want to label a Wiz finding as having
 * any JFrog enrichment, without specifying the type.
 */
export function JFrogAugmentedTag({ size = "sm" }: { size?: "sm" | "md" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded font-medium",
        size === "sm" ? "h-5 px-1.5 text-[10px]" : "h-6 px-2 text-[11px]"
      )}
      style={{
        background: "var(--jfrog-green-soft)",
        color: "var(--jfrog-green-dark)",
      }}
    >
      <JFrogLogo className="h-3 w-3" />
      <span>Augmented by JFrog</span>
    </span>
  );
}
