---
layout: post
title: "GitOps Gains Traction: Declarative Infrastructure Meets CI/CD"
date: 2022-02-15 09:00 -0700
feature-img: 2022-02-15-gitops-gains-traction-declarative-infrastructure.jpg
author: R. Dubnick
tags: [GitOps, DevOps, Kubernetes, Infrastructure]
comments: false
published: true
---

ArgoCD graduated to CNCF incubating status late last year. Flux is on the same track. The OpenGitOps Working Group published its v1.0 principles at KubeCon in October. The phrase "GitOps" — coined by Weaveworks back in 2017 — has finally crossed from a vendor's term of art into something enterprise architecture groups are using without quotation marks. The 2022 question for most teams is no longer whether GitOps is a real pattern; it's how aggressively to adopt it, what to give up to do so, and how it composes with the CI/CD discipline already in place.

The honest February 2022 observation is that GitOps does deliver the operational properties its proponents claim, and also that the gap between "we use ArgoCD" and "we operate by GitOps principles" is wider than most teams appreciate before they're inside it.

### What GitOps Actually Is

A useful clarification: GitOps is not the same thing as "we deploy from a Git repository." Lots of CI/CD pipelines have done that for years. GitOps is a more specific discipline.

The OpenGitOps principles, condensed:

**Declarative.** The desired system state is described declaratively. Not as a sequence of commands; as a configuration that fully describes what should exist.

**Versioned and immutable.** That declarative state lives in version control. The history of the system's intended configuration is the Git log. Reverts are first-class operations.

**Pulled automatically.** Software agents pull approved changes from the source of truth into the running system. There's no manual `kubectl apply`; there's a controller watching Git and reconciling.

**Continuously reconciled.** The agents don't just deploy once and forget. They observe the running system, detect drift from the declared state, and correct it.

The combination of these four properties is what makes GitOps GitOps. A team that has declarative manifests in Git but applies them with a CI job triggered by humans is doing GitOps-flavored CI/CD, not GitOps. The distinction matters because the operational properties — auditability, repeatability, drift correction, easy rollback — depend on the full pattern.

### Why It's Hitting in 2022

A few specific reasons GitOps has crossed from leading-edge to mainstream right now:

**Kubernetes sprawl has forced the issue.** Most large enterprises now run dozens of Kubernetes clusters across environments and regions. Imperative deployment workflows that worked for two clusters break for fifty. Declarative reconciliation is no longer optional at that scale; it's the operational floor.

**Audit and compliance get easier.** "Show me what was deployed to production on March 14" becomes "show me the Git commit at HEAD of the production branch on March 14." Auditors find this easier to evaluate than CI pipeline logs, and the evidence is harder to lose.

**Rollbacks become real operations.** A reverted Git commit is a rollback. The infrastructure responds without the team building special-purpose tooling. This is more valuable than it sounds, because most rollback procedures only get tested when the team would rather not be testing them.

**The tooling has matured.** ArgoCD, Flux, and a small ecosystem around them have reached the point where running them in production isn't an early-adopter project. CRDs, Helm support, multi-cluster patterns, and policy controls are mature enough.

### Where GitOps Earns Its Keep

A few categories where the pattern is paying off clearly:

**Kubernetes platform operations.** Cluster configuration, namespace provisioning, RBAC, network policies. Multi-cluster fleets become tractable to operate.

**Application deployment for cloud-native workloads.** Microservice deployments where the application is naturally declarative (manifests, Helm charts) compose well with the GitOps loop.

**Policy as code.** OPA Gatekeeper, Kyverno, and similar policy engines fit the pattern. Policies are versioned alongside the workloads they govern.

**Disaster recovery.** Rebuilding a cluster from Git is a real, tested capability rather than a runbook nobody has executed. The recovery time difference is meaningful.

### Where the Pattern Doesn't Fit Cleanly

Honest accounting of friction worth knowing about:

