"use client";

import {
  LayoutDashboard,
  AlertTriangle,
  ShieldAlert,
  Bug,
  Hourglass,
  Eye,
  Boxes,
  Cloud,
  ListTree,
  Inbox,
  Cpu,
  Box,
  Shapes,
  ScrollText,
  ShieldCheck,
  EyeOff,
  Settings2,
  BookmarkPlus,
  Code2,
  BarChart3,
  Activity,
  Settings,
  Layers,
  ChevronsLeft,
} from "lucide-react";

type NavItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

type Section = {
  label?: string;
  items: NavItem[];
};

const SECTIONS: Section[] = [
  {
    items: [
      { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="h-3.5 w-3.5" /> },
      { id: "risk-issues", label: "Risk Issues", icon: <AlertTriangle className="h-3.5 w-3.5" /> },
      { id: "posture-issues", label: "Posture Issues", icon: <ShieldAlert className="h-3.5 w-3.5" /> },
    ],
  },
  {
    label: "Discovery",
    items: [
      { id: "vuln", label: "Vulnerability Findings", icon: <Bug className="h-3.5 w-3.5" /> },
      { id: "eol", label: "End of Life Findings", icon: <Hourglass className="h-3.5 w-3.5" /> },
      { id: "threat", label: "Threat Intel Center", icon: <Eye className="h-3.5 w-3.5" /> },
      { id: "im-findings", label: "Inventory Management Findings", icon: <Boxes className="h-3.5 w-3.5" /> },
    ],
  },
  {
    label: "Inventory",
    items: [
      { id: "cloud-resources", label: "Cloud Resources", icon: <Cloud className="h-3.5 w-3.5" /> },
      { id: "service-catalog", label: "Service Catalog", icon: <ListTree className="h-3.5 w-3.5" /> },
      { id: "imported", label: "Imported Assets", icon: <Inbox className="h-3.5 w-3.5" /> },
      { id: "tech", label: "Technologies", icon: <Cpu className="h-3.5 w-3.5" /> },
      { id: "sbom", label: "SBOM", icon: <Box className="h-3.5 w-3.5" /> },
    ],
  },
  {
    label: "Policies",
    items: [
      { id: "graph", label: "Graph Controls", icon: <Shapes className="h-3.5 w-3.5" /> },
      { id: "posture-policies", label: "Posture Policies", icon: <ScrollText className="h-3.5 w-3.5" /> },
      { id: "catalog", label: "Catalog", icon: <BookmarkPlus className="h-3.5 w-3.5" /> },
      { id: "im-rules", label: "Inventory Management Rules", icon: <Layers className="h-3.5 w-3.5" /> },
    ],
  },
  {
    label: "Management",
    items: [
      { id: "reports", label: "Reports", icon: <BarChart3 className="h-3.5 w-3.5" /> },
      { id: "monitored", label: "Monitored Metrics", icon: <Activity className="h-3.5 w-3.5" /> },
      { id: "ignore", label: "Ignore Rules", icon: <EyeOff className="h-3.5 w-3.5" /> },
      { id: "automation", label: "Automation Rules", icon: <Settings2 className="h-3.5 w-3.5" /> },
      { id: "tag-rules", label: "Resource Tag Rules", icon: <ShieldCheck className="h-3.5 w-3.5" /> },
      { id: "code-policies", label: "Code & CI/CD Policies", icon: <Code2 className="h-3.5 w-3.5" /> },
    ],
  },
  {
    items: [
      { id: "settings", label: "Settings", icon: <Settings className="h-3.5 w-3.5" /> },
      { id: "lens", label: "Lens", icon: <Eye className="h-3.5 w-3.5" /> },
      { id: "platform", label: "Wiz Platform", icon: <Layers className="h-3.5 w-3.5" /> },
    ],
  },
];

export function WizSidebar({ activeId = "vuln" }: { activeId?: string }) {
  return (
    <aside
      className="flex h-screen w-[200px] shrink-0 flex-col"
      style={{ background: "var(--sidebar-bg)" }}
    >
      <div className="flex h-12 items-center justify-between px-3">
        <div className="flex flex-col">
          <span className="text-[15px] font-bold tracking-tight text-white">WIZ</span>
          <span className="text-[8px] uppercase tracking-wide text-white/50">
            for Vulnerability Mgmt
          </span>
        </div>
        <button
          aria-label="Collapse sidebar"
          className="text-white/50 hover:text-white"
        >
          <ChevronsLeft className="h-3.5 w-3.5" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 pb-3">
        {SECTIONS.map((section, i) => (
          <div key={i} className="mb-2">
            {section.label && (
              <div className="px-2 pb-1 pt-2 text-[9px] font-semibold uppercase tracking-wider text-white/40">
                {section.label}
              </div>
            )}
            <ul className="space-y-px">
              {section.items.map((item) => {
                const active = item.id === activeId;
                return (
                  <li key={item.id}>
                    <button
                      className="group flex w-full items-center gap-2 rounded px-2 py-1 text-left text-[11px] transition-colors"
                      style={{
                        color: active ? "var(--sidebar-accent)" : "var(--sidebar-text)",
                        background: active ? "var(--sidebar-bg-active)" : "transparent",
                      }}
                      onMouseEnter={(e) => {
                        if (!active) {
                          (e.currentTarget as HTMLButtonElement).style.background =
                            "var(--sidebar-bg-hover)";
                          (e.currentTarget as HTMLButtonElement).style.color =
                            "var(--sidebar-text-active)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!active) {
                          (e.currentTarget as HTMLButtonElement).style.background =
                            "transparent";
                          (e.currentTarget as HTMLButtonElement).style.color =
                            "var(--sidebar-text)";
                        }
                      }}
                    >
                      <span className="flex h-4 w-4 items-center justify-center">
                        {item.icon}
                      </span>
                      <span className="truncate">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
