---
layout: post
title: "Serverless for Data Science: A New Paradigm for Lightweight AI Workloads"
date: 2022-07-15 09:00 -0700
feature-img: 2022-07-15-serverless-for-data-science.jpg
author: R. Dubnick
tags: [Serverless, Data-Science, Cloud, MLOps]
comments: false
published: true
---

AWS Lambda turned eight last fall and is now responsible for a non-trivial portion of the workloads running on AWS. SageMaker Serverless Inference, which went GA in December, has been finding production traction faster than the prior wave of SageMaker capabilities. Google Cloud Functions 2nd gen graduated to GA in May. Modal, Anyscale, and a small wave of newer serverless platforms purpose-built for ML workloads are pulling early-adopter attention. The 2022 question for data science teams is no longer whether serverless is a real platform; it's which workloads belong on it, and what the operational discipline around running data science code without servers actually looks like.

The honest July 2022 observation is that serverless has become the right default for a meaningful slice of data science work, and that the slice is bigger than most teams currently use it for.

### What "Serverless" Means for Data Science Workloads

A useful clarification: "serverless" covers a few different things that have different implications for data science specifically.

**Function-as-a-service (FaaS).** Lambda, Cloud Functions, Azure Functions. Short-lived, event-triggered execution with quick cold starts and bounded compute. Strong fit for lightweight inference, event-driven scoring, and ETL on demand.

**Container-based serverless.** AWS Fargate, Cloud Run, Container Apps. Longer-running containers with auto-scaling and pay-for-use pricing. Better fit for workloads that exceed FaaS limits — larger models, longer execution, more memory.

**Serverless inference platforms.** SageMaker Serverless Inference, Vertex AI's serverless endpoints, Azure Container Instances for inference. Purpose-built for the model-serving pattern with auto-scaling to zero and pay-per-invocation pricing.

**Notebook and training serverless.** Modal, Anyscale, Replicate, and others abstracting the compute pool further. Run a training job or notebook without provisioning anything; the platform handles the underlying instances.

The four categories overlap and the boundaries are getting fuzzier through 2022, but the data science team's choice between them depends meaningfully on the workload shape.

### Where Serverless Is Earning Its Keep

A few categories where the pattern is producing real benefit for data science teams:

**Lightweight inference at variable load.** A scikit-learn or small PyTorch model serving requests with bursty traffic patterns. Lambda or SageMaker Serverless Inference scales to the demand without paying for idle instances. The economics are clearly better than always-on for variable workloads.

**Event-driven feature engineering.** A new transaction lands; a Lambda runs the feature calculations; the features land in the feature store. The pipeline scales naturally with the event rate, with no scheduling overhead.

**On-demand batch ETL.** Pipelines that run periodically or in response to upstream changes. Step Functions plus Lambda, or Cloud Composer with Cloud Functions, replaces the dedicated EMR cluster that used to spin up for batch jobs.

**Notebook-as-a-job.** Modal, Replicate, and similar platforms let data scientists run a notebook against substantial compute (including GPUs) without provisioning. The iteration speed for exploratory work improves; the cost shape is closer to actual use.

**Document and image processing pipelines.** OCR, classification, extraction. Each document becomes an event; the function processes it; results land in the next stage. The pattern composes well with cloud-native object storage.

### Where Serverless Doesn't Fit Well Yet

Honest accounting of the limits as they sit in mid-2022:

**Large model inference.** Models above the FaaS memory limits (10 GB on Lambda, less on others) can't run there. Container-based serverless or dedicated inference helps; very large models still want dedicated infrastructure.

**Cold-start sensitive applications.** A model that hasn't been invoked recently spends seconds spinning up. For applications that need consistent sub-100ms responses, serverless requires either provisioned concurrency (which partially defeats the purpose) or a different deployment pattern.

**GPU-dependent workloads.** GPU serverless is happening — SageMaker Serverless Inference recently added GPU support; specialized providers like Modal are shipping it — but it's expensive, the cold-start cost is high, and the available instance types are limited. For 2022, persistent GPU instances remain the better fit for most GPU inference at scale.

