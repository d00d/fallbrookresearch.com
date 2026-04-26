---
layout: post
title: "Cloud Cost Optimization in the Age of AI Workloads"
date: 2023-07-15 09:00 -0700
feature-img: 2023-07-15-cloud-cost-optimization-ai-workloads.jpg
author: R. Dubnick
tags: [Cloud, FinOps, GPU, AI-Workloads]
comments: false
published: true
---

The 2023 cloud-cost story has a new chapter. Through the previous decade, cloud cost optimization meant right-sizing virtual machines, picking the right storage tier, and using reserved-instance commitments for predictable workloads. The discipline matured into FinOps, the rough patterns settled, and most enterprises had a workable handle on the unit economics. Then a particular kind of workload — model training, model inference, vector search — moved from research to production, and the math changed. AI workloads consume different resources, generate different cost shapes, and break several of the assumptions FinOps practices had been built around.

The honest 2023 observation is that AI cost optimization is its own discipline, not a continuation of general cloud cost work, and most enterprises are learning this in real time.

### What's New About AI Workload Costs

A few things that distinguish AI workload economics from prior cloud workloads:

**GPUs are scarce in a way CPUs haven't been.** The H100 supply situation through 2023 has reshaped procurement. Customers who were used to thinking "I need a VM, the cloud has them" are discovering that GPU capacity is reserved, queued, and sometimes simply unavailable in their preferred region. NVIDIA's data-center GPU revenue numbers tell the story from one direction; the queues at every major cloud tell it from the other.

**Inference costs scale with usage in ways batch workloads don't.** A traditional analytics job runs once; an inference endpoint runs on every customer interaction. The cost surface is "every action by every user, multiplied by the price per token." Without rate limiting and quota controls, an unmanaged production endpoint can produce a five-figure monthly surprise.

**Token-based pricing is unfamiliar.** Cloud teams are used to per-second compute, per-GB storage, per-request API. Per-token pricing on language models requires a different mental model: longer prompts cost more, longer completions cost more, model choice changes the per-token price, and the cost of an interaction is hard to predict without running it.

**Training costs are substantial and lumpy.** Pre-training a model from scratch is a tens-of-millions-of-dollars exercise that few enterprises will undertake. Fine-tuning is more accessible, but the cost of a fine-tuning run is still a meaningful purchase that justifies discipline. Spot instances and preemptible jobs help; they also complicate the engineering.

**Vector storage and search has its own cost shape.** Embedding millions of documents has a one-time cost; storing the vectors has an ongoing cost; serving similarity-search queries has a per-query cost. The total ownership cost of a vector database is sometimes comparable to the LLM serving cost, and is often less visible.

### Where Money Is Actually Leaking

Patterns that produce cost surprise with depressing regularity:

**Unbounded retry loops.** A chain or agent that retries a failing model call without an exponential backoff or a hard cap can run up substantial costs in a few minutes. Adding circuit breakers and retry budgets is unglamorous and consistently valuable.

**Default model choices that aren't tuned for cost.** Teams that default to GPT-4 (or Claude) for every interaction often have a substantial fraction of traffic that would be served just as well by a smaller, cheaper model. Tiered routing — cheap model first, escalate when needed — can reduce inference cost by half or more without quality degradation.

**Embedding pipelines that re-embed unchanged content.** Embedding is cheap per document; embedding millions of documents repeatedly because the pipeline doesn't track what's already done is not. Idempotent ingestion with content hashing pays for itself quickly.

**Vector stores sized for peak.** Vector databases sized for projected load that hasn't arrived yet are a real source of overspend. Right-sizing has the same logic for vector DBs as it does for SQL databases; the difference is that 2023 vendors are still learning what right-sizing looks like for their service.

**Forgotten endpoints.** A model deployment that was useful for a project that ended six months ago, still receiving health-check traffic, still incurring instance cost. Inventory and retirement discipline matters more for AI services than for traditional ones because the unit costs are higher.

**Logging that captures full prompts and completions everywhere.** Sensible for debugging; expensive when sustained at production volume. Sampled logging and tiered retention solve this without losing observability.

### Patterns That Are Working

A few practices that distinguish well-managed AI cost programs in 2023:

**Quotas at the project and team level.** Each application gets a budget; the platform enforces it. Surprises are caught early, and the team that owns the workload has the visibility and incentive to optimize.

**Tiered model routing.** Most production traffic uses a smaller, cheaper model; harder cases escalate. The routing logic is itself a meaningful engineering surface — getting it right saves money without sacrificing quality.

**Caching layers in front of frequently asked questions.** A surprising fraction of customer-service traffic is the same questions answered the same way. Semantic caching (matching similar prompts) can deflect a substantial slice without a model call.

**Spot and preemptible instances for fine-tuning.** Training runs that can checkpoint and resume can run on cheaper, interruptible capacity. The engineering is non-trivial; the cost savings can be 60–70% on the affected workload.

**Reserved capacity for predictable inference.** Where the load is steady, capacity reservations are cheaper than on-demand. This is how cloud cost optimization has always worked; it applies to AI workloads with the same logic.

**Cost observability that surfaces per-feature unit economics.** Not just "we spent $X on AI this month" but "feature Y costs $0.03 per active user per day." Without this, optimization is guesswork.

### The GPU Question

A specific issue worth addressing: the GPU supply constraint. Several patterns have emerged through 2023:

Customers willing to commit ahead are getting better terms. AWS, Azure, and Google Cloud all have GPU reservation programs; the customers who engaged early have predictable capacity, while those who waited are queueing.

Open-weight models running on customer-controlled infrastructure are becoming a real alternative for workloads that can tolerate the operational lift. Llama 2's recent release (with permissive commercial terms) is accelerating this trend; specialized GPU-cloud providers (CoreWeave, Lambda) are competing with the hyperscalers on price and availability.

Inference-optimized hardware — NVIDIA H100, TPU v5e, AWS Inferentia2 — is becoming a meaningful cost lever for workloads at scale. The economics now justify hardware specialization in a way they didn't a year ago.

### Conclusion

Cloud cost optimization in the age of AI workloads is a real discipline that intersects with classic FinOps but has its own dynamics. The patterns that work — quotas, tiered routing, caching, reservations, observability — are recognizable extensions of cloud cost discipline, applied to a workload class with sharper unit economics and more volatile supply. For 2024 planning, the right framing is: AI workloads are not a special case to be excused from cost discipline; they're the case where cost discipline matters most because the unit costs are highest and the visibility is hardest. Treating them this way, and investing in the tooling to support it, distinguishes the programs that scale economically from the ones that have a reckoning.

### References

FinOps Foundation (2023). *FinOps for AI/ML Workloads: Working Group Report*.

NVIDIA (2023). *Data Center Quarterly Disclosures*.

CoreWeave (2023). *GPU Capacity and Pricing for AI Workloads*.

OpenAI (2023). *Pricing and Best Practices Documentation*.

a16z (2023). *The AI Cost Stack: Where Money Goes in Production AI*.
