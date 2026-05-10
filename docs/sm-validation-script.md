# Security Manager Validation Script — Wiz × JFrog Augmentation POC

> Companion document to the Wiz × JFrog Augmentation POC.
> This script is the **non-leading** version we use during 1:1 calls with Security Managers (SMs / SecOps leads / Vuln-Mgmt leads) to test whether augmenting Wiz with JFrog signals creates real value for them.
>
> POC: [https://kerenim-jas.github.io/poc-wiz-augmentation/](https://kerenim-jas.github.io/poc-wiz-augmentation/)
> Password: `wiz-aug-2026`
> Time budget: **30 min** call, **5–10 min** for the participant to interact with the POC.

---

## North-Star Question

> **"If your team had access to JFrog signals (integrity drift, malicious-package intel, applicability changes, SAST findings) inside the Wiz UI they already use — would it change what they do, what they prioritize, or how fast they act?"**

Everything in this script supports answering that. If we can't answer it after 4–5 calls, the augmentation hypothesis is weak.

---

## Hypotheses Under Test

Mark each H after every call: ✅ supported · ⚠️ partial · ❌ refuted · ❓ unclear.

| #   | Hypothesis                                                                                                                                                       |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| H1  | SMs trust Wiz today as their primary triage queue and won't switch tools to gain marginal signal.                                                                |
| H2  | "Integrity drift" (signed-vs-running SHA mismatch) is recognized as a Critical signal that Wiz alone cannot produce.                                             |
| H3  | "Malicious package, pre-NVD" intel from JFrog SR is meaningfully earlier than what they get today and worth integrating.                                         |
| H4  | "Newly applicable CVE" (post-deploy applicability change) is a real pain — they currently miss these or learn about them too late.                               |
| H5  | SAST findings inside the Wiz triage queue are wanted (vs. the current pattern of SAST living in a separate dev tool).                                            |
| H6  | The "Validated in Runtime" enrichment (lighting up Wiz's existing-but-empty signal) is the most viscerally valuable item — narrows their backlog.                |
| H7  | SMs would approve adding JFrog as a data source IF integration is read-only and visible signal is clearly attributed ("Augmented by JFrog" labeling is correct). |
| H8  | The 4 use cases are valued in this order of importance: drift > malicious > newly-applicable > SAST. (Falsify if order differs.)                                 |
| H9  | A new "JFrog" tab inside the finding detail is the right pattern (vs. inline chips, vs. an external link).                                                       |
| H10 | At least one SM would advocate internally for turning this on if it shipped (intent to adopt).                                                                    |

---

## Anti-Patterns (Don't Do)

- **Don't pitch.** No "this is the magic" or "we think this is awesome." Let them react.
- **Don't define jargon for them.** If they don't know what "integrity drift" means, that's a finding — write it down.
- **Don't lead with all 4 use cases.** Show the screen, see what they notice first.
- **Don't fix the POC mid-call.** Note any confusion as a finding.
- **Don't show the JFrog logo in your slide deck before the call.** Surprise = unbiased reaction.

---

## Phase 1 — Warm-up & Context (5 min)

### Goals

- Confirm the participant matches the persona.
- Understand their current workflow with Wiz.
- Establish a baseline before showing anything.

### Questions (open-ended)

1. "Tell me about your role and how vulnerability management works on your team."
2. "Walk me through your typical morning. What's the first thing you do?"
3. "Which tools do you live in for vuln triage? Where does Wiz fit?"
4. "On a typical week, how many findings do you actually act on out of the volume Wiz surfaces?"
5. "What's the **most painful** part of your current flow? What costs you the most time?"

> 📝 **Capture:** Tools they use besides Wiz · How they prioritize · Whether they have a runtime / build / source signal today and from where · Pain words (verbatim).

---

## Phase 2 — Discovery (4 min)

### Goals

- Understand what data signals they wish they had.
- See if any of the 4 use cases come up unprompted.

### Questions

1. "When you look at a Wiz finding today, what's the **one piece of information** you wish was there but isn't?"
2. "Have you ever discovered that a vulnerability **was** exploitable in production after you'd already deprioritized it? What happened?"
3. "How do you decide whether a CVE is real-and-running vs. just-scanned-and-present?"
4. "Have you been bitten by a malicious package — the kind that's not yet a CVE? How did you find out?"
5. "Is there ever a case where the image running in production isn't the one you expected? How would you know?"

> 📝 **Capture:** Which of the 4 use cases (drift / malicious / newly-applicable / SAST) the participant brings up **without prompting**. That's the strongest signal.

---

## Phase 3 — First Reaction to the POC (3 min)

### Setup

> "I want to show you a mock of a Wiz screen with some additional signals. I'll share my screen — please tell me what you see, what stands out, and anything that confuses you. **There are no wrong answers. Notice that this is a mock — I'm only checking the concept, not the design.**"

### Then share screen showing the **Vulnerability Findings** page (overview cards + table) and stay silent for ~30 seconds.

### Questions

1. "What do you notice first?"
2. "Anything new or different from what you see in Wiz today?"
3. "What's confusing or unclear?"

> 📝 **Capture:** Did they notice the green "Augmented by JFrog" row? The new chips in the Insights column? The new filter chips? **Order of attention matters.**

---

## Phase 4 — Think-Aloud Walkthrough (8 min)

### Setup

> "Imagine this is your queue this morning. Pick a finding that catches your eye and tell me out loud what you'd do."

### After they pick one, ask:

1. "What does this row tell you that's useful?"
2. "What would your next step be?"
3. (When they open a finding) "Walk me through what you see in this panel."
4. (If they reach the JFrog tab) "What is this telling you? In your own words."
5. "Is this information you'd trust? Why / why not?"

### Probe specifically per use case (only if they don't surface it themselves):

#### Integrity Drift

> "I'm going to show you a different finding type. Tell me what you understand from it."
> Steer to `IDR-2026-0091`. Then: _"In your environment, has anything like this ever happened? How did you find out?"_

#### Malicious Package

> Steer to `JFSR-2026-0419`. Then: _"What's the most useful piece of information on this panel for you?"_
> _"How do you usually find out about malicious packages today?"_

#### Newly Applicable CVE

> Steer to `CVE-2026-33056` and click into it. _"What does 'newly applicable' mean to you here?"_
> _"Would this change how you triage this CVE today?"_

#### SAST

> Steer to `XRAY-SAST-1042`. _"What do you think about getting this kind of finding in your Wiz queue?"_
> _"Where would you normally see something like this today?"_

> 📝 **Capture:** Which use case generates the strongest emotional response (good or bad). Watch for "huh", "interesting", or "I don't get this."

---

## Phase 5 — Forced Trade-Offs (4 min)

### Goals

- Force ranking. Without trade-offs we'll get "all 4 are great."

### Questions

1. "If you could only have **one** of these four signals integrated into Wiz, which one and why?"
2. "If you could only have **two**, which two?"
3. "Which of the four would you not pay attention to even if it was free?"
4. "Where would you rather see JFrog data — inside Wiz like this, or as a separate tool you'd open when needed?"
5. "Imagine the JFrog signals weren't labeled with the JFrog brand and just appeared as Wiz signals. Better, worse, or doesn't matter?"

> 📝 **Capture:** Ranking. Whether brand attribution helps trust or feels like noise.

---

## Phase 6 — Workflow Fit & Adoption (3 min)

### Questions

1. "Who else on your team needs to see this? Who would be the first user?"
2. "What would block you from turning this on tomorrow if it was available?"
3. "If your CISO asked tomorrow whether to add JFrog as a Wiz data source — based on what you've seen — what would you tell them?"
4. "If you could change one thing about what I just showed you, what would it be?"

> 📝 **Capture:** Approval-pattern signals (procurement, security review, integration owner). Adoption blockers. Improvement ideas.

---

## Phase 7 — Close (2 min)

1. "If this shipped, would you want to be in the design partner program?"
2. "Anyone on your team I should talk to next?"
3. "What's the best way to share early builds with you for feedback?"

> 📝 **Capture:** Design-partner intent · referrals · feedback channel.

---

## Cheat Sheet — Use-Case Scripts (verbatim, don't memorize)

When you need to explain a use case in plain language without leading them:

> **Integrity drift:** "JFrog can compare the image SHA running in your cluster against the SHA that was signed and promoted to production. If they don't match, something happened after release."

> **Malicious package, pre-NVD:** "JFrog has a security research team that flags packages as malicious in their internal feed before NVD publishes a CVE. We can surface that as a signal in Wiz."

> **Newly applicable CVE:** "Sometimes a CVE that wasn't applicable when you scanned becomes applicable later — new exploit chain, new context. JFrog re-evaluates continuously and we'd update the Wiz finding."

> **SAST:** "JFrog runs static analysis on the source code that built the image. We can attach those source-level findings to the same image record in Wiz."

> **Validated in Runtime (bonus):** "Wiz already has a 'Validated in Runtime' field but it's usually empty. JFrog's runtime engine can populate it — confirming the vulnerable component is actually executing in production, not just sitting unused on disk."

---

## Post-Call Capture Template

```
Participant: ____ (role, company size, tools-stack)
Date: ____

Hypotheses outcome:
H1 [ ✅ ⚠️ ❌ ❓ ] notes:
H2 [ ✅ ⚠️ ❌ ❓ ] notes:
H3 [ ✅ ⚠️ ❌ ❓ ] notes:
H4 [ ✅ ⚠️ ❌ ❓ ] notes:
H5 [ ✅ ⚠️ ❌ ❓ ] notes:
H6 [ ✅ ⚠️ ❌ ❓ ] notes:
H7 [ ✅ ⚠️ ❌ ❓ ] notes:
H8 [ ✅ ⚠️ ❌ ❓ ] notes:
H9 [ ✅ ⚠️ ❌ ❓ ] notes:
H10 [ ✅ ⚠️ ❌ ❓ ] notes:

Top-1 use case for them: ____________
Top-2 use case for them: ____________
Use case they'd skip: ______________

Most painful current workflow gap (verbatim quote):
> "________________________________________"

What changed their mind during the call:
____________________________

What did they not understand (UX / language gap):
____________________________

Adoption intent: [ Active interest · Curious · Lukewarm · No ]
Design-partner intent: [ Yes · Maybe · No ]
Referrals offered: ____________
```

---

## Quick-Reference: What to Reach For in the POC

- **Top of page:** Severity bars (Wiz native) + the green **"Augmented by JFrog"** card row (NEW)
- **Filter chips below header:** Look for the second row labeled "JFrog signals" with 4 colored chips
- **Findings table:** Rows with a green frog mark are JFrog-augmented; the **Insights** column shows colored chips per use case type
- **Detail panel (click any row):** Look for the new **JFrog tab** between Overview and Code-to-Cloud (only on augmented findings)
- **Inside the JFrog tab:** Drift shows SHA comparison · Malicious shows JFrog SR advisory + days-before-NVD · Newly-applicable shows applicability timeline · SAST shows file:line + suggested fix
