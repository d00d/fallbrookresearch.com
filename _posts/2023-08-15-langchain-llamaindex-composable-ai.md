---
layout: post
title: "LangChain, LlamaIndex, and the Rise of Composable AI Development"
date: 2023-08-15 09:00 -0700
feature-img: 2023-08-15-langchain-llamaindex-composable-ai.jpg
author: R. Dubnick
tags: [LangChain, LlamaIndex, Frameworks, Architecture]
comments: false
published: true
---

A year ago, building an LLM-powered application meant writing the orchestration yourself — prompt templating, chunking, embeddings, retrieval, output parsing, retries, logging — in the language of your choice, against whichever model API you happened to be using. Through 2023, a small set of frameworks has emerged to package those concerns into reusable building blocks, and the practice of LLM application development has started to look more like web development than like research engineering. LangChain and LlamaIndex are the headline names; Haystack, Semantic Kernel, and a long tail of smaller frameworks fill in the rest of the space.

The honest 2023 picture is that "composable AI" is no longer aspirational. The tooling is real, immature in places, evolving fast, and already changing how teams build.

### What Composable AI Actually Means

The pattern is recognizable from earlier waves of platform engineering: a frontier capability that used to require deep expertise gets packaged into reusable components that a much broader population of developers can assemble. Web frameworks did this for HTTP servers; ORMs did it for databases; container orchestrators did it for distributed deployment. The 2023 LLM frameworks are doing it for foundation-model orchestration.

The components that are showing up consistently across frameworks:

**Prompt templates** that separate the prompt structure from the variable inputs, with versioning and testing as first-class concerns.

**Document loaders** that ingest from common sources — files, APIs, databases, web — and produce a consistent representation.

**Text splitters** that chunk content with configurable strategies (size, overlap, boundary-aware).

**Embedding interfaces** that abstract over providers — OpenAI, Cohere, sentence-transformers, locally hosted models — without rewriting application code.

**Vector store adapters** that present a unified API to Pinecone, Weaviate, Chroma, Qdrant, FAISS, and a growing list.

**Retrievers** that combine query rewriting, hybrid search, and reranking behind a single call.

**Chains** that compose prompts, model calls, and post-processing into named pipelines that can be tested and reused.

**Agents** that wrap reasoning loops, tool use, and dynamic decision-making.

**Memory** abstractions that handle conversation state, summarization, and longer-term recall.

**Output parsers** that turn LLM output into structured types, with retries and validation when the model produces something off-schema.

The precise division of these concerns differs across frameworks, but the inventory is now standard.

### LangChain: The Default Starting Point

LangChain emerged in late 2022 and exploded through 2023. Its approach is "everything in one framework" — chains, agents, retrievers, memory, tool use, prompt management, all in a single Python (and increasingly TypeScript) package, plus a substantial ecosystem of integrations.

The strengths: starting with LangChain is fast. The community is large, the documentation is abundant, the integrations cover almost every model provider, vector store, and document source. For teams that are early in their journey, the ramp-up is real.

The criticisms — visible in the discourse this summer — are real too. The framework has accumulated complexity faster than it has been refactored; some integrations are less battle-tested than others; the abstractions sometimes hide behavior in ways that complicate debugging. Several thoughtful "should I use LangChain?" essays have circulated, and the answer is increasingly "depends on what you're building and how much abstraction you want."

LangSmith, the recently announced observability product, addresses one of the long-standing pain points — visibility into what chains and agents are actually doing in production. The rollout will be a meaningful test of whether the LangChain ecosystem can graduate from prototype-friendly to production-ready.

### LlamaIndex: Retrieval-First

LlamaIndex (originally called GPT Index) takes a different angle. It's narrower than LangChain — focused specifically on connecting LLMs to data — and the abstractions are correspondingly more opinionated about retrieval.

