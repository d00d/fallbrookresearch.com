---
layout: post
title: "The Rise of Foundation Models: A New Era in Scalable AI"
date: 2021-12-15 09:00 -0700
feature-img: 2021-12-15-rise-of-foundation-models.jpg
author: R. Dubnick
tags: [Foundation-Models, LLMs, Strategy, AI]
comments: false
published: true
---

Stanford's Center for Research on Foundation Models published its widely-discussed paper "On the Opportunities and Risks of Foundation Models" in August. Microsoft and NVIDIA's Megatron-Turing NLG 530B was announced in October. DeepMind's Gopher and RETRO papers landed last week. Anthropic emerged from stealth this past spring with substantial funding to pursue AI research focused on safety. OpenAI's API has continued to expand with Codex (the model behind GitHub Copilot) and embedding capabilities. Google's continued work on LaMDA and the broader Pathways architecture announcement in October is reshaping how the largest training runs are organized. The 2021 conversation has reached a point where the term "foundation model" — coined by the Stanford group — captures something real: a new layer in the AI capability stack that sits between raw computation and applied AI products, and increasingly drives where the value gets created.

The honest December 2021 observation is that foundation models are reshaping the AI landscape in ways the previous decade's framing — task-specific models trained for specific applications — doesn't capture, and that enterprises figuring out their relationship to this layer are making decisions that will compound over the next several years.

### What "Foundation Model" Actually Means

A useful clarification, since the term is being used to mean several things:

The Stanford working definition: a model trained on broad data at scale and adaptable to a wide range of downstream tasks. The defining properties are broad pretraining (typically self-supervised), adaptation to many downstream uses (through fine-tuning, prompting, or other techniques), and emergent capabilities that arise from scale.

GPT-3 is a foundation model. So is BERT and its descendants, T5, CLIP, DALL-E, AlphaFold 2 (in its domain), Codex, and the various successors that have continued to ship through 2021. Their commonalities are more substantive than their differences:

**Broad pretraining substrate.** Hundreds of billions to trillions of tokens or examples, drawn from broad sources, with self-supervised objectives that don't require task-specific labels.

**Adaptation, not retraining, for downstream use.** Fine-tuning on smaller task-specific data; prompting with examples; embedding-based retrieval; and increasingly "in-context learning" where the model picks up the task from the prompt itself.

**Emergent capabilities at scale.** Capabilities that weren't designed in but appear as the model scales — reasoning, code generation, instruction-following, cross-task transfer.

**Concentration of capability.** A small number of organizations have the compute, data, and engineering to produce frontier foundation models. The capability is then accessed by many through APIs, hosted services, or open-weight releases.

### Why This Layer Matters

A few specific reasons foundation models are reshaping the AI conversation:

**The "build a model for each task" pattern is being eclipsed.** A decade of "we need labeled data and a custom model for each application" is giving way to "adapt a foundation model to the application." The economics, the time-to-value, and increasingly the quality favor the new pattern for many applications.

**The capability frontier is moving fast.** GPT-2 in 2019 was impressive in research circles. GPT-3 in 2020 was useful in production. The 2021 generation (Codex, Megatron-Turing NLG, Gopher, the InstructGPT line of work) is qualitatively further along on multiple benchmarks. The pace is faster than any prior AI capability cycle.

**Multimodality is becoming mainstream.** CLIP in January, DALL-E early in the year, the various successors through the summer — text and images are no longer separate modalities. Foundation models that handle multiple modalities together are starting to ship.

**Code is becoming a first-class domain.** Codex demonstrated in August that foundation models can produce working code; GitHub Copilot's preview release has been finding strong developer reception. Code generation is going to be one of the early high-value enterprise use cases.

**The economics are shifting.** A 175B-parameter model accessed through an API at fractions of a penny per call changes the unit economics of many applications. The question shifts from "can we build this?" to "how do we evaluate and deploy this safely?"

### Where Foundation Models Earn Their Keep

A few categories where the 2021 production deployments are demonstrably working:

**Code generation and developer assistance.** Copilot's preview release has been finding strong reception; the productivity gains are meaningful for the cases it handles well. Other entrants (TabNine, Replit, others) are following.

**Document and content production.** Jasper, Copy.ai, and a wave of GPT-3-powered SaaS products are finding paying customers for marketing copy, content drafting, and structured writing.

**Customer service and support.** Question-answering over product documentation, response drafting, and conversational interfaces are emerging as practical applications. The integration cost is real; the value is also real.

**Search and information retrieval.** Embedding-based retrieval (using foundation model embeddings) is improving search quality measurably over keyword-based approaches. Several enterprises have shipped this through 2021.

**Domain-specific text understanding.** Fine-tuned BERT-derivatives for finance, legal, healthcare, and similar domains continue to be production workhorses. The pattern composes with the foundation-model concept even when the specific models are smaller and more specialized.

### What's Still Hard