**Stateful systems.** Databases, message brokers, and persistent stores don't compose cleanly with "wipe and reconcile" semantics. GitOps approaches to stateful workloads exist (database operators, declarative schema management) but require more care than stateless services.

**Secrets management.** Putting secrets in Git is a non-starter. Working approaches (sealed secrets, External Secrets Operator, Vault integration) are real but add operational complexity that the marketing tends to skip.

**Imperative infrastructure dependencies.** Cloud resources that don't have good declarative representations (some IAM patterns, some networking primitives, certain managed services) require either bridging via Terraform-in-Git workflows or accepting an imperative escape hatch.

**Long-running multi-step changes.** Some deployments require coordinated steps across systems that don't reconcile to a single declarative state cleanly. Pure GitOps struggles here; teams typically end up with hybrid patterns.

**Developer experience for fast iteration.** Local development against a GitOps-managed environment requires more setup than a `kubectl apply -f`. Teams that don't address this end up with two parallel workflows that drift.

### The Tooling Landscape in Q1 2022

A short tour of the practical options:

**ArgoCD** is the more feature-rich of the two leading agents. Better UI, more flexible application configuration, multi-cluster support. Strong with teams that want declarative application management as a first-class concern.

**Flux** is leaner, more opinionated, deeply integrated with the GitOps Toolkit. Strong with teams that prefer Kubernetes-native components and minimal additional UI surface.

**Both** are CNCF projects on a graduation path. Choosing between them is largely a matter of fit; both work in production.

**Layered tooling** — Kustomize for templating, Helm for packaging, OPA Gatekeeper for policy, Sealed Secrets or ESO for secrets — composes with either agent. The full stack matters more than the agent choice.

### Practical Adoption Patterns

A few patterns the early adopters are converging on:

**Start with one cluster and one team.** Trying to convert the entire fleet at once is the wrong shape. A platform team converting one workload to GitOps and proving the pattern is the right shape.

**Get secrets management right early.** The shape of the rest of the work depends on the choice. Retrofitting secrets handling later is painful.

**Treat the Git repository as production infrastructure.** Branch protections, required reviews, mandatory CI checks, signed commits where the discipline matters. The repository is now the source of truth for production state.

**Invest in observability for the GitOps loop itself.** When reconciliation fails, the team needs to know quickly. Drift detection, sync health, and policy violations all deserve dashboards and alerts.

**Document the developer experience.** The path from "I want to change this service" to "the change is running in production" needs to be clear, documented, and not too many steps. GitOps that nobody can navigate ends up bypassed.

### What's Next

A few directions visible from where we sit in early 2022:

The GitOps pattern will extend beyond Kubernetes. Crossplane, Pulumi Operator, and similar projects are pushing it toward broader cloud infrastructure. The principles generalize; the tooling needs to keep up.

Policy and compliance will become deeper concerns. Regulated industries are starting to ask whether GitOps deployment satisfies specific control objectives. The answers are mostly yes, but the evidence and audit patterns are still being worked out.

Multi-cluster orchestration will mature. The current generation handles "many clusters running independently" well; the next generation needs to handle "many clusters as a coherent fleet" better.

### Conclusion

GitOps has earned its place in the enterprise toolkit. For 2022, the right pattern for most teams is to adopt it deliberately for cloud-native workloads, invest in the operational discipline it requires, and resist the urge to force it onto every system in the estate. The benefits — auditability, drift correction, real rollbacks, fleet-scale operations — are large where it fits. The friction — stateful systems, secrets, hybrid environments — is real where it doesn't. Choosing well between the two is the work of this year.

### References

OpenGitOps (2021). *Principles v1.0*. CNCF.

Weaveworks (2017). *GitOps: Operations by Pull Request*.

CNCF (2021). *GitOps Working Group Charter*.

Hightower, K. (2020). *Declarative Infrastructure*.

ArgoCD and Flux project documentation (2021–2022).
