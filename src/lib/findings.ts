/*
 * Fixture data for the Wiz Vulnerability Findings table.
 *
 * The set is intentionally crafted to mix:
 *  - Regular Wiz CVE findings (the baseline a Security Manager sees today)
 *  - Findings augmented by JFrog signals across all 4 use cases:
 *      - INTEGRITY_DRIFT  — running image SHA differs from the signed/promoted artifact SHA
 *      - MALICIOUS_PKG    — flagged by JFrog Security Research (JFrog SR) as known-malicious
 *      - NEWLY_APPLICABLE — CVE that became applicable after the artifact was promoted
 *      - SAST             — code-level finding from JFrog Xray static analysis
 *
 * Some rows also carry a JFrog "Validated in Runtime" enrichment, which lights up
 * the existing-but-empty Wiz "Validated in Runtime" runtime signal.
 */

export type Severity = "critical" | "high" | "medium" | "low";

export type AugType = "INTEGRITY_DRIFT" | "MALICIOUS_PKG" | "NEWLY_APPLICABLE" | "SAST";

export interface JFrogAugmentation {
  type: AugType;
  /** Short label shown on the chip in the table */
  label: string;
  /** One-line summary shown in the detail panel header */
  summary: string;
  /** Optional detail blocks shown inside the JFrog tab of the detail panel */
  details?: {
    signedSha?: string;
    runningSha?: string;
    promotedAt?: string;
    driftedAt?: string;
    jfrogAdvisoryId?: string;
    jfrogDetectedAt?: string;
    nvdPublishedAt?: string;
    cveBecameApplicableAt?: string;
    sastFile?: string;
    sastLine?: number;
    sastSnippet?: string;
    sastFix?: string;
  };
}

export interface Finding {
  id: string;
  /** CVE id, MAL-id, IDR-id, SAST-id etc. */
  finding: string;
  /** Insight chips that surface in the Wiz "Insights" column */
  insights: Array<
    | "has_public_exploit"
    | "has_fix"
    | "validated_in_runtime"
    | "in_kev"
    | "no_fix"
  >;
  /** Whether the runtime-validation chip was lit by JFrog (enrichment) */
  runtimeValidatedByJFrog?: boolean;
  resource: string;
  resourceType: string;
  component: string;
  componentSubtype: string;
  status: "Unresolved" | "Resolved" | "Ignored";
  severity: Severity;
  relatedRiskIssues?: number;
  fixVersion?: string;
  detectionMethod: "Package" | "Code" | "Workload Scan";
  subscription: string;
  /** When set, this finding is enriched/created by JFrog */
  jfrog?: JFrogAugmentation;
  /** Body text for the detail panel description */
  description: string;
  vendorScore?: string;
  projectsCount?: number;
  componentName: string;
  version?: string;
  fixedVersion?: string;
  dataSource?: string;
  layerBuildCommand?: string;
  isBaseImageVulnerability?: boolean;
  scanSource?: "Workload Scan" | "Code Scan" | "Registry Scan";
  dependencyType?: "Direct" | "Transitive" | "Unknown";
  firstSeen?: string;
  lastSeen?: string;
}

