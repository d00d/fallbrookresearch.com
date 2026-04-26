---
layout: post
title: "Ethical AI: Auditing Black-Box Models in Regulated Industries"
date: 2023-02-15 09:00 -0700
feature-img: 2023-02-15-ethical-ai-auditing-black-box-models.jpg
author: R. Dubnick
tags: [Ethics, Audit, Regulation, Compliance]
comments: false
published: true
---

Three weeks ago, NIST published version 1.0 of its AI Risk Management Framework. Last week, the EU AI Act moved closer to its expected final form, with provisional political agreement reportedly in reach for later this year. The Bing Chat launch and its early conversational mishaps are dominating the popular AI conversation, but the policy conversation has moved past whether AI needs governance to what auditing it actually looks like in practice. For enterprises in regulated industries — financial services, healthcare, insurance, employment — the question of how to audit black-box models has stopped being a research-paper topic and become an operational one.

The honest February 2023 observation is that the gap between "we have policies" and "we can produce evidence to an auditor" is wider than most enterprises have appreciated, and frontier-model adoption is widening it faster.

### What "Black-Box" Actually Means

A useful clarification: the "black-box" framing covers a few different things that have different audit answers.

**Statistical models** that aren't directly interpretable but whose inputs, outputs, and training data are inspectable — gradient boosting, random forests, smaller neural networks. These have been the audit subject for years. Frameworks like SR 11-7 in financial services have well-developed practices.

**Deep learning models** for vision, language, and tabular tasks that are larger and less interpretable but still trained on data the enterprise controls. Auditing these is harder than auditing classical statistical models but is a known problem.

**Foundation models and LLMs** consumed via API. The enterprise has neither the model nor the training data; it has prompts, responses, and an evaluation surface. This is genuinely new territory for traditional auditing approaches.

The current regulatory frameworks were largely written with the first two categories in mind. The third is producing the most active interpretation work right now, and the early enterprise adopters are trying to apply existing audit discipline to systems whose internals are entirely outside their control.

### What Regulators Actually Want

A short tour of what's emerging from the live regulatory and supervisory conversations:

**Use-case classification.** What is the model being used for? Decisions that affect customers' access to credit, insurance, employment, healthcare, or housing draw heightened scrutiny. The use case sets the stakes; the controls follow from there.

**Inventory.** A complete, current list of models in use, with risk classification, owner, and documented controls. Sounds basic. Most enterprises do not currently have one for AI/ML systems, and the absence becomes the first audit finding.

**Documented testing.** Evidence that the model has been evaluated on representative data, including data that probes failure modes (bias by protected class, edge cases, adversarial inputs). The evaluation has to relate clearly to the actual deployed conditions, not just to clean academic benchmarks.

**Ongoing monitoring.** What's happening in production, captured in a way that detects drift, degradation, or unexpected behavior. Monitoring is increasingly an explicit audit subject, not just a good practice.

**Human oversight in practice.** Not just a written policy that a human reviews outputs, but evidence that the reviews are happening, by qualified people, with the authority to act. Auditors are getting more specific about testing this.

**Explainability proportional to use case.** A model deciding loan approvals needs to support adverse-action explanations; a model summarizing internal documents has lower explainability bars. The expected level of interpretability is becoming use-case-tied rather than blanket.

**Vendor and supply-chain considerations.** When the model is consumed from a third-party provider, what evidence does the provider produce, and how does that interact with the customer's audit obligations? Mature procurement is starting to treat this as a contracting question.

### Auditing Tools That Have Matured

The toolkit for auditing black-box models has improved meaningfully over the past few years:

**Local explanations.** Methods like LIME and SHAP produce per-prediction explanations of which features drove the model's output. They have known limitations but they meet a lot of practical audit needs.

**Counterfactual explanations.** "What would have to change about this input for the model's decision to change?" Particularly useful for adverse-action explanations in lending and similar settings.

**Bias and fairness metrics.** Demographic parity, equalized odds, calibration across groups. The mathematics has matured; the question of which metric matters most for which use case is still contested.

