---
layout: post
title: "Multi-Tenant LLM Platforms: Building Safe, Scalable AI in the Cloud"
date: 2023-09-15 09:00 -0700
feature-img: 2023-09-15-multi-tenant-llm-platforms.jpg
author: R. Dubnick
tags: [Cloud, LLMs, Security, Multi-Tenant]
comments: false
published: true
---

The cloud providers have spent the spring and summer of 2023 building out the multi-tenant LLM platform layer in earnest. AWS Bedrock has just gone generally available, joining Azure OpenAI Service and Google Cloud's Vertex AI offerings. Every major cloud now has a managed-foundation-model story, and the early enterprise customers are discovering that "managed LLM" is meaningfully harder than "managed database" — the failure modes, the data flows, and the security surface are all different.

The 2023 honest observation is that multi-tenant LLM platforms work, but the assumptions cloud customers bring from other managed services don't all transfer.

### What Enterprises Actually Need

A short list of the requirements that have emerged most consistently from early-adopter conversations:

**Tenant isolation that holds.** When a user from Company A asks a question, no fragment of that interaction — query, response, embedding, or cached state — should reach a user from Company B. Most enterprises will not deploy without strong contractual and technical guarantees, and the early questions about prompt-as-training-data went a long way toward shaping how providers are framing their contracts.

**Data residency.** For regulated workloads, where the inference happens — which region, which jurisdiction — is a compliance question, not a performance question. Bedrock's regional rollout, Azure's regional Azure OpenAI deployments, and Vertex AI's region pinning all reflect customer pressure on this point.

**Private connectivity.** Customers do not want their prompts traversing the public internet to reach the LLM. AWS PrivateLink, Azure Private Link, and Google's Private Service Connect have become required boxes to check.

**Logging that matches enterprise norms.** What was sent, what came back, when, by whom — captured in the customer's logging stack, retained according to the customer's policy. The casual "we'll log a sample for quality" pattern that worked for early SaaS doesn't meet enterprise compliance bars.

**Content filtering that's tunable.** Default safety filters work for the median customer; enterprise customers in finance, healthcare, and legal often need the boundary moved one way or the other for their context. The platforms are starting to expose this; the controls are uneven.

### What's Genuinely Hard About Multi-Tenancy

A few categories where multi-tenant LLMs are not like multi-tenant databases:

**The model is mostly stateless, but caches are real.** Provider-side prompt caching, KV caches, and other optimizations are tenant-aware in well-designed systems and tenant-leaking in poorly designed ones. Customers are right to ask pointed questions; providers are right to be specific about their answers.

**Abuse detection has to span tenants.** A single tenant generating prompts that probe the model for unsafe outputs needs to be detected and managed. Doing this without surveilling the legitimate traffic of the same tenant is a real engineering problem.

**Capacity is a shared scarce resource.** The GPUs that serve frontier models are not abundant in 2023, and one tenant's burst can degrade another tenant's latency. Quota and capacity-management systems have had to evolve quickly. The recent spate of OpenAI rate-limit changes reflects a provider learning these dynamics in production.

**Per-tenant fine-tuning and per-tenant retrieval.** Increasingly, the value is in the customer's data, not the base model. Multi-tenant platforms that don't support clean per-tenant fine-tuning, per-tenant embeddings, and per-tenant retrieval pipelines lose ground to ones that do.

### The Three Big Platforms in 2023

A short comparative read of where each cloud sits as of Q3:

**Azure OpenAI** has the head start by virtue of the Microsoft-OpenAI partnership. The model lineup is the most current; the integration into the broader Azure stack is mature; the contractual and compliance story is the most enterprise-ready. The trade-off is the dependency on a single model provider — for customers who want OpenAI specifically, this is the right answer; for customers who want optionality, it isn't.

**AWS Bedrock**, just GA, makes optionality the headline. Anthropic, AI21, Cohere, Meta (via Llama 2), Stability, and Amazon's own Titan models are all available behind one API surface. The rate of capability addition is rapid; the maturity of any single integration is less than Azure's. The bet is that enterprises will value model choice and a unified ops surface.

**Vertex AI** sits in the middle, with Google's own PaLM 2 family available alongside increasing third-party support. The integration into Google's data and AI tooling — BigQuery, GCS, Looker — is the differentiator. Customers heavy on Google data infrastructure will likely default to Vertex; others will compare more carefully.

The honest read is that none of these is "done" — all three are evolving fast, and the right choice for a given customer depends on their data location, their model preference, and their tolerance for being early on each platform's roadmap.

### The Architecture Customers Are Settling On

The reference architecture for serious enterprise deployments has converged on a recognizable pattern:

**A model-agnostic abstraction layer.** Most teams are not betting their applications on a single provider. An internal SDK or framework — sometimes built on LangChain or LlamaIndex, sometimes custom — abstracts the model choice so the underlying provider can change without rewriting the application.

**A retrieval layer that's customer-owned.** Embeddings and vector storage typically live in the customer's environment, not the provider's. The provider supplies the LLM; the customer supplies the data. This has emerged as a strong default for compliance and competitive reasons.

**A guardrails and content-filtering layer that's customer-tuned.** Default content safety from the provider is the floor, not the ceiling. Internal policy filters — for compliance, for tone, for domain-specific requirements — sit between the application and the model.

**An observability layer.** Every prompt, every response, every error, captured in the customer's logging stack with appropriate sensitivity controls. The "trust but verify" pattern requires verifiable logs.

**A cost and rate-limit governance layer.** Per-team and per-application quotas, with visibility into who is spending what, prevent the most common operational mode of unmanaged LLM use: a single bug or test loop generating a five-figure surprise bill.

### What's Going to Matter in 2024

A few things to track:

The continued expansion of model choice on each platform, with the question of whether any cloud achieves true multi-model parity becoming more concrete.

Stronger sovereignty stories for European customers, with EU-only deployments and clearer data-handling commitments. The EU AI Act's progress through 2024 will sharpen these requirements.

Better tooling for per-tenant fine-tuning, with the trade-offs between dedicated-deployment, LoRA-based tuning, and instruction tuning becoming clearer for production use.

Pricing evolution, with the current cost-per-token model facing pressure from customers who want predictable monthly costs, capacity reservations, and budget controls that work like the rest of their cloud spend.

### Conclusion

Multi-tenant LLM platforms in 2023 have crossed from "preview" to "production" with real enterprise adoption, but the operating model is still being negotiated between providers and customers. The teams that are getting durable value are the ones treating the platform as one ingredient — important, but not the application — and investing in the surrounding architecture: abstraction, retrieval, guardrails, observability, governance. For 2024, expect continued maturity rather than reinvention, with the differences between the three major clouds becoming clearer for specific workload types.

### References

AWS (2023). *Amazon Bedrock General Availability Announcement*.

Microsoft (2023). *Azure OpenAI Service Enterprise Documentation*.

Google Cloud (2023). *Vertex AI: Foundation Models Documentation*.

NIST (2023). *AI Risk Management Framework v1.0*.

CNCF (2023). *Cloud Native AI Working Group: Production Patterns*.
