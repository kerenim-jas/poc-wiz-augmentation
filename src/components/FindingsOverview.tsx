"use client";

import { Plus, MoreHorizontal } from "lucide-react";
import { JFrogChip, JFrogLogo } from "./JFrogChip";
import { JFrogResearchBadge } from "./JFrogResearchBadge";
import { countByAug, FINDINGS } from "@/lib/findings";

function Card({
  title,
  children,
  count,
}: {
  title: string;
  count?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex flex-1 flex-col rounded-md border bg-white"
      style={{ borderColor: "var(--border)" }}
    >
      <div
        className="flex items-center justify-between border-b px-3 py-2"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="flex items-baseline gap-2">
          <h3 className="text-[13px] font-semibold" style={{ color: "var(--text-primary)" }}>
            {title}
          </h3>
          {count && (
            <span className="text-[11px]" style={{ color: "var(--text-tertiary)" }}>
              {count}
            </span>
          )}
        </div>
        <div className="flex items-center gap-0.5" style={{ color: "var(--text-tertiary)" }}>
          <button className="flex h-5 w-5 items-center justify-center rounded hover:bg-[color:var(--surface-hover)]">
            <Plus className="h-3.5 w-3.5" />
          </button>
          <button className="flex h-5 w-5 items-center justify-center rounded hover:bg-[color:var(--surface-hover)]">
            <MoreHorizontal className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      <div className="flex-1 px-3 py-2">{children}</div>
    </div>
  );
}

function SeverityRow({
  count,
  label,
  color,
}: {
  count: string;
  label: string;
  color: string;
}) {
  return (
    <div className="flex items-baseline gap-2 py-0.5">
      <span className="severity-bar h-7" style={{ background: color }} />
      <div className="flex flex-col">
        <span className="text-[14px] font-semibold leading-none" style={{ color: "var(--text-primary)" }}>
          {count}
        </span>
        <span className="mt-0.5 text-[10px]" style={{ color: "var(--text-tertiary)" }}>
          {label}
        </span>
      </div>
    </div>
  );
}

function ComponentRow({
  icon,
  iconBg,
  iconFg,
  name,
  version,
  high,
  critical,
}: {
  icon: string;
  iconBg: string;
  iconFg: string;
  name: string;
  version: string;
  high: string;
  critical: string;
}) {
  return (
    <div className="flex items-center justify-between py-1 text-[11px]">
      <div className="flex items-center gap-2 min-w-0">
        <span
          className="flex h-4 w-4 items-center justify-center rounded text-[9px] font-bold"
          style={{ background: iconBg, color: iconFg }}
        >
          {icon}
        </span>
        <span className="truncate" style={{ color: "var(--text-primary)" }}>
          {name}
        </span>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <span className="text-[10px]" style={{ color: "var(--text-tertiary)" }}>
          {version}
        </span>
        <span className="flex items-center gap-1" style={{ color: "var(--text-secondary)" }}>
          <span>{high}</span>
          <span
            className="flex h-3.5 w-3.5 items-center justify-center rounded text-[8px] font-bold text-white"
            style={{ background: "var(--critical)" }}
          >
            C
          </span>
        </span>
        <span className="flex items-center gap-1" style={{ color: "var(--text-secondary)" }}>
          <span>{critical}</span>
          <span
            className="flex h-3.5 w-3.5 items-center justify-center rounded text-[8px] font-bold text-white"
            style={{ background: "var(--high)" }}
          >
            H
          </span>
        </span>
      </div>
    </div>
  );
}

function ResourceRow({
  name,
  high,
  critical,
}: {
  name: string;
  high: string;
  critical: string;
}) {
  return (
    <div className="flex items-center justify-between py-1 text-[11px]">
      <div className="flex items-center gap-2 min-w-0">
        <span
          className="h-3 w-3 shrink-0 rounded-sm"
          style={{ background: "#fbbf24" }}
        />
        <span className="truncate" style={{ color: "var(--text-primary)" }}>
          {name}
        </span>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <span className="flex items-center gap-1" style={{ color: "var(--text-secondary)" }}>
          <span>{critical}</span>
          <span
            className="flex h-3.5 w-3.5 items-center justify-center rounded text-[8px] font-bold text-white"
            style={{ background: "var(--critical)" }}
          >
            C
          </span>
        </span>
        <span className="flex items-center gap-1" style={{ color: "var(--text-secondary)" }}>
          <span>{high}</span>
          <span
            className="flex h-3.5 w-3.5 items-center justify-center rounded text-[8px] font-bold text-white"
            style={{ background: "var(--high)" }}
          >
            H
          </span>
        </span>
      </div>
    </div>
  );
}

