---
layout: post
title: Data Pipelines
date: 2019-07-07 11:57 -0700
feature-img: white1.jpg
author: R. Dubnick
comments: false
published: true
---

It has become clear that managing data is a lot more complicated and time consuming than in the past, despite the fact that underlying storage costs continue to decline. There is a need to move, sort, filter, reformat, analyze, and report on this data in order to make use of it. To make matters more challenging, you need to do this quickly (so that you can respond in real time) and you need to do it repetitively (you might need fresh reports every hour, day, or week).

Wheter it be a lift-and-shift migration from one relational database, decouple legacy databases via microservices, or more complext multi-source transformations AWS data pipeline can be helpful.

### Data Issues and Challenges
Some data processing challenges common to customers:

*Variety of Formats* –  Many ways to store data: CSV files, server logs, flat files, DB rows, tuples in NoSQL DB, JSON, XML, etc.

*Increasing Size* – There’s simply volumes of raw and processed data: log files, data collected from sensors, transaction histories, public data sets, etc.

*Disparate Sources* – Various systems from Amazon S3, data warehouses (or Amazon Redshift), various flavors of Relational DB, DynamoDB, etc.

*Distributed Processing* – There are many ways to process data: EC2 instances, an Elastic MapReduce cluster, physical hardware, or a combination

### AWS' Data Pipeline
 AWS Data Pipeline is a foundational tool to deal with automating loading and processing data via workflows & dependency checks.  AWS Data Pipeline provides the capability to automate and access from command line, the APIs, or the AWS Management Console.  AWS Data Pipeline can help to process and move data between compute and storage services on-premises or on-AWS.  Pipelines are composed of a set of data sources, preconditions, destinations, processing steps, and an operational schedule, all defined and managed from a Pipeline Definition. We specify data source locations, what to do with it, and where to put it.  A Pipeline Definition can be created in the AWS Management Console or externally, in JSON form.

Once we've defined and activated a pipeline, it runs on a schedule. We can arrange to copy on-prem log files or files from a cluster of Amazon EC2 instances to an S3 bucket daily, then launch data analysis job on an Elastic MapReduce cluster weekly.  To alleviate processing or sequencing errors, pipeline Definitions can include precondition, assertions that must be true in order for processing to start. If preconditions are satisfied and AWS pipelines can then schedule and manage the tasks per the Pipeline Definition.

Processing tasks can run on EC2 instances, Elastic MapReduce clusters, or physical hardware. AWS  Data Pipeline can launch and manage EC2 instances and EMR clusters as needed. To take advantage of long-running EC2 instances and physical hardware, we also provide an open source tool called the Task Runner. Each running instance of a Task Runner polls the AWS Data Pipeline in pursuit of jobs of a specific type and executes them as they become available. When a pipeline completes, a message will be sent to the Amazon SNS topic of your choice. You can also arrange to send messages when a processing step fails to complete after a specified number of retries or if it takes longer than a configurable amount of time to complete.

### Parameterized Templates
Parameterized templates, along with a library of templates for common use cases provide values for the specially marked parameters within the template, and launch the customized pipeline.  These parameters are very useful for late binding of actual values. Best practices can be identified and encapsulated in Data Pipeline templates for widespread re-use.  These templates and parameters can be accessed from command line and Data Pipeline API.

### Building data pipelines with Kinesis Data Firehose and Lambda
If your site already runs on AWS, using an AWS SDK to send data to Kinesis Data Firehose is an easy sell to developers provided capabilities to direct PUT ingestion for Kinesis Data Firehose.  This is straight forward to implement, works in many languages used across common services, and provides the ability to deliver data to Amazon S3.  Understnading that using S3 for data storage allows you to have corresponding high availability, scalability, and durability.  Given S3 is a global resource, this enables lakes and warehouses to be managed under separate AWS accounts, to avoid the unnecessary complication of managing and navigating multiple VPCs.   Kinesis Data Firehose solutions, combined with DynamoDB Streams and Lambda also provide a powerful capability.  By enabling DynamoDB Streams can manage transformations by triggering serverless Lambda functions to clean and transform your data.


