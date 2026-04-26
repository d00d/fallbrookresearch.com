---
layout: post
title: "Vector Embeddings Explained: Building the Foundation for Intelligent Search"
date: 2023-05-15 09:00 -0700
feature-img: 2023-05-15-vector-embeddings-explained.jpg
author: R. Dubnick
tags: [Embeddings, Vector-Search, NLP, Architecture]
comments: false
published: true
---

A year ago, "vector search" was a phrase most enterprise architects had heard but few had implemented. In May 2023, it's near-impossible to read a serious AI engineering discussion without encountering it. The shift from keyword search and structured queries toward similarity search over learned representations is one of the more consequential infrastructure changes the LLM era is producing. Understanding what embeddings actually are, why they work, and where they fail is increasingly part of the architect's basic literacy — even for teams whose primary work isn't ML.

The honest 2023 observation is that the concept is older than the recent excitement suggests, but the combination of better embedding models and easier-to-deploy vector infrastructure has made what used to be a research technique a default building block.

### What an Embedding Actually Is

An embedding is a mapping from some kind of input — a word, a sentence, a document, an image — to a fixed-length list of numbers, usually somewhere between a few hundred and a few thousand dimensions. The numbers themselves are not interpretable; what matters is that inputs with similar meaning produce vectors that are close in the embedding space, by some chosen distance metric (cosine similarity is the most common).

A useful intuition: an embedding model has been trained on enormous quantities of text (or images, or other content) in a way that pushes related items toward each other in vector space. The result is a learned geometry where "neighbors" reflect semantic relatedness rather than surface form. The phrase "the company's quarterly performance" and "Q3 results" can be far apart by string match and close by embedding match.

A few terms worth knowing:

**Dimensionality.** The number of components in the embedding vector. OpenAI's `text-embedding-ada-002` produces 1536-dimensional vectors; sentence-transformer models commonly produce 384, 768, or 1024 dimensions. Higher dimensions can capture more structure; they also cost more to store and search.

**Cosine similarity.** The most common distance metric. It measures the angle between two vectors, ignoring magnitude. Two embeddings pointing in the same direction in vector space are similar; orthogonal ones are unrelated.

**Approximate nearest neighbor (ANN) search.** Finding the closest vectors to a query vector exactly is too slow for large collections. ANN algorithms (HNSW, IVF, ScaNN) trade a small amount of accuracy for a large speed-up, making real-time similarity search practical at scale.

### Why Embeddings Beat Keyword Search for Many Problems

A few categories where embedding-based retrieval clearly outperforms classic keyword approaches:

**Synonyms and paraphrases.** "How do I cancel my subscription?" and "I want to end my plan" mean the same thing; an embedding model trained on enough text knows this. A keyword index doesn't, unless you add explicit synonym handling.

**Multi-language search.** Multilingual embedding models map equivalent meanings across languages to nearby vectors. A user searching in French finds documents in English, without translation infrastructure in the search layer.

**Conceptual queries.** "Documents about supply-chain risk" doesn't have to contain those exact words to match a relevant document about logistics disruptions. Embeddings capture the relationship.

**Question-answering setups.** A user's question often doesn't share much vocabulary with the source documents that answer it. Embedding-based retrieval handles this in a way keyword search struggles with.

Where keyword search still wins is largely the inverse: queries with specific terms (product codes, model numbers, exact names) where the user wants a literal match. The current best practice is hybrid retrieval — combining vector and keyword (BM25) search and merging the results — which captures both kinds of matches.

### What's in the 2023 Embedding-Model Landscape

A short tour of where the leading options sit:

**OpenAI `text-embedding-ada-002`** is the de facto default for many enterprise applications. 1536 dimensions, supports text up to 8K tokens, priced cheaply enough that ad hoc embedding of large corpora is straightforward. The strengths are convenience and quality on general English. The trade-offs are reliance on a single provider and the cost (modest but non-zero) at very high volume.

**Cohere's embedding models** (multiple sizes, multilingual support) are competitive and offer features like reranking that matter for production retrieval pipelines.

