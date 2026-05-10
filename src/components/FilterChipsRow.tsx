"use client";

import {
  Heart,
  Bug,
  FileCode,
  Sparkles,
  FlaskConical,
  ChevronDown,
  Filter,
  Plus,
  GitCompare,
  Clock,
} from "lucide-react";
import { JFrogLogo } from "./JFrogChip";
import type { CategoryFilter } from "@/lib/findings";

const NATIVE_CHIPS = [
  { icon: <Heart className="h-3.5 w-3.5" />, label: null },
  { icon: <Bug className="h-3.5 w-3.5" />, label: null },
  { icon: <FileCode className="h-3.5 w-3.5" />, label: null },
  { icon: <Sparkles className="h-3.5 w-3.5" />, label: null },
  { icon: <FlaskConical className="h-3.5 w-3.5" />, label: null },
];

const NATIVE_DROPDOWNS = [
  "Vulnerability",
  "Severity",
  "Related Issue Severity",
  "Has Fix",
  "Has Public Exploit",
  "Resource Type",
  "Dependency Type",
];

const JFROG_FILTERS: Array<{
  key: CategoryFilter;
  label: string;
  icon: React.ReactNode;
  fg: string;
  bg: string;
}> = [
  {
    key: "INTEGRITY_DRIFT",
    label: "Integrity drift",
    icon: <GitCompare className="h-3 w-3" />,
    fg: "var(--aug-drift)",
    bg: "var(--aug-drift-bg)",
  },
  {
    key: "MALICIOUS_PKG",
    label: "Malicious package",
    icon: <Bug className="h-3 w-3" />,
    fg: "var(--aug-malicious)",
    bg: "var(--aug-malicious-bg)",
  },
  {
    key: "NEWLY_APPLICABLE",
    label: "Newly applicable CVE",
    icon: <Clock className="h-3 w-3" />,
    fg: "var(--aug-newcve)",
    bg: "var(--aug-newcve-bg)",
  },
  {
    key: "SAST",
    label: "SAST",
    icon: <FileCode className="h-3 w-3" />,
    fg: "var(--aug-sast)",
    bg: "var(--aug-sast-bg)",
  },
];

export function FilterChipsRow({
  active,
  onChange,
  totalCount,
}: {
  active: CategoryFilter;
  onChange: (next: CategoryFilter) => void;
  totalCount: number;
}) {
  return (
    <div className="space-y-2">
      {/* Top row — native Wiz filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 flex-wrap">
          {NATIVE_CHIPS.map((c, i) => (
            <button
              key={i}
              className="flex h-7 w-7 items-center justify-center rounded border bg-white"
              style={{
                borderColor: "var(--border)",
                color: "var(--text-tertiary)",
              }}
            >
              {c.icon}
            </button>
          ))}
          <div className="mx-1 h-5 w-px" style={{ background: "var(--border)" }} />
          {NATIVE_DROPDOWNS.map((d) => (
            <button
              key={d}
              className="flex h-7 items-center gap-1.5 rounded border bg-white px-2.5 text-[11px]"
              style={{
                borderColor: "var(--border)",
                color: "var(--text-primary)",
              }}
            >
              {d}
              <ChevronDown className="h-3 w-3" style={{ color: "var(--text-tertiary)" }} />
            </button>
          ))}
          <button
            className="flex h-7 items-center gap-1 rounded border bg-white px-2 text-[11px]"
            style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}
          >
            <Filter className="h-3 w-3" />
            Filter
          </button>
        </div>
        <div className="text-[11px]" style={{ color: "var(--text-tertiary)" }}>
          {totalCount.toLocaleString()} vulnerabilities
        </div>
      </div>

      {/* Bottom row — NEW JFrog augmentation filter chips */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <span
          className="flex h-6 items-center gap-1 rounded px-1.5 text-[10px] font-medium"
          style={{
            background: "var(--jfrog-green-soft)",
            color: "var(--jfrog-green-dark)",
          }}
        >
          <JFrogLogo className="h-3 w-3" />
          JFrog signals
        </span>
        <button
          onClick={() => onChange("all")}
          className="h-6 rounded border bg-white px-2 text-[10px] font-medium transition-colors"
          style={{
            borderColor: active === "all" ? "var(--wiz-blue)" : "var(--border)",
            color: active === "all" ? "var(--wiz-blue)" : "var(--text-secondary)",
            background: active === "all" ? "var(--wiz-blue-soft)" : "white",
          }}
        >
          All findings
        </button>
        <button
          onClick={() => onChange("JFROG_ANY")}
          className="flex h-6 items-center gap-1 rounded border bg-white px-2 text-[10px] font-medium transition-colors"
          style={{
            borderColor:
              active === "JFROG_ANY" ? "var(--jfrog-green)" : "var(--border)",
            color:
              active === "JFROG_ANY" ? "var(--jfrog-green-dark)" : "var(--text-secondary)",
            background:
              active === "JFROG_ANY" ? "var(--jfrog-green-soft)" : "white",
          }}
        >
          <JFrogLogo className="h-3 w-3" />
          Any JFrog signal
        </button>
        {JFROG_FILTERS.map((f) => {
          const isActive = active === f.key;
          return (
            <button
              key={f.key}
              onClick={() => onChange(f.key)}
              className="flex h-6 items-center gap-1 rounded border px-2 text-[10px] font-medium transition-colors"
              style={{
                borderColor: isActive ? f.fg : "var(--border)",
                background: isActive ? f.bg : "white",
                color: isActive ? f.fg : "var(--text-secondary)",
              }}
            >
              {f.icon}
              {f.label}
            </button>
          );
        })}
        <button
          className="flex h-6 items-center gap-1 rounded border bg-white px-1.5 text-[10px]"
          style={{ borderColor: "var(--border)", color: "var(--text-tertiary)" }}
        >
          <Plus className="h-2.5 w-2.5" />
          Save view
        </button>
      </div>
    </div>
  );
}
