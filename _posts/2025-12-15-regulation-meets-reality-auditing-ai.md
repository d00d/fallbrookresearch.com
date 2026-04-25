---
layout: post
title: "Regulation Meets Reality: Auditing and Certifying AI Systems at Scale"
date: 2025-12-15 09:00 -0700
feature-img: 2025-12-15-regulation-meets-reality-auditing-ai.jpg
author: R. Dubnick
tags: [Regulation, Audit, Compliance, Enterprise]
comments: false
published: true
---

The first wave of AI regulation arrived as policy. The second wave, well underway by late 2025, is arriving as audits — concrete, evidence-based reviews of whether AI systems do what their operators claim, controlled the way the regulations require, with documentation an external party can read and accept. The shift from "policy in a binder" to "auditor at the door" is changing the operating reality for enterprises across regulated and increasingly across non-regulated industries, and it's exposing which AI programs were built with audit in mind and which weren't.

The honest 2025 observation is that most enterprise AI was not designed to be audited. Closing that gap is consuming a substantial share of compliance, engineering, and leadership attention.

### What's Actually Being Audited

A short tour of the audit surfaces that have become real in 2025:

**Conformity assessments under the EU AI Act** for high-risk AI systems. These have moved from prospective to actual through the year, with notified bodies issuing certifications and enforcement preparing for 2026 application dates. The questions are concrete: technical documentation, risk management, data governance, transparency, oversight, accuracy, and cybersecurity, each with specific evidence requirements.

**ISO/IEC 42001 management-system certifications** are being granted by the major certification bodies. The standard is designed to map cleanly onto existing management systems (ISO 27001, ISO 9001), and enterprises with mature ISMS programs find the lift more manageable than those starting from scratch.

**Sector-specific AI audits** in financial services (under DORA, supervisory expectations from major regulators), healthcare (FDA frameworks for AI/ML-enabled medical devices, HIPAA-adjacent reviews of AI handling PHI), and increasingly insurance (NAIC-aligned reviews of AI in underwriting and claims).

**SOC-style attestation reports** specifically for AI systems are emerging from the major audit firms. These are not yet standardized in the way SOC 2 is, but the structure is recognizable and customers in regulated industries are starting to ask for them.

**Internal audit programs** that have built AI-specific testing into their normal cycle. This is quietly the most consequential category — internal audit reaches systems that external regulation hasn't yet, and findings feed back into governance more directly than external audit findings do.

### What Auditors Actually Want

The questions that consistently separate programs that pass audits from those that don't:

Can you show me a complete inventory of AI systems in scope, with risk classification and ownership? Most enterprises discover on first attempt that their inventory is incomplete and the ownership is fuzzy.

Can you walk me through how decisions are made by this system, with specific examples? Auditors are getting noticeably more sophisticated about asking for traceable reasoning, not just outputs.

Can you show me the evaluation results, the test conditions, the failure modes you tested against, and how those tested conditions relate to the system's actual deployed conditions? "We ran an evaluation" without rigor about what was tested and why is increasingly insufficient.

Can you show me how monitoring detects when the system's behavior changes in production, what thresholds trigger action, and what actions have actually been taken? The audit trail of operational response is now a first-class artifact.

Can you show me the data lineage, the privacy impact assessment, and the legal basis for each data flow into and out of the system? The data side of AI audit has gotten substantially more pointed.

Can you show me the human oversight in practice, not just on paper — who is reviewing what, how often, with what authority to intervene, and what evidence exists that the reviews are happening? This is where the most common gaps appear.

### Where Programs Are Failing

Patterns that produce audit findings with depressing regularity:

Documentation that exists but doesn't reflect the deployed system. The system was updated; the docs weren't. The auditor reads the docs, then asks for evidence of the controls described, then doesn't get it.

Evaluation harnesses that test the model in isolation but not the system. The model has a 95% accuracy number from when it was evaluated; the deployed pipeline has data quality issues that drop real-world accuracy substantially. Auditors are increasingly asking about deployed-system performance, not just model-card numbers.

Human oversight that's nominal. There's a reviewer assigned, but the volume is far beyond their capacity, so they sign off without reading. This is both a control failure and an integrity issue, and auditors are getting better at testing for it.

Vendor and supply-chain gaps. The AI feature in question is provided by a vendor; the vendor's controls and documentation don't meet the standard the enterprise is being held to; the enterprise can't pass the audit using only its own evidence. Mature procurement now treats these as deal-breakers rather than something to figure out later.

### What Mature Programs Are Doing

The patterns that consistently distinguish enterprises navigating the audit landscape well:

Treating the AI inventory as a continuously maintained system of record, not a periodic discovery exercise. Each system has a defined record with risk classification, owner, controls, evaluation, monitoring, and incidents.

Building documentation as a byproduct of doing the work, not as a separate exercise after the fact. Engineering, product, and governance functions produce the audit-relevant artifacts as part of the deployment process.

Running mock audits internally. Periodic exercises where a team simulates an external audit on a deployed system surface gaps before real auditors do. These have become standard practice in mature programs.

Investing in cross-functional fluency. The compliance function understands the engineering reality; the engineering function understands the regulatory expectations; both can speak to the auditor without translation. Programs where these stay siloed produce audit findings.

### Where the Regulatory Frontier Is

Through 2026, expect continued tightening on:

General-purpose AI obligations under the EU AI Act, with practice settling around what model documentation, evaluation, and incident reporting actually look like.

Sector-specific guidance from financial regulators (US OCC, EBA), healthcare authorities, and insurance commissioners that operationalizes principles into auditable expectations.

Cross-border data and model-deployment scrutiny, particularly around the use of US frontier models in EU regulated workloads.

Liability frameworks that allocate responsibility between model providers, deployers, and users in concrete fact patterns.

### Conclusion

AI audit in 2025 has become a real operational discipline, not a future risk to plan for. The enterprises navigating it well are those that built their programs anticipating audit, with documentation, evaluation, monitoring, and oversight as engineered artifacts rather than written policies. The ones who treated regulation as a future concern are now discovering that retrofitting auditability is meaningfully more expensive than building it in. For 2026 planning, the most valuable budget item for many enterprises is the unglamorous one: the audit-readiness work that turns a working AI program into one that can be defended to an external party with evidence.

### References

European Union (2024). *Regulation (EU) 2024/1689 (EU AI Act)*.

ISO/IEC (2023). *ISO/IEC 42001:2023 — Artificial Intelligence Management System*.

NIST (2024). *AI Risk Management Framework: Generative AI Profile*.

FDA (2025). *Marketing Submission Recommendations for AI/ML-Enabled Medical Device Software*.

Big Four Audit Firms (2025). *Emerging Practices in AI System Attestation*.
