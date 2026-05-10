import { WizSidebar } from "./WizSidebar";
import { WizTopBar } from "./WizTopBar";

export function WizShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <WizSidebar activeId="vuln" />
      <div className="flex flex-1 flex-col overflow-hidden">
        <WizTopBar />
        <main
          className="flex-1 overflow-y-auto"
          style={{ background: "var(--bg-subtle)" }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
