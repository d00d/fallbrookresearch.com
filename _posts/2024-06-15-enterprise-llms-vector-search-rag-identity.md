---
layout: post
title: "Enterprise LLMs: Combining Vector Search, RAG, and Identity Management"
date: 2024-06-15 09:00 -0700
feature-img: 2024-06-15-enterprise-llms-vector-search-rag-identity.jpg
author: R. Dubnick
tags: [Enterprise, LLMs, RAG, Identity]
comments: false
published: true
---

The first generation of enterprise LLM deployments treated each of vector search, retrieval-augmented generation, and identity as separate concerns — vectorize the corpus, build a RAG pipeline, bolt on identity later. The deployments that have actually held up under real users and real auditors share a different pattern: identity is woven into retrieval from the first moment, not added after the demo works. By mid-2024, "identity-aware RAG" has become the practical default for any serious enterprise rollout.

The reasons are unglamorous but decisive: who can see what is the single most consequential design decision in any enterprise knowledge system, and the LLM doesn't get to override it.

### Why "Bolt-On Identity" Fails

The naive architecture goes like this: index the entire corpus into a vector store, retrieve relevant chunks per query, inject them into the prompt, generate the answer. Then later: "we'll add access control." When that "later" arrives, several specific failures show up:

The vector store has no concept of who's allowed to see which document. Filtering after retrieval is too late — relevance ranking has already used information from documents the user shouldn't see.

Documents inherit permissions from their source systems (SharePoint sites, network drives, Confluence spaces, Box folders) with rules that often go layers deep. Reproducing those rules at the retrieval layer is non-trivial, and any drift between the source and the index is a leak.

Sensitive documents tend to be the most useful — exactly the ones users want surfaced — and exactly the ones an unaware system surfaces to the wrong audience. The first incident is usually visible in CEO email threads.

These aren't edge cases. They're load-bearing requirements. Treating them as such from the start saves substantial rework.

### The Reference Architecture That's Working

The pattern that holds up has four layers, each with identity as a first-class concern.

**Source-of-truth permissions.** Permissions live in the system of record (SharePoint, Box, Confluence, etc.). The index does not own access control; it mirrors it. This means continuous synchronization — when a document's permissions change, the index reflects that change quickly enough that stale entitlements aren't exploitable.

**Identity-aware indexing.** Every chunk in the vector store carries metadata identifying who's allowed to see it. This usually takes the form of an access-control list, a group identifier, or a tenant identifier — sometimes all three. The exact representation matters less than the fact that it's present and queryable.

**Authorized retrieval.** Every query is executed in the context of the requesting user's identity. The vector store filters at retrieval time — only chunks the user is allowed to see can be candidates for the result set. Doing this correctly requires the vector store to support metadata filtering efficiently; most major options now do.

**Audit and traceability.** Every retrieval is logged with the user, the query, the chunks returned, and what was ultimately included in the prompt. This is the audit trail regulators and security teams will eventually ask for, and the operational signal teams need when something looks off.

### Identity Federation Considerations

The identity used for retrieval should be the user's identity, not a service account. This sounds obvious but trips up many implementations.

In practice this means: the LLM application authenticates the user (typically via the enterprise SSO), passes the user's identity into the retrieval call, and the vector store evaluates the user's group memberships against the chunk-level metadata. SCIM provisioning keeps the group memberships fresh. Token exchange or impersonation patterns push the identity through any intermediate services.

The alternative — a service account with broad read access, with the application "trusting" itself to filter — is the architecture that creates incidents. It works in development, fails in production, and is exactly the pattern security reviews catch (eventually).

### Where Vector Search Meets Structured Data

A nuance worth being explicit about: identity-aware RAG handles unstructured data well (documents, emails, transcripts), but a lot of enterprise knowledge lives in structured systems (CRM, ERP, ticketing). Combining them in a single answer surface requires a slightly richer architecture.

The pattern that works: the RAG layer handles unstructured retrieval with identity-aware filtering. A separate structured-data tool — text-to-SQL or a semantic-layer query — handles structured retrieval, also with the user's identity. The orchestration layer decides which to use per question, and the response layer combines them with proper attribution. Both paths inherit the user's permissions.

This is more architectural complexity than most teams initially want, but the payoff is a knowledge system that handles real business questions rather than just document Q&A.

### Operational Reality

A few hard-earned operational notes from teams that have shipped this:

Permission synchronization latency matters. If a document's access changes at 9 AM and the index updates at 3 PM, the six-hour gap is the leak window. Aim for synchronization on the order of minutes for sensitive corpora.

Group membership churn is constant. Joiners, movers, leavers, project teams forming and dissolving — the access surface changes daily in any sizable enterprise. The synchronization pipeline needs to handle this volume reliably.

User experience around "no answer" needs care. When a user asks a question and the answer exists but they don't have access, the response should not reveal that the document exists, but it should also not be misleadingly definitive. Calibrated language ("I don't have access to information that would answer this") matters.

### Conclusion

Enterprise LLM deployments in 2024 succeed or fail at the intersection of retrieval and identity. The teams getting this right treat them as inseparable from day one — identity-aware indexing, authorized retrieval, comprehensive audit, and tight synchronization with sources of truth. The teams treating identity as a second-phase concern keep discovering, the hard way, that retrofitting access control onto a working RAG pipeline is more expensive than building it in from the start. The architecture lesson is mundane but consistent: the LLM is impressive, but the access-control layer is what makes the system trustworthy.

### References

Microsoft (2024). *Microsoft Purview and AI: Data Governance for Generative AI Applications*.

OWASP (2024). *Top 10 for Large Language Model Applications*.

Google Cloud (2024). *Identity-Aware Retrieval for Generative AI*.

Pinecone (2024). *Metadata Filtering for Multi-Tenant RAG Applications*.

NIST (2024). *AI Risk Management Framework: Generative AI Profile*.
