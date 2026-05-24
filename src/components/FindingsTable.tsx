"use client";

import { useState } from "react";
import { Box, FileCode, MoreVertical, ShieldAlert, Settings } from "lucide-react";
import type { Finding } from "@/lib/findings";
import { SeverityBadge, StatusPill } from "./SeverityBadge";
import { JFrogChip, JFrogLogo } from "./JFrogChip";
import { JFrogResearchBadge } from "./JFrogResearchBadge";
import { ApplicabilityPill } from "./ApplicabilityPill";

const COLUMNS = [
  { id: "finding", label: "Finding", w: "180px", align: "left" as const },
  { id: "insights", label: "Insights", w: "150px", align: "left" as const },
  { id: "resource", label: "Resource", w: "200px", align: "left" as const },
  { id: "component", label: "Component", w: "150px", align: "left" as const },
  { id: "status", label: "Status", w: "100px", align: "left" as const },
  { id: "severity", label: "Severity", w: "90px", align: "left" as const },
  { id: "related", label: "Related Risk Issues", w: "150px", align: "left" as const },
  { id: "fix", label: "Fix Version", w: "120px", align: "left" as const },
  { id: "detection", label: "Detection Method", w: "130px", align: "left" as const },
  { id: "subscription", label: "Subscription", w: "140px", align: "left" as const },
];

function InsightCell({ finding }: { finding: Finding }) {
  return (
    <div className="flex items-center gap-1">
      {/* Wiz native insight icons */}
      {finding.insights.includes("has_public_exploit") && (
        <span
          title="Has public exploit"
          className="flex h-4 w-4 items-center justify-center rounded"
          style={{ background: "#fef3c7", color: "#a16207" }}
        >
          <Bug3 />
        </span>
      )}
      {finding.insights.includes("has_fix") && (
        <span
          title="Has fix"
          className="flex h-4 w-4 items-center justify-center rounded"
          style={{ background: "#fef3c7", color: "#a16207" }}
        >
          <CheckIcon />
        </span>
      )}
      {finding.insights.includes("validated_in_runtime") && (
        <span
          title={
            finding.runtimeValidatedByJFrog
              ? "Validated in Runtime — set by JFrog"
              : "Validated in Runtime"
          }
          className="flex h-4 w-4 items-center justify-center rounded"
          style={{
            background: finding.runtimeValidatedByJFrog
              ? "var(--jfrog-green-soft)"
              : "var(--status-resolved-bg)",
            color: finding.runtimeValidatedByJFrog
              ? "var(--jfrog-green-dark)"
              : "var(--status-resolved-fg)",
          }}
        >
          <CheckShieldIcon />
        </span>
      )}
      {finding.insights.includes("no_fix") && (
        <span
          title="No fix available"
          className="flex h-4 w-4 items-center justify-center rounded"
          style={{ background: "#fee2e2", color: "#991b1b" }}
        >
          <NoFixIcon />
        </span>
      )}
      {/* JFrog augmentation chip — distinctive visual signature */}
      {finding.jfrog && (
        <JFrogChip type={finding.jfrog.type} size="xs" variant="soft" />
      )}
      {finding.jfrog?.type === "MALICIOUS_PKG" && (
        <JFrogResearchBadge />
      )}
      {finding.applicability && (
        <ApplicabilityPill state={finding.applicability} />
      )}
    </div>
  );
}

function FindingIcon({ finding }: { finding: Finding }) {
  if (finding.jfrog?.type === "INTEGRITY_VIOLATION") {
    return (
      <span
        className="flex h-4 w-4 items-center justify-center rounded"
        style={{ background: "var(--aug-violation-bg)", color: "var(--aug-violation)" }}
      >
        <ShieldAlert className="h-3 w-3" />
      </span>
    );
  }
  if (finding.jfrog?.type === "MALICIOUS_PKG") {
    return (
      <span
        className="flex h-4 w-4 items-center justify-center rounded"
        style={{ background: "var(--aug-malicious-bg)", color: "var(--aug-malicious)" }}
      >
        <ShieldAlert className="h-3 w-3" />
      </span>
    );
  }
  if (finding.jfrog?.type === "SAST") {
    return (
      <span
        className="flex h-4 w-4 items-center justify-center rounded"
        style={{ background: "var(--aug-sast-bg)", color: "var(--aug-sast)" }}
      >
        <FileCode className="h-3 w-3" />
      </span>
    );
  }
  return (
    <span
      className="flex h-4 w-4 items-center justify-center rounded"
      style={{ background: "var(--critical-bg)", color: "var(--critical)" }}
    >
      <ShieldAlert className="h-3 w-3" />
    </span>
  );
}

