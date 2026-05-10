"use client";

import {
  ChevronDown,
  History,
  Search,
  Bell,
  Gift,
  HelpCircle,
  Megaphone,
} from "lucide-react";

export function WizTopBar() {
  return (
    <header
      className="flex h-12 shrink-0 items-center justify-between border-b bg-white px-4"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="flex items-center gap-2">
        <button
          className="flex h-7 items-center gap-1.5 rounded px-2 text-[12px] font-medium hover:bg-[color:var(--surface-hover)]"
          style={{ color: "var(--text-primary)" }}
        >
          <span>📁</span>
          <span>All projects</span>
          <ChevronDown className="h-3 w-3" />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <div
          className="flex h-7 items-center gap-1.5 rounded px-2 text-[11px]"
          style={{ color: "var(--text-tertiary)" }}
        >
          <History className="h-3.5 w-3.5" />
        </div>
        <div className="flex h-7 items-center gap-2 rounded-full bg-[color:var(--bg-muted)] px-2.5">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: "#19c47b" }}
          />
          <span
            className="text-[11px] font-medium"
            style={{ color: "var(--text-primary)" }}
          >
            Wiz Adoption
          </span>
          <div className="ml-1 h-1 w-12 rounded-full bg-white">
            <div
              className="h-1 rounded-full"
              style={{ background: "#19c47b", width: "62%" }}
            />
          </div>
        </div>

        <div
          className="flex h-7 w-[260px] items-center gap-2 rounded border bg-white px-2"
          style={{ borderColor: "var(--border)" }}
        >
          <Search className="h-3.5 w-3.5" style={{ color: "var(--text-tertiary)" }} />
          <input
            placeholder="Search"
            className="flex-1 bg-transparent text-[12px] outline-none placeholder:text-[color:var(--text-tertiary)]"
          />
          <kbd
            className="rounded border px-1 text-[10px]"
            style={{
              borderColor: "var(--border)",
              color: "var(--text-tertiary)",
            }}
          >
            ⌘K
          </kbd>
        </div>

        <div className="flex items-center gap-1" style={{ color: "var(--text-tertiary)" }}>
          <button className="flex h-7 w-7 items-center justify-center rounded hover:bg-[color:var(--surface-hover)]">
            <History className="h-3.5 w-3.5" />
          </button>
          <button className="flex h-7 w-7 items-center justify-center rounded hover:bg-[color:var(--surface-hover)]">
            <Bell className="h-3.5 w-3.5" />
          </button>
          <button className="flex h-7 w-7 items-center justify-center rounded hover:bg-[color:var(--surface-hover)]">
            <Megaphone className="h-3.5 w-3.5" />
          </button>
          <button className="flex h-7 w-7 items-center justify-center rounded hover:bg-[color:var(--surface-hover)]">
            <Gift className="h-3.5 w-3.5" />
          </button>
          <button className="flex h-7 w-7 items-center justify-center rounded hover:bg-[color:var(--surface-hover)]">
            <HelpCircle className="h-3.5 w-3.5" />
          </button>
          <div
            className="ml-1 flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-semibold text-white"
            style={{ background: "#7c3aed" }}
          >
            SK
          </div>
        </div>
      </div>
    </header>
  );
}
