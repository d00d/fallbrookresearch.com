---
layout: post
title: "Synthetic Data Generation for Machine Learning: Tools and Use Cases"
date: 2021-05-15 09:00 -0700
feature-img: 2021-05-15-synthetic-data-generation-machine-learning.jpg
author: R. Dubnick
tags: [Synthetic-Data, Privacy, ML, Data-Engineering]
comments: false
published: true
---

Mostly AI raised a Series A late last year. Hazy and Tonic.ai are both growing fast through 2021. Gretel.ai exited stealth in 2020 and has shipped a recognizable open-source story. Synthea, the venerable open-source synthetic patient generator, continues to be the reference implementation for healthcare. NVIDIA's Omniverse Replicator for synthetic vision data is in early access. Gartner's prediction that 60% of training data for AI will be synthetic by 2024 has been quoted enough to be a meme; the underlying point — that synthetic data is moving from research curiosity to production infrastructure — is sound. The 2021 question for enterprise data and ML teams is no longer whether synthetic data is real; it's where it earns its keep, what the quality discipline around it looks like, and where the privacy and accuracy claims hold up.

The honest May 2021 observation is that synthetic data has matured enough to be a production option for several specific use cases, and that confusing the use cases for one another is the most common reason enterprise pilots disappoint.

### What "Synthetic Data" Actually Means

A useful clarification: the term covers several distinct things that have different production characteristics and different privacy properties.

**Privacy-preserving synthetic tabular data.** Statistical models (GANs, VAEs, autoregressive models, copula-based methods) trained on a real dataset to produce a new dataset with similar statistical properties but no one-to-one correspondence to real records. The leading commercial vendors (Mostly AI, Hazy, Gretel, Tonic) sit primarily in this space.

**Simulator-generated data.** Game engines, physics simulators, and domain-specific simulators producing synthetic scenes, sensor readings, or behaviors. NVIDIA Omniverse, Unity Perception, AirSim, CARLA. Strong fit for vision and robotics where labeled real data is expensive.

**Rule-based or template-based generation.** Faker, Mimesis, Synthea (for healthcare), and various domain-specific generators that produce data conforming to known schemas and distributions without requiring a generative model trained on real data.

**Augmentation of existing data.** Image transformations, text paraphrasing, time-series perturbations that produce variations of real examples to enlarge training sets. Different from "synthetic" in the strict sense but often discussed alongside.

**LLM-generated examples.** Using GPT-3 or similar models to generate text examples, instruction-following data, or synthetic dialogues. An emerging category in 2021 that's expanding fast.

The right tool, the right quality discipline, and the right privacy claims all depend on which kind of synthetic data is in use.

### Where Synthetic Data Is Earning Its Keep

A few categories where the pattern is producing real production value:

**Privacy-constrained development environments.** Production data that can't be moved to development or test environments because of privacy or regulatory constraints. Synthetic data with similar statistical properties lets engineering teams develop and test against realistic-shaped data without the data-residency overhead.

**Cross-organizational collaboration.** Two organizations that want to collaborate on a model but can't share their underlying data. Synthetic versions of each contribute usefully without exposing the originals.

**Class imbalance and rare-event augmentation.** Fraud detection, rare-disease classification, anomaly detection where the positive class is sparse. Synthetic generation of examples in the rare class can improve model performance, with care taken not to leak the model into believing the synthetic examples are real-world rates.

**Computer vision with expensive labeling.** Synthetic scenes from game engines or physics simulators produce labeled images at near-zero marginal cost. Domain randomization techniques bridge the sim-to-real gap. Effective for autonomous vehicles, robotics, industrial inspection, and similar applications.

**Healthcare research.** Synthetic patient cohorts (Synthea, MDClone, others) for research where access to real patient data is restricted. Useful for methodology development, training, and certain kinds of hypothesis exploration.

**Stress testing and edge case exploration.** Generating examples in regions of the input space that are underrepresented in real data. The model can be evaluated against scenarios that haven't yet occurred but are plausible.

### Where Synthetic Data Disappoints

Honest accounting of where the marketing exceeds the reality:

**The "as good as real data for any purpose" claim.** Synthetic data preserves the statistical properties the generator captured. Properties the generator didn't capture — long-tail correlations, rare interactions, specific biases — are not preserved. Models trained purely on synthetic data often underperform models trained on real data, especially on out-of-distribution cases.

**Privacy claims as standalone guarantees.** "Synthetic data is private" is not automatically true. Generative models can memorize training examples; carefully-constructed attacks can reconstruct sensitive information from the synthetic output. Differential privacy guarantees, when claimed, depend on the specific implementation and parameters. Treating "synthetic" as "automatically privacy-safe" is a recurring mistake.