export function FindingsTable({
  findings,
  onSelect,
}: {
  findings: Finding[];
  onSelect: (finding: Finding) => void;
}) {
  const [hoverId, setHoverId] = useState<string | null>(null);

  return (
    <div
      className="flex-1 overflow-x-auto rounded-md border bg-white"
      style={{ borderColor: "var(--border)" }}
    >
      <table className="w-full" style={{ minWidth: "1380px" }}>
        <thead>
          <tr
            className="border-b text-left"
            style={{ borderColor: "var(--border)", background: "var(--bg-subtle)" }}
          >
            {COLUMNS.map((c) => (
              <th
                key={c.id}
                className="h-8 px-2.5 text-[11px] font-medium"
                style={{
                  width: c.w,
                  minWidth: c.w,
                  color: "var(--text-secondary)",
                  textAlign: c.align,
                }}
              >
                {c.label}
              </th>
            ))}
            <th className="h-8 w-8 px-1.5">
              <Settings className="h-3 w-3" style={{ color: "var(--text-tertiary)" }} />
            </th>
          </tr>
        </thead>
        <tbody>
          {findings.map((f) => {
            const isHover = hoverId === f.id;
            const isJFrog = Boolean(f.jfrog);
            return (
              <tr
                key={f.id}
                onClick={() => onSelect(f)}
                onMouseEnter={() => setHoverId(f.id)}
                onMouseLeave={() => setHoverId(null)}
                className="cursor-pointer border-b text-[12px] transition-colors"
                style={{
                  borderColor: "var(--border)",
                  background: isHover
                    ? "var(--surface-hover)"
                    : isJFrog
                      ? "rgba(62, 176, 101, 0.04)"
                      : "white",
                }}
              >
                {/* Finding */}
                <td className="px-2.5 py-2">
                  <div className="flex items-center gap-1.5">
                    <FindingIcon finding={f} />
                    <span
                      className="font-medium"
                      style={{ color: "var(--text-link)" }}
                    >
                      {f.finding}
                    </span>
                    {isJFrog && (
                      <span
                        title="Augmented by JFrog"
                        className="flex h-3.5 w-3.5 items-center justify-center"
                        style={{ color: "var(--jfrog-green-dark)" }}
                      >
                        <JFrogLogo className="h-3 w-3" />
                      </span>
                    )}
                  </div>
                </td>
                {/* Insights */}
                <td className="px-2.5 py-2">
                  <InsightCell finding={f} />
                </td>
                {/* Resource */}
                <td className="px-2.5 py-2">
                  <div className="flex items-center gap-1.5">
                    <Box
                      className="h-3 w-3 shrink-0"
                      style={{ color: "var(--text-tertiary)" }}
                    />
                    <span
                      className="truncate"
                      style={{ color: "var(--text-primary)", maxWidth: "150px" }}
                    >
                      {f.resource}
                    </span>
                  </div>
                </td>
                {/* Component */}
                <td className="px-2.5 py-2">
                  <div className="flex flex-col">
                    <span
                      className="truncate"
                      style={{ color: "var(--text-primary)", maxWidth: "130px" }}
                    >
                      {f.component}
                    </span>
                    <span
                      className="truncate text-[10px]"
                      style={{ color: "var(--text-tertiary)" }}
                    >
                      {f.componentSubtype}
                    </span>
                  </div>
                </td>
                {/* Status */}
                <td className="px-2.5 py-2">
                  <StatusPill status={f.status} />
                </td>
                {/* Severity */}
                <td className="px-2.5 py-2">
                  <SeverityBadge severity={f.severity} />
                </td>
                {/* Related Risk Issues */}
                <td
                  className="px-2.5 py-2"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {f.relatedRiskIssues ?? "-"}
                </td>
                {/* Fix */}
                <td
                  className="px-2.5 py-2"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {f.fixVersion ?? "-"}
                </td>
                {/* Detection */}
                <td
                  className="px-2.5 py-2"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {f.detectionMethod}
                </td>
                {/* Subscription */}
                <td className="px-2.5 py-2">
                  <div className="flex flex-col">
                    {f.subscription.split("\n").map((line, i) => (
                      <span
                        key={i}
                        className="text-[11px]"
                        style={{
                          color: i === 0 ? "var(--text-primary)" : "var(--text-tertiary)",
                        }}
                      >
                        {line}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="w-8 px-1.5 py-2">
                  <button
                    className="flex h-5 w-5 items-center justify-center rounded hover:bg-[color:var(--bg-muted)]"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    <MoreVertical className="h-3 w-3" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* tiny inline icons (avoid pulling more lucide deps) */
function Bug3() {
  return (
    <svg viewBox="0 0 16 16" className="h-3 w-3" fill="currentColor">
      <path d="M8 2a3 3 0 013 3v1H5V5a3 3 0 013-3zm-5 6h2v5a3 3 0 003 3h0a3 3 0 003-3V8h2v5a5 5 0 01-10 0V8z" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 8l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function CheckShieldIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3 w-3" fill="currentColor">
      <path d="M8 1l5 2v5c0 3-2 5-5 7-3-2-5-4-5-7V3l5-2zm-1 9l-2-2 1-1 1 1 3-3 1 1-4 4z" />
    </svg>
  );
}
function NoFixIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="8" cy="8" r="6" />
      <path d="M4 12L12 4" strokeLinecap="round" />
    </svg>
  );
}
