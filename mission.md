---
title: Mission
permalink: /mission/
layout: papers
description: DeepPhe develops natural language processing tools for translational cancer research and cancer registry workflows.
---

# Mission

Cancer care can generate hundreds or thousands of clinical notes across diagnosis, treatment, and follow-up. Reviewing those records manually is time-consuming, and information collected for one study may not meet the needs of another.

DeepPhe develops open-source natural language processing tools that transform longitudinal cancer clinical notes into structured phenotypes and concise case summaries. The goal is to make information from clinical narratives easier to use in translational research and cancer registry workflows.  

DeepPhe software must be used only with appropriate authorization, privacy protections, and data-governance controls.


## DeepPhe Translational

To support retrospective research on cancer cases and cohorts, DeepPhe Translational combines natural language processing, 
a cancer information model, care-episode classification, and ontology-based summarization to extract and organize diagnoses, 
treatments, biomarkers, responses, comorbidities, and temporal relationships at the patient-level from clinical note corpora.


## DeepPhe-CR

To support cancer registry workflows, DeepPhe-CR applies natural language processing and ontology-based summarization to extract the values of four key cancer attributes from clinical notes. 
DeepPhe-CR provides one and only one ICD-O code for a primary cancer's morphology, topography, laterality, and grade. 
This behavior is very different from that of DeepPhe Translational, which reports 0-n values for numerous attributes of multiple cancers and tumors.

DeepPhe-CR service interfaces support individual document submission and result retrieval for integration with registry case-abstraction systems.