**Sentence-transformers** (the BAAI/bge family, `all-MiniLM-L6-v2`, `all-mpnet-base-v2`) are open-weight, can run on customer-owned infrastructure, and have improved substantially through 2023. The MTEB leaderboard at Hugging Face has become the practical reference for choosing among them.

**Domain-specific embeddings** — legal, biomedical, financial — are increasingly available and meaningfully outperform general-purpose models on their target domains. The decision tree for whether to use one has gotten cleaner.

**Multimodal embeddings** — CLIP, ALIGN, and successors — produce embeddings that span images and text. Useful for image-search and image-generation workflows; relevant to any application that handles non-text content.

### Where Embeddings Get Misused

Honest accounting of failure patterns common in 2023 deployments:

**Treating embedding similarity as semantic equivalence.** Two vectors close in embedding space are similar by the model's notion of similarity, which is not the same as logically equivalent. Two contrasting opinions can produce embeddings that are very close. Production systems need to handle this — re-ranking, additional verification, or task-aware retrieval.

**Embedding chunks too small or too large.** Tiny chunks lose context; massive chunks dilute the signal. Most production stacks settle on chunks in the range of a few hundred tokens with some overlap, but this has to be measured for the specific corpus.

**Ignoring metadata.** Embeddings handle semantic similarity; metadata (date, author, document type, customer ID) handles structured filtering. The combination is far more powerful than embeddings alone, and skipping metadata indexing is a common early mistake.

**Re-embedding everything when the model changes.** Embeddings produced by different models live in different spaces; you cannot mix them. Switching embedding models requires re-embedding the corpus, and pipelines should anticipate this.

**Treating an embedding as a fact.** An embedding represents one model's view of a piece of content at one point in time. It's not a canonical representation; another model produces a different embedding. Architectures that treat embeddings as immutable system-of-record artifacts run into problems when the embedding model needs to be updated.

### How a Practical Stack Looks in May 2023

The pragmatic architecture that has emerged:

A document pipeline that ingests, normalizes, and chunks content; an embedding step that produces vectors using a chosen model; a vector store (Pinecone, Weaviate, Chroma, pgvector, Qdrant) that holds the vectors with metadata; a retriever that combines vector and keyword search and supports filtering; an optional reranker that reorders top results for the specific query; and the LLM consumer that uses the retrieved context.

The vector store choice depends on scale, latency requirements, and existing infrastructure. PostgreSQL with `pgvector` is a strong default for teams already running Postgres at moderate scale; specialized vector databases earn their place when scale, performance, or operational characteristics outpace what a general database can offer.

### What's Worth Watching

A few directions to track:

Cheaper, smaller, faster embedding models that close the quality gap with current best-in-class options. The trend is clearly in this direction.

Long-context embeddings — models that handle larger input chunks usefully. The current 8K-token limit on `ada-002` is generous; longer chunks would change pipeline design.

More sophisticated retrieval — multi-vector models (ColBERT and successors), retrieval that adapts to the question type, retrieval that uses an LLM to interpret the query before searching.

Better tools for understanding why a particular vector matched — interpretability for embedding spaces is still primitive, and improving it would help a lot of debugging.

### Conclusion

Vector embeddings are foundational infrastructure for the next generation of intelligent applications. The concept is well understood; the production discipline is still being developed. For 2023, the right pattern for most enterprises is to start with a solid default (OpenAI `ada-002` or a strong sentence-transformer model), pair it with a vector store appropriate to scale, build hybrid retrieval rather than vector-only, and invest in the evaluation harness that tells you whether retrieval is actually finding the right content. Embeddings are the layer on which everything else — RAG pipelines, semantic search, recommendation systems, hybrid retrieval — depends, and getting this layer right pays dividends across the whole AI application surface.

### References

Mikolov, T. et al. (2013). *Distributed Representations of Words and Phrases*.

Reimers, N. & Gurevych, I. (2019). *Sentence-BERT: Sentence Embeddings Using Siamese BERT-Networks*.

OpenAI (2022–2023). *text-embedding-ada-002 Documentation*.

Hugging Face (2023). *Massive Text Embedding Benchmark (MTEB) Leaderboard*.

Pinecone (2023). *Vector Search in Production*.
