---
layout: post
title: "DataOps: Operationalizing the Entire Data Lifecycle"
date: 2021-06-15 09:00 -0700
feature-img: 2021-06-15-dataops-operationalizing-data-lifecycle.jpg
author: R. Dubnick
tags: [DataOps, dbt, Observability, Data-Engineering]
comments: false
published: true
---

dbt Labs (then still Fishtown Analytics) raised a Series B in June of last year and has been on a tear since; the dbt community has crossed twenty thousand practitioners. Monte Carlo, Bigeye, and Datafold are defining a recognizable category around data observability that didn't exist eighteen months ago. Atlan and OpenMetadata are pushing the metadata-platform category toward maturity. The conversation in enterprise data circles has shifted from "we need a data warehouse" — that question is mostly settled — to "how do we operate the data warehouse, the lake, the pipelines, and the analytics on top of them with the same discipline software engineering teams have spent the past decade building."

The honest June 2021 observation is that DataOps as a category is finally crystallizing into something operational rather than aspirational, and the gap between organizations doing it deliberately and those doing it ad hoc is now visible in business outcomes.

### What DataOps Actually Is

A useful clarification: DataOps is not just DevOps applied to data, though it borrows the framing. It's the operational discipline applied to the data lifecycle — ingestion, transformation, modeling, serving, and consumption — with attention to the concerns that don't have clean software analogs.

A working definition: the practices, tools, and organizational patterns that produce reliable, trustworthy, and timely data products at scale, with the same operational rigor that mature software engineering applies to applications.

The inheritance from DevOps is real — version control, automated testing, continuous integration, monitoring, incident response — but the data-specific additions matter:

**Data quality as a first-class testable property.** Data tests that run continuously, distinct from software unit tests, validating that the data conforms to expected shape, freshness, completeness, and reasonableness.

**Data lineage and provenance.** Knowing which downstream consumers depend on which upstream sources, and being able to trace any data point back to its origin, is a category of work software engineering doesn't have.

**Data freshness and timeliness as SLOs.** "The dashboard is current as of an hour ago" is a meaningful service-level objective with operational implications, not just a nice-to-have.

**Data observability as a distinct discipline.** Detecting and responding to data quality problems in production is operationally similar to but materially different from application observability.

### Where DataOps Is Earning Its Keep

A few categories where the discipline has translated into measurable outcomes:

**Trust in analytical reporting.** When the data team can show that pipelines pass their tests, lineage is documented, and observability flags issues before consumers notice, executive trust in the data improves measurably. The reverse case — where every report comes with caveats — has organizational costs that dwarf the engineering cost of doing the work.

**Faster iteration on data products.** Properly tested pipelines can be modified with confidence; pipelines that aren't tested accumulate fragility that slows every change. Mature DataOps programs ship pipeline changes in days where less mature ones take weeks.

**Incident response.** When a downstream report is wrong, knowing within minutes which upstream change caused it — and being able to roll back — is qualitatively different from spending days investigating. The lineage and observability investments pay off here directly.

**Cross-team consistency.** When the data engineering function operates with shared standards, multiple teams' outputs interoperate. When each team operates idiosyncratically, the data warehouse becomes an archaeology project.

**Audit and compliance posture.** Documented testing, lineage, and approval workflows are increasingly demanded by regulators and auditors. Organizations that built these into their day-to-day operations are positioned well; those that didn't are building them retroactively under pressure.

### The 2021 Tooling Landscape

A short tour of what's mature enough to use in production:

**Transformation: dbt.** The de facto open-source default for SQL-based transformation in cloud warehouses. Composable models, testing, documentation, version control. Has become close to a standard for modern data stacks. dbt Cloud provides managed orchestration.

**Orchestration: Airflow, Dagster, Prefect.** Airflow remains the most widely-deployed orchestrator. Dagster and Prefect are growing fast as more opinionated alternatives with stronger data-asset abstractions and developer experience. The choice depends on team preferences and integration needs.

**Data observability: Monte Carlo, Bigeye, Datafold, Soda.** The newest mature category. Detect data quality issues, drift, freshness violations, and schema changes; alert and triage. Monte Carlo is the category-creator and most established; the others differentiate on specific dimensions.

**Metadata and catalog: Atlan, Alation, Collibra, OpenMetadata, DataHub.** Discoverability, lineage, governance. The category has consolidated around a few mature options; the open-source side (DataHub from LinkedIn, OpenMetadata) has become credible.

**Reverse ETL: Census, Hightouch, RudderStack.** Move data from warehouses to operational systems (Salesforce, marketing tools, support systems). The "warehouse-out" pattern that's reshaping how operational data flows.

