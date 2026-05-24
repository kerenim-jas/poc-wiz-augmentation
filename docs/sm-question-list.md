# Security Manager — Quick-Reference Question List

> Condensed, scannable version of [`sm-validation-script.md`](./sm-validation-script.md). Use this in the call. The full script has the rationale and capture template.
>
> **POC:** [https://kerenim-jas.github.io/poc-wiz-augmentation/](https://kerenim-jas.github.io/poc-wiz-augmentation/)
> **Password:** `wiz-aug-2026`

---

## Phase 1 — Warm-up (5 min)

- Tell me about your role and how vuln-mgmt works on your team.
- Walk me through your typical morning.
- Which tools do you live in? Where does Wiz fit?
- How many findings do you actually act on out of what Wiz surfaces weekly?
- What's the most painful part of your current flow?

## Phase 2 — Discovery (4 min)

- What's the one piece of info you wish was on a Wiz finding but isn't?
- Have you ever discovered a vuln WAS exploitable after you deprioritized it?
- How do you decide a CVE is real-and-running vs. just-scanned?
- Have you been bitten by a malicious package that wasn't yet a CVE?
- Have you ever seen a running image that wasn't the one you expected?

## Phase 3 — First reaction (3 min, share screen, stay silent)

- What do you notice first?
- Anything different from your Wiz today?
- What's confusing?

## Phase 4 — Think-aloud (8 min)

- Pick a finding that catches your eye — what would you do?
- What does this row tell you that's useful?
- (In detail panel) Walk me through what you see.
- (In JFrog tab) What is this telling you in your own words?
- Would you trust this information? Why?

### Per use-case probes (only if not surfaced)

| Use case | Steer to | Probe |
|---|---|---|
| Integrity Violation | `IDR-2026-0091` | "Has anything like this happened in your env? How would you find out?" |
| Malicious Package | `JFSR-2026-0419` | "How do you usually find out about malicious packages today?" |
| Newly Applicable CVE | `CVE-2026-33056` | "What does 'newly applicable' mean to you here?" |
| SAST | `XRAY-SAST-1042` | "Where would you normally see something like this today?" |

## Phase 5 — Forced trade-offs (4 min)

- If you could only have ONE of the four signals, which and why?
- If TWO?
- Which would you ignore even if free?
- Inside Wiz like this, or as a separate JFrog tool you'd open?
- If the JFrog brand was hidden, would the signals feel better, worse, or same?

## Phase 6 — Workflow fit (3 min)

- Who else on your team needs to see this? First user?
- What would block you from turning this on tomorrow?
- If your CISO asked — what would you tell them about adding this?
- If you could change one thing about what you saw, what?

## Phase 7 — Close (2 min)

- Want to be in the design partner program?
- Anyone else on your team I should talk to?
- Best way to share early builds with you?

---

## Cheat sheet — plain-language definitions

**Integrity violation** — Compare image SHA running in cluster vs. SHA signed and promoted. Mismatch = something happened after release.

**Malicious package, pre-NVD** — JFrog Research flags packages as malicious in their internal feed before NVD publishes a CVE.

**Newly applicable CVE** — A CVE that wasn't applicable when scanned becomes applicable later (new exploit, new context). JFrog re-evaluates continuously.

**SAST** — Static analysis on the source code that built the image. Source-level findings attached to the same image record in Wiz.

**Validated in Runtime (bonus)** — Wiz has this field already, usually empty. JFrog runtime engine populates it: vulnerable component is actually executing in production, not just sitting on disk.
