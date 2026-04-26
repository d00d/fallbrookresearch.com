---
layout: post
title: "Scaling Apache Kafka in Cloud-Native Architectures"
date: 2022-06-15 09:00 -0700
feature-img: 2022-06-15-scaling-apache-kafka-cloud-native.jpg
author: R. Dubnick
tags: [Kafka, Streaming, Cloud-Native, Architecture]
comments: false
published: true
---

Apache Kafka 3.2 shipped last month, with KRaft consensus — the long-promised replacement for ZooKeeper — now production-ready for new clusters. Confluent Cloud, AWS MSK, Aiven, and Redpanda continue to compete on the managed-service edges of the same core. Strimzi has become the default operator for self-hosted Kafka on Kubernetes. The cumulative effect is that Kafka in 2022 is a different operational object than the Kafka of three years ago — and the cloud-native deployment patterns that have emerged are reshaping what scaling Kafka actually requires.

The honest June 2022 observation is that Kafka has become enterprise infrastructure in the same load-bearing sense as the relational database, and the operational discipline most organizations have built up around it is still catching up to that reality.

### Where Kafka Sits in the 2022 Stack

A short tour of where Kafka has settled into enterprise architectures:

**The event-streaming spine.** Kafka has become the de facto integration backbone for many enterprises, replacing point-to-point integrations and earlier-generation message brokers for most use cases. Microservices publish events; consumers subscribe. The pattern scales in ways the previous generation didn't.

**Operational data flow.** Change data capture from operational databases (Debezium and similar) into Kafka is a mature, widely-deployed pattern. Downstream consumers — analytics, search indexes, caches, materialized views — stay current without batch ETL.

**The streaming analytics platform.** Kafka Streams, ksqlDB, and external engines (Flink, Spark Streaming) consume from Kafka topics to produce real-time aggregations, alerts, and enriched events. The category has crossed from leading-edge to standard.

**The unified log.** Application logs, security events, and operational telemetry increasingly flow through Kafka before reaching the various sinks (SIEM, observability, archive). The pattern simplifies what would otherwise be a snarl of point-to-point integrations.

The substrate's importance has grown faster than most operations teams have adjusted. Outages are correspondingly more consequential than they were when Kafka was just one of several message brokers in the estate.

### What Changed Architecturally Through 2022

A few developments that have reshaped how Kafka is deployed and scaled:

**KRaft replaces ZooKeeper.** The decade-long dependency on ZooKeeper for cluster coordination is being retired. KRaft (Kafka Raft) consensus folds the metadata management into Kafka itself, removing an entire operational concern, simplifying deployment topologies, and improving scale ceilings. New clusters in 2022 increasingly start KRaft-only; existing clusters are on a multi-year migration path.

**Tiered storage.** The pattern of moving older log segments to cheaper object storage (S3, GCS, Azure Blob) while keeping recent segments on local disk has become a real production capability. Confluent Cloud has had it for a while; Apache Kafka itself is moving toward upstream support. The economic implications for long-retention use cases are significant.

**Kubernetes-native operation.** Strimzi has matured to the point that operating Kafka on Kubernetes is a reasonable default for many teams, not just an experiment. The operator handles the orchestration concerns that used to require dedicated tooling: cluster provisioning, rolling upgrades, certificate rotation, broker scaling.

**Multi-region patterns.** MirrorMaker 2, Cluster Linking (Confluent), and various active-active patterns have made multi-region Kafka deployments tractable. The discipline around what gets replicated where, with what latency, with what failure semantics, has matured.

### Where Scaling Gets Hard

Honest accounting of friction patterns at production scale:

**Partition counts grow faster than expected.** A topic that started with 12 partitions because someone read that was reasonable ends up needing 240 a year later. Repartitioning is expensive. Capacity planning that doesn't account for partition growth ends up in expensive migration projects.

**Rebalancing storms.** When a broker goes down or a consumer group changes shape, the rebalance can pause processing for seconds to minutes. Cooperative rebalancing helps; static membership helps; the operational discipline of testing rebalance behavior under realistic conditions is the actual mitigation.

**Lag visibility lags.** Consumer lag is the most common production indicator, and it's often instrumented after the fact. Teams that wait until they have a problem to add lag monitoring discover it during the problem.