Honest accounting of friction patterns visible in production:

**Hallucination and confident wrong answers.** Foundation models trained on broad text produce confident output that may be factually wrong. Enterprise deployments need grounding strategies (retrieval over enterprise content, fact-checking, citation requirements) that the base models don't provide out of the box.

**The cost of inference at scale.** Per-call API costs are low; high-volume production applications discover that the bills add up. Self-hosting frontier models requires infrastructure most enterprises don't have.

**Data residency and confidentiality.** Sending confidential data to a third-party API has implications most enterprise procurement processes are still working through. The major providers offer enterprise tiers with stronger contractual protections; the nuances matter.

**Vendor concentration.** A small number of providers control access to the leading models. Enterprise dependency on one or two of them is a strategic risk worth thinking about.

**Evaluation discipline.** Models change. Prompts that work today may work differently after a model update. The evaluation harness that distinguishes "the model still works" from "the model has changed" is engineering work that's frequently underestimated.

**Bias and safety.** Foundation models inherit the biases of their training data and produce outputs that may be problematic in ways that are hard to fully characterize. Production deployments need monitoring and guardrails; the discipline is early.

### The Open vs. Closed Question

A specific topic worth flagging: the foundation-model layer is splitting into two ecosystems with different dynamics.

**Closed/proprietary models.** OpenAI's GPT-3 family, the various Microsoft Cognitive Services, Google's offerings via Vertex AI, increasingly Anthropic. Strong capability, restricted access, evolving terms of use, dependency on the provider's roadmap.

**Open-weight models.** EleutherAI's GPT-Neo, GPT-J, the in-progress GPT-NeoX. BigScience's BLOOM project (in training, with anticipated release next year). Hugging Face's broad model hub.

The capability gap exists but the open-weight ecosystem is closing it for some use cases. The strategic implications differ — closed models are easier to start with but create vendor dependence; open-weight models require more operational capability but preserve more strategic optionality.

### Practical Strategy for 2022

A few patterns the more thoughtful enterprises are converging on:

**Don't pick one provider.** The capability landscape is moving too fast for early commitments to be defensible. Building applications with abstraction layers between the foundation model and the application logic preserves optionality.

**Invest in the wrapping infrastructure.** Retrieval augmentation, prompt engineering as discipline, evaluation harnesses, monitoring, guardrails. The wrapping is where the value gets captured for enterprise use.

**Pilot, learn, then scale.** Pick two or three high-value use cases (code assistance, document drafting, internal Q&A are common starting points), pilot deliberately, build operational capability, then expand. Big-bang deployments rarely fit foundation-model integration work.

**Engage with the ethics and governance question.** Bias evaluation, data lineage for what flows into the models, impact assessment for affected users. The regulatory environment is moving (EU AI Act, NIST work, sector-specific guidance); the enterprise discipline should anticipate it.

**Plan for the inevitable model changes.** What works today may work differently after a provider's update. The applications that age well are designed with this in mind.

### What's Worth Watching Through 2022

A few directions visible from where we sit at year-end 2021:

The capability frontier will continue to advance. Expect substantial new model releases through the year, with continued scaling and specialization (multimodal, code, scientific).

Open-weight model quality will continue to close the gap. BLOOM's release next year will be a substantial event for the open-weight ecosystem.

The enterprise-grade deployment platforms will mature. The current pattern of "bring your own integration" will give way to more managed offerings as the category matures.

Regulatory attention will intensify. The EU AI Act will continue moving through the process; sector-specific regulators will issue guidance; enterprises in regulated industries should be following closely.

The application layer above foundation models will be where the next wave of company-building happens. Foundation models become infrastructure; the applications built on them become the addressable market.

### Conclusion

Foundation models in 2021 have crossed from research framing to operational reality. For most enterprises, the right pattern for 2022 is to engage with the layer deliberately — pilot meaningful applications, build the wrapping infrastructure, develop the evaluation discipline, and resist over-commitment to any single provider while the landscape is still moving fast. The capability is real, the value is real, and the next few years are going to reshape what enterprise AI looks like in ways that don't fit cleanly into the previous frame. Organizations that engage thoughtfully will find themselves well-positioned; organizations that wait for the dust to settle will discover the dust isn't going to settle on a familiar timeline.

### References

Bommasani, R. et al. (2021). *On the Opportunities and Risks of Foundation Models*. Stanford CRFM.

Brown, T. et al. (2020). *Language Models are Few-Shot Learners (GPT-3)*. OpenAI.

Chen, M. et al. (2021). *Evaluating Large Language Models Trained on Code (Codex)*. OpenAI.

Rae, J. et al. (2021). *Scaling Language Models: Methods, Analysis & Insights from Training Gopher*. DeepMind.

Smith, S. et al. (2021). *Using DeepSpeed and Megatron to Train Megatron-Turing NLG 530B*. Microsoft / NVIDIA.