export const FINDINGS: Finding[] = [
  // ----- 1. INTEGRITY DRIFT (JFrog-only signal — no native Wiz equivalent) -----
  {
    id: "IDR-2026-0091",
    finding: "IDR-2026-0091",
    insights: ["validated_in_runtime"],
    runtimeValidatedByJFrog: true,
    resource: "entplus.jfrog.io/payments-api:2.14.0",
    resourceType: "Container Image",
    component: "payments-api",
    componentSubtype: "Application Image",
    status: "Unresolved",
    severity: "critical",
    relatedRiskIssues: 3,
    fixVersion: undefined,
    detectionMethod: "Workload Scan",
    subscription: "jfrog-prod\n723466123100",
    jfrog: {
      type: "INTEGRITY_DRIFT",
      label: "Integrity drift",
      summary:
        "Running image SHA does not match the AppTrust-signed artifact promoted to production",
      details: {
        signedSha: "sha256:9f4b7c…a31e",
        runningSha: "sha256:c8e221…d770",
        promotedAt: "2026-04-12 09:12 UTC",
        driftedAt: "2026-05-08 03:41 UTC",
      },
    },
    description:
      "JFrog detected that the container image running in cluster prod-eu-west-1 does not match the cryptographically-signed AppTrust artifact that was promoted to production. The running image was built from an unverified source and bypasses the release gate. This is a high-confidence integrity violation.",
    vendorScore: "—",
    projectsCount: 1,
    componentName: "payments-api:2.14.0",
    version: "2.14.0",
    dataSource: "JFrog AppTrust",
    isBaseImageVulnerability: false,
    scanSource: "Workload Scan",
    dependencyType: "Direct",
    firstSeen: "May 8, 2026, 3:41 AM",
    lastSeen: "May 10, 2026, 4:21 PM",
  },
  {
    id: "IDR-2026-0088",
    finding: "IDR-2026-0088",
    insights: ["validated_in_runtime"],
    runtimeValidatedByJFrog: true,
    resource: "entplus.jfrog.io/checkout-svc:1.8.2",
    resourceType: "Container Image",
    component: "checkout-svc",
    componentSubtype: "Application Image",
    status: "Unresolved",
    severity: "high",
    fixVersion: undefined,
    detectionMethod: "Workload Scan",
    subscription: "jfrog-prod\n723466123100",
    jfrog: {
      type: "INTEGRITY_DRIFT",
      label: "Integrity drift",
      summary: "Running image SHA does not match the signed AppTrust artifact",
      details: {
        signedSha: "sha256:1ab6f3…7c20",
        runningSha: "sha256:88be12…44ee",
        promotedAt: "2026-03-29 14:00 UTC",
        driftedAt: "2026-05-07 11:17 UTC",
      },
    },
    description:
      "Running checkout-svc image differs from the signed artifact in AppTrust. Likely cause: image was rebuilt outside the promoted pipeline. Recommend rolling back to signed digest.",
    vendorScore: "—",
    projectsCount: 1,
    componentName: "checkout-svc:1.8.2",
    version: "1.8.2",
    dataSource: "JFrog AppTrust",
    isBaseImageVulnerability: false,
    scanSource: "Workload Scan",
    dependencyType: "Direct",
    firstSeen: "May 7, 2026, 11:17 AM",
    lastSeen: "May 10, 2026, 4:21 PM",
  },

  // ----- 2. MALICIOUS PACKAGE (JFrog SR detected before NVD) -----
  {
    id: "MAL-JFSR-2026-0419",
    finding: "JFSR-2026-0419",
    insights: ["has_public_exploit", "validated_in_runtime"],
    runtimeValidatedByJFrog: true,
    resource: "entplus.jfrog.io/library/node:18-alpine",
    resourceType: "Container Image",
    component: "event-stream",
    componentSubtype: "npm Package",
    status: "Unresolved",
    severity: "critical",
    relatedRiskIssues: 7,
    fixVersion: "3.3.7",
    detectionMethod: "Package",
    subscription: "jfrog-dev\n523735543735",
    jfrog: {
      type: "MALICIOUS_PKG",
      label: "Malicious package",
      summary:
        "JFrog SR flagged this npm package as known-malicious 14 days before NVD published a CVE",
      details: {
        jfrogAdvisoryId: "JFSR-2026-0419",
        jfrogDetectedAt: "2026-04-22 09:30 UTC",
        nvdPublishedAt: "2026-05-06 18:00 UTC",
      },
    },
    description:
      "The npm package event-stream@3.3.6 was identified by JFrog Security Research as containing a malicious post-install script that exfiltrates AWS credentials. JFrog SR flagged this 14 days before the public CVE was issued. Detected on 4 production images.",
    vendorScore: "9.8",
    projectsCount: 4,
    componentName: "event-stream",
    version: "3.3.6",
    fixedVersion: "3.3.7",
    dataSource: "research.jfrog.com",
    layerBuildCommand: "RUN npm install --production",
    isBaseImageVulnerability: false,
    scanSource: "Workload Scan",
    dependencyType: "Transitive",
    firstSeen: "Apr 22, 2026, 9:30 AM",
    lastSeen: "May 10, 2026, 4:21 PM",
  },
  {
    id: "MAL-JFSR-2026-0381",
    finding: "JFSR-2026-0381",
    insights: ["has_fix"],
    resource: "entplus.jfrog.io/library/python:3.11-slim",
    resourceType: "Container Image",
    component: "colourama",
    componentSubtype: "PyPI Package",
    status: "Unresolved",
    severity: "high",
    relatedRiskIssues: 2,
    fixVersion: "remove",
    detectionMethod: "Package",
    subscription: "jfrog-dev\n523735543735",
    jfrog: {
      type: "MALICIOUS_PKG",
      label: "Typosquat",
      summary: "Typosquat of `colorama` flagged by JFrog SR — known credential stealer",
      details: {
        jfrogAdvisoryId: "JFSR-2026-0381",
        jfrogDetectedAt: "2026-04-15 16:12 UTC",
      },
    },
    description:
      "PyPI package `colourama` is a known typosquat of `colorama` (note the British spelling). JFrog SR identified it as a credential stealer in April 2026. The package should be removed and replaced with the legitimate `colorama` package.",
    vendorScore: "9.1",
    projectsCount: 2,
    componentName: "colourama",
    version: "0.4.4",
    fixedVersion: "remove and replace with colorama",
    dataSource: "research.jfrog.com",
    isBaseImageVulnerability: false,
    scanSource: "Workload Scan",
    dependencyType: "Direct",
    firstSeen: "Apr 15, 2026, 4:12 PM",
    lastSeen: "May 10, 2026, 4:21 PM",
  },

  // ----- 3. NEWLY APPLICABLE CVE (JFrog enriches an existing Wiz CVE) -----
  {
    id: "CVE-2026-33056",
    finding: "CVE-2026-33056",
    insights: ["has_public_exploit", "has_fix", "validated_in_runtime"],
    runtimeValidatedByJFrog: true,
    resource: "entplus.jfrog.io/library/python:3.11-slim",
    resourceType: "Container Image",
    component: "tar",
    componentSubtype: "RPM OS Package",
    status: "Unresolved",
    severity: "high",
    relatedRiskIssues: 4,
    fixVersion: "1.34-7.el9_4",
    detectionMethod: "Package",
    subscription: "jfrog-dev\n523735543735",
    jfrog: {
      type: "NEWLY_APPLICABLE",
      label: "Newly applicable",
      summary:
        "Was not applicable when image was promoted on 2026-03-12. Became applicable on 2026-05-04 due to new exploit chain.",
      details: {
        cveBecameApplicableAt: "2026-05-04 08:00 UTC",
        promotedAt: "2026-03-12 11:24 UTC",
      },
    },
    description:
      "CVE-2026-33056 in tar 1.34-6.el9 was previously rated non-applicable for this image because the vulnerable code path was not reachable. JFrog Xray re-evaluated applicability after a new exploit chain was published on 2026-05-04 and now flags it as exploitable in this context.",
    vendorScore: "8.4",
    projectsCount: 12,
    componentName: "tar",
    version: "1.34-6.el9",
    fixedVersion: "1.34-7.el9_4",
    dataSource: "access.redhat.com",
    layerBuildCommand: "RUN yum install -y tar",
    isBaseImageVulnerability: true,
    scanSource: "Workload Scan",
    dependencyType: "Direct",
    firstSeen: "Mar 14, 2026, 9:00 AM",
    lastSeen: "May 10, 2026, 4:21 PM",
  },
  {
    id: "CVE-2026-5704",
    finding: "CVE-2026-5704",
    insights: ["has_fix"],
    resource: "entplus.jfrog.io/library/python:3.11-slim",
    resourceType: "Container Image",
    component: "openssl-libs",
    componentSubtype: "RPM OS Package",
    status: "Unresolved",
    severity: "medium",
    relatedRiskIssues: 1,
    fixVersion: "3.0.7-25.el9_4",
    detectionMethod: "Package",
    subscription: "jfrog-dev\n523735543735",
    jfrog: {
      type: "NEWLY_APPLICABLE",
      label: "Newly applicable",
      summary: "Became applicable 7 days ago — protocol downgrade exploit confirmed in the wild",
      details: {
        cveBecameApplicableAt: "2026-05-03 12:00 UTC",
      },
    },
    description:
      "CVE-2026-5704 in openssl-libs was previously suppressed by JFrog Xray contextual analysis. New PoC exploit code was published on 2026-05-03 demonstrating remote exploitation in this configuration. Now flagged as applicable.",
    vendorScore: "6.5",
    projectsCount: 8,
    componentName: "openssl-libs",
    version: "3.0.7-24.el9_2",
    fixedVersion: "3.0.7-25.el9_4",
    dataSource: "access.redhat.com",
    isBaseImageVulnerability: true,
    scanSource: "Workload Scan",
    dependencyType: "Direct",
    firstSeen: "Apr 1, 2026, 8:00 AM",
    lastSeen: "May 10, 2026, 4:21 PM",
  },

  // ----- 4. SAST findings (JFrog Xray code-level analysis) -----
  {
    id: "SAST-XRAY-2026-1042",
    finding: "XRAY-SAST-1042",
    insights: ["has_fix"],
    resource: "github.com/jfrog/payments-api",
    resourceType: "Source Repository",
    component: "src/handlers/auth.go",
    componentSubtype: "Source File",
    status: "Unresolved",
    severity: "high",
    relatedRiskIssues: 1,
    fixVersion: "—",
    detectionMethod: "Code",
    subscription: "jfrog-dev\n523735543735",
    jfrog: {
      type: "SAST",
      label: "SAST",
      summary: "JWT signature verification disabled — auth bypass risk",
      details: {
        sastFile: "src/handlers/auth.go",
        sastLine: 142,
        sastSnippet:
          "token, _ := jwt.Parse(rawToken, nil) // FIXME — pass key fn",
        sastFix:
          "Pass a key function to jwt.Parse() so the signature is verified. Example: jwt.Parse(rawToken, keyFunc)",
      },
    },
    description:
      "JFrog Xray static analysis found that JWT tokens are accepted without signature verification in src/handlers/auth.go:142. An attacker can forge any claim in the token. This file ships in the payments-api:2.14.0 image that is currently running in production (linked via JFrog Build Info → Workload).",
    vendorScore: "8.1",
    projectsCount: 1,
    componentName: "github.com/jfrog/payments-api",
    version: "main @ 9f4b7c…",
    dataSource: "JFrog Xray (SAST)",
    isBaseImageVulnerability: false,
    scanSource: "Code Scan",
    dependencyType: "Direct",
    firstSeen: "May 6, 2026, 10:11 AM",
    lastSeen: "May 10, 2026, 4:21 PM",
  },
  {
    id: "SAST-XRAY-2026-0987",
    finding: "XRAY-SAST-0987",
    insights: ["has_fix"],
    resource: "github.com/jfrog/checkout-svc",
    resourceType: "Source Repository",
    component: "src/db/query.go",
    componentSubtype: "Source File",
    status: "Unresolved",
    severity: "medium",
    fixVersion: "—",
    detectionMethod: "Code",
    subscription: "jfrog-dev\n523735543735",
    jfrog: {
      type: "SAST",
      label: "SAST — SQLi",
      summary: "SQL injection via string concatenation in query builder",
      details: {
        sastFile: "src/db/query.go",
        sastLine: 88,
        sastSnippet:
          'db.Exec("SELECT * FROM orders WHERE user_id = " + userID)',
        sastFix:
          "Use parameterized queries: db.Exec(\"SELECT * FROM orders WHERE user_id = ?\", userID)",
      },
    },
    description:
      "Direct concatenation of user-controlled input into a SQL statement. JFrog Xray SAST classifies this as SQLi, CWE-89.",
    vendorScore: "6.4",
    projectsCount: 1,
    componentName: "github.com/jfrog/checkout-svc",
    version: "main @ 1ab6f3…",
    dataSource: "JFrog Xray (SAST)",
    isBaseImageVulnerability: false,
    scanSource: "Code Scan",
    dependencyType: "Direct",
    firstSeen: "May 4, 2026, 2:33 PM",
    lastSeen: "May 10, 2026, 4:21 PM",
  },

  // ----- Regular Wiz findings (no JFrog augmentation — control / baseline) -----
  {
    id: "CVE-2021-4217",
    finding: "CVE-2021-4217",
    insights: ["has_public_exploit"],
    resource: "entplus.jfrog.io/library/python:3.11-slim",
    resourceType: "Container Image",
    component: "unzip",
    componentSubtype: "RPM OS Package",
    status: "Unresolved",
    severity: "low",
    relatedRiskIssues: 0,
    fixVersion: "—",
    detectionMethod: "Package",
    subscription: "jfrog-dev\n523735543735",
    description:
      "The package unzip version 6.0-59.el9 was detected in YUM/DNF package manager on a container image running RedHat 9.7, which is vulnerable to CVE-2021-4217, which exists in all current versions. The vulnerability was found in the Official RedHat Security Advisories with vendor severity: Low (NVD severity: Low). This vulnerability has a known exploit available. Source: VulnCheck. This vulnerability cannot be remediated because a fix has not been released.",
    vendorScore: "3.3",
    projectsCount: 10,
    componentName: "unzip",
    version: "6.0-59.el9",
    fixedVersion: "—",
    dataSource: "access.redhat.com",
    layerBuildCommand: "COPY /mnt/rootfs/ # buildkit",
    isBaseImageVulnerability: false,
    scanSource: "Workload Scan",
    dependencyType: "Unknown",
    firstSeen: "May 10, 2026, 4:21 PM",
    lastSeen: "May 10, 2026, 4:21 PM",
  },
  {
    id: "CVE-2025-64118",
    finding: "CVE-2025-64118",
    insights: ["has_fix"],
    resource: "entplus.jfrog.io/library/python:3.11-slim",
    resourceType: "Container Image",
    component: "is-",
    componentSubtype: "RPM OS Package",
    status: "Unresolved",
    severity: "low",
    fixVersion: "1.4.0-30.el9",
    detectionMethod: "Package",
    subscription: "jfrog-dev\n523735543735",
    description: "Standard Wiz finding without JFrog enrichment.",
    vendorScore: "3.1",
    projectsCount: 6,
    componentName: "is-",
    version: "1.3.0-25.el9",
    fixedVersion: "1.4.0-30.el9",
    dataSource: "access.redhat.com",
    isBaseImageVulnerability: false,
    scanSource: "Workload Scan",
    dependencyType: "Unknown",
    firstSeen: "Mar 1, 2026, 8:00 AM",
    lastSeen: "May 10, 2026, 4:21 PM",
  },
  {
    id: "CVE-2026-27456",
    finding: "CVE-2026-27456",
    insights: ["has_fix"],
    resource: "entplus.jfrog.io/library/python:3.11-slim",
    resourceType: "Container Image",
    component: "util-linux",
    componentSubtype: "RPM OS Package",
    status: "Unresolved",
    severity: "medium",
    fixVersion: "2.37.4-21.el9",
    detectionMethod: "Package",
    subscription: "jfrog-dev\n523735543735",
    description: "Standard Wiz finding.",
    vendorScore: "5.5",
    projectsCount: 5,
    componentName: "util-linux",
    version: "2.37.4-19.el9",
    fixedVersion: "2.37.4-21.el9",
    dataSource: "access.redhat.com",
    isBaseImageVulnerability: false,
    scanSource: "Workload Scan",
    dependencyType: "Unknown",
    firstSeen: "Apr 4, 2026, 9:00 AM",
    lastSeen: "May 10, 2026, 4:21 PM",
  },
  {
    id: "CVE-2005-2541",
    finding: "CVE-2005-2541",
    insights: ["no_fix"],
    resource: "entplus.jfrog.io/library/python:3.11-slim",
    resourceType: "Container Image",
    component: "tar",
    componentSubtype: "RPM OS Package",
    status: "Unresolved",
    severity: "medium",
    fixVersion: "—",
    detectionMethod: "Package",
    subscription: "jfrog-dev\n523735543735",
    description: "Long-standing tar finding considered low practical risk; no fix.",
    vendorScore: "6.6",
    projectsCount: 11,
    componentName: "tar",
    version: "1.34-6.el9",
    fixedVersion: "—",
    dataSource: "access.redhat.com",
    isBaseImageVulnerability: false,
    scanSource: "Workload Scan",
    dependencyType: "Unknown",
    firstSeen: "Jan 5, 2026, 10:00 AM",
    lastSeen: "May 10, 2026, 4:21 PM",
  },
  {
    id: "CVE-2023-39804",
    finding: "CVE-2023-39804",
    insights: ["has_fix"],
    resource: "entplus.jfrog.io/library/python:3.11-slim",
    resourceType: "Container Image",
    component: "tar",
    componentSubtype: "RPM OS Package",
    status: "Unresolved",
    severity: "low",
    fixVersion: "1.34-7.el9",
    detectionMethod: "Package",
    subscription: "jfrog-dev\n523735543735",
    description: "Standard Wiz finding.",
    vendorScore: "3.3",
    projectsCount: 9,
    componentName: "tar",
    version: "1.34-6.el9",
    fixedVersion: "1.34-7.el9",
    dataSource: "access.redhat.com",
    isBaseImageVulnerability: false,
    scanSource: "Workload Scan",
    dependencyType: "Unknown",
    firstSeen: "Feb 12, 2026, 11:00 AM",
    lastSeen: "May 10, 2026, 4:21 PM",
  },
  {
    id: "CVE-2022-0530",
    finding: "CVE-2022-0530",
    insights: ["no_fix"],
    resource: "entplus.jfrog.io/library/python:3.11-slim",
    resourceType: "Container Image",
    component: "unzip",
    componentSubtype: "RPM OS Package",
    status: "Unresolved",
    severity: "low",
    fixVersion: "—",
    detectionMethod: "Package",
    subscription: "jfrog-dev\n523735543735",
    description: "Standard Wiz finding.",
    vendorScore: "3.3",
    projectsCount: 7,
    componentName: "unzip",
    version: "6.0-59.el9",
    fixedVersion: "—",
    dataSource: "access.redhat.com",
    isBaseImageVulnerability: false,
    scanSource: "Workload Scan",
    dependencyType: "Unknown",
    firstSeen: "Mar 22, 2026, 8:00 AM",
    lastSeen: "May 10, 2026, 4:21 PM",
  },
  {
    id: "CVE-2026-4105",
    finding: "CVE-2026-4105",
    insights: ["has_fix"],
    resource: "entplus.jfrog.io/library/python:3.11-slim",
    resourceType: "Container Image",
    component: "systemd-libs",
    componentSubtype: "RPM OS Package",
    status: "Unresolved",
    severity: "medium",
    fixVersion: "252-37.el9_4",
    detectionMethod: "Package",
    subscription: "jfrog-dev\n523735543735",
    description: "Standard Wiz finding.",
    vendorScore: "5.4",
    projectsCount: 8,
    componentName: "systemd-libs",
    version: "252-32.el9_2",
    fixedVersion: "252-37.el9_4",
    dataSource: "access.redhat.com",
    isBaseImageVulnerability: false,
    scanSource: "Workload Scan",
    dependencyType: "Unknown",
    firstSeen: "Apr 15, 2026, 9:00 AM",
    lastSeen: "May 10, 2026, 4:21 PM",
  },
  {
    id: "CVE-2026-29111",
    finding: "CVE-2026-29111",
    insights: ["has_fix"],
    resource: "entplus.jfrog.io/library/python:3.11-slim",
    resourceType: "Container Image",
    component: "coreutils-co",
    componentSubtype: "RPM OS Package",
    status: "Unresolved",
    severity: "medium",
    fixVersion: "252-9.s7_9",
    detectionMethod: "Package",
    subscription: "jfrog-dev\n523735543735",
    description: "Standard Wiz finding.",
    vendorScore: "5.3",
    projectsCount: 5,
    componentName: "coreutils-co",
    version: "8.32-39.el9",
    fixedVersion: "8.32-41.el9",
    dataSource: "access.redhat.com",
    isBaseImageVulnerability: false,
    scanSource: "Workload Scan",
    dependencyType: "Unknown",
    firstSeen: "Apr 18, 2026, 9:00 AM",
    lastSeen: "May 10, 2026, 4:21 PM",
  },
  {
    id: "CVE-2022-0529",
    finding: "CVE-2022-0529",
    insights: ["no_fix"],
    resource: "entplus.jfrog.io/library/python:3.11-slim",
    resourceType: "Container Image",
    component: "unzip",
    componentSubtype: "RPM OS Package",
    status: "Unresolved",
    severity: "low",
    fixVersion: "—",
    detectionMethod: "Package",
    subscription: "jfrog-dev\n523735543735",
    description: "Standard Wiz finding.",
    vendorScore: "3.3",
    projectsCount: 6,
    componentName: "unzip",
    version: "6.0-59.el9",
    fixedVersion: "—",
    dataSource: "access.redhat.com",
    isBaseImageVulnerability: false,
    scanSource: "Workload Scan",
    dependencyType: "Unknown",
    firstSeen: "Mar 24, 2026, 8:00 AM",
    lastSeen: "May 10, 2026, 4:21 PM",
  },
];

