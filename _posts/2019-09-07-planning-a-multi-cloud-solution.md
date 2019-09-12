---
layout: post
title: Planning a Multi-Cloud Solution
feature-img: mcloud.jpg
author: R. Dubnick
date: 2019-09-07 17:30 -0700
comments: true
published: true
---
### Hybrid Architecture Potential

Planning a multi-cloud architecture is about leveraging more than a single public cloud. With a hybrid cloud, common or interconnected workloads are deployed across multiple compute environments and with multi-clouds setups will combine at least two public cloud providers and may include a private environment.

As typical of hybrid architectures, a multi-cloud can offer a choice of services, enable workload portability, and may provide the opportunity for a *best of breed* solution. This potential adds complexity, cost, risk but if well-executed has the potential to achieve a unified view of health, performance, and net higher value.

![mcloud-diag.jpg]({{site.baseurl}}/assets/img/blog-cnn/mcloud-diag.jpg)

It is common when leveraging different public multi-clouds, to encapsulate and abstract them behind management layers like cloud management platforms, cloud service brokers, and monitoring systems. This approach can shield your team from binding directly to vendor-specific core API's that are native to the particular cloud providers and allow for management via the proverbial *'single pane of glass'.*

### Consider the trade-offs

Because workloads, infrastructure, and processes are unique to each enterprise, your hybrid strategy has to be adapted to your specifics.  The decision about which workloads to run on which compute environments will have a material impact on the effectiveness of a multi-cloud strategy. Running the wrong workload on the cloud can complicate your deployment while offer little benefit.    The additional complexity is risk and may be a cost your solution doesn't need. It's important to realize that multi-cloud architectures require special management and monitoring.

### Cost & Strategic Advantage

It is very important to understand multi-cloud cost drivers. Multi-clouds will tend to be more expensive than a hybrid, public, or private-only cloud given the increased complexity and need for tools to manage it. That said, can enable best of breed options and increase the agility of your business to respond better to changing market demands

The most cost-effective option for a given solution may be possible among like cloud services. This is where potential lies to gain a strategic advantage by not being dependent or locked into a particular cloud brand.

When assessing this potential its important to understand and accurately model the relative costs and options.   Keeping your business case in focus to quantify costs, as well as the value, back to the business is important to define your terms of success.

### Implications for your Operating Model

Changing the operating model is probably the most difficult part of a multi-cloud transformation. The upside is well-articulated, if well-managed you may reduce IT operational costs. Thes operational savings are not just from the improved hardware and software efficiency but also from more effective use of staff,  leveraging automation, and having the tools needed to manage technology more efficiently. The key thing to remember is that it means working more closely with the business. It means an IT operating model that is services and software product-oriented, not technology- or project-oriented.

### Portability

Often shifting a workload to the cloud is a one-time, irreversible effort. But in the case of a hybrid and especially for multi-cloud scenarios, you might want to be able to shift workloads between clouds later. To facilitate this ability, you must ensure that your workloads are portable. Make sure you can shift a workload from one computing environment to another without significant modification.  Ensure that application deployment and management are consistent across compute environments.

At the infrastructure level, you should use tools such as [Terraform](https://www.terraform.io/) to automate and unify creation of infrastructure resources such as VMs and load balancers in heterogeneous environments. Additionally, you can use configuration management tools such as Puppet, Chef, or Ansible to establish a common deployment and configuration management process.   Consider using an image-baking tool like [Packer](https://www.packer.io/) to create [VM images for different platforms](https://cloud.google.com/solutions/automated-build-images-with-jenkins-kubernetes) by using a single, shared configuration file.  Use solutions such as Prometheus and Grafana to help ensure consistent monitoring across environments.

Based on these tools, you can assemble a toolchain that abstracts away the differences between computing environments, and it enables you to unify provisioning, deployment, management, and monitoring.  Accept that the trade-off for portability may be that you might not be able to make use of certain features that a cloud environment offers natively.

### Governance & Adoption

You should establish your multi-cloud future-state vision and draw a program roadmap to get there in terms of people, process and technology.   Hybrid and multi-cloud setups might be temporary, maintained only for a limited time to facilitate migration. However, these setups may also represent a strategic future state of your organization and adoption may a part of a larger modernization and digital transformation IT strategy.  Alignment your portfolio management process is an effective tactic to help identify candidate projects for cloud adoption and enforcing opt-outs on exception basis will help starve the data center may be looking to exit.
