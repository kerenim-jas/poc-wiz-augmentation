import type { Severity } from "@/lib/findings";

const STYLES: Record<Severity, { fg: string; bg: string; label: string }> = {
  critical: { fg: "var(--critical)", bg: "var(--critical-bg)", label: "Critical" },
  high: { fg: "var(--high)", bg: "var(--high-bg)", label: "High" },
  medium: { fg: "var(--medium)", bg: "var(--medium-bg)", label: "Medium" },
  low: { fg: "var(--low)", bg: "var(--low-bg)", label: "Low" },
};

export function SeverityBadge({
  severity,
  variant = "text",
}: {
  severity: Severity;
  variant?: "text" | "pill";
}) {
  const s = STYLES[severity];
  if (variant === "pill") {
    return (
      <span
        className="inline-flex h-5 items-center rounded px-1.5 text-[10px] font-medium"
        style={{ color: s.fg, background: s.bg }}
      >
        {s.label}
      </span>
    );
  }
  return (
    <span className="text-[12px] font-medium" style={{ color: s.fg }}>
      {s.label}
    </span>
  );
}

export function StatusPill({ status }: { status: string }) {
  return (
    <span
      className="inline-flex h-5 items-center rounded px-1.5 text-[10px] font-medium"
      style={{
        color: "var(--status-unresolved-fg)",
        background: "var(--status-unresolved-bg)",
      }}
    >
      {status}
    </span>
  );
}
