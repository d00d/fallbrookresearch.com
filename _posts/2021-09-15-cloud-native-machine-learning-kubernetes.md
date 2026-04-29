---
layout: post
title: "Cloud-Native Machine Learning: Running ML Pipelines in Kubernetes"
date: 2021-09-15 09:00 -0700
feature-img: 2021-09-15-cloud-native-machine-learning-kubernetes.jpg
author: R. Dubnick
tags: [Kubernetes, MLOps, Cloud-Native, Pipelines]
comments: false
published: true
---

Kubeflow 1.4 shipped earlier this year with substantial improvements to the pipeline component model and a more coherent multi-tenancy story. KFServing has been renamed KServe and moved to its own governance under the LF AI Foundation. Ray on Kubernetes is increasingly the default deployment for distributed training and tuning workloads. NVIDIA's GPU Operator has matured to where running mixed GPU workloads on shared clusters is operationally tractable. Argo Workflows has continued to grow as the workflow engine of choice for ML pipelines that don't fit cleanly into Kubeflow Pipelines. The 2021 question for ML platform teams is no longer whether Kubernetes is a viable substrate for ML workloads; it's which patterns to adopt, what to build versus what to buy, and how to compose the increasingly rich ecosystem into a coherent platform.

The honest September 2021 observation is that cloud-native ML on Kubernetes has crossed from leading-edge to mainstream, and the gap between teams that have a real platform and those that have a collection of YAML files is now visible in delivery velocity.

### Why Kubernetes for ML

A short tour of the substantive reasons ML platforms are increasingly built on Kubernetes:

**Resource scheduling at scale.** ML workloads have varied resource shapes — small CPU jobs for data preparation, large GPU jobs for training, multi-node distributed jobs for very large models, and inference services with their own scaling characteristics. Kubernetes is the most mature platform for scheduling heterogeneous workloads on shared infrastructure.

**The portability story.** A workload defined in Kubernetes manifests runs on EKS, GKE, AKS, OpenShift, or on-premises Kubernetes with relatively low porting cost. For ML platforms that span clouds or include on-premises components, this is meaningful.

**The composition story.** The Kubernetes ecosystem includes mature components for nearly every part of the ML stack — training operators, serving frameworks, pipeline orchestrators, observability, identity, networking. Composing them is real engineering work but the components exist.

**Multi-tenancy.** Multiple teams sharing the same cluster, with isolation between their workloads, is a problem Kubernetes has spent years solving. The patterns (namespaces, resource quotas, network policies, RBAC) carry over to ML use cases.

**Operational continuity with the rest of the platform.** Organizations already operating Kubernetes for application workloads can extend the same operational practices — CI/CD, observability, security, capacity planning — to ML workloads, rather than building a separate operational discipline.

### The 2021 Stack Components

A short tour of components that have crystallized into recognizable categories:

**Training operators.** Kubeflow Training Operator (formerly the per-framework operators — TFJob, PyTorchJob, MPIJob — now consolidated). Runs distributed training jobs as Kubernetes-native resources, handling pod lifecycles, restart, and basic gang scheduling.

**Pipeline orchestration.** Kubeflow Pipelines for end-to-end ML workflows; Argo Workflows for more general-purpose workflow orchestration; Tekton for build pipelines that include ML steps. The boundary between these is fuzzy and the choice depends on team preferences.

**Hyperparameter tuning.** Katib (under Kubeflow) for distributed tuning. Ray Tune deployed on Kubernetes for the more flexible alternative. Both production-ready in 2021.

**Distributed compute.** Ray on Kubernetes via the Ray Operator for distributed Python workloads (training, tuning, RL, serving). Spark Operator for Spark workloads. Dask via the Dask Kubernetes operator for Pandas-style distributed computation.

**Model serving.** KServe (formerly KFServing) for serverless model serving with auto-scaling, canary, explainability, and monitoring. NVIDIA Triton for high-performance multi-model inference. Seldon Core for richer pre/post-processing pipelines around models. BentoML for the framework-agnostic packaging and deployment story.

**Feature stores.** Feast deployed on Kubernetes; Hopsworks; Tecton (commercial, integrating with Kubernetes-native deployments). The feature-store category has consolidated meaningfully through 2021.

**GPU resource management.** NVIDIA GPU Operator for installing and managing GPU drivers, CUDA, and the device plugin. Multi-Instance GPU (MIG) support on A100s for partitioning a single GPU across multiple workloads.

**Storage for ML data.** Persistent volume claims for model artifacts; CSI drivers for cloud object storage; specialized solutions (Pachyderm, JuiceFS, MinIO) for ML-specific storage patterns.

### Where Cloud-Native ML Earns Its Keep

A few categories where the discipline has translated into measurable outcomes:

**Multi-team ML platforms.** Several ML teams sharing a single Kubernetes-based platform with namespace isolation, resource quotas, and shared services (registry, feature store, monitoring) outperform fragmented per-team approaches.

**Cost discipline.** Spot/preemptible instance support, mixed instance types, GPU sharing through MIG, and auto-scaling work cleanly when ML workloads are running on the cluster scheduler. Cost transparency tooling (Kubecost and similar) provides visibility that less-orchestrated approaches struggle to match.

**Reproducibility.** A training job defined as a Kubernetes manifest with explicit container images, resource requirements, and environment is more reproducible than ad hoc submission to varied infrastructure. Small wins individually; large wins cumulatively.

