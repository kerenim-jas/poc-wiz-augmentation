"use client";

import { useState } from "react";
import {
  X,
  ChevronUp,
  ChevronDown,
  EyeOff,
  Link2,
  MoreHorizontal,
  ExternalLink,
  Sparkles,
  ShieldAlert,
  GitCompare,
  Bug,
  Clock,
  FileCode,
  AlertCircle,
} from "lucide-react";
import type { Finding } from "@/lib/findings";
import { JFrogChip, JFrogLogo, JFrogAugmentedTag } from "./JFrogChip";
import { SeverityBadge, StatusPill } from "./SeverityBadge";

type Tab = "overview" | "jfrog" | "code-to-cloud" | "comments" | "history";

const SUGGEST_QUESTIONS = [
  "Who should fix this?",
  "How can I remediate this?",
  "Will fixing this resolve other findings?",
  "Does this finding have any source mapped resources?",
];

export function FindingDetailPanel({
  finding,
  onClose,
}: {
  finding: Finding;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<Tab>(finding.jfrog ? "jfrog" : "overview");
  const isJFrog = Boolean(finding.jfrog);

  return (
    <div className="fixed inset-0 z-50 flex">
      <div
        className="flex-1 bg-black/15"
        onClick={onClose}
      />
      <aside
        className="flex h-full w-[800px] flex-col overflow-hidden border-l bg-white shadow-xl"
        style={{ borderColor: "var(--border)" }}
      >
        {/* Header */}
        <div
          className="flex items-start justify-between border-b px-5 py-3"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex items-start gap-2">
            <span
              className="mt-0.5 flex h-5 w-5 items-center justify-center rounded"
              style={{
                background: isJFrog
                  ? "var(--jfrog-green-soft)"
                  : "var(--critical-bg)",
                color: isJFrog
                  ? "var(--jfrog-green-dark)"
                  : "var(--critical)",
              }}
            >
              {isJFrog ? <JFrogLogo className="h-3.5 w-3.5" /> : <ShieldAlert className="h-3.5 w-3.5" />}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-[18px] font-semibold" style={{ color: "var(--text-primary)" }}>
                  {finding.finding}
                </h2>
                {isJFrog && <JFrogAugmentedTag />}
              </div>
              <div className="text-[11px]" style={{ color: "var(--text-tertiary)" }}>
                {finding.jfrog?.type === "INTEGRITY_DRIFT"
                  ? "Integrity Finding"
                  : finding.jfrog?.type === "MALICIOUS_PKG"
                    ? "Malicious Package Finding"
                    : finding.jfrog?.type === "SAST"
                      ? "Static Analysis Finding"
                      : "Vulnerability Finding"}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button className="flex h-6 w-6 items-center justify-center rounded hover:bg-[color:var(--surface-hover)]">
              <ChevronUp className="h-3.5 w-3.5" style={{ color: "var(--text-tertiary)" }} />
            </button>
            <button className="flex h-6 w-6 items-center justify-center rounded hover:bg-[color:var(--surface-hover)]">
              <ChevronDown className="h-3.5 w-3.5" style={{ color: "var(--text-tertiary)" }} />
            </button>
            <button
              onClick={onClose}
              className="flex h-6 w-6 items-center justify-center rounded hover:bg-[color:var(--surface-hover)]"
            >
              <X className="h-3.5 w-3.5" style={{ color: "var(--text-tertiary)" }} />
            </button>
          </div>
        </div>

        {/* Action toolbar */}
        <div
          className="flex items-center justify-between border-b px-5 py-2"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex items-center gap-1.5">
            <button
              className="flex h-7 items-center gap-1.5 rounded border bg-white px-2 text-[11px]"
              style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}
            >
              <EyeOff className="h-3 w-3" />
              Ignore
              <ChevronDown className="h-3 w-3" />
            </button>
            <button
              className="flex h-7 items-center gap-1.5 rounded border bg-white px-2 text-[11px]"
              style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}
            >
              <ExternalLink className="h-3 w-3" />
              Support
            </button>
            {isJFrog && (
              <button
                className="flex h-7 items-center gap-1.5 rounded border px-2 text-[11px] font-medium"
                style={{
                  borderColor: "var(--jfrog-green)",
                  background: "var(--jfrog-green-soft)",
                  color: "var(--jfrog-green-dark)",
                }}
              >
                <JFrogLogo className="h-3 w-3" />
                View in JFrog Platform
                <ExternalLink className="h-3 w-3" />
              </button>
            )}
            <button className="flex h-7 w-7 items-center justify-center rounded border bg-white" style={{ borderColor: "var(--border)", color: "var(--text-tertiary)" }}>
              <Link2 className="h-3 w-3" />
            </button>
            <button className="flex h-7 w-7 items-center justify-center rounded border bg-white" style={{ borderColor: "var(--border)", color: "var(--text-tertiary)" }}>
              <MoreHorizontal className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-[1fr_180px] gap-5 px-5 py-3">
            {/* Left column */}
            <div>
              {/* Insights summary */}
              <section>
                <h3 className="flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
                  <span
                    className="flex h-4 w-4 items-center justify-center rounded"
                    style={{ background: "var(--medium-bg)", color: "var(--medium)" }}
                  >
                    <Sparkles className="h-2.5 w-2.5" />
                  </span>
                  Insights Summary
                </h3>
                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                  {finding.insights.includes("has_public_exploit") && (
                    <Pill icon="bug" label="Has public exploit" tone="warning" />
                  )}
                  {finding.insights.includes("has_fix") && (
                    <Pill icon="check" label="Has fix" tone="success" />
                  )}
                  {finding.insights.includes("validated_in_runtime") && (
                    <Pill
                      icon="shield"
                      label={
                        finding.runtimeValidatedByJFrog
                          ? "Validated in Runtime — by JFrog"
                          : "Validated in Runtime"
                      }
                      tone={finding.runtimeValidatedByJFrog ? "jfrog" : "success"}
                    />
                  )}
                  {finding.jfrog && (
                    <JFrogChip type={finding.jfrog.type} variant="soft" size="md" />
                  )}
                </div>
                <p
                  className="mt-2.5 text-[12px] leading-relaxed"
                  style={{ color: "var(--text-primary)" }}
                >
                  {finding.description}
                </p>
                {finding.jfrog && (
                  <div
                    className="mt-2.5 flex items-start gap-2 rounded border-l-2 px-3 py-2 text-[12px]"
                    style={{
                      borderColor: "var(--jfrog-green)",
                      background: "var(--jfrog-green-soft)",
                      color: "var(--text-primary)",
                    }}
                  >
                    <JFrogLogo className="mt-0.5 h-3.5 w-3.5" />
                    <div>
                      <div className="font-semibold" style={{ color: "var(--jfrog-green-dark)" }}>
                        Augmented by JFrog · {finding.jfrog.label}
                      </div>
                      <div className="mt-0.5">{finding.jfrog.summary}</div>
                    </div>
                  </div>
                )}

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {SUGGEST_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      className="flex h-7 items-center gap-1.5 rounded border bg-white px-2 text-[11px]"
                      style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}
                    >
                      <Sparkles className="h-3 w-3" style={{ color: "#6366f1" }} />
                      {q}
                    </button>
                  ))}
                </div>
              </section>

              {/* Severity grid */}
              <section className="mt-5 grid grid-cols-3 gap-4">
                <Field label="Severity">
                  <SeverityBadge severity={finding.severity} variant="pill" />
                </Field>
                <Field label="Vendor Severity">
                  <SeverityBadge severity={finding.severity} variant="pill" />
                </Field>
                <Field label="NVD Severity">
                  <SeverityBadge severity={finding.severity} variant="pill" />
                </Field>
                <Field label="Vendor Score">
                  <span
                    className="inline-flex h-5 items-center rounded px-1.5 text-[11px] font-medium"
                    style={{ background: "var(--medium-bg)", color: "var(--medium)" }}
                  >
                    {finding.vendorScore ?? "—"}
                  </span>
                </Field>
                <Field label="Project">
                  <span className="text-[12px]" style={{ color: "var(--text-link)" }}>
                    {finding.projectsCount ?? 1} {finding.projectsCount === 1 ? "Project" : "Projects"}
                  </span>
                </Field>
                <Field label="Component name">
                  <span className="text-[12px]" style={{ color: "var(--text-primary)" }}>
                    {finding.componentName}
                  </span>
                </Field>
                <Field label="Version">
                  <span className="text-[12px] text-mono" style={{ color: "var(--text-primary)" }}>
                    {finding.version ?? "—"}
                  </span>
                </Field>
                <Field label="Fixed Version">
                  <span className="text-[12px] text-mono" style={{ color: "var(--text-primary)" }}>
                    {finding.fixedVersion ?? "—"}
                  </span>
                </Field>
                <Field label="Detection Method">
                  <span className="text-[12px]" style={{ color: "var(--text-primary)" }}>
                    {finding.detectionMethod}
                  </span>
                </Field>
                <Field label="Data Source">
                  <span className="text-[12px]" style={{ color: "var(--text-link)" }}>
                    {finding.dataSource ?? "—"}
                  </span>
                </Field>
                <Field label="Layer Build Command" colSpan={2}>
                  <code
                    className="block rounded border px-2 py-1 text-[11px]"
                    style={{
                      background: "var(--bg-subtle)",
                      borderColor: "var(--border)",
                      color: "var(--text-primary)",
                    }}
                  >
                    {finding.layerBuildCommand ?? "—"}
                  </code>
                </Field>
                <Field label="Is Base Image Vulnerability">
                  <span className="text-[12px]" style={{ color: "var(--text-primary)" }}>
                    {finding.isBaseImageVulnerability ? "Yes" : "No"}
                  </span>
                </Field>
                <Field label="Scan Source">
                  <span className="text-[12px]" style={{ color: "var(--text-primary)" }}>
                    {finding.scanSource ?? "—"}
                  </span>
                </Field>
                <Field label="Dependency Type">
                  <span className="text-[12px]" style={{ color: "var(--text-primary)" }}>
                    {finding.dependencyType ?? "Unknown"}
                  </span>
                </Field>
              </section>
            </div>

            {/* Right rail */}
            <div className="space-y-3">
              <Field label="Status">
                <StatusPill status={finding.status} />
              </Field>
              <Field label="Wiz First seen">
                <span className="text-[11px]" style={{ color: "var(--text-primary)" }}>
                  {finding.firstSeen}
                </span>
              </Field>
              <Field label="Last seen">
                <span className="text-[11px]" style={{ color: "var(--text-primary)" }}>
                  {finding.lastSeen}
                </span>
              </Field>
              {isJFrog && (
                <div
                  className="rounded border-l-2 p-2"
                  style={{
                    borderColor: "var(--jfrog-green)",
                    background: "var(--jfrog-green-soft)",
                  }}
                >
                  <div
                    className="flex items-center gap-1 text-[10px] font-semibold"
                    style={{ color: "var(--jfrog-green-dark)" }}
                  >
                    <JFrogLogo className="h-3 w-3" />
                    JFrog Source
                  </div>
                  <div className="mt-1 text-[10px]" style={{ color: "var(--text-secondary)" }}>
                    {finding.jfrog?.type === "INTEGRITY_DRIFT" && "JFrog AppTrust + Runtime"}
                    {finding.jfrog?.type === "MALICIOUS_PKG" && "JFrog Security Research"}
                    {finding.jfrog?.type === "NEWLY_APPLICABLE" &&
                      "JFrog Xray (contextual analysis)"}
                    {finding.jfrog?.type === "SAST" && "JFrog Xray (SAST engine)"}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div
            className="sticky top-0 z-10 flex border-b border-t bg-white px-5"
            style={{ borderColor: "var(--border)" }}
          >
            {(
              [
                { id: "overview", label: "Overview" },
                ...(isJFrog
                  ? [
                      {
                        id: "jfrog" as const,
                        label: "JFrog",
                      },
                    ]
                  : []),
                { id: "code-to-cloud" as const, label: "Code to Cloud" },
                { id: "comments" as const, label: "Comments" },
                { id: "history" as const, label: "History" },
              ] as const
            ).map((t) => {
              const active = t.id === tab;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className="relative h-9 px-3 text-[12px] font-medium transition-colors"
                  style={{
                    color: active ? "var(--wiz-blue)" : "var(--text-secondary)",
                  }}
                >
                  <span className="flex items-center gap-1">
                    {t.id === "jfrog" && (
                      <JFrogLogo className="h-3 w-3" />
                    )}
                    {t.label}
                  </span>
                  {active && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-0.5"
                      style={{ background: "var(--wiz-blue)" }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="px-5 py-4">
            {tab === "overview" && <OverviewTab finding={finding} />}
            {tab === "jfrog" && finding.jfrog && (
              <JFrogTab finding={finding} />
            )}
            {tab === "code-to-cloud" && <CodeToCloudTab finding={finding} />}
            {tab === "comments" && (
              <Empty>No comments yet.</Empty>
            )}
            {tab === "history" && <Empty>Activity history.</Empty>}
          </div>
        </div>
      </aside>
    </div>
  );
}

function Field({
  label,
  children,
  colSpan,
}: {
  label: string;
  children: React.ReactNode;
  colSpan?: number;
}) {
  return (
    <div style={{ gridColumn: colSpan ? `span ${colSpan}` : undefined }}>
      <div
        className="mb-1 text-[10px] uppercase tracking-wider"
        style={{ color: "var(--text-tertiary)" }}
      >
        {label}
      </div>
      <div>{children}</div>
    </div>
  );
}

function Pill({
  icon,
  label,
  tone,
}: {
  icon: "bug" | "check" | "shield";
  label: string;
  tone: "warning" | "success" | "danger" | "jfrog";
}) {
  const toneMap = {
    warning: { bg: "var(--medium-bg)", fg: "var(--medium)" },
    success: { bg: "var(--status-resolved-bg)", fg: "var(--status-resolved-fg)" },
    danger: { bg: "var(--critical-bg)", fg: "var(--critical)" },
    jfrog: { bg: "var(--jfrog-green-soft)", fg: "var(--jfrog-green-dark)" },
  };
  return (
    <span
      className="inline-flex h-6 items-center gap-1 rounded px-2 text-[11px] font-medium"
      style={{ background: toneMap[tone].bg, color: toneMap[tone].fg }}
    >
      {icon === "bug" && <Bug className="h-3 w-3" />}
      {icon === "check" && (
        <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 8l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      {icon === "shield" && (
        <svg viewBox="0 0 16 16" className="h-3 w-3" fill="currentColor">
          <path d="M8 1l5 2v5c0 3-2 5-5 7-3-2-5-4-5-7V3l5-2z" />
        </svg>
      )}
      {label}
    </span>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex h-32 items-center justify-center rounded border text-[12px]"
      style={{ borderColor: "var(--border)", color: "var(--text-tertiary)" }}
    >
      {children}
    </div>
  );
}

function OverviewTab({ finding }: { finding: Finding }) {
  return (
    <div className="space-y-4">
      <section>
        <h4
          className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider"
          style={{ color: "var(--text-secondary)" }}
        >
          Runtime Signals
        </h4>
        <div
          className="rounded border bg-white p-3"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-medium" style={{ color: "var(--text-primary)" }}>
                Validated in Runtime
              </span>
              <AlertCircle className="h-3 w-3" style={{ color: "var(--text-tertiary)" }} />
            </div>
            {finding.runtimeValidatedByJFrog ? (
              <Pill icon="shield" label="Validated — by JFrog" tone="jfrog" />
            ) : (
              <span className="flex items-center gap-1 text-[11px]" style={{ color: "var(--text-tertiary)" }}>
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: "var(--critical-bg)", border: "1px solid var(--critical)" }}
                />
                Not set
              </span>
            )}
          </div>
          {finding.runtimeValidatedByJFrog && (
            <div
              className="mt-2 rounded border-l-2 px-2.5 py-1.5 text-[11px]"
              style={{
                borderColor: "var(--jfrog-green)",
                background: "var(--jfrog-green-soft)",
                color: "var(--text-primary)",
              }}
            >
              JFrog Runtime confirms this vulnerable component is actually executing in production.
              True exposure narrows your CVE backlog from <strong>{finding.projectsCount}</strong> projects to <strong>{Math.max(1, Math.floor((finding.projectsCount ?? 1) * 0.4))}</strong> with confirmed runtime presence.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function CodeToCloudTab({ finding }: { finding: Finding }) {
  return (
    <div className="space-y-3">
      <h4 className="text-[12px] font-semibold" style={{ color: "var(--text-primary)" }}>
        Code to Cloud Pipeline
      </h4>
      <div
        className="flex items-center gap-2 rounded border p-3"
        style={{ borderColor: "var(--border)" }}
      >
        <Stage label="Source" />
        <Connector />
        <Stage label="Build" />
        <Connector />
        <Stage label="Registry" />
        <Connector />
        <Stage label="Deploy" current />
        <Connector />
        <Stage label="Runtime" muted />
      </div>
      {finding.jfrog && (
        <div
          className="rounded border p-3 text-[11px]"
          style={{ borderColor: "var(--border)", background: "var(--jfrog-green-soft)" }}
        >
          <div className="flex items-center gap-1 font-semibold" style={{ color: "var(--jfrog-green-dark)" }}>
            <JFrogLogo className="h-3 w-3" />
            JFrog adds source-to-runtime evidence
          </div>
          <div className="mt-1" style={{ color: "var(--text-primary)" }}>
            JFrog enriches the Code-to-Cloud chain with build-info, signed AppTrust attestations, and runtime validation — closing gaps Wiz alone can&apos;t see (such as drift between signed and running images).
          </div>
        </div>
      )}
    </div>
  );
}

function Stage({ label, current, muted }: { label: string; current?: boolean; muted?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span
        className="flex h-7 w-7 items-center justify-center rounded-full border text-[10px] font-semibold"
        style={{
          borderColor: current ? "var(--wiz-blue)" : "var(--border)",
          background: current ? "var(--wiz-blue-soft)" : muted ? "var(--bg-muted)" : "white",
          color: current
            ? "var(--wiz-blue)"
            : muted
              ? "var(--text-tertiary)"
              : "var(--text-secondary)",
        }}
      >
        {label[0]}
      </span>
      <span className="text-[10px]" style={{ color: "var(--text-secondary)" }}>{label}</span>
    </div>
  );
}
function Connector() {
  return <span className="flex-1 border-t border-dashed" style={{ borderColor: "var(--border-strong)" }} />;
}

/* ----- The JFrog tab — the core of the augmentation story ----- */
function JFrogTab({ finding }: { finding: Finding }) {
  const aug = finding.jfrog!;
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-2 rounded border p-3" style={{ borderColor: "var(--jfrog-green)", background: "var(--jfrog-green-soft)" }}>
        <JFrogLogo className="mt-0.5 h-4 w-4" />
        <div>
          <div
            className="flex items-center gap-2 text-[13px] font-semibold"
            style={{ color: "var(--jfrog-green-dark)" }}
          >
            <span>JFrog enrichment</span>
            <JFrogChip type={aug.type} variant="outline" size="sm" />
          </div>
          <div className="mt-1 text-[12px]" style={{ color: "var(--text-primary)" }}>
            {aug.summary}
          </div>
        </div>
      </div>

      {aug.type === "INTEGRITY_DRIFT" && (
        <DriftDetails finding={finding} />
      )}
      {aug.type === "MALICIOUS_PKG" && <MaliciousDetails finding={finding} />}
      {aug.type === "NEWLY_APPLICABLE" && <NewlyApplicableDetails finding={finding} />}
      {aug.type === "SAST" && <SastDetails finding={finding} />}

      <button
        className="flex h-8 items-center gap-1.5 rounded border px-3 text-[12px] font-medium"
        style={{
          borderColor: "var(--jfrog-green)",
          background: "var(--jfrog-green)",
          color: "white",
        }}
      >
        <JFrogLogo className="h-3 w-3" />
        Open in JFrog Platform
        <ExternalLink className="h-3 w-3" />
      </button>
    </div>
  );
}

function DriftDetails({ finding }: { finding: Finding }) {
  const d = finding.jfrog?.details;
  return (
    <div className="space-y-3">
      <h4 className="flex items-center gap-1.5 text-[12px] font-semibold" style={{ color: "var(--text-primary)" }}>
        <GitCompare className="h-3.5 w-3.5" style={{ color: "var(--aug-drift)" }} />
        SHA Comparison
      </h4>
      <div
        className="grid grid-cols-2 gap-3 rounded border p-3"
        style={{ borderColor: "var(--border)" }}
      >
        <div>
          <div className="text-[10px] uppercase tracking-wider" style={{ color: "var(--text-tertiary)" }}>
            Signed (AppTrust)
          </div>
          <code className="mt-1 block rounded border px-2 py-1 text-[11px]" style={{ background: "var(--status-resolved-bg)", borderColor: "var(--status-resolved-fg)", color: "var(--status-resolved-fg)" }}>
            {d?.signedSha}
          </code>
          <div className="mt-1 text-[10px]" style={{ color: "var(--text-tertiary)" }}>
            Promoted: {d?.promotedAt}
          </div>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-wider" style={{ color: "var(--text-tertiary)" }}>
            Running (cluster)
          </div>
          <code className="mt-1 block rounded border px-2 py-1 text-[11px]" style={{ background: "var(--critical-bg)", borderColor: "var(--critical)", color: "var(--critical)" }}>
            {d?.runningSha}
          </code>
          <div className="mt-1 text-[10px]" style={{ color: "var(--text-tertiary)" }}>
            Drifted: {d?.driftedAt}
          </div>
        </div>
      </div>
      <div className="rounded border p-3 text-[12px]" style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}>
        <strong>Recommended action:</strong> Roll back to the signed AppTrust digest, then investigate how the unsigned image reached the cluster (CI bypass, manual deploy, or compromised registry credentials).
      </div>
    </div>
  );
}

function MaliciousDetails({ finding }: { finding: Finding }) {
  const d = finding.jfrog?.details;
  return (
    <div className="space-y-3">
      <h4 className="flex items-center gap-1.5 text-[12px] font-semibold" style={{ color: "var(--text-primary)" }}>
        <Bug className="h-3.5 w-3.5" style={{ color: "var(--aug-malicious)" }} />
        JFrog Security Research advisory
      </h4>
      <div className="rounded border p-3 text-[12px]" style={{ borderColor: "var(--border)" }}>
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px]" style={{ color: "var(--text-link)" }}>
            {d?.jfrogAdvisoryId}
          </span>
          <a className="text-[11px]" style={{ color: "var(--text-link)" }}>
            research.jfrog.com →
          </a>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-3 text-[11px]">
          <div>
            <div className="text-[10px] uppercase tracking-wider" style={{ color: "var(--text-tertiary)" }}>
              JFrog SR detected
            </div>
            <div className="mt-1 font-medium" style={{ color: "var(--text-primary)" }}>
              {d?.jfrogDetectedAt}
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider" style={{ color: "var(--text-tertiary)" }}>
              NVD published
            </div>
            <div className="mt-1 font-medium" style={{ color: "var(--text-primary)" }}>
              {d?.nvdPublishedAt ?? "Not yet published in NVD"}
            </div>
          </div>
        </div>
        {d?.jfrogDetectedAt && d?.nvdPublishedAt && (
          <div className="mt-2.5 rounded border-l-2 px-2.5 py-1.5 text-[11px]" style={{ borderColor: "var(--jfrog-green)", background: "var(--jfrog-green-soft)", color: "var(--text-primary)" }}>
            JFrog SR identified this malicious package <strong>14 days before</strong> a public CVE was issued — that&apos;s 14 days of head-start protection.
          </div>
        )}
      </div>
    </div>
  );
}

function NewlyApplicableDetails({ finding }: { finding: Finding }) {
  const d = finding.jfrog?.details;
  return (
    <div className="space-y-3">
      <h4 className="flex items-center gap-1.5 text-[12px] font-semibold" style={{ color: "var(--text-primary)" }}>
        <Clock className="h-3.5 w-3.5" style={{ color: "var(--aug-newcve)" }} />
        Applicability timeline
      </h4>
      <div className="rounded border p-3" style={{ borderColor: "var(--border)" }}>
        <div className="grid grid-cols-2 gap-3 text-[11px]">
          <div>
            <div className="text-[10px] uppercase tracking-wider" style={{ color: "var(--text-tertiary)" }}>
              Image promoted
            </div>
            <div className="mt-1" style={{ color: "var(--text-primary)" }}>{d?.promotedAt ?? "—"}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider" style={{ color: "var(--text-tertiary)" }}>
              Became applicable
            </div>
            <div className="mt-1 font-medium" style={{ color: "var(--aug-newcve)" }}>
              {d?.cveBecameApplicableAt}
            </div>
          </div>
        </div>
        <div className="mt-2.5 rounded border-l-2 px-2.5 py-1.5 text-[11px]" style={{ borderColor: "var(--aug-newcve)", background: "var(--aug-newcve-bg)", color: "var(--text-primary)" }}>
          This CVE was previously <strong>non-applicable</strong> for this image. JFrog Xray re-evaluates applicability continuously and now flags it as exploitable in the running context. Re-prioritize.
        </div>
      </div>
    </div>
  );
}

function SastDetails({ finding }: { finding: Finding }) {
  const d = finding.jfrog?.details;
  return (
    <div className="space-y-3">
      <h4 className="flex items-center gap-1.5 text-[12px] font-semibold" style={{ color: "var(--text-primary)" }}>
        <FileCode className="h-3.5 w-3.5" style={{ color: "var(--aug-sast)" }} />
        Source code finding
      </h4>
      <div className="rounded border p-3" style={{ borderColor: "var(--border)" }}>
        <div className="flex items-center justify-between text-[11px]">
          <code style={{ color: "var(--text-link)" }}>
            {d?.sastFile}:{d?.sastLine}
          </code>
          <span style={{ color: "var(--text-tertiary)" }}>JFrog Xray (SAST)</span>
        </div>
        <pre
          className="mt-2 overflow-x-auto rounded border px-3 py-2 text-[11px]"
          style={{ background: "var(--bg-subtle)", borderColor: "var(--border)", color: "var(--text-primary)" }}
        >
          {d?.sastSnippet}
        </pre>
        <div className="mt-2 rounded border-l-2 px-2.5 py-1.5 text-[11px]" style={{ borderColor: "var(--aug-sast)", background: "var(--aug-sast-bg)", color: "var(--text-primary)" }}>
          <strong>Suggested fix:</strong> {d?.sastFix}
        </div>
      </div>
    </div>
  );
}