**Schema evolution under pressure.** A schema change that's compatible in the schema registry but incompatible with downstream consumers' parsing logic is a common production incident class. Schema evolution discipline — required compatibility modes, contract testing, staged rollouts — is real engineering work.

**Cross-region replication latencies.** Active-active patterns work; they don't make the speed of light any faster. Conflict resolution semantics that work in theory sometimes don't work in the production data shape. Testing the edge cases is the only honest answer.

### Operational Discipline for 2022 Kafka

A few practices the more mature operators have converged on:

**Capacity planning as continuous practice, not annual exercise.** Throughput, partition count, retention, and consumer count drift constantly. Capacity reviews monthly outperform comprehensive reviews quarterly.

**Schema management as governance.** A schema registry that's optional ends up partially populated; one that's required and integrated with CI/CD is load-bearing. The latter pattern correlates strongly with cleaner long-term operation.

**Topic naming and lifecycle as standards.** Naming conventions, ownership tags, retention defaults, and deprecation procedures sound bureaucratic and pay for themselves the first time the team needs to figure out who owns a five-year-old topic.

**Multi-cluster from the start.** Treating Kafka as a single cluster that grows forever is the wrong shape for most enterprise deployments. Logical isolation by domain, environment, or sensitivity, with explicit replication paths between clusters, scales better and contains incidents better.

**Observability built on the broker telemetry, not on consumer-side polling.** JMX metrics, broker-side request rates and latencies, log compaction state, and disk telemetry are the load-bearing signals. Consumer-side monitoring is necessary but not sufficient.

### Cloud-Native Deployment Patterns

A few patterns from teams running Kafka well on cloud platforms in 2022:

**Managed services for the common cases, self-hosted for the specialized ones.** MSK, Confluent Cloud, and Aiven cover the operational concerns well for most workloads. Specialized requirements — extreme-low-latency, very-large clusters, specific compliance constraints — sometimes still favor self-hosted on Kubernetes via Strimzi. The choice should be deliberate.

**Tiered storage as a default for retention.** Long-retention use cases that previously required dedicated storage planning now use tiered storage as the design pattern. The unit economics shift the architectural decisions for archive, replay, and compliance retention.

**Identity-based access through OAuth or SASL.** The earlier patterns of broker-level ACLs without strong identity are being replaced. OAuth integration with the enterprise identity provider is increasingly the default, with audit and rotation capabilities to match.

**Encryption end-to-end.** TLS in flight is table stakes; producer/consumer-side encryption for the most sensitive payloads is increasingly common. The schema registry's role expands to include the cryptographic patterns.

### What's Worth Watching Through 2022

A few directions visible from this vantage point:

KRaft adoption will accelerate as the ZooKeeper-less path stabilizes. By the end of 2022, new green-field deployments without ZooKeeper will be the norm.

The streaming-analytics layer will keep consolidating around Apache Flink. The combination of broad capability, healthy community, and managed-service availability (Amazon Kinesis Data Analytics for Apache Flink, Ververica Platform, Confluent Cloud Flink) is pulling workloads that historically split between Kafka Streams, Spark Streaming, and bespoke approaches.

Redpanda's pressure on the Apache project will continue to push performance and operational simplicity expectations.

Multi-region patterns will become more standardized. The operational maturity around active-active is closer than it was a year ago.

### Conclusion

Kafka in 2022 is enterprise infrastructure in the strongest sense, and scaling it well is more about operational discipline than about the technology itself. For most enterprises, the right pattern is to invest deliberately in capacity planning, schema governance, multi-cluster architecture, and observability — and to choose the managed service that matches the operational maturity available, defaulting to managed for cases where bespoke operation isn't a competitive advantage. The infrastructure layer matters more than it used to; treating it that way is the work of this year.

### References

Apache Kafka (2022). *Documentation, Release 3.2*.

KIP-500: *Replace ZooKeeper with a Self-Managed Metadata Quorum (KRaft)*.

Confluent (2022). *Tiered Storage for Apache Kafka*.

Strimzi Operator Documentation (2022).

Kreps, J. (2014). *I Heart Logs*. O'Reilly.