**Adversarial testing.** Probing the model with inputs designed to elicit failures. The discipline has emerged from security research and is making its way into model risk management.

**Behavioral testing.** Suites of test cases — analogous to unit tests in software — that probe specific behaviors of the model. Useful for tracking changes over time and detecting regressions.

For LLM-based systems specifically, a different set of evaluation approaches is emerging:

**Red-teaming.** Adversarial probing of the model with prompts designed to elicit harmful, biased, or off-policy outputs. Has become a near-default for serious LLM deployments.

**Output monitoring.** Production deployments increasingly run secondary models to evaluate the primary model's outputs for safety, off-topic content, and policy violations. The monitoring stack has its own evaluation needs.

**Prompt-side controls.** System prompts, structured output requirements, and explicit refusals reduce the surface where the model can produce problematic outputs. These are not opaque to audit — the prompts are inspectable, the outputs are loggable, the evaluation can be structured.

### Where Black-Box Audits Are Genuinely Hard

A few categories worth being honest about:

**Foundation models you didn't train.** When the model is GPT-4 (or similar) and the customer is consuming it via API, the audit subject is partly outside the customer's control. The provider has its own controls and documentation; the customer's audit has to compose with those, which is a different kind of audit than has been standard. Joint responsibility models are still being worked out.

**Behavior changes you didn't choose.** A model update from the provider can shift behavior in ways that interact with the customer's deployment. Detecting and responding to this is becoming part of model risk management; the discipline is new.

**Data lineage across systems.** What data was the model trained on, what data does it receive in production, what data is logged, what data is retained. Across foundation models, retrieval pipelines, fine-tuning, and downstream logging, the lineage gets complicated. Most enterprises do not have a clean answer yet.

**Adversarial robustness.** Models can be fooled by inputs designed to fool them. Demonstrating sufficient robustness for a specific use case is harder than running a red-team exercise once; the discipline of continuous adversarial testing is still emerging.

### Practical Recommendations for 2023

A few patterns that distinguish enterprises navigating this well:

Build the inventory first. You can't audit what you can't list. Spend the time to enumerate AI/ML systems in use across the organization, with ownership and risk classification.

Treat documentation as a byproduct of doing the work, not a separate exercise. Evaluation results, monitoring dashboards, oversight records, and incident logs that exist because the work happens, not because someone went back to write them, are the artifacts that hold up to audit.

Take NIST AI RMF as a practical starting point. It's voluntary but well-designed, and it's being used as a reference by sector-specific regulators. Aligning to it now puts enterprises ahead of the regulatory wave.

Engage with the regulatory development directly. The EU AI Act, NIST RMF, and the various sector-specific consultations all benefit from enterprise input. The companies engaging early get more reasonable rules and earlier visibility into what's coming.

Don't wait for perfect tools. The audit toolkit will continue to improve, but the regulatory clock isn't waiting. Building a defensible program with the tools available today, and improving it as better ones arrive, is the right practical posture.

### Conclusion

Ethical AI auditing in 2023 has moved from theoretical to operational. The frameworks are real, the supervisory expectations are visible, and the audit discipline is starting to crystallize. For enterprises in regulated industries, the right pattern now is to build systematically — inventory, documented evaluation, ongoing monitoring, human oversight, evidence — rather than to retrofit later under pressure. The regulatory tightening through 2023 and 2024 is going to expose the gap between programs that are audit-ready and those that have policies but no evidence. Closing that gap is the work of this year, not next.

### References

NIST (2023). *Artificial Intelligence Risk Management Framework (AI RMF 1.0)*.

Federal Reserve (2011). *SR 11-7: Guidance on Model Risk Management*.

European Commission (2023). *Proposal for a Regulation on Artificial Intelligence (AI Act)*.

Lundberg, S. & Lee, S. (2017). *A Unified Approach to Interpreting Model Predictions (SHAP)*.

Wachter, S. et al. (2017). *Counterfactual Explanations Without Opening the Black Box*.
