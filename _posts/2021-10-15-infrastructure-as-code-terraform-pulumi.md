---
layout: post
title: "Infrastructure as Code (IaC): Terraform, Pulumi, and the Future of DevOps"
date: 2021-10-15 09:00 -0700
feature-img: 2021-10-15-infrastructure-as-code-terraform-pulumi.jpg
author: R. Dubnick
tags: [IaC, Terraform, Pulumi, DevOps]
comments: false
published: true
---

HashiCorp filed its S-1 in late September; the IPO is teed up for later this year at expectations that would make Terraform's parent a public company at meaningful scale. Pulumi raised a Series B last year and has been growing aggressively, with strong adoption among engineering-heavy organizations. Crossplane reached its 1.0 milestone in August. AWS CDK has continued to accelerate within the AWS ecosystem; CDK for Terraform (CDKTF) launched last year offering a similar synthesis-from-code pattern over Terraform's provider ecosystem. The 2021 question for platform engineering teams is no longer whether infrastructure-as-code is the right approach; it's which IaC philosophy fits, how to organize state and modules, and what the role of declarative versus imperative code looks like as the category matures.

The honest October 2021 observation is that IaC has crossed from emerging discipline to operational expectation, and the choice among approaches now matters more for organizational fit than for capability.

### The Three Philosophies Worth Understanding

A useful clarification: the IaC ecosystem in 2021 has consolidated around three distinct philosophies, each with different trade-offs.

**Declarative DSL: Terraform.** A purpose-built configuration language (HCL) for declaring infrastructure resources. The Terraform binary reconciles the declared state against the actual cloud state. Strong type system through provider schemas, mature module pattern, large open-source provider ecosystem covering hundreds of cloud and SaaS services.

**Declarative through general-purpose code: Pulumi, AWS CDK, CDKTF.** Infrastructure described in real programming languages (TypeScript, Python, Go, Java, .NET) that synthesize into the declarative form. Pulumi runs against its own state and provider implementations; AWS CDK synthesizes into CloudFormation; CDKTF synthesizes into Terraform. The "real code" approach gains the abstraction primitives of the host language at the cost of a more complex synthesis story.

**Kubernetes-native declarative: Crossplane.** Infrastructure resources expressed as Kubernetes Custom Resource Definitions (CRDs), reconciled by Kubernetes operators. Brings the GitOps pattern directly to cloud infrastructure provisioning. The convergence of "Kubernetes as the universal control plane" with infrastructure provisioning.

Each philosophy works in production. The choice depends on team skills, the existing platform context, and the scale of the deployment.

### Where Terraform Earns Its Keep

A few categories where the dominant declarative approach is producing real value in 2021:

**Multi-cloud and multi-provider deployments.** Terraform's provider ecosystem is unmatched. AWS, GCP, Azure, plus hundreds of SaaS providers (Datadog, GitHub, Cloudflare, Auth0) means a single tool reaches across the platforms most enterprises actually use.

**Standardization across teams.** A team that hasn't used Terraform before can read another team's Terraform and understand it within a few hours. The declarative DSL is uniform; cross-team review and contribution is tractable.

**The module ecosystem.** The Terraform Registry has thousands of community modules covering common patterns. The "use a battle-tested module" pattern beats "build from primitives" for most infrastructure work.

**State as the source of truth.** Terraform's state file is explicit, inspectable, and lockable. The discipline around state — remote backends (S3+DynamoDB, Terraform Cloud, GCS, Azure Blob), workspaces, locking — is well-developed and broadly understood.

### Where Pulumi (and Real-Code IaC) Earns Its Keep

A few categories where the code-based approach pulls ahead:

**Complex abstractions and reusable patterns.** When the infrastructure has substantial logic — looping, conditional deployment, derived values, complex composition — real programming languages handle this more cleanly than HCL's expression model.

**Engineering-heavy organizations.** Teams that already write substantial application code in TypeScript or Python find Pulumi's familiarity reduces the cognitive switch. Test infrastructure code with the same testing frameworks, type-check it with the same compilers, package it with the same dependency managers.

**Tight integration with application code.** When the infrastructure and the application share concepts (resource names, environment-specific values, runtime configuration), keeping them in the same language reduces the impedance.

**Platform teams building internal abstractions.** A platform team building "our company's standard environment" as reusable libraries gets more leverage from real programming languages than from a templated DSL.

### Where Crossplane Fits

A few categories where the Kubernetes-native approach is gaining traction:

**Organizations all-in on Kubernetes as the control plane.** Teams that already operate everything through Kubernetes manifests benefit from extending the same pattern to cloud infrastructure. GitOps workflows that work for application deployments work for infrastructure too.

**Multi-tenant infrastructure platforms.** Crossplane's "compositions" model — domain teams consume infrastructure through abstract claims, platform teams provide the underlying implementations — fits naturally for organizations building internal platforms.

