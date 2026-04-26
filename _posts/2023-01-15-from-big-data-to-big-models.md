---
layout: post
title: "From Big Data to Big Models: The New Pipeline for Business Intelligence"
date: 2023-01-15 09:00 -0700
feature-img: 2023-01-15-from-big-data-to-big-models.jpg
author: R. Dubnick
tags: [Big-Data, LLMs, Business-Intelligence, Architecture]
comments: false
published: true
---

ChatGPT is six weeks old. Microsoft has just announced a multi-year, multi-billion-dollar extension of its OpenAI partnership. The conversation in enterprise data and analytics circles has shifted faster in those six weeks than it has in the previous several years. The shorthand "from big data to big models" doesn't capture the whole story, but it points at something real: the center of gravity in business intelligence is shifting from accumulating data to applying foundation models to it. The pipeline that the previous decade built — data lakes, warehouses, ETL, BI tools, data science workbenches — is suddenly being asked to interoperate with a kind of capability nobody designed it for.

The honest January 2023 observation is that "big data" investments are not obsolete; they are the substrate on which the "big model" wave has to land. The teams that integrate the two thoughtfully will pull ahead; the teams that treat one as a replacement for the other will struggle.

### Where the Last Decade Left Things

A short tour of where most enterprises sit going into 2023:

**Data lakes and lakehouses are mainstream.** Snowflake, Databricks, BigQuery, Redshift, and the various open-format alternatives (Iceberg, Delta, Hudi) have settled into the enterprise data stack. Storing large quantities of data is no longer the binding constraint.

**Streaming and real-time analytics are increasingly common.** Kafka, Kinesis, Pulsar, and equivalents are widely deployed; the patterns for stream-table joins and real-time materialized views are mature.

**Self-service BI has worked, partly.** Tableau, Power BI, Looker, and friends have democratized dashboards and exploration for the analyst population. They have not democratized analysis to the broader business population; the next-step user (a non-technical manager who wants to ask a question) still typically asks an analyst.

**Data quality and governance have improved.** Tools and disciplines around data lineage, data contracts, and data observability have moved from leading-edge to mainstream. Data is more trustworthy than it was five years ago, on average.

**Data science is operating at scale.** ML platforms (Sagemaker, Vertex AI, Azure ML, internal stacks) are reaching production maturity in many enterprises. Models in production for forecasting, recommendation, classification, and segmentation are normal.

The cumulative investment is substantial. The 2023 question is how this stack interoperates with foundation models, not whether to keep it.

### What Foundation Models Add to the Pipeline

A few specific things foundation models bring that the existing stack didn't:

**Natural-language interfaces over the data.** "Which products had the largest year-over-year growth in Q4 in the Northeast?" — the question that previously required an analyst to translate into SQL — is increasingly answerable directly. The translation from natural language to query, to result, to summary is an LLM-driven workflow that didn't exist before.

**Synthesis across structured and unstructured data.** Most enterprises have a substantial fraction of their valuable information outside the data warehouse — in documents, emails, meeting notes, support tickets, contracts. Foundation models are good at reading this content and surfacing what it says. Joining it with the structured data has been a hard problem; LLMs make it tractable in new ways.

**Summarization and explanation at scale.** A long report, a stack of customer feedback, a year of incident notes — summarized into a few useful paragraphs. The work that previously required human reading is increasingly something the model does first, with humans editing.

**Generation as a first-class operation.** Drafting reports, generating outreach, producing content variants. The pipeline gains an operation it didn't really have before: produce useful new content based on the data and a goal.

**Reasoning over context.** "Why is this customer at risk?" with the customer's history, recent interactions, and account state assembled into a context the model can reason over. This is a kind of analysis that previously required a human going through the same materials.

### How the Pipeline Has to Adapt

A few patterns that are becoming visible already in early 2023:

**Vector storage joins the warehouse and the lake.** The data architecture grows a third store — vectors — alongside structured (warehouse) and semi-structured (lake) data. The query patterns differ; the integration discipline is new.

**Identity and entitlements need to flow.** When a foundation model is answering questions over enterprise data, the same access controls that govern dashboards and reports need to govern the model's view of the data. This is not yet a solved problem in most stacks.

**Logging and audit get harder.** The auditable record of "what the user asked and what the system answered" is well-defined for SQL and dashboards. For LLM-driven analytics, it's a richer artifact — the question, the retrieved context, the prompt, the response, the citations — and the storage and access patterns need rethinking.

**Costs have a new shape.** Token-based pricing on the LLM, embedding generation costs, vector storage and search costs. The unit economics of analytics shift in ways the existing FinOps practices haven't caught up to.

**Quality discipline expands.** Dashboards that compute the same number every time can be tested and trusted. LLM answers that vary call for evaluation harnesses, output monitoring, and citation discipline. The analytics team's quality practices have to extend to a new kind of artifact.

### What "Big Model" Doesn't Replace

A few things worth being clear about:

**Foundation models do not replace the data warehouse.** The structured data is still where the structured truth lives. LLMs can interpret a natural-language question, generate a SQL query, run it, and summarize the result; they cannot substitute for the structured storage and computation underneath.

**They do not replace data quality discipline.** Garbage in, eloquent garbage out. The same data hygiene, lineage, and governance practices that mattered before matter more when the consumer of the data can produce confidently wrong answers from poor sources.

**They do not replace the data science team.** Predictive modeling, experimentation, causal inference, and the broader analytical work product are not what foundation models are designed for. The team's role grows; it doesn't get replaced.

**They do not eliminate the need for ETL.** Getting the right data into the right place in the right shape remains essential. A foundation model in front of a poorly structured data layer just exposes the structural problems faster.

### Practical Patterns Emerging in Q1 2023

A few patterns the early adopters are getting right:

**Treat the LLM as one component in the analytics stack, not the whole stack.** It's the natural-language interface, the summarizer, the synthesis layer; the warehouse and the data discipline are still load-bearing.

**Invest in retrieval as a first-class layer.** The model is only as good as what it can ground in. Embedding the right enterprise content with appropriate access controls is the new infrastructure project of 2023.

**Build evaluation harnesses for the new artifact type.** Sample real questions, capture the answers, judge them — as a continuous practice, not a one-time exercise. The teams that do this will know how their analytics surface is performing; the teams that don't will hear about quality problems from users.

**Design with citations from the start.** Every answer points to its source, not as a footnote but as a primary feature. The trust model for analytics depends on this.

**Stage rollouts carefully.** The natural-language analytics surface is exciting; it's also new. Start with low-stakes use cases, build confidence, expand the scope as the team learns where the system is reliable and where it isn't.

### Conclusion

The shift from big data to big models is not a replacement; it's an addition that reshapes how the data investments of the past decade get used. The 2023 work for enterprise data and analytics teams is to figure out how foundation models compose with their existing stack — what's load-bearing, what changes, what new disciplines have to be built. The stakes are real: the teams that adapt thoughtfully will produce a step-change in how their organizations consume analytics; the teams that wait will spend the next few years catching up to a category that's setting new expectations across the industry. The early movers will define the patterns; the rest of 2023 will be about which patterns survive contact with production scale and enterprise discipline.

### References

Bommasani, R. et al. (2021). *On the Opportunities and Risks of Foundation Models*. Stanford CRFM.

Microsoft (2023). *Microsoft and OpenAI Extend Partnership Announcement*.

Databricks (2023). *The Lakehouse Architecture for AI*.

Snowflake (2023). *Powering AI on the Data Cloud*.

a16z (2023). *Emerging Architectures for Modern Data Infrastructure*.
