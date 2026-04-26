---
layout: post
title: "AI Explainability in Practice: From Research to Real-World Compliance"
date: 2022-11-15 09:00 -0700
feature-img: 2022-11-15-ai-explainability-research-to-real-world-compliance.jpg
author: R. Dubnick
tags: [Explainability, Compliance, Regulation, Audit]
comments: false
published: true
---

The EU AI Act is in trilogue, with the Council and Parliament now within reach of compromise on the most contentious provisions. NIST's AI Risk Management Framework is on track for a 1.0 release in early 2023; the second draft has been out since August. The UK has published its AI Regulation white paper. The CFPB issued an advisory opinion on adverse-action notices for AI-driven credit decisions in May. The FTC has signaled its enforcement posture clearly. The cumulative direction is unmistakable: explainability is moving from a research-paper concern to a compliance obligation, and the operational discipline around it has to catch up faster than it has been.

The honest November 2022 observation is that the gap between "we use SHAP in our notebooks" and "we have an explainability program that survives regulatory scrutiny" is wider than most enterprises have appreciated, and the timeline to close it is tightening.

### Why Explainability Is on the Regulatory Agenda Now

A short tour of the legal and regulatory threads converging on this:

**The EU AI Act, in trilogue.** The risk-classification framework, the high-risk system requirements, and the conformity assessment obligations are the substance. Explainability appears explicitly in several places: documentation requirements, transparency to affected persons, oversight by the deploying entity. The trilogue is converging; the published version is expected in 2023, with phased application after that.

**NIST AI RMF 1.0.** Voluntary in the US but increasingly referenced by sector-specific regulators. The trustworthiness characteristics — including "explainable and interpretable" — are well-articulated. Aligning to it now positions an organization for the regulatory wave.

**Sector-specific regulation in financial services.** SR 11-7 has been the gold standard for model risk management since 2011 and continues to be the operational reference for banks. The OCC, FDIC, and Federal Reserve are increasingly explicit that AI models are subject to it. Adverse-action explanations under ECOA and FCRA apply to AI-driven credit decisions in ways the CFPB has now made explicit.

**Healthcare and the FDA's evolving AI/ML SaMD framework.** The FDA published its proposed regulatory framework for AI/ML-based Software as a Medical Device in 2021 and continues to refine it. Predetermined Change Control Plans, real-world performance monitoring, and explainability for clinical deployments are part of the picture.

**Employment law.** New York City's Local Law 144 on automated employment decision tools (effective January 2023) requires bias audits and disclosure for AI-driven hiring tools. State and local activity is multiplying.

### What "Explainability" Actually Means in Practice

A useful clarification: explainability is not one thing.

**Global model explainability.** What features matter to the model overall, in what relationships, with what interactions. Useful for understanding what the model has learned and whether it aligns with domain expertise.

**Local explainability.** Why this specific decision. Useful for adverse-action explanations, for individual case review, and for handling specific complaints.

**Counterfactual explanations.** What would have to change for the decision to flip. Particularly useful for adverse-action notices ("you were denied because; if X had been Y, you would have been approved").

**Behavioral explainability.** What the model does in specific scenarios, including edge cases and adversarial inputs. Useful for risk assessment and for testing.

The regulatory expectations vary by use case. A loan decision needs adverse-action explanation. A high-risk system under the EU AI Act needs documented evaluation, oversight by the deployer, and transparency to affected persons. A healthcare diagnostic needs clinical interpretability and post-market monitoring. The right tooling depends on the regulatory frame.

### The Tooling Landscape

A short tour of what's mature enough to use in 2022:

**SHAP (Shapley Additive Explanations).** The most widely used local explanation method. Mathematically grounded, well-tooled, and broadly accepted. Has known limitations — computational cost on large models, possible misinterpretation when features are correlated — but meets a lot of practical needs.

**LIME (Local Interpretable Model-Agnostic Explanations).** Older than SHAP, simpler conceptually, less rigorous mathematically. Still useful for specific cases.

**Counterfactual explanation libraries.** DiCE (Microsoft Research), Alibi (Seldon), and others. Generate counterfactual examples for individual predictions. Useful in lending and other adverse-action contexts.

**Model cards and datasheets.** Frameworks for documenting models — purpose, training data, performance characteristics, limitations, ethical considerations. Originated in research; increasingly adopted as a standard documentation form.

**Specialized vendor tools.** Fiddler, Arthur, TruEra, H2O.ai's explainability features. Bring explainability into the operational platform alongside monitoring and governance. Useful for organizations that want one place to look.

**Surrogate models.** Train an interpretable model (decision tree, linear model) to approximate a complex model's behavior. Sometimes useful, with care — the surrogate explains the surrogate, not the original model, and the gap matters.

