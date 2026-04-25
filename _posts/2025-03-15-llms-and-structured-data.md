---
layout: post
title: "LLMs and Structured Data: Making Language Models Play Well with Databases"
date: 2025-03-15 09:00 -0700
feature-img: 2025-03-15-llms-and-structured-data.jpg
author: R. Dubnick
tags: [LLMs, Databases, GenAI, Architecture]
comments: false
published: true
---

For the first wave of LLM deployments, "data" mostly meant documents — PDFs, wikis, tickets, unstructured text. But the majority of enterprise data lives somewhere more structured: transactional databases, data warehouses, spreadsheets, event streams. By early 2025, the real unlock for many business use cases isn't better document RAG — it's getting LLMs to work reliably against structured sources without hallucinating column names or generating queries that bring down production.

It's a problem that looks easy from a demo and is genuinely hard in production.

### Why Naive Text-to-SQL Isn't Enough

The reference demo — user asks a question in English, LLM generates SQL, database returns answer — works surprisingly well on simple schemas and curated examples. It works noticeably less well on a real enterprise warehouse with 3,000 tables, inconsistent naming, legacy columns no one remembers why they exist, and business logic encoded in views that the LLM has no way to discover.

The failure modes are predictable and costly: the model joins on the wrong key, picks the wrong customer table (there are four), filters on a status value that no longer exists, or generates a query that scans a 40-billion-row table without partitioning. The answer comes back plausible-looking and wrong. Worse, users often don't have the expertise to notice.

### Patterns That Are Actually Working

Four patterns have emerged as reliable foundations:

**Semantic layers as a shield.** Rather than exposing raw tables to the LLM, a curated semantic layer — metrics, dimensions, approved joins — becomes the interface. Tools like dbt's semantic layer, Cube, and Looker's LookML serve this purpose. The LLM queries the semantic layer, which handles the actual SQL. The surface area is smaller, the business logic is centralized, and the results are reproducible across tools.

**Schema retrieval, not schema dumping.** Instead of stuffing an entire schema into every prompt, relevant tables, columns, and example queries are retrieved per question. This scales to large warehouses and keeps the LLM focused on the actually-relevant subset.

**Query validation before execution.** Generated queries are parsed, linted, and dry-run against the warehouse before being executed. This catches hallucinated columns, broken joins, and potentially expensive queries before they do damage. Some systems also enforce query budgets and row limits as a safety net.

**Human-verifiable explanations.** The best systems don't just return an answer; they return the query, the assumed definitions, and the reasoning in plain language, so a skeptical user can sanity-check the interpretation. The answer is "quarterly revenue was $18M" and also "I interpreted 'revenue' as net_revenue, used the fiscal_quarter calendar, and excluded refunded transactions — here's the SQL."

### Tabular Data Is Not Just SQL

A lot of structured-data work is CSV and Excel, not database queries. LLMs are improving at reading tabular data directly, but the failure modes differ: long spreadsheets exceed context, semantic meaning is buried in headers or comments, and relationships across sheets require navigation.

Production patterns here usually involve a code-interpreter-style environment where the LLM writes and executes analysis code (typically Python with pandas), reads results, and iterates. This works well for bounded analytical tasks ("summarize expense trends"), poorly for open-ended tasks, and requires care around sandboxing and data exfiltration.

### The Agent-Plus-Tool Pattern

Many 2025 production systems frame structured-data access as an agentic tool-use problem. The agent has tools like `search_tables`, `describe_table`, `run_query`, `summarize_results`. It decomposes the question, explores the schema, drafts and refines queries, and produces an answer with evidence.

This works because it mirrors how an analyst actually works — explore, hypothesize, query, iterate. The cost is latency (several LLM calls per question) and the need for careful tool design. The payoff is handling questions that single-shot text-to-SQL can't touch.

### Governance, Access, and Auditing

Structured-data access raises governance questions more sharply than document retrieval does. Documents have varying sensitivity, but a query against a customer table can return personally identifiable data by the millions. Production deployments enforce:

Row- and column-level security tied to the requesting user's identity — the LLM has no more access than the user does. Query logging with the generated SQL, the user, and the result set size, retained for audit. Explicit approval flows for queries above a cost or row-count threshold. Data-loss-prevention checks on results returned to the user.

The consistent theme: the LLM's capabilities inherit the same controls as a human analyst would, not greater ones.

### What's Still Hard

Joining across operational systems without a semantic layer remains a mess. Dealing with data quality issues — nulls, duplicates, stale definitions — requires the kind of judgment that LLMs still handle inconsistently. And questions that require historical awareness of business change ("our definition of active customer changed in 2023") need documentation the LLM has no way to discover unless it's been explicitly surfaced.

The honest 2025 assessment: text-to-data works well for well-governed, well-documented warehouses. In messier environments, the LLM exposes how much tribal knowledge was quietly keeping things running.

### Conclusion

Getting LLMs to work reliably against structured data is less about better prompting and more about the unglamorous foundations: semantic layers, schema metadata, access controls, query validation. Teams that invested in data governance before the LLM wave are ahead; teams treating text-to-SQL as a shortcut around that work are still learning why governance existed.

For 2025, the realistic goal isn't "replace the analyst." It's "make the analyst dramatically faster, and give non-analysts a safer way to ask questions."

### References

Pourreza, M. & Rafiei, D. (2023). *DIN-SQL: Decomposed In-Context Learning of Text-to-SQL*. NeurIPS 2023.

Rajkumar, N. et al. (2022). *Evaluating the Text-to-SQL Capabilities of Large Language Models*.

Deng, X. et al. (2022). *Recent Advances in Text-to-SQL: A Survey*.

dbt Labs (2024). *The Semantic Layer: Documentation and Best Practices*.

Cheng, Z. et al. (2023). *Binding Language Models in Symbolic Languages*. ICLR 2023.
