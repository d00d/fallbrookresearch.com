---
layout: post
title: "Post-RAG Architectures: What Comes After Retrieval-Augmented Generation?"
date: 2025-06-15 09:00 -0700
feature-img: 2025-06-15-post-rag-architectures.jpg
author: R. Dubnick
tags: [RAG, GenAI, Architecture, LLMs]
comments: false
published: true
---

For roughly two years, RAG has been the reference pattern for grounding LLMs in enterprise data. Embed the corpus, retrieve the most relevant chunks, stuff them in the prompt, generate. It worked. It still works for many use cases. But by mid-2025, the architectures actually shipping in production have moved beyond the original blueprint, and the question "is RAG enough?" has become "what specifically are we doing on top of RAG, and why?"

The short answer: context windows got longer, retrieval got smarter, and the gap between a demo and a reliable production system is now filled by layers most teams didn't initially plan for.

### The Problems RAG Didn't Solve

Classic RAG has well-known failure modes. It struggles with queries that require reasoning across many documents, because chunked retrieval tends to surface lexically similar passages rather than semantically complementary ones. It hides failure: when retrieval returns nothing useful, the model often generates a plausible-sounding answer anyway. And it treats the corpus as static — a fresh document doesn't help until the pipeline reindexes.

These weren't abstract concerns. They surfaced as real enterprise pain: customer-facing assistants that confidently cited the wrong policy, legal research tools that missed the critical precedent, internal search that returned the same three documents regardless of query.

### What "Post-RAG" Architectures Add

Four patterns have become common enough to describe as the next default:

**Query planning and decomposition.** Rather than embedding the user's question directly, a planning step decomposes it into sub-queries — often with different retrieval strategies per sub-query. A question like "how does our refund policy compare to competitors in 2024?" gets split into internal policy lookups, external web retrieval, and a synthesis step.

**Hybrid retrieval.** BM25 plus dense vectors plus structured search against metadata. Dense embeddings alone miss exact-match needs (product codes, error IDs, named entities); keyword alone misses semantic paraphrase. Production systems increasingly run both and rerank.

**Retrieval self-critique.** A verification pass asks whether retrieved context actually supports an answer before generation. If it doesn't, the system either retrieves differently, admits ignorance, or escalates. This one change dramatically reduces the "confidently wrong" failure mode.

**Long-context as first-class citizen.** With million-token context windows now common, some workflows skip retrieval entirely for bounded corpora — feed the whole policy manual into context rather than chunking it. This isn't universal (cost and latency still matter), but for small, high-value corpora it's become the cleaner design.

### Agentic Retrieval

The most substantive shift is treating retrieval as an action an agent takes rather than a pipeline step. In this model, the LLM decides when to retrieve, what to retrieve, and whether to retrieve again after seeing initial results. It's RAG rephrased as tool use.

The upside is flexibility — queries that don't need external data skip retrieval entirely, and queries that need several passes get them naturally. The downside is latency and cost: agentic loops are slower than single-shot pipelines, and runaway retrieval is a real failure mode.

Best practice in 2025: use agentic retrieval where users expect thoughtful answers and can tolerate a few extra seconds; keep classic RAG for low-latency, high-volume workflows like support auto-suggestions.

### Structured Knowledge Comes Back

A quieter trend: knowledge graphs are having a second moment. Vector similarity is excellent for "find me things like this," but poor at "find me things with this specific relationship." Hybrid systems that combine vector retrieval with graph traversal handle questions like "what is the downstream impact of this customer churning?" in ways pure RAG cannot.

This doesn't mean building a corporate ontology from scratch — most production deployments extract lightweight graphs from documents using LLMs themselves, then use them as a complementary retrieval surface. It's a pragmatic rediscovery of symbolic structure in a vector-dominated world.

### What to Measure

Post-RAG systems complicate evaluation. Single-turn accuracy matters less; end-to-end task success, grounding faithfulness, and retrieval recall at the sub-query level matter more. The frameworks catching on — RAGAS, DeepEval, and internal harnesses — reflect this shift, measuring faithfulness (did the answer actually come from retrieved sources?) alongside answer relevance and context precision.

The teams getting the most value are running evaluation continuously, not just at release — which is possible because synthetic query generation from documents has gotten reliable enough to keep test sets fresh.

### Conclusion

"Post-RAG" is a slightly cheeky name for what's really the maturation of a pattern. Retrieval-augmented generation isn't going anywhere; it's becoming one layer in richer systems that plan, decompose, verify, and sometimes skip retrieval entirely. The enterprises seeing durable value aren't chasing the next acronym — they're treating retrieval as a design space with real trade-offs between latency, accuracy, cost, and governance, and picking the right pattern per workflow.

The honest framing for 2025: classic RAG is still the right default for many applications. Know why you're choosing something more complex before you choose it.

### References

Lewis, P. et al. (2020). *Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks*. NeurIPS 2020.

Gao, Y. et al. (2024). *Retrieval-Augmented Generation for Large Language Models: A Survey*.

Asai, A. et al. (2023). *Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection*.

Edge, D. et al. (2024). *From Local to Global: A Graph RAG Approach to Query-Focused Summarization*. Microsoft Research.

Es, S. et al. (2024). *RAGAS: Automated Evaluation of Retrieval Augmented Generation*.
