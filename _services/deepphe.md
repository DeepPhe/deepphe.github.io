---
title: "DeepPhe"
link: "https://github.com/DeepPhe/DeepPhe-Release" 
featured: true
weight: 1
layout: service
---

The core DeepPhe system processes corporat of patient notes,
extracting mentions of key cancer concepts from individual notes,
aggregating those mentions within and across documents (using
cross-document co-reference resolution to disambiguate) to build a
high-level summary of a patient's case. DeepPhe also contains an
machine-language classifier capable of labeling individual
notes according to the phase of treatment (pre-diagnostic, diagnositc,
treatment, etc.). Results are stored in a Neo4J database, supported 
by a REST API. The
[DeepPhe-Viz](https://doi.org/10.1186/s12911-016-0358-4) visual
analytics tool provides a web-based interface to this data, supporting
review of both cohorts and individual patient records. 

DeepPhe is supported by NCI Grant #U24CA248010.

