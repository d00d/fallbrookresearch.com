---
layout: post
title: "The Unbundling of the AI Stack: From Monoliths to Composable Pipelines"
date: 2024-08-15 09:00 -0700
feature-img: 2024-08-15-the-unbundling-of-the-ai-stack.jpg
author: R. Dubnick
tags: [AI-Architecture, Platforms, Strategy, Enterprise]
comments: false
published: true
---

Two years ago, the question enterprises asked about generative AI was "which end-to-end platform should we buy?" In mid-2024, that framing has quietly broken down. The most durable enterprise AI architectures are composed rather than bought: a model layer chosen per workload, a retrieval layer chosen for the data shape, an orchestration layer chosen for the workflow patterns, and evaluation and governance layers chosen for the operating context. The unbundling is uneven, but it's real — and it's forcing buyers, vendors, and internal platform teams to rethink how AI capability gets assembled.

### Why the Monolithic Story Didn't Hold

The 2022-2023 vendor pitch was clean: one platform for everything. In practice, that story ran into three forces.

**Model heterogeneity grew faster than anyone expected.** Different tasks want different models — frontier proprietary models for the hardest reasoning, smaller fast models for routing and classification, open-weight models for sensitive deployments, specialized models for code, vision, or domain-specific tasks. No single vendor has a convincing answer across all of these.

**Data gravity won.** The data an enterprise actually wants to use lives in their existing warehouses, lakes, document stores, and operational systems. The realistic path to using it isn't porting it into a new platform; it's building retrieval and integration that meets the data where it lives.

**Evaluation and governance needs outgrew what any platform bundled.** Enterprises that take AI seriously have specific, often regulatory, requirements for evaluation, observability, and governance. Bundled tooling rarely covered them fully, which pushed serious teams to adopt specialized tools in those layers even when the rest of the stack was bundled.

The net effect: the "buy one platform" frame lost credibility for serious workloads, even as bundled platforms remained useful starting points.

### The Layers That Are Unbundling Cleanly

Four layers have separated enough to describe as distinct markets with distinct winners:

**Models.** The big three frontier providers — OpenAI, Anthropic, Google — plus the open-weight ecosystem around Llama, Mistral, and others. Most serious enterprises are now multi-model, routing per workload based on capability, cost, and policy fit.

**Vector and retrieval.** Pinecone, Weaviate, Qdrant, Milvus, and the native vector capabilities in Postgres (pgvector), Elastic, and the major warehouses. The retrieval layer is its own decision, often driven by where the underlying data already lives.

**Orchestration and agents.** LangChain, LlamaIndex, and a growing cohort of purpose-built frameworks (DSPy, Haystack, CrewAI). Many serious teams are building directly on the model APIs rather than through a framework, but the framework category remains useful for prototyping and for standard patterns.

**Evaluation, observability, and guardrails.** LangSmith, Arize, Braintrust, Weights & Biases, and a broad set of safety-specific tools. This layer has grown fastest over the past year and is now where most serious tooling investments are concentrated.

### Where Bundling Still Makes Sense

It's not all unbundling. Three categories of bundling still work:

**Hyperscaler platforms** (AWS Bedrock, Azure AI Foundry, Google Vertex AI) are increasingly effective as integration points — consistent IAM, billing, networking, and compliance across a multi-model, multi-tool stack. They're less "end-to-end AI platforms" and more "AI control planes on top of cloud primitives."

**Vertical applications** (contact center AI, coding assistants, specific-domain copilots) continue to make sense as bundled products. The value isn't the model; it's the specific workflow and data integration, which is hard to compose from primitives.

**Early-stage adoption.** For enterprises that haven't yet built muscle in each layer, a bundled platform is still a reasonable starting point. The question is whether you'll outgrow it, and how.

### What This Means for Buyers

The composition approach asks more of the buying organization. Instead of one procurement decision, there are several, each with its own evaluation. The skill the enterprise has to develop is architectural: how do these pieces fit together in a way that's coherent, maintainable, and evolvable?

A few practical patterns for getting this right:

**Define the layers and who owns them.** Each layer should have a clear owner inside the enterprise — sometimes a central platform team, sometimes distributed by use case — with defined interfaces between them.

**Standardize the seams, not the internals.** Rather than dictating which model or vector store everyone uses, standardize the interfaces (how applications get model access, how evaluation results are logged, how guardrails are enforced). This allows each layer to evolve independently.

**Keep portability in view.** Lock-in at any single layer is survivable. Lock-in across all layers is where architectures get stuck. Port-testing — can we swap the model? the vector store? the orchestration framework? — is worth periodic exercise.

### What This Means for Vendors

The strategic question for vendors is sharper: compete as a best-in-class layer, or compete as a platform. Attempting both has generally gone badly. The vendors doing well in 2024 are unusually clear about which side of this they're on.

The best-in-class layer players are investing in interoperability — open standards, broad integration, portable data formats. The platform players are investing in integration depth — the value of staying inside their platform has to keep growing to justify the compromises on each layer.

Neither strategy is wrong. Customers are using both. The error is trying to straddle.

### Conclusion

The unbundling of the AI stack in 2024 is the familiar pattern of enterprise software maturation showing up in a new domain. Early abstraction collapses into focused categories, best-in-class emerges per layer, and the integration work becomes the real differentiator. Enterprises that recognize this early — and build composition skill rather than waiting for one vendor to solve everything — are shipping faster and locking in less than those still waiting for the mythical single platform.

For the next two years, expect continued specialization within each layer, further convergence on open standards at the seams, and sustained tension between the bundle-seekers and the best-of-breed teams. The winning internal architecture is the one that treats composition as a feature, not a failure.

### References

a16z (2024). *Emerging Architectures for LLM Applications*.

Menlo Ventures (2024). *The State of Generative AI in the Enterprise*.

Databricks (2024). *The Modern AI Stack*.

LangChain (2024). *Architecture Patterns for Production LLM Applications*.

Gartner (2024). *Hype Cycle for Artificial Intelligence*.
