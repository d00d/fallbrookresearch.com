---
layout: post
title: "The Cost of Intelligence: How Quantization and Distillation Are Reshaping Inference"
date: 2024-05-15 09:00 -0700
feature-img: 2024-05-15-the-cost-of-intelligence.jpg
author: R. Dubnick
tags: [LLMs, Inference, Quantization, Distillation]
comments: false
published: true
---

For two years, the prevailing assumption in enterprise AI was that capability and cost moved together — better answers required bigger models, and bigger models cost more to run. That assumption is breaking down. Through 2024, two long-developing techniques — quantization and distillation — have matured to the point where running a meaningfully smaller, cheaper model with most of the capability of a much larger one is no longer a research promise. It's a production pattern, with measurable cost reductions and increasingly modest quality compromises.

The implications go well past hobbyist deployments. The cost curve of inference is bending faster than most enterprise budget cycles assumed, and that's reshaping what's economical to build.

### What Quantization Actually Does

Quantization reduces the precision of the numbers that represent the model's weights — and often its activations — from 16-bit floating point down to 8-bit integers, 4-bit integers, or even lower in some experiments. The model takes less memory, runs faster, and often costs a fraction to serve. Some quality is lost; the open question is how much, and whether it matters for the workload.

The 2024 state of the art is more reassuring than it looked in 2023. Mature quantization methods — AWQ, GPTQ, GGUF, and increasingly bitsandbytes' 4-bit modes — produce 4-bit and 8-bit versions of major open models with quality losses that are often within the noise on standard benchmarks. For smaller models (1B-13B), 4-bit quantization is essentially free quality-wise on most enterprise tasks. For larger models, the picture is workload-dependent — code generation and long-context reasoning are more sensitive than classification or extraction.

The operational implications are concrete. A 70B model that required 140GB of GPU memory in FP16 fits in 35GB at 4-bit. That changes which hardware can serve it, what batch sizes are achievable, and what the cost-per-token looks like.

### What Distillation Actually Does

Distillation trains a smaller "student" model to imitate a larger "teacher" model's behavior on a specific data distribution. Done well, the student captures most of the teacher's capability for the workloads it was trained on, while being orders of magnitude cheaper to run.

The 2024 distillation story has two parts. First, vendor-distilled small models (Mistral 7B, Phi-3, Llama 3 8B, Gemma) have gotten good enough to handle a substantial range of enterprise tasks out of the box. Second, in-house distillation — fine-tuning a small model on outputs from a larger one for a specific workload — has become a routine practice for teams operating at scale. The cost savings on a high-volume inference workload often pay for the distillation effort within weeks.

Together, these mean the fast, small model isn't a fallback anymore. For many production workloads, it's the right model.

### Where the Cost Curve Has Already Bent

A few specific cost shifts that show up clearly in 2024:

**Embedding generation.** Open embedding models running on commodity GPUs, often quantized, cost a small fraction of equivalent paid-API embeddings. For any non-trivial corpus, the math has flipped decisively.

**Classification, routing, extraction.** Tasks that 18 months ago needed frontier APIs are now routinely handled by 7B-class models, often quantized, often fine-tuned. Cost-per-call differences of 20-50x are common.

**High-volume customer-facing inference.** Where the workload is reasonably bounded, a quantized open model on dedicated infrastructure beats per-token API pricing meaningfully, especially at scale.

**Speculative decoding and prefix caching.** Beyond raw quantization, inference techniques like speculative decoding (using a small model to draft tokens that the large model verifies in parallel) and prefix caching (reusing prefill computations across similar requests) deliver further cost and latency wins on top of whatever quantization the model has already had.

### Where the Cost Curve Hasn't (Yet)

Some workloads remain expensive, and being honest about why is important.

**Frontier reasoning.** The hardest reasoning, longest-context, multi-modal, agentic-loop workloads still benefit substantially from frontier model quality. Quantizing or distilling these tasks tends to produce noticeable degradation.

**Workloads with long-tail edge cases.** Smaller and quantized models often handle the common cases well while failing on edge cases the larger model handles cleanly. For workloads where edge cases are expensive (legal review, medical decisions), the cost calculation has to include the cost of the misses, not just the cost per call.

**Tasks where the evaluation surface is broad.** A small model fine-tuned for extraction will excel at extraction and underperform at general conversation. The deployment cost includes the matrix of "which model handles which workload," which has its own complexity and overhead.

### How Mature Teams Are Thinking About It

The 2024 enterprise pattern is less "pick the cheapest model that works" and more "build a portfolio."

A typical structure: a frontier model handles the small fraction of requests where capability is the bottleneck (often agentic planning, complex reasoning, customer-visible critical paths). A mid-size open model handles the bulk of internal and well-bounded workloads. A small fine-tuned model — usually quantized — handles the high-volume, low-complexity tail (classification, routing, simple extraction).

A routing layer decides which model handles which request, often using a small classifier or simple heuristic. Evaluation harnesses run continuously to make sure the routing decisions hold up as workloads evolve.

This is more architectural complexity than calling a single API, but the cost differences at scale make the investment pay back quickly.

### What This Changes Strategically

Two implications worth being explicit about:

The economics of new use cases shift. A feature that was uneconomical at frontier-API rates may be very economical with the right small-model deployment. The threshold for trying things has dropped substantially.

The competitive moat of "we have access to the best model" has eroded. The differentiator increasingly is data, evaluation, integration, and operational maturity — not which API key you have. Enterprises betting their AI strategy on access to the latest frontier model are bringing a 2023 playbook to a 2024 fight.

### Conclusion

The cost of intelligence in 2024 isn't a single number; it's a spectrum, and the spectrum keeps moving down. Quantization and distillation, alongside better serving infrastructure and smarter inference techniques, have made the per-task cost of LLM capability fall fast enough that the architectural assumptions of two years ago no longer hold. The teams adapting fastest are treating model selection as a portfolio decision and building the operational maturity to route across that portfolio. The ones still standardized on a single frontier API are paying a quietly large premium — and missing the use cases that the cost shift makes newly viable.

### References

Frantar, E. et al. (2023). *GPTQ: Accurate Post-Training Quantization for Generative Pre-trained Transformers*. ICLR 2023.

Lin, J. et al. (2023). *AWQ: Activation-aware Weight Quantization for LLM Compression and Acceleration*.

Hinton, G. et al. (2015). *Distilling the Knowledge in a Neural Network*. NeurIPS Deep Learning Workshop.

Leviathan, Y. et al. (2023). *Fast Inference from Transformers via Speculative Decoding*. ICML 2023.

Microsoft Research (2024). *Phi-3 Technical Report*.
