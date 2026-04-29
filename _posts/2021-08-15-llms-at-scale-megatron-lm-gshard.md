---
layout: post
title: "LLMs at Scale: Lessons from Megatron-LM and GShard"
date: 2021-08-15 09:00 -0700
feature-img: 2021-08-15-llms-at-scale-megatron-lm-gshard.jpg
author: R. Dubnick
tags: [LLMs, Distributed-Training, Scale, Architecture]
comments: false
published: true
---

NVIDIA's Megatron-LM team published "Efficient Large-Scale Language Model Training on GPU Clusters Using Megatron-LM" in May, demonstrating training of a trillion-parameter transformer on a thousand-GPU cluster with reasonable efficiency. Stanford CRFM's foundation models center launched this week with a workshop that put the scaling conversation on a more academic footing. Google's Switch Transformer paper from January showed 1.6T-parameter sparse models trained efficiently. The cumulative trajectory is unmistakable: the techniques that make trillion-parameter language models trainable have crystallized into a recognizable engineering discipline, and the lessons from the leading labs are increasingly accessible to enterprise teams thinking about their own scaling problems.

The honest August 2021 observation is that "LLMs at scale" is no longer just a research topic — the engineering patterns have matured enough that enterprise teams need to understand them, even if most enterprises will consume frontier models from APIs rather than train their own.

### The Two Reference Architectures Worth Understanding

A useful clarification: scaling language models past the limits of single-machine training requires combining several distinct parallelism strategies. The leading exemplars are Megatron-LM (NVIDIA) and GShard (Google), and they take different but complementary approaches.

**Megatron-LM: tensor and pipeline parallelism for dense models.** NVIDIA's framework, originally published in 2019, has been steadily extended through 2020 and 2021. The May 2021 paper demonstrates the combination of three parallelism strategies — data parallel, tensor parallel (slicing individual layers across GPUs), and pipeline parallel (different layers on different GPUs) — to train dense transformers up to a trillion parameters. The contribution is making the combination work at cluster scale with reasonable arithmetic intensity.

**GShard: sparse experts for conditional computation.** Google's framework, published June 2020, takes a different path: rather than scaling dense models, it scales by replacing dense layers with mixture-of-experts (MoE) layers, where only a subset of experts activates for any given input. The Switch Transformer follow-up extends this. The contribution is showing that sparse models can match or exceed dense model quality at lower compute cost, with a different set of engineering challenges.

The two approaches answer different questions and are increasingly being combined in the leading-edge work.

### What Megatron-LM Teaches About Dense Scaling

A few specific lessons from the Megatron line of work:

**Tensor parallelism distributes individual layers across GPUs.** A matrix multiplication that's too large for one GPU's memory gets sliced; each GPU computes a partial result; the partials are combined. The communication cost is non-trivial but tractable with high-bandwidth interconnect (NVLink, InfiniBand).

**Pipeline parallelism distributes layers across GPUs.** Different transformer blocks live on different devices; activations flow through the pipeline. Idle "bubbles" in the pipeline are minimized by interleaving microbatches. The pipeline depth is constrained by the available batch size.

**Data parallelism distributes batches across replicas.** The classic approach: each replica processes a different batch slice, gradients are averaged. Combines naturally with the other two.

**The combination matters more than any single strategy.** A trillion-parameter model trains efficiently because all three parallelism strategies are composed appropriately for the cluster topology, the model architecture, and the batch size. Getting one wrong drops efficiency dramatically.

**Activation checkpointing trades compute for memory.** Recomputing activations during backward pass instead of storing them shifts the memory-versus-compute trade-off in favor of larger models. Standard practice at scale.

**Communication is the bottleneck, not compute.** As model size grows, the time spent moving data between GPUs grows faster than the time spent on arithmetic. The cluster's network topology and the bandwidth between devices becomes the limiting factor.

### What GShard and Switch Transformer Teach About Sparse Scaling

A few specific lessons from the sparse-expert line of work:

**Mixture-of-experts replaces dense layers with expert layers.** Each expert is a smaller dense layer; a routing function chooses which experts process each token. Only the chosen experts compute; the rest stay idle.

**Conditional computation breaks the parameter-flop coupling.** A dense model with N parameters does roughly N operations per forward pass. A sparse model with N parameters does roughly N/E operations per forward pass, where E is the number of experts and only a fixed fraction activate per token. This is the central efficiency claim.

**Routing is the hard part.** The router has to learn which experts are relevant for which inputs. Naive routing leads to load imbalance (some experts overused, others underused) and quality degradation. Auxiliary losses, capacity factors, and careful routing design are the engineering work.

