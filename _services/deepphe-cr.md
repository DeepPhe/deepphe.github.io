---
title: "DeepPhe-CR"
link: "https://github.com/DeepPhe/DeepPhe-CR-Release/releases/tag/v0.1.0-cr"
featured: true
weight: 5
layout: service
---

The DeepPhe-CR Final release is the project's final software release for cancer registry applications. DeepPhe-CR is intended for cancer registry workflows, registrar case abstraction, and integration with registry systems.

DeepPhe-CR provides REST APIs
for submissions of documents to the DeepPhe-CR pipeline and return of extracted results,
with the goal of providing DeepPhe services to tools for cancer patient data abstraction.
Developed in support of cancer registries from the NCI
[Surveillance, Epidemiology, and End Results (SEER) Program](https://seer.cancer.gov),
DeepPhe-CR provides web services suitable for integration into existing registry
case abstraction tools.  
DeepPhe-CR tools are provided as a suite of Docker containers supporting ease
of installation and operation.
DeepPhe-CR has been developed in partnership with the
[Kentucky Cancer Registry](https://www.kcr.uky.edu/).
DeepPhe-CR is not a web or REST-based version of DeepPhe Translational. 
DeepPhe-CR has different capabilities, a different ontology, and different processors.
DeepPhe-CR provides one and only one ICD-O code for a primary cancer's morphology, topography, laterality, and grade.
This behavior is very different from that of DeepPhe Translational, which reports 0-n values for numerous attributes of multiple cancers and tumors.

There is a [DeepPhe-CR wiki](https://github.com/DeepPhe/DeepPhe-CR-Release/wiki) with information on installation and use.

A collaboration with the [National Cancer Institute's](https://www.cancer.gov)
[Surveillance, Epidemiology, and End Results (SEER) Program](https://seer.cancer.gov) 
 (Grant #[UH3CA243120](https://reporter.nih.gov/project-details/10656293)).
