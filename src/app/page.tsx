"use client";

import { useMemo, useState } from "react";
import {
  ChevronDown,
  Settings as SettingsIcon,
  Sparkles,
  Save,
  ListPlus,
  Table as TableIcon,
  TreePine,
} from "lucide-react";
import { FindingsOverview } from "@/components/FindingsOverview";
import { FilterChipsRow } from "@/components/FilterChipsRow";
import { FindingsTable } from "@/components/FindingsTable";
import { FindingDetailPanel } from "@/components/FindingDetailPanel";
import {
  CategoryFilter,
  FINDINGS,
  filterFindings,
  Finding,
} from "@/lib/findings";

export default function VulnerabilityFindingsPage() {
  const [filter, setFilter] = useState<CategoryFilter>("all");
  const [selected, setSelected] = useState<Finding | null>(null);

  const findings = useMemo(() => filterFindings(FINDINGS, filter), [filter]);

  return (
    <div className="px-5 py-4">
      {/* Page title bar */}
      <div className="mb-3 flex items-center justify-between">
        <h1 className="text-h1">Vulnerability Findings</h1>
        <div className="flex items-center gap-2">
          <button
            className="flex h-7 items-center gap-1.5 rounded border px-2 text-[12px] font-medium"
            style={{
              borderColor: "var(--text-primary)",
              color: "var(--text-primary)",
              background: "white",
            }}
          >
            <Save className="h-3 w-3" />
            Save as...
            <ChevronDown className="h-3 w-3" />
          </button>
          <button
            className="flex h-7 items-center gap-1.5 rounded border px-2 text-[12px] font-medium"
            style={{
              borderColor: "var(--text-primary)",
              color: "var(--text-primary)",
              background: "white",
            }}
          >
            <ListPlus className="h-3 w-3" />
            Manage Rules
          </button>
          <button className="flex h-7 w-7 items-center justify-center rounded border bg-white" style={{ borderColor: "var(--border)", color: "var(--text-tertiary)" }}>
            <SettingsIcon className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Filter chips */}
      <div className="mb-3">
        <FilterChipsRow
          active={filter}
          onChange={setFilter}
          totalCount={7057515}
        />
      </div>

      {/* View / Group by row */}
      <div className="mb-3 flex items-center gap-3">
        <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "var(--text-tertiary)" }}>
          VIEW
        </span>
        <div
          className="flex h-7 items-center rounded border bg-white"
          style={{ borderColor: "var(--border)" }}
        >
          <button
            className="flex h-7 items-center gap-1.5 rounded-l px-2.5 text-[11px] font-medium"
            style={{ background: "var(--wiz-blue-soft)", color: "var(--wiz-blue)" }}
          >
            <TableIcon className="h-3 w-3" />
            Table
          </button>
          <button
            className="flex h-7 items-center gap-1.5 rounded-r px-2.5 text-[11px]"
            style={{ color: "var(--text-secondary)" }}
          >
            <TreePine className="h-3 w-3" />
            Treemap
          </button>
        </div>
        <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "var(--text-tertiary)" }}>
          GROUP BY
        </span>
        <button
          className="flex h-7 items-center gap-1.5 rounded border bg-white px-2.5 text-[11px] font-medium"
          style={{ borderColor: "var(--border)", color: "var(--wiz-blue)" }}
        >
          <span style={{ color: "var(--wiz-blue)" }}>Base Image</span>
          <ChevronDown className="h-3 w-3" />
        </button>
        <button
          className="flex h-7 items-center gap-1.5 rounded border bg-white px-2.5 text-[11px]"
          style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
        >
          Select...
          <ChevronDown className="h-3 w-3" />
        </button>
      </div>

      {/* Overview cards */}
      <div className="mb-3">
        <FindingsOverview />
      </div>

      {/* Table */}
      <FindingsTable findings={findings} onSelect={setSelected} />

      {/* Floating Mika AI button */}
      <button
        className="fixed bottom-4 right-4 flex h-9 items-center gap-1.5 rounded-full px-3 text-[12px] font-medium text-white shadow-lg"
        style={{
          background: "linear-gradient(135deg, var(--mika-grad-from), var(--mika-grad-to))",
        }}
      >
        <Sparkles className="h-3.5 w-3.5" />
        Mika AI
      </button>

      {/* Slide-out detail panel */}
      {selected && (
        <FindingDetailPanel
          finding={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