**Communication patterns differ from dense.** All-to-all communication for routing tokens to experts is qualitatively different from the all-reduce patterns of dense parallelism. The cluster has to be designed for it.

**Checkpointing and inference get harder.** A 1.6T-parameter sparse model has 1.6T parameters that have to be persisted, even though any given inference uses a small fraction. Storage and inference deployment have implications that dense models don't.

### The Combined Picture

The leading-edge frontier in 2021 increasingly combines these approaches: dense backbones with sparse expert layers, distributed across data, tensor, and pipeline parallel dimensions, with sophisticated communication scheduling and memory management. The compositions are non-trivial; the engineering is real engineering.

A few things that fall out of the combined picture:

**The compute requirements are real and material.** Training a trillion-parameter model is a multi-million-dollar compute investment. The clusters required (thousands of GPUs with high-bandwidth interconnect for weeks) are infrastructure most enterprises don't have.

**The data requirements are real and material.** A frontier-scale model needs hundreds of billions to trillions of tokens of training data. The data engineering — collection, deduplication, filtering, formatting — is a substantial fraction of the total work.

**The team requirements are real and material.** Training at this scale isn't a small team activity. The leading labs have dozens of engineers working on the training infrastructure alone.

### Why Enterprise Teams Should Care

Most enterprises won't be training trillion-parameter models. Most will consume frontier models through APIs (GPT-3 today; the obvious successors over the coming year). So why does the scaling discipline matter?

A few practical reasons:

**Choosing the right model for the use case requires understanding what's possible.** If you don't know what the frontier looks like, you can't evaluate whether a third-party offering is well-suited or oversized for your problem.

**Fine-tuning is increasingly a default operation.** Even if you're not training base models, fine-tuning them on domain data is a real workflow. Understanding the parameter-efficient fine-tuning techniques (adapters, prompt tuning, LoRA — though LoRA is just emerging) requires understanding how the underlying models work.

**Specialized models for specialized domains may make sense.** Smaller, domain-specific models trained at moderate scale (10B-100B parameters) are increasingly viable for enterprises with strong-enough use cases and budgets. Knowing what's involved helps the build/buy decision.

**The cost and capability landscape will shift fast.** API pricing, model availability, and inference economics are all moving. Understanding the underlying engineering helps anticipate where the puck is going.

**Vendor evaluation gets sharper.** When a vendor claims their model "uses techniques from Megatron and GShard," knowing what that actually means lets you evaluate the claim.

### What's Worth Watching

A few directions visible from this vantage point in mid-2021:

The combination of dense and sparse scaling will continue. The leading labs are converging on hybrid architectures.

Inference cost will become the binding constraint as models get larger. The training cost is one-time per model; the inference cost is per-request and dominates at scale. Distillation, quantization, and inference-optimized architectures will get more attention.

Open-weight large models will start to appear. EleutherAI's GPT-Neo (2.7B) and the in-progress GPT-NeoX work are early examples. The dynamics of who has access to frontier capabilities will shift if open-weight models continue to scale.

Multimodal scaling will accelerate. Vision-language models (CLIP, DALL-E from earlier this year) are demonstrating that the scaling story extends beyond text-only models. Expect substantial progress on this front through the rest of 2021 and into 2022.

Code as a frontier domain. Codex from OpenAI, demonstrated last week, suggests that code-focused frontier models will be a distinct category with substantial enterprise implications.

### Conclusion

LLMs at scale in 2021 have crossed from research curiosity to engineering discipline. The patterns demonstrated by Megatron-LM and GShard are recognizable, the trade-offs are well-understood, and the compositions are increasingly standardized. For enterprise teams, the right posture is to understand the engineering well enough to be informed consumers of frontier capabilities — which model fits which use case, what the cost and latency implications are, what the limits of fine-tuning and prompting are — even if the actual training stays with the leading labs. The category is moving fast; the foundational understanding helps the team make decisions that age well.

### References

Narayanan, D. et al. (2021). *Efficient Large-Scale Language Model Training on GPU Clusters Using Megatron-LM*. NVIDIA.

Lepikhin, D. et al. (2020). *GShard: Scaling Giant Models with Conditional Computation and Automatic Sharding*. Google.

Fedus, W. et al. (2021). *Switch Transformers: Scaling to Trillion Parameter Models with Simple and Efficient Sparsity*. Google.

Shoeybi, M. et al. (2019). *Megatron-LM: Training Multi-Billion Parameter Language Models Using Model Parallelism*. NVIDIA.

Brown, T. et al. (2020). *Language Models are Few-Shot Learners (GPT-3)*. OpenAI.