export function FindingsOverview() {
  const augCounts = countByAug(FINDINGS);

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Card title="Vulnerabilities by Severity">
          <SeverityRow count="47,897" label="Critical" color="var(--critical)" />
          <SeverityRow count="834,826" label="High" color="var(--high)" />
          <SeverityRow count="4,643,677" label="Medium" color="var(--medium)" />
          <SeverityRow count="1,497,456" label="Low" color="var(--low)" />
        </Card>

        <Card title="Top Exploitable Components">
          <ComponentRow
            icon="🐘"
            iconBg="#dbeafe"
            iconFg="#1e40af"
            name="org.postgresql:postgresql"
            version="42.7.11"
            high="2K"
            critical="3K"
          />
          <ComponentRow
            icon="G"
            iconBg="#dcfce7"
            iconFg="#15803d"
            name="google.golang.org/grpc"
            version="1.79.3"
            high="1K"
            critical="230"
          />
          <ComponentRow
            icon="JS"
            iconBg="#fef3c7"
            iconFg="#a16207"
            name="minimist"
            version="1.2.6"
            high="5%"
            critical="0"
          />
          <ComponentRow
            icon="📦"
            iconBg="#fee2e2"
            iconFg="#991b1b"
            name="libc6"
            version="2.41-12+deb13u2+e5"
            high="505"
            critical="1K"
          />
          <ComponentRow
            icon="📦"
            iconBg="#fee2e2"
            iconFg="#991b1b"
            name="libc-bin"
            version="2.41-12+deb13u2+e5"
            high="488"
            critical="1K"
          />
        </Card>

        <Card title="Top Vulnerable Resources">
          <ResourceRow
            name="arn:aws:ec2:us-east-1:7629522282510:instance/i-03ef8144e7e5..."
            high="2K"
            critical="9K"
          />
          <ResourceRow
            name="arn:aws:ec2:us-east-1:7629522282510:instance/i-0d5716fee69d..."
            high="2K"
            critical="8K"
          />
          <ResourceRow
            name="artifactory-mill-do-not-delete"
            high="2K"
            critical="6K"
          />
          <ResourceRow name="alonha" high="730" critical="5K" />
          <ResourceRow name="skills_scanning" high="520" critical="7K" />
        </Card>
      </div>

      {/* New row: JFrog augmentation overview */}
      <div
        className="rounded-md border bg-white"
        style={{ borderColor: "var(--border)" }}
      >
        <div
          className="flex items-center justify-between border-b px-3 py-2"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex items-center gap-2">
            <span
              className="flex h-5 w-5 items-center justify-center rounded"
              style={{ background: "var(--jfrog-green-soft)", color: "var(--jfrog-green-dark)" }}
            >
              <JFrogLogo className="h-3.5 w-3.5" />
            </span>
            <h3 className="text-[13px] font-semibold" style={{ color: "var(--text-primary)" }}>
              Augmented by JFrog
            </h3>
            <span className="text-[11px]" style={{ color: "var(--text-tertiary)" }}>
              Findings enriched with signals only JFrog provides
            </span>
          </div>
          <div className="flex items-center gap-1" style={{ color: "var(--text-tertiary)" }}>
            <button className="flex h-5 w-5 items-center justify-center rounded hover:bg-[color:var(--surface-hover)]">
              <MoreHorizontal className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-4 divide-x" style={{ borderColor: "var(--border)" }}>
          {(
            [
              { type: "INTEGRITY_VIOLATION", title: "Integrity Violation", count: augCounts.INTEGRITY_VIOLATION, sub: "Signed SHA ≠ Running SHA", badge: false },
              { type: "MALICIOUS_PKG", title: "Malicious Packages", count: augCounts.MALICIOUS_PKG, sub: null, badge: true },
              { type: "NEWLY_APPLICABLE", title: "Newly Applicable CVEs", count: augCounts.NEWLY_APPLICABLE, sub: "Became exploitable post-deploy", badge: false },
              { type: "SAST", title: "SAST Findings", count: augCounts.SAST, sub: "Code-level analysis from Xray", badge: false },
            ] as const
          ).map((c) => (
            <div key={c.type} className="px-3 py-2.5" style={{ borderColor: "var(--border)" }}>
              <div className="flex items-baseline justify-between">
                <div className="flex items-baseline gap-2">
                  <span
                    className="text-[20px] font-semibold leading-none"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {c.count}
                  </span>
                  <span className="text-[11px]" style={{ color: "var(--text-secondary)" }}>
                    findings
                  </span>
                </div>
                <JFrogChip type={c.type} variant="icon-only" size="sm" />
              </div>
              <div
                className="mt-1 text-[12px] font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                {c.title}
              </div>
              <div className="text-[10px]" style={{ color: "var(--text-tertiary)" }}>
                {"badge" in c && c.badge ? (
                  <span className="inline-flex items-center gap-1">
                    <JFrogResearchBadge />
                    <span>· pre-NVD detection</span>
                  </span>
                ) : (
                  c.sub
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
