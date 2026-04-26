---
layout: post
title: "RAG (Retrieval-Augmented Generation): Bridging Legacy Data and LLMs"
date: 2023-10-15 09:00 -0700
feature-img: 2023-10-15-rag-bridging-legacy-data-and-llms.jpg
author: R. Dubnick
tags: [RAG, LLMs, Vector-Search, Architecture]
comments: false
published: true
---

Retrieval-augmented generation has gone from a research paper to the default architecture pattern for enterprise LLM applications in less than a year. The reasons are straightforward: most real applications need answers grounded in documents the model has never seen, the documents change constantly, and "fine-tune the model on our data" turns out to be expensive, slow, and frequently the wrong solution. RAG is winning because it solves a specific problem — bridging legacy enterprise data and frontier LLMs — without asking the model itself to change.

The honest 2023 picture is that RAG is not a magic solution; it's an architecture pattern with real engineering trade-offs that production teams are still learning how to navigate.

### Why RAG Beat the Alternatives in 2023

A short tour of why RAG dominates the architecture conversation right now:

**Fine-tuning on enterprise corpora is expensive and brittle.** Training data needs careful curation, the resulting model is frozen in time, and updating it as documents change is a substantial operational lift. The economics work for a small set of specialized cases; they don't work as a general pattern.

**Long-context prompting alone doesn't scale.** Even with the recent moves toward larger context windows, putting the entire enterprise corpus in front of the model on every query isn't economically or operationally feasible. Some kind of selection has to happen.

**Citation and grounding are first-class requirements.** In regulated industries — financial services, healthcare, legal — the answer needs to point to its source. RAG makes this natural; pure prompting doesn't.

**The data is where it is.** Most enterprises have content distributed across SharePoint, Confluence, Salesforce, Jira, GitHub, internal wikis, and a long tail of departmental tools. Pulling that into a unified retrieval layer is hard; getting the LLM provider to ingest it is harder.

The combination — retrieve the most relevant content, hand it to the model, ask the model to answer — is simple, flexible, and meets the actual operational requirements.

### What a Production-Grade RAG Stack Looks Like

The architecture has settled into a recognizable shape through 2023:

**Ingestion and chunking.** Documents from various sources are pulled, normalized, and split into chunks of a size that fits the model's effective working window. Chunk size, overlap, and structure matter more than initial intuition suggests; a poorly chunked document degrades retrieval quality regardless of the embedding model.

**Embedding.** Each chunk is converted to a dense vector using an embedding model — `text-embedding-ada-002` from OpenAI is the most common starting point, with sentence-transformer models popular for self-hosted deployments. The choice of embedding model has substantial downstream effects.

**Vector storage and retrieval.** A vector database — Pinecone, Weaviate, Chroma, Qdrant, or `pgvector` for teams sticking with PostgreSQL — stores the embeddings and supports approximate-nearest-neighbor search. The vector DB market has been one of the hottest funding categories of 2023 for a reason.

**Hybrid search.** The most capable production deployments combine vector similarity with traditional keyword (BM25) search. Pure vector retrieval misses queries with specific terms (product codes, names, numbers) that don't have good embedding signal; pure keyword misses semantic matches. The blend wins.

**Reranking.** A second-stage model — Cohere's reranker, a cross-encoder, or a custom model — takes the top retrieved chunks and reorders them for relevance to the specific query. Adds cost; meaningfully improves quality for hard queries.

**Generation with grounding.** The retrieved chunks are passed to the LLM along with the user's question and a prompt that emphasizes grounding ("answer based only on the provided context") and citation ("indicate which chunk supports each claim").

### Where Production RAG Goes Wrong

Honest accounting of the failure modes seen most often:

**Chunking that loses structure.** A contract chunked at arbitrary token boundaries loses its section relationships; a technical manual chunked the same way loses procedural sequence. The chunks retrieve, the model assembles them, the answer is wrong because the structure was wrong before retrieval ever happened.

**Embedding-model mismatch.** A general-purpose embedding model on highly specialized content — legal, medical, technical — produces embeddings that cluster less well than purpose-trained alternatives. The retrieval quality is the bottleneck and teams blame the LLM.

**Knowledge-base staleness.** The retrieval layer indexes the corpus at ingestion; if the corpus changes, the index needs to update. Teams that treat this as a one-time setup discover six months later that they're answering with stale information.

**Insufficient retrieval evaluation.** Teams evaluate the LLM's answers but not whether retrieval put the right content in front of the LLM. When the answers are wrong, the response is to tweak prompts; the actual problem is retrieval. Better evaluation harnesses separate these.

**No handling of empty or wrong retrieval.** The model gets retrieved content that doesn't actually contain the answer. Without explicit handling, the model invents one. Production deployments need explicit "answer not found in available context" paths.

### Where RAG Is Still Hard

Some categories of difficulty that haven't been solved yet, even in mature deployments:

**Multi-hop reasoning.** Questions that require synthesizing across multiple documents — "did our policy on X change between Q1 and Q3?" — challenge straightforward retrieve-then-generate patterns. Approaches like multi-step retrieval and chain-of-thought prompting help; they don't fully solve it.

**Tabular and structured data.** Retrieval works well on prose, less well on tables, financial statements, and structured records. The 2023 production answer is often hybrid pipelines that route structured queries differently from prose queries.

**Identity-aware retrieval.** What user is asking what question, with what entitlements? In an enterprise, the same query from different users should return different documents. Building this carefully requires identity context to flow through the retrieval layer in a way most stacks don't yet handle natively.

**Updates and forgetting.** Documents change, get retracted, get supplemented. The retrieval layer has to reflect this in something close to real time, and questions about whether the LLM cached an old version need clear answers.

### What's Maturing in the Tooling

Several things are visibly improving through Q4 2023:

LangChain and LlamaIndex have become the default frameworks for stitching RAG pipelines together. Both are evolving fast, both have rough edges, both make a complex stack much easier to start with than starting from scratch.

The vector-database vendors are converging on similar feature sets — hybrid search, metadata filtering, namespaces for multi-tenant isolation — with differentiation in operational characteristics, scale, and enterprise integration.

Reranking-as-a-service from Cohere and others is making the hybrid-retrieval-plus-rerank pattern accessible without owning the rerank model. The quality lift is consistent enough that this is becoming a default rather than an optimization.

Evaluation tooling specific to RAG — RAGAS and similar frameworks — is starting to give teams a structured way to measure retrieval quality, generation quality, and end-to-end answer quality separately.

### Conclusion

RAG is the 2023 default for enterprise LLM applications because it solves the bridging problem — the gap between frontier models and the data your business actually runs on — without asking either side to change. The architecture is a known quantity; the engineering discipline that distinguishes successful programs is in the unglamorous parts: chunking strategy, embedding choice, retrieval evaluation, knowledge-base hygiene, identity-aware filtering. For 2024, expect continued evolution of the stack rather than replacement, with long-context capabilities reshaping where retrieval is needed and where it isn't, but not displacing the broader pattern.

### References

Lewis, P. et al. (2020). *Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks*.

Pinecone (2023). *Production RAG Patterns*.

LangChain (2023). *Building RAG Applications*.

Cohere (2023). *Hybrid Search and Reranking for Production RAG*.

Liu, J. (2023). *LlamaIndex: Connecting LLMs to Your Data*.
