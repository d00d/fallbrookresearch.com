---
layout: post
title: Planning a Multi-Cloud Solution
feature-img: mcloud.jpg
author: R. Dubnick
date: 2019-09-07 17:30 -0700
comments: true
published: true
---
Planning a multi-cloud architecture is about leveraging more than a single public cloud.  As with hybrid architectures, a multi-cloud will allow you to activate workload portability but also offers a choice of services and an opportunity to achieve a *best of breed solution.  This potential value* adds complexity and complex architectures cost and add risk, they also have the potential to generate higher value.   If well-executed you can expect to achieve a unified view of health, performance, and capacity mgmt within a unified view.

## Consider the trade-offs
Realize that multi-cloud may provide value in certain problem domains, certain scenarios with certain businesses but there are no guarantees and plenth of risks.  The additional complexity is risk and may be a cost your solution doesn't need.  Its important to realize that a multi-cloud architecture requires special management and monitoring.

It is common when leveraging different public multi-clouds, to encapsulate and abstract them behind management layers like cloud management platforms, cloud service brokers, and monitoring systems.  This approach could shield your team from binding directly to vendor-specific core API's that are native to the particular cloud providers and allow for management via the proverbial *'single pane of glass'.*

An example of a multi-cloud architecture might be comprised of Amazon, Microsoft, and Google as well as perhaps a private cloud on OpenStack.  Each has APIs and cloud services sitting on those running in a multi-cloud environment via a cloud management platform.

Applications will be consuming storage, compute, and database cloud services.  Monitoring and management ensuring operations run at expected service levels. Security and identity management ensuring proper access to resources.  Service governance ensuring risks are managed, proper decisions made, and intended business value is realized.

### Cost & Strategic Advantage
Its important to understand multi-cloud cost drivers.  Multi-cloud will tend to be more expensive than a hybrid, public, or private only cloud given to the increased complexity and need for tools to manage it.  That said, cost savings are **can** be realized due to the multi-cloud ability to enable best of breed options.  The most cost-effective option for a given solution may be possible among like cloud services.   This is where you gain a strategic advantage by not being dependent or locked into a particular cloud brand.

To realize this strategic benefit must keep your business case in focus and gauge the costs versus potential value.  Its important to be able to quantify costs, as well as the value, back to the business.   You need to understand and model the relative costs and options.

## Implications for your Operating Model
Changing the operating model is probably the most difficult part of a multi-cloud transformation. If well-managed you may reduce IT operational costs by roughly a quarter.  Operational savings are not just from the improved hardware and software efficiency but also from more effective use of personnel and by leveraging automation and better tools needed to manage technology more efficiently. The key thing to remember is that it means working more closely with the business. It means an IT operating model that’s services and software product-oriented, not technology- or project-oriented.
