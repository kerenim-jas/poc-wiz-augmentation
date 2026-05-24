# Wiz × JFrog — Augmentation POC

Validation mock for **Scope 1: Augment Wiz with JFrog Data**, the JFrog → Wiz half of the Wiz integration story.

> Persona: **Security Manager / Vuln-Mgmt Lead**
> Use cases:
>
> - Integrity Violation (signed SHA ≠ running SHA)
> - Malicious Packages (pre-NVD detection by JFrog Research)
> - Newly Applicable CVEs (post-deploy re-applicability)
> - SAST (source-level findings via JFrog Xray)

This is the companion POC to [poc-release-center](https://github.com/kerenim/poc-release-center) (Scope 2: Wiz → JFrog, for Release Managers).

## Live POC

[https://kerenim-jas.github.io/poc-wiz-augmentation/](https://kerenim-jas.github.io/poc-wiz-augmentation/)

Password: `wiz-aug-2026`

## What this is — and isn't

- **Is:** A static, throwaway prototype to test the integration value with Security Managers in 30-min calls. Hardcoded fixture data; no live API calls. Wiz UI cloned visually from screenshots — for internal validation only, not external sharing.
- **Isn't:** Production code. A spec. A design system. The real shipping integration.

## Validation materials

- **Full interview script:** [`docs/sm-validation-script.md`](./docs/sm-validation-script.md)
- **Quick question list:** [`docs/sm-question-list.md`](./docs/sm-question-list.md)

## Local dev

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # static export to ./out
```

## Deploy

GitHub Actions auto-deploys to GitHub Pages on push to `main` (see `.github/workflows/deploy.yml`).
