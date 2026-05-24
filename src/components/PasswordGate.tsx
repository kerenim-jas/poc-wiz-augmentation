"use client";

import { useEffect, useState } from "react";
import { Lock } from "lucide-react";
import { POC_VERSION } from "@/lib/version";

/**
 * Lightweight client-side password gate for the static-hosted POC.
 *
 * Security model:
 * - This is intended to deter casual / search-engine traffic while we're
 *   running validation calls. It is NOT a substitute for proper auth.
 * - The password hash is shipped to the browser; an attacker with the
 *   compiled JS could brute-force a weak password. Use a strong password.
 * - On success the result is cached in sessionStorage so reload doesn't
 *   re-prompt within the tab session.
 *
 * Default password: wiz-aug-2026
 * SHA-256:           389a21b56243a8010a3e3369ce1bba22fa440f1c8bd363f0d2fd20c5b13bb248
 *
 * To change the password:
 *   echo -n "your-new-password" | shasum -a 256
 * Replace PASSWORD_HASH below with the result.
 */

const PASSWORD_HASH =
  "389a21b56243a8010a3e3369ce1bba22fa440f1c8bd363f0d2fd20c5b13bb248";
const STORAGE_KEY = "poc-wiz-augmentation-auth";

async function sha256(input: string): Promise<string> {
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(input)
  );
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function PasswordGate({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let storedAuthed = false;
    try {
      storedAuthed = sessionStorage.getItem(STORAGE_KEY) === "ok";
    } catch {}
    queueMicrotask(() => {
      if (storedAuthed) setAuthed(true);
      setHydrated(true);
    });
  }, []);

  if (!hydrated) {
    return null;
  }

  if (authed) {
    return <>{children}</>;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const hash = await sha256(pwd);
      if (hash === PASSWORD_HASH) {
        sessionStorage.setItem(STORAGE_KEY, "ok");
        setAuthed(true);
      } else {
        setError("Incorrect password. Please try again.");
        setPwd("");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      className="flex h-screen w-full items-center justify-center px-4"
      style={{ background: "var(--bg-subtle)" }}
    >
      <div
        className="w-full max-w-[400px] rounded-lg border bg-white p-6 shadow-sm"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="mb-4 flex items-center justify-center">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-full"
            style={{ background: "var(--wiz-blue-soft)", color: "var(--wiz-blue)" }}
          >
            <Lock className="h-5 w-5" />
          </div>
        </div>

        <h1
          className="text-center text-[18px] font-semibold"
          style={{ color: "var(--text-primary)" }}
        >
          Wiz × JFrog Augmentation — POC
        </h1>
        <p
          className="mt-1 text-center text-[13px]"
          style={{ color: "var(--text-secondary)" }}
        >
          Validation preview. Please enter the access password shared with you.
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-3">
          <input
            type="password"
            autoFocus
            placeholder="Access password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            disabled={busy}
            aria-label="Access password"
            className="h-10 w-full rounded-md border bg-white px-3 text-[14px] outline-none focus:ring-2"
            style={{
              borderColor: "var(--border-strong)",
              color: "var(--text-primary)",
            }}
          />

          {error && (
            <p className="text-[12px]" style={{ color: "var(--critical)" }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={busy || !pwd}
            className="h-10 w-full rounded-md text-[14px] font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            style={{ background: "var(--wiz-blue)" }}
          >
            {busy ? "Checking…" : "View POC"}
          </button>
        </form>

        <p
          className="mt-4 text-center text-[11px]"
          style={{ color: "var(--text-tertiary)" }}
        >
          Wiz × JFrog · Security Manager validation POC · {POC_VERSION}
        </p>
      </div>
    </div>
  );
}