**Hybrid deployments.** Organizations with mixed cloud and on-premises constraints get a more coherent operational picture from running ML on Kubernetes everywhere than from operating different platforms in different locations.

**Integration with the application platform.** ML services that need to be called from production applications integrate naturally when both are deployed on the same Kubernetes platform, with the same identity, observability, and networking patterns.

### Where It's Still Hard

Honest accounting of friction patterns visible in production:

**The learning curve is real.** Kubernetes has a substantial conceptual surface area, and the ML-specific ecosystem adds more. Data scientists who haven't lived in Kubernetes find the operational details overwhelming. Platform teams need to abstract this away thoughtfully.

**GPU operations are non-trivial.** Driver compatibility, CUDA versions, multi-tenancy across GPUs, mixed GPU types in the same cluster, and the perpetual capacity-shortage scheduling fights all need explicit attention. The GPU Operator helps; it doesn't make everything easy.

**Distributed training networking.** All-reduce gradient synchronization at scale benefits enormously from RDMA, NVLink between GPUs, and high-bandwidth network fabrics. Generic Kubernetes networking is often the bottleneck, and the configurations to overcome it are non-trivial.

**Storage for large datasets and model artifacts.** Pulling large datasets to ephemeral pod storage on every job is wasteful; persistent caching introduces consistency questions; cloud object storage as primary I/O has performance characteristics that don't always match training-loop expectations. Each option has trade-offs.

**Pipeline complexity outgrows the visualization tools.** A pipeline that started simple grows to dozens of components; debugging failures across the graph is harder than the UIs make it look. Better observability is the answer; the gap is real.

**Multi-cluster federation.** Operating ML platforms across multiple clusters (different regions, different cloud providers) is technically possible but operationally harder than the marketing suggests. Most organizations stay single-cluster longer than they should.

### Build vs. Buy in 2021

A few patterns that have emerged for the build/buy decision:

**Buy the substrate (managed Kubernetes).** Operating Kubernetes itself is not where ML platform teams should be spending their time. EKS, GKE, AKS, or OpenShift is the right default.

**Adopt mature open-source for the well-defined components.** KServe for serving, Kubeflow Training Operator for distributed training, Argo Workflows or Kubeflow Pipelines for orchestration. These are battle-tested, well-supported, and broadly adopted.

**Buy commercial platforms when speed matters more than control.** Determined AI, Anyscale, Iguazio, ClearML, Polyaxon — commercial platforms that bundle ML-specific opinions on top of Kubernetes. Faster time-to-value at the cost of less flexibility.

**Cloud-native bundles when single-cloud is fine.** SageMaker Studio + EKS, Vertex AI Pipelines + GKE, Azure ML + AKS. The integration into the cloud's broader services is meaningful for single-cloud organizations.

**Build only what's specific to your needs.** Internal portal, organization-specific abstractions, integration with internal services, custom compliance requirements. The component ecosystem is mature enough that teams don't need to build the substrate themselves.

### Practical Patterns

A few patterns the more mature ML platform teams have converged on:

**Treat the platform as a product.** Owners, roadmap, internal users as customers, SLOs, documentation. Without this discipline, the platform becomes a collection of YAML files maintained by individual heroes.

**Invest in developer experience for data scientists.** A platform that requires data scientists to learn Kubernetes deeply will not get adopted. Notebook integrations, command-line tools that abstract the YAML, and self-service workflows pay off in adoption.

**Standardize on a small set of patterns.** Three blessed ways to train, two to serve, one to run a pipeline. Many ways to do everything produces operational chaos.

**Build observability into the platform, not on top of it.** Metrics, logs, traces, and ML-specific signals (training progress, drift, model performance) all need to be part of the platform from the start.

**Plan capacity deliberately.** GPU clusters are expensive. The discipline of right-sizing, sharing, and forecasting is worth real engineering effort.

### What's Worth Watching

A few directions visible from this vantage point:

The Kubernetes-native ML ecosystem will keep consolidating. Some current overlapping projects will merge or be deprecated as the category matures.

Multi-cluster ML platforms will become more practical. The federation tooling is improving; the operational discipline around it is converging.

Specialized AI accelerators (AWS Trainium and Inferentia, Google TPU v4, Habana Gaudi) will need first-class Kubernetes integration. The current state varies significantly across providers.

The line between "ML platform" and "data platform" will blur further. Feature stores, training data pipelines, and ML-aware orchestration are increasingly the same conversation as DataOps.

### Conclusion

Cloud-native ML on Kubernetes in 2021 has matured into a recognizable platform discipline with a recognizable stack. For most enterprises building or scaling ML platforms, the right pattern is to commit to managed Kubernetes as the substrate, adopt the well-established open-source components for the well-defined problems, layer commercial or cloud-native platforms where speed matters, and invest in the developer experience and operational discipline that distinguish a platform from a collection of manifests. The technology is no longer the bottleneck; the engineering discipline of using it well is what differentiates teams.

### References

Kubeflow Project (2021). *Kubeflow 1.4 Documentation*.

KServe Project (2021). *KServe Documentation*.

Cloud Native Computing Foundation (2021). *Cloud Native ML Landscape*.

Ray Project (2021). *Ray on Kubernetes*.

NVIDIA (2021). *GPU Operator and Multi-Instance GPU Documentation*.
