import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { WizShell } from "@/components/WizShell";
import { PasswordGate } from "@/components/PasswordGate";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Wiz × JFrog — Augmentation POC",
  description:
    "Validation POC: How JFrog signals (Integrity Drift, Malicious Packages, Newly Applicable CVEs, SAST) augment Wiz Vulnerability Findings for Security Managers.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <PasswordGate>
          <WizShell>{children}</WizShell>
        </PasswordGate>
      </body>
    </html>
  );
}