**Continuous reconciliation models.** When the desired property is "the cloud should always match this declared state," Crossplane's reconciliation loop is conceptually cleaner than periodic Terraform applies.

### Where IaC Is Still Hard

Honest accounting of friction patterns visible in production at scale:

**State management at scale.** A monolithic state file with hundreds of resources becomes slow to plan and risky to modify. The discipline of splitting state by domain, by environment, or by lifecycle is necessary engineering work that's frequently put off until it's painful.

**Drift between actual and declared.** Resources modified out-of-band (console clicks, automation outside IaC, third-party tooling) drift from the IaC representation. Detection is solvable; reconciliation philosophy (overwrite the drift, import it, raise an exception) varies by organization.

**Secret management in IaC.** Secrets in state files, secrets in Terraform variables, secrets in environment variables — each pattern has implications. The clean answer (Vault, AWS Secrets Manager, etc.) requires explicit integration that's sometimes skipped under deadline pressure.

**Testing infrastructure code.** The discipline is younger than testing application code. Terratest, Pulumi's test framework, kitchen-terraform, and similar exist; adoption is uneven. Integration tests that actually deploy and verify real infrastructure are the highest-confidence approach and the most expensive to run.

**Module versioning and updates.** Modules are dependencies. Updating them across many consumers is the same coordination problem application library updates produce, with the additional complication that infrastructure changes can have larger blast radius. The dependency graph for IaC needs deliberate management.

**Provider rate limits and state-machine timing.** Cloud APIs rate-limit, state machines have timing assumptions, large applies sometimes time out partway through. The operational discipline around handling these is engineering work that the marketing tends to gloss over.

### Practical Adoption Patterns

A few patterns the more mature IaC programs have converged on:

**Pick one IaC approach as the default.** Multi-tool environments produce fragmentation that hurts more than the flexibility helps. The primary tool earns standard tooling, standard CI/CD, standard module catalogs; secondary tools live as exceptions for specific cases.

**Treat module design as platform engineering.** Reusable modules — for VPCs, EKS clusters, databases, observability stacks — are the leverage point. A few well-designed modules used across the organization produce more value than dozens of one-off configurations.

**Use remote state with locking from day one.** Local state files with no locking are a foot-gun. The remote state setup (S3+DynamoDB for Terraform, Pulumi Cloud or self-managed for Pulumi) is small upfront work that prevents large later problems.

**Integrate with CI/CD properly.** A pull request that proposes infrastructure changes should run plan, surface the diff, gate on review, and apply on merge. The full automation is real engineering work; ad hoc apply-from-laptop is the wrong shape past the smallest scale.

**Adopt policy-as-code.** OPA, Sentinel (HashiCorp), or vendor-specific policy engines that enforce organizational standards at plan time. Easier to enforce automatically than to remediate after the fact.

**Drift detection as continuous practice.** Periodic plans that report drift are a real operational tool. Letting drift accumulate silently produces the worst kind of incident.

### What's Worth Watching Through Year-End 2021

A few directions visible from this vantage point:

HashiCorp's IPO will sharpen attention on Terraform's commercial story. Expect continued investment in Terraform Cloud, the registry, and the enterprise feature set.

Pulumi will continue gaining ground in engineering-heavy organizations. The "real code" pitch lands well there; the broader market reach takes longer.

Crossplane's adoption will track Kubernetes platform team maturity. Organizations that have built strong K8s platforms find it natural; others are slower to adopt.

The "GitOps for infrastructure" pattern will keep getting clearer. ArgoCD-like continuous reconciliation for infrastructure (whether through Crossplane, Atlantis, Terraform Cloud's run pipelines, or others) is the direction the operational practice is heading.

Cost visibility will be increasingly built into IaC tooling. Pulumi has shipped some of this; Terraform Cloud has cost estimation; expect more sophisticated cost-aware planning as the category matures.

### Conclusion

Infrastructure as Code in 2021 is operational expectation rather than emerging practice. For most enterprises, the right pattern is to pick a primary tool (Terraform if multi-provider breadth and team familiarity matter; Pulumi if engineering-heavy and abstraction primitives matter; Crossplane if Kubernetes-native control plane matters), invest in the platform engineering disciplines that make it scale (modules, remote state, CI/CD integration, policy-as-code, testing), and resist the impulse to use multiple tools to chase narrow capabilities. The choice matters less than the discipline; the gap between organizations operating IaC well and those operating it ad hoc is the visible differentiator now.

### References

Brikman, Y. (2019). *Terraform: Up & Running, 2nd Edition*. O'Reilly.

HashiCorp (2021). *Terraform Documentation*.

Pulumi (2021). *Pulumi Cloud Engineering Platform*.

Crossplane Project (2021). *Crossplane 1.0 Documentation*.

Morris, K. (2020). *Infrastructure as Code, 2nd Edition*. O'Reilly.