### Where Explainability Lives in the Model Lifecycle

A few specific places where it has to be designed in:

**Pre-deployment evaluation.** Documented evaluation of model behavior on representative data, including adversarial and edge cases. Bias evaluation across protected groups. The evidence has to relate to actual deployment conditions, not just academic benchmarks.

**Documentation.** Model cards, decision logic descriptions, training data summaries, limitations and known failure modes. The documentation has to be specific enough to support audit; "the model uses gradient boosting" is not sufficient.

**Decision-time explanations.** For each prediction in production, what explanation can be produced if asked. For real-time systems, this often means computing explanations alongside predictions; for batch systems, it can be on-demand.

**Monitoring.** Drift detection, performance tracking, fairness metrics over time. Connected to the explanation surface so that emerging problems can be diagnosed.

**Adverse decision review.** A workflow for affected persons to receive explanations, contest decisions, and have human review. The workflow has to be evidenced, not just documented as a policy.

**Incident response.** When the model produces a wrong answer with consequences, what's the postmortem look like. The lineage from data to feature to model to decision has to be traceable enough to reconstruct what happened.

### The Deep Learning Challenge Specifically

A few categories where explainability is harder for deep models than for classical ML:

**Image and unstructured data.** Saliency maps, attention visualization, and integrated gradients give some insight into what the model is attending to, but the explanations are less crisp than feature-importance for tabular data.

**Sequential and language models.** Attention heads, integrated gradients, and probing techniques exist; the interpretation is contested. The output is often suggestive rather than definitive.

**Compositionally complex tasks.** A model whose output is the result of many internal computations is harder to explain than one whose output depends linearly on a few features. The depth-of-explanation gap is real.

**Foundation model derivatives.** When the production system uses an embedding from a foundation model and a downstream classifier on top, the explanation surface has to span both. The current tooling handles the downstream classifier well; the foundation model contribution is more opaque.

The honest read: classical ML and tabular deep learning have reasonable explainability tooling that meets most regulatory needs. Image, language, and complex deep models have less mature tooling, and the regulatory expectations on them are still being negotiated.

### Documentation and Audit Evidence

The discipline that distinguishes audit-ready from not:

**Model inventory.** A complete, current list of models in use, with use case, risk classification, owner, and documentation status. Most enterprises don't have one and the absence is often the first audit finding.

**Reproducible training.** A specific model version can be retrained from the recorded data, code, and configuration. Without this, claims about the model are unfalsifiable.

**Decision logs.** A record, retained appropriately, of what the model decided in production. The retention period and access controls have to match the regulatory expectations.

**Approval evidence.** What was reviewed, by whom, on what evidence, with what disposition. Sign-offs that exist as a matter of course because of the workflow, not as a checkbox added late.

**Performance evidence over time.** The model has been performing as documented, with monitoring evidence to support that claim. Periodic recertification with documented evaluation.

### Practical Recommendations for 2022

A few patterns the more mature programs have converged on:

Build the inventory first. The work that follows depends on knowing what's actually deployed.

Map regulatory obligations to model use cases. A high-risk lending model and a low-risk internal classification model don't need the same explainability program. Right-sizing the discipline matters.

Treat documentation as a byproduct of doing the work. Model cards, evaluation reports, and approval records that exist because the workflow produces them outperform documentation written after the fact for an audit.

Engage with the regulatory development directly. NIST AI RMF, the EU AI Act, and sector-specific consultations all benefit from enterprise input. The companies engaging early get more reasonable rules and earlier visibility.

Don't wait for perfect tools. SHAP, LIME, model cards, and documented evaluation are sufficient to build a defensible program now. Better tools will arrive; the regulatory clock isn't waiting.

### Conclusion

AI explainability in 2022 has crossed from research topic to compliance discipline. For enterprises in regulated industries, the operational expectation through 2023 and 2024 is going to be evidence-based programs, not just policies. Building systematically — inventory, evaluation, documentation, monitoring, decision-time explanations, audit trail — pays off; retrofitting under regulatory pressure does not. The framework conversation is converging; the operational work is what differentiates organizations that are ready from those that have written policies and called it done.

### References

NIST (2022). *AI Risk Management Framework, Second Draft*.

European Commission (2021). *Proposal for a Regulation on Artificial Intelligence*.

Federal Reserve (2011). *SR 11-7: Guidance on Model Risk Management*.

Lundberg, S. & Lee, S. (2017). *A Unified Approach to Interpreting Model Predictions (SHAP)*.

Mitchell, M. et al. (2019). *Model Cards for Model Reporting*.