**Long-running training jobs.** Training that lasts hours or days isn't a serverless workload. Spot/preemptible instances or reserved capacity through orchestrators (SageMaker Training, Vertex AI Training, Kubernetes-based stacks) is the right pattern.

**Heavy data movement.** Pipelines that move large volumes of data through the function are bottlenecked by ingress/egress and the concurrency limits. Streaming through Kafka or Pulsar to consumers running on dedicated infrastructure usually outperforms a serverless intermediate stage at high throughput.

### The Cost Mechanics Worth Understanding

A few specifics that catch teams new to serverless:

**Cold starts have meaningful tail latency cost.** A function not warm spends 1-15 seconds initializing for ML workloads (longer for Python with heavy ML dependencies). The p50 latency might be fine; the p99 is dominated by cold starts. Provisioned concurrency mitigates this at the cost of paying for idle.

**Memory configuration drives cost more than execution time.** Lambda billing is memory-time. Right-sizing memory matters; over-provisioning has a direct cost.

**Concurrency limits are real.** Account-level concurrency limits hit at unexpected times. Production deployments need explicit concurrency planning, not just trust in auto-scaling.

**The egress and storage bills can dominate.** Serverless compute is cheap; the data movement around it isn't necessarily. Pipelines that pull large datasets from S3 on every invocation can run up storage-side bills that exceed the compute bills several times over.

**Always-on alternatives are sometimes cheaper at high steady load.** The crossover point — beyond which a dedicated instance is cheaper than the serverless equivalent — depends on the workload but it's not at very high load. Monitoring this is worth doing.

### The Operational Discipline Around Serverless ML

A few patterns the more mature teams have converged on:

**Treat the function package as a versioned artifact.** Container images, layered Lambda packages, and serverless inference container artifacts are deployable units that benefit from the same versioning and CI/CD discipline as any production service.

**Separate the model from the function.** The function loads the model from a versioned location (model registry, S3 with object versioning) at cold start. Updating the model doesn't require redeploying the function.

**Instrument cold starts and tail latency explicitly.** The serverless platform's metrics often hide cold-start behavior. Custom telemetry that distinguishes warm and cold invocations is what lets the team manage the SLO.

**Plan concurrency.** What happens at 10x current load is a real question with a specific operational answer in serverless. The defaults usually aren't what production needs.

**Watch for hidden state.** Pure serverless functions are stateless; ML workflows often want state (model weights, feature caches, dependency artifacts). Where state lives, how it's invalidated, and how cold starts handle it is the engineering work.

### Where the Category Is Heading

A few directions visible from this vantage point:

GPU serverless will mature. The cold-start economics, the available instance types, and the cost will all improve through 2022 and 2023. The set of inference workloads that fit serverless will expand.

The serverless ML platforms (Modal, Anyscale, Replicate, Banana, others) will compete on developer experience for ML-specific patterns. Some will get acquired into larger clouds; some will carve out specialized niches.

Step Functions, Cloud Workflows, and similar serverless orchestrators will absorb more of the data pipeline space. The category overlap with Airflow is real and the buyer's choice is getting more complicated.

The line between "serverless inference" and "managed model endpoints" will blur. SageMaker, Vertex AI, and Azure ML are all moving toward unified inference surfaces with different scaling behaviors as configuration options rather than distinct products.

### Conclusion

Serverless has become a genuinely useful default for a meaningful slice of data science workloads — lightweight inference, event-driven processing, on-demand batch, and exploratory compute. For 2022, the right pattern for most data science teams is to identify the workloads that fit the serverless shape (variable load, bounded execution, stateless or near-stateless) and deploy them there deliberately, while keeping dedicated infrastructure for the workloads that don't fit (large models, low-latency, GPU-heavy, long-running). The flexibility serverless adds to the data science operational surface is real; the discipline required to use it well is also real, and worth investing in early rather than learning the limits in production.

### References

AWS (2022). *Lambda Documentation*.

AWS (2022). *Amazon SageMaker Serverless Inference Documentation*.

Google Cloud (2022). *Cloud Functions 2nd Generation*.

Jonas, E. et al. (2019). *Cloud Programming Simplified: A Berkeley View on Serverless Computing*.

Modal Labs (2022). *Modal Documentation*.