**Vision sim-to-real gaps.** Synthetic vision data has improved dramatically but still doesn't fully match the distribution of real-world imagery. Models trained purely on synthetic scenes typically need fine-tuning on real data to perform well in production. Domain randomization helps; it doesn't eliminate the gap.

**Time-series and sequential data.** Generating realistic time-series with correct dependencies, autocorrelation, and rare events is harder than generating tabular cross-sections. The state of the art is improving; production-grade synthesis of complex time-series remains domain-specific work.

**Long-tail distributions.** The tails of real data — the rare events that often matter most — are precisely where generative models perform worst. Synthetic data tends to oversample the modes and undersample the tails, which is the opposite of what production models often need.

### The 2021 Tooling Landscape

A short tour of the practical options:

**Mostly AI, Hazy, Tonic.ai, Gretel.** Commercial platforms focused on tabular synthetic data with privacy properties. Differentiated by privacy guarantees, supported data types, ease of use, and pricing. Good fit for enterprise teams wanting capability fast.

**SDV (Synthetic Data Vault).** MIT-originated open-source library for tabular synthesis. Maintained as an open platform with multiple model types (CTGAN, CopulaGAN, TVAE, others). Strong for teams wanting flexibility and customization.

**CTGAN, CopulaGAN, TableGAN.** Specific generative model architectures for tabular data, available through SDV and similar wrappers. The right model depends on the data shape.

**NVIDIA Omniverse Replicator (early access), Unity Perception, AirSim, CARLA.** Synthetic vision and sensor data through simulation. Strong fit for autonomous systems and robotics.

**Synthea, MDClone, Replica Analytics.** Healthcare-specific synthetic data tools. Synthea is open-source and free; the commercial options offer more configurability and clinical realism.

**Faker, Mimesis, Bogus, Sharp.** Schema-aware fake data generation for development and test environments. Not statistically representative; fine for environments where realism beyond schema matters less.

### Practical Patterns

A few patterns the more thoughtful adopters have converged on:

**Match the synthesis approach to the use case.** Privacy-preserving development data is a different problem than rare-class augmentation, which is different from sim-to-real for vision. Confusing the categories produces poor results in all of them.

**Validate synthetic data against real data deliberately.** Statistical similarity tests, downstream-task performance comparison, privacy-attack evaluation. Don't trust the marketing; measure the relevant properties.

**Use synthetic data to augment rather than replace real data when possible.** Hybrid training (real plus synthetic) typically outperforms either pure approach, especially when the real data is limited but available.

**Document what's synthetic.** A dataset that mixes real and synthetic records, or a model trained on synthetic data, deserves documentation that's clear about the provenance. Audit, debugging, and downstream interpretation all benefit.

**Engage privacy and legal early.** Synthetic data does not automatically free organizations from privacy obligations on the underlying real data used to train the generator. The legal posture should be worked out before the production deployment.

### What's Next

A few directions visible from this vantage point:

LLM-generated text data is going to expand fast. GPT-3-based generation of training examples for downstream NLP tasks is becoming a real pattern, with quality and cost characteristics that are favorable for many use cases.

Synthesis with stronger privacy guarantees (differential privacy as a default, not as an option) will become more widely available. The current generation of commercial tools is mixed on this; the next generation will need to be clearer.

Sim-to-real gaps for vision will continue to close. Better physics, better materials, better lighting in the synthesis side; better domain adaptation techniques on the modeling side. The combination is making purely-synthetic-trained vision models more viable.

Synthetic data for evaluation and adversarial testing will become a recognized discipline. Generating examples specifically to probe model behavior, fairness, and robustness is moving from research to standard practice.

### Conclusion

Synthetic data in 2021 is a useful production tool for several specific use cases, with quality and privacy characteristics that depend heavily on the approach. For most enterprises, the right pattern is to identify the one or two use cases where synthetic data clearly beats the alternatives — typically privacy-constrained environments, rare-class augmentation, or simulation-driven vision — and adopt the appropriate tools deliberately, with the validation discipline that distinguishes "looks plausible" from "actually works." Treating synthetic data as a magical replacement for real data is the wrong shape; ignoring it as a production option is also the wrong shape. The middle path — synthetic where it earns its keep, real where it can be obtained, with documented quality discipline either way — is where the productive work of the next several years lives.

### References

Patki, N. et al. (2016). *The Synthetic Data Vault*.

Xu, L. et al. (2019). *Modeling Tabular Data using Conditional GAN (CTGAN)*.

Walonoski, J. et al. (2018). *Synthea: An Approach, Method, and Software Mechanism for Generating Synthetic Patients*.

Tobin, J. et al. (2017). *Domain Randomization for Transferring Deep Neural Networks from Simulation to the Real World*.

Bellovin, S., Dutta, P., Reitinger, N. (2019). *Privacy and Synthetic Datasets*.