**Quality testing: Great Expectations, dbt tests, Soda Core.** Open-source frameworks for declaring and running data quality assertions. Compose with the orchestration and observability layers.

### Build vs. Buy in 2021

A few patterns that have emerged for the build/buy decision:

**Default to dbt for SQL transformation.** It's the right answer for most organizations. Custom pipelines built with raw Python and ad-hoc SQL produce technical debt that dbt's structure prevents.

**Buy data observability when scale justifies it.** Below some scale (small number of pipelines, small team), open-source quality testing plus alerting is sufficient. Above that scale, the commercial observability platforms earn their cost in reduced incident time and proactive issue detection.

**Compose the rest from the modern data stack.** Fivetran or Stitch for ingestion, Snowflake or BigQuery or Databricks for warehouse, dbt for transformation, dbt Cloud or Airflow for orchestration, Monte Carlo or similar for observability, Census or Hightouch for activation, Looker or Tableau for visualization. The "modern data stack" has become a recognizable composition.

**Custom-build only where the use case is genuinely unique.** Most organizations don't have data engineering problems that require novel architecture. The composition of mature components produces better results than custom infrastructure.

### Where DataOps Is Still Hard

Honest accounting of friction patterns at production scale:

**Cross-team coordination.** Data products span multiple producing teams, multiple consuming teams, and a central data engineering function. Standards, conventions, and SLAs across this surface are organizational work that the tools don't solve.

**Data quality testing scope.** Easy to write tests for the obvious properties (uniqueness, not-null, range checks); harder to write tests for the properties that matter most (semantic correctness, business-rule conformance, anomaly detection). The test suite tends to grow toward what's easy to test rather than what's most important.

**Pipeline complexity outgrows the tools.** Workflow graphs that started simple grow to thousands of nodes. The orchestrators handle this technically; the human comprehension and ownership doesn't always scale similarly.

**Cost visibility.** Modern data stacks accumulate cost in places that aren't always obvious — orphaned pipelines, oversized warehouse instances, data observability with too-fine cardinality. FinOps for data platforms is immature relative to general cloud FinOps.

**Drift between operational and analytical schemas.** When a product team changes a schema in their operational database, the analytics pipelines downstream break. Schema contracts and contract testing are emerging as the discipline; adoption is uneven.

### Practical Patterns

A few patterns the more mature programs have converged on:

**Treat data products like software products.** Owners, roadmaps, SLAs, deprecation policies, documentation. The product framing changes how the work gets prioritized and how consumers engage with it.

**Test in CI, not in production discovery.** dbt tests in CI catch breaking changes before they reach production. Schema validations on every PR. The discipline that software engineering takes for granted is still emerging in many data teams.

**Instrument for observability before incidents.** Adding monitoring after a data incident is the wrong shape. Adding it deliberately at pipeline creation is the right shape.

**Document lineage explicitly.** Even the best automatic lineage tools miss things. Hand-curated documentation of critical lineage relationships pays off in incidents.

**Pick a data quality framework and use it consistently.** Great Expectations, dbt tests, Soda — pick one as the standard, use it everywhere, integrate with orchestration and alerting. Fragmented approaches produce fragmented quality.

### What's Worth Watching Through 2021

A few directions visible from this vantage point:

The "modern data stack" composition will keep maturing. Expect consolidation in the categories that currently have many vendors (orchestration, observability, catalog) and continued specialization in the ones that have fewer (quality testing, contract management).

Real-time data products are emerging from streaming infrastructure. The architectural patterns for "DataOps for streaming" are less mature than for batch; expect this to be active territory through the next year.

Data contracts (formal agreements between data producers and consumers) are starting to show up in early-adopter organizations. The pattern is promising; the tooling is early.

The metadata layer will become more central. As data estates grow, the metadata that describes them — lineage, ownership, quality, definitions — becomes load-bearing infrastructure rather than a nice-to-have.

### Conclusion

DataOps in 2021 has crossed from aspirational framing into operational discipline. For most enterprises with data platforms of meaningful scale, the right pattern is to invest in the modern data stack composition deliberately, build the practices around it consistently (testing, observability, lineage, documentation), and treat data products with the same product discipline that software engineering applies to applications. The gap between organizations doing this well and those doing it ad hoc is widening; closing it is the work of this year for data teams that haven't yet started.

### References

Atwood, B. (2018). *DataOps: The Authoritative Edition*. Eckerson Group.

Lakshmanan, V. & Robinson, S. (2020). *Data Science on the Google Cloud Platform*.

Bornstein, M., Casado, M., Li, J. (2020). *Emerging Architectures for Modern Data Infrastructure*. a16z.

Monte Carlo Data (2021). *The State of Data Quality*.

dbt Labs (2021). *Analytics Engineering Maturity Model*.