The strengths: for teams whose primary problem is "ground the LLM in our documents," LlamaIndex tends to produce a more direct, more legible solution. The retrieval primitives — multiple index types, query engines, response synthesizers — are designed for the data-grounding use case in a way that feels more native than the same pattern expressed in LangChain.

The trade-offs: LlamaIndex covers less of the surrounding workflow than LangChain. Teams that need rich agent loops, tool use, and dynamic reasoning often end up combining LlamaIndex (for retrieval) with another framework (for orchestration). This isn't unreasonable, but it means that "framework choice" is sometimes "frameworks choice."

### The Other Names Worth Knowing

A few frameworks that occupy specific niches:

**Haystack** (deepset) has been around longer than the current wave and has matured production patterns for retrieval pipelines. It has a stronger heritage in classic NLP than the newer entrants.

**Semantic Kernel** (Microsoft) emphasizes integration with the broader .NET and Microsoft Graph ecosystem. For enterprises whose application stack is Microsoft-heavy, this is a natural choice.

**Guardrails AI** (and similar libraries like LMQL) focus on the output-validation problem specifically — ensuring that LLM outputs conform to expected structures, with retries when they don't.

**LangGraph**, the recent LangChain spinoff for agent state machines, is early but represents the direction of travel: more explicit modeling of agent state, more controllable execution, less magic.

### What's Hard About Composable AI

Honest accounting of the friction these frameworks expose:

**Abstraction leakage.** The frameworks promise that you can swap one component for another — different model, different vector store — without code changes. In practice, behavior shifts. The retrieval quality from one vector store doesn't match another's; the prompt that works for GPT-4 doesn't work the same on Claude. The portability is real but partial.

**Debugging complexity.** A chain with five steps can fail at any of them, and finding which step is the problem can be hard. This is exactly the problem LangSmith is targeting; it's also a reason teams sometimes choose to write thinner abstractions on principle.

**Versioning and reproducibility.** Frameworks evolve fast; behavior changes between versions. Teams that pin tightly avoid surprises but accumulate technical debt; teams that float with the framework experience occasional regressions. The discipline of testing chains end-to-end is becoming standard practice.

**Production-grade observability.** The default logging isn't enough for serious production use. Teams that adopt these frameworks usually end up adding their own instrumentation around them — call traces, latency, cost, output quality — because the framework's defaults don't quite get there.

### What's Going to Matter in 2024

A few directions to watch:

Convergence around shared abstractions, with the messy diversity of "what's a chain" and "what's an agent" giving way to clearer definitions. The vendor-neutral OpenAI Function Calling spec, plus the emerging tool-use patterns from Anthropic, are pushing in this direction.

Better observability, with LangSmith and similar tools turning the inside of a chain or agent into something teams can reason about in production.

Tighter integration with infrastructure-as-code and CI/CD, so that LLM applications can be deployed with the same discipline as other production services.

Increased fragmentation in the short term, as specialized frameworks for specific use cases emerge, and consolidation in the longer term as the field figures out what the right level of abstraction is.

### Conclusion

The rise of composable AI development is one of the more important practical changes of 2023 — not because the frameworks are finished, but because they have moved the conversation from "should we build it ourselves" to "which tools do we compose." LangChain dominates the default-choice conversation; LlamaIndex dominates the retrieval conversation; the broader ecosystem is filling in real gaps. For teams starting an LLM application in late 2023, the right pattern is usually to pick one framework, build something real, accept the constraints, and revisit the abstraction choice when the application's needs are clearer. The cost of starting is now low; the cost of choosing the wrong abstraction at scale is the new question.

### References

Chase, H. (2022–2023). *LangChain: Building Applications with LLMs Through Composability*.

Liu, J. (2023). *LlamaIndex: Documentation and Architecture*.

deepset (2023). *Haystack 2.0 Roadmap*.

Microsoft (2023). *Semantic Kernel Documentation*.

LangChain (2023). *LangSmith: Observability for LLM Applications*.