export type CategoryFilter =
  | "all"
  | "INTEGRITY_DRIFT"
  | "MALICIOUS_PKG"
  | "NEWLY_APPLICABLE"
  | "SAST"
  | "JFROG_ANY";

export function filterFindings(findings: Finding[], filter: CategoryFilter): Finding[] {
  if (filter === "all") return findings;
  if (filter === "JFROG_ANY") return findings.filter((f) => Boolean(f.jfrog));
  return findings.filter((f) => f.jfrog?.type === filter);
}

export function countByAug(findings: Finding[]): Record<AugType, number> {
  const out: Record<AugType, number> = {
    INTEGRITY_DRIFT: 0,
    MALICIOUS_PKG: 0,
    NEWLY_APPLICABLE: 0,
    SAST: 0,
  };
  for (const f of findings) {
    if (f.jfrog) out[f.jfrog.type] += 1;
  }
  return out;
}

export function countBySeverity(findings: Finding[]): Record<Severity, number> {
  const out: Record<Severity, number> = { critical: 0, high: 0, medium: 0, low: 0 };
  for (const f of findings) out[f.severity] += 1;
  return out;
}

export function jfrogSignalCount(findings: Finding[]): number {
  return findings.filter((f) => Boolean(f.jfrog)).length;
}

export function findingById(id: string): Finding | undefined {
  return FINDINGS.find((f) => f.id === id);
}
