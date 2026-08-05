---
title: Publications
permalink: /papers/
layout: papers
description: DeepPhe publications, presentations, talks, and panels.
extra_css:
  - /assets/css/publications.css
extra_js:
  - /assets/js/publications.js
---

{% assign journal_types = "journal,preprint" | split: "," %}
{% assign presentation_types = "conference,talk,panel,pres" | split: "," %}
{% assign journal_entries = site.data.publications | where_exp: "item", "journal_types contains item.type" %}
{% assign presentation_entries = site.data.publications | where_exp: "item", "presentation_types contains item.type" %}
{% assign featured_entries = journal_entries | where: "featured", true | sort: "title" %}
{% assign journal_count = journal_entries | size %}
{% assign presentation_count = presentation_entries | size %}
{% assign searchable_count = journal_count | plus: presentation_count %}

<div class="publications-page" data-publications-page>
  <div class="publications-view-toggle" role="tablist" aria-label="Publication views">
    <button class="publications-view-button" id="publications-all-tab" type="button" role="tab" data-publications-view-button="all" aria-controls="publications-all-panel" aria-selected="true" tabindex="0">All</button>
    <button class="publications-view-button" id="publications-search-tab" type="button" role="tab" data-publications-view-button="search" aria-controls="publications-search-panel" aria-selected="false" tabindex="-1">Search</button>
  </div>

  <section class="publications-panel publications-all-panel" id="publications-all-panel" role="tabpanel" data-publications-view="all" aria-labelledby="publications-all-tab" markdown="1">

# Related Publications, Presentations, Panels

1. Jiarui Yao, Harry Hochheiser, WonJin Yoon, Eli T Goldner, Guergana K Savova. 2025. Overview of the 2025 Shared Task on Chemotherapy Treatment Timeline Extraction. Clinical NLP Workshop 2025. Oct 2025.
2. Zhe Zhao, V.G.Vinod Vydiswaran. Team NLP4Health at ChemoTimelines 2025: Finetuning Large Language Models for Temporal Relation Extractions from Clinical Notes. Clinical NLP Workshop 2025. Oct 2025.
3. Vijay Raj Jain, Chris Coffee, Kaiwen He, Remy Cron, Micah Cochrane, Luis Mansilla-Gonzalez, Akhil Nadimpalli, Danish Murad, John D Osborne. TEAM UAB at Chemotherapy Timelines 2025: Integrating Encoders and Large Language Models for Chemotherapy Timelines Generation. Clinical NLP Workshop 2025. Oct 2025.
4. Tianmai M. Zhang, Zhaoyi Sun, Sihang Zeng, CHENXI LI, Neil F. Abernethy, Barbara D. Lam, Fei Xia, Meliha Yetisgen. UW-BioNLP at ChemoTimelines 2025: Thinking, Fine-Tuning, and Dictionary-Enhanced LLM Systems for Chemotherapy Timeline Extraction. Clinical NLP Workshop 2025. Oct 2025.
5. Noller K, Botsis T, Camara PG, Ciotti L, Cooper LAD, Goecks J, Griffith M, Haas BJ, Ideker T, Karchin R, Kontos D, Lai J, Marcus D, Meyer CA, Naegle K, Pati S, Peters B, Pratt D, Raphael BJ, Reich M, Savova GK, Wright C, Fertig EJ, Bakas S. Informatics at the Frontier of Cancer Research. Cancer research. 2025 August 15;85(16):2967-2986. PubMed PMID: 40600473; PubMed Central PMCID: PMC12355178; DOI:10.1158/0008-5472.CAN-24-2829.
6. VanHelene AD, Hadfield MJ, Trapani D, Warner JL, Lythgoe MP. As bleak as it sounds? Analysing trends in oncology clinical trial initiation in the UK from 2010 to 2022. BMJ oncology. 2024;3(1):e000410. PubMed PMID: 39886121; PubMed Central PMCID:PMC11347684; DOI: 10.1136/bmjonc-2024-000410.
7. Guergana Savova, Shan Chen, Jiarui Yao, Danielle Bitterman. Reimagining Evidence:AI Synthetic Data Generation for Cancer Research. JCO clinical cancer informatics. JCO Clin Cancer Inform. 2025 Nov:9:e2500304. doi: 10.1200/CCI-25-00304.
8. Alexander D VanHelene, Ishaani Khatri, C Beau Hilton, Sanjay Mishra, Ece D Gamsiz Uzun, Jeremy L Warner . Inferring gender from first names: Comparing the accuracy of Genderize, Gender API, and the gender R package on authors of diverse nationality. PLOS digital health. PLOS Digit Health 2024 Oct 29;3(10):e0000456. doi:10.1371/journal.pdig.0000456. eCollection 2024 Oct.
9. Jiarui Yao, Eli Goldner, Harry Hochheiser, Sean Finan, John Levander, David Harris, Piet C de Groen, Elizabeth Buchbinder, Danielle Bitterman, Jeremy L Warner, Guergana Savova. Systemic anticancer therapy timelines extraction from electronic medical records text: algorithm development and validation. JMIR Bioinformatics and Biotechnology. 2025/9/3
10. Jiarui Yao, Zinaida Perova, Tushar Mandloi, Elizabeth Lewis, Helen Parkinson, Guergana Savova. Extracting Knowledge From Scientific Texts on Patient-Derived Cancer Models Using Large Language Models: Algorithm Development and Validation Study. JMIR Bioinformatics and Biotechnology. 2025/6/30
11. Felicia Gomez, Arpad M Danos, Guilherme Del Fiol, Anant Madabhushi, Pallavi Tiwari, Joshua F McMichael, Spyridon Bakas, Jiang Bian, Christos Davatzikos, Elana J Fertig, Jayashree Kalpathy-Cramer, Johanna Kenney, Guergana K Savova, Meliha Yetisgen, Eliezer M Van Allen, Jeremy L Warner, Fred Prior, Malachi Griffith, Obi L Griffith. A New Era of Data-Driven Cancer Research and Care: Opportunities and Challenges. Cancer discovery. 2024/10/4
12. Finan S, Hochheiser H, Yuan Z, Durbin EB, Jeong JC, Hands I, Rust D, Kavuluru R, Wu X, Warner JL, Savova G. DeepPhe-CR: Natural Language Processing Software Services for Cancer Registrar Case Abstraction. 2024. Annual conference of the North American Association of Central Cancer Registries.
13. Hochheiser H, Finan S, Yuan Z, Durbin EB, Jeong JC, Hands I, Rust D, Kavuluru R, Wu X, Warner JL, Savova G. DeepPhe-CR: Natural Language Processing Software Services for Cancer Registrar Case Abstraction. 2023. AMIA Annual Fall Symposium.
14. Finan S, Levander J, Hochheiser H, Yuan Z, Durbin EB, Hands I, Kavuluru R, Warner JL, Savova G. DeepPhe: Natural Language Processing Tools for Cancer Research and Surveillance. 2023. 31st Annual Intelligent Systems for Molecular Biology, 22nd Annual European Conference on Computational Biology.
15. Finan S. Clinical Natural Language Processing and Neural Networks. 2023. Community Over Code, North America annual conference.
16. Finan S, Levander J, Hochheiser H, Yuan Z, Durbin E, Hands I, Kavuluru R, Warner J, Savova G. DeepPhe: Natural Language Processing Tools for Cancer Research and Surveillance. 2022. AMIA Annual Fall Symposium.
17. Jiarui Yao, Eli Goldner, David Harris, Guergana Savova, 2024. Extracting Systemic Anticancer Therapy Timelines from Electronic Medical Records using Large Language Models. Artificial Intelligence in Oncology Workshop collocated with 22nd International Conference on Artificial Intelligence in Medicine. Salt Lake City, Utah, USA. July 9-12.
18. Harry Hochheiser, Jiarui Yao, Eli Goldner, Sean Finan, John Levander, Dennis Johns, David Harris, Gabrielle Dihn, Piet C. de Groen, Elizabeth Buchbinder, Danielle Bitterman, Jeremy L Warner, Guergana Savova, 2024. Extraction of Chemotherapy Treatment Timelines from EHR Notes and Temporal Modeling of Cancer Treatment in Adult and Pediatric Patients. AMIA Summit. March 2024. Boston, MA.
19. Jiarui Yao, Harry Hochheiser, WonJin Yoon, Eli T Goldner, Guergana K Savova. 2024. Overview of the 2024 Shared Task on Chemotherapy Treatment Timeline Extraction. Clinical NLP Workshop collocated with NAACL 2024. June 2024. Mexico City, Mexico.
20. Baek H, Hochheiser H, Finan S, Yuan Z, Levander J, Durbin EB, Hands I, Kavuluru R, Warner JL, Savova G, Hanauer D, Wright C, Savonen C, Goecks J, Jeremiah RD, Leek J Resources and Tools for Ethical Data Handling. Technical Demo for presentation at the 2023 ISMB Conference.
21. John Osborne, Gaurav Goyal, Chris Coffee, Sarah Fittro, 2023. Development of a Multi-variate Time Series Data Set for Reportable Cancer Recurrence (MVTS-CanRecur). AMIA Annual Symposium. New Orleans, LA, USA. Nov 2023.
22. Bitterman DS, Goldner E, Finan S, Harris D, Durbin EB, Hochheiser H, Warner JL, Mak RH, Miller T, Savova GK. An End-to-End Natural Language Processing System for Automatically Extracting Radiation Therapy Events From Clinical Texts. Int J Radiat Oncol Biol Phys. 2023 Sep 1;117(1):262-273. doi: 10.1016/j.ijrobp.2023.03.055. Epub 2023 Mar 27. PubMed PMID: 36990288; PubMed Central PMCID: PMC10522797.
23. Afiaz A, Ivanov A, Chamberlin J, Hanauer D, Savonen C, Goldman MJ, Morgan M, Reich M, Getka A, Holmes A, Pati S, Knight D, Boutros PC, Bakas S, Caporaso G, Del Fiol G, Hochheiser H, Hass B, Scholss PD, Jeedy JA, Albrecht J,Fedorov A, Waldron L, Hoffman AM, Bradshaw RL, Leek JT, Wright C Evaluation of software impact designed for biomedical research: Are we measuring what's meaningful? arxiv:236.03255 June 5, 2023 https://doi.org/10.48550/arXiv.2306.03255
24. Howard Baek, Elizabeth Humphries, Sean Finan. 2023. Enhancing Access to Genomics Tools. Technology Track at The International Society for Computational Biology (ISCB) joint conference on Intelligent Systems for Molecular Biology (ISMB) and the European Conference On Computational Biology (ECCB). July 2023, Lyon, France.  https://www.youtube.com/watch?v=wI5VRdERp-Y;  https://www.iscb.org/ismbeccb2023
25. Wang L, Li Y, Savova G. To Appear. Two-Stage Fine-Tuning for Improved Bias and Variance for Large Pretrained Language Models. ACL 2023 conference. Toronto, Canada. July 2023.
26. Sean Finan. 2023. Resources and Tools for Ethical Data Handling. Technology Track at The International Society for Computational Biology (ISCB) joint conference on Intelligent Systems for Molecular Biology (ISMB) and the European Conference On Computational Biology (ECCB). July 2023, Lyon, France.  https://www.youtube.com/watch?v=Q59fUNVUUIk;  https://www.iscb.org/ismbeccb2023
27. Harry Hochheiser, Sean Finan, Zhou Yuan, Eric B. Durbin, Jong Cheol Jeong, Isaac Hands, David Rust, Ramakanth Kavuluru, Xiao-Cheng Wu, Jeremy L. Warner, Guergana Savova. 2023. DeepPhe-CR: Natural Language Processing Software Services for Cancer Registrar Case Abstraction. https://www.medrxiv.org/content/10.1101/2023.05.05.23289524v1
28. Bitterman D, Goldner E, Finan S, Harris D, Durbin E, Hochheiser H, Warner J, Mak R, Miller T, Savova G. 2023. An end-to-end natural language processing system for automatically extracting radiotherapy events from clinical texts. International Journal of Radiation Oncology. In print.
29. Savova, G. 2022. Unstructured Data: Drawing Meaning Across Domains to Inform Healthcare. Machine Learning and Health Outcomes in Cancer Care Delivery Research (May 16-17, 2022) organized by the National Cancer Institute's Division of Cancer Control and Population Sciences (DCCPS). Washington, DC.
30. Finan, S; Yuan, Z; Levander, J; Durbin, E; Warner, J; Savova, G; Hochheiser, H. 2022. DeepPhe: Natural Language Processing Tools for Cancer Research and Surveillance. AMIA Annual Symposium. Washington, DC. November, 2022.
31. Wang, L; Miller, T; Bethard, S; Savova, G. 2022. Ensemble-based Fine-Tuning Strategy for Temporal Relation Extraction from the Clinical Narrative. Clinical NLP Workshop. North American Association for Computational Linguistics (NAACL). Seattle, WA. July, 2022.
32. Lin C, Miller T, Dligach D, Bethard S, Savova G. EntityBERT: Entity-centric Masking Strategy for Model Pretraining for the Clinical Domain. BioNLP workshop at the 2021 North American Association for Computational Linguistics (NAACL) conference; 2021 June.
33. Wright-Bettner K, Lin C, Miller T, Bethard S, Dligach D, Palmer M, Martin JH, Savova G. Defining and Learning Refined Temporal Relations in the Clinical Narrative. virtual conference due to COVID-19 pandemic: 11th International Workshop on Health Text Mining and Information Analysis (LOUHI) at EMNLP 2020; 2020 November. Available from: https://www.aclweb.org/anthology/2020.louhi-1.12.pdf.
34. Bitterman DS, Miller TA, Mak RH, Savova GK. Clinical Natural Language Processing for Radiation Oncology: A Review and Practical Primer. Int J Radiat Oncol Biol Phys. 2021 Feb 3;. doi: 10.1016/j.ijrobp.2021.01.044. [Epub ahead of print] Review. PubMed PMID: 33545300.
35. Jeon H, You SC, Kang SY, Seo SI, Warner JL, Belenkaya R, Park RW. Characterizing the Anticancer Treatment Trajectory and Pattern in Patients Receiving Chemotherapy for Cancer Using Harmonized Observational Databases: Retrospective Study. Journal of Medical Internet Research. 2021 Apr 6;9(4):e25035. PMID: 33720842; PMCID: PMC8058693.
36. Yuan Z, Finan S, Warner J, Savova G, Hochheiser H. Interactive Exploration of Longitudinal Cancer Patient Histories Extracted From Clinical Text. JCO Clin Cancer Inform. 2020 May;4:412-420. doi: 10.1200/CCI.19.00115. PubMed PMID: 32383981; PubMed Central PMCID: PMC7265796.
37. Ye Y (U Pitt), Boyce RD (U Pitt), Davis MK (U Pitt), Elliston K (tranSMART Foundation & Axiomedix, Inc.), Davatzikos C (U Penn), Fedorov A (Harvard), Fillion-Robin JC (Kitware Inc.), Foster I (U Chicago), Gilbertson J (U Pitt), Heiskanen M (NCI ITCR), Klemm J (NCI ITCR), Lasso A (Queen's University), Miller JV (GE Research), Morgan M (RPCI), Pieper S (Isomics Inc.), Raumann B (U Chicago), Sarachan B (GE Research), Savova G (Harvard), Silverstein JC (U Pitt), Taylor D (U Pitt), Zelnis J (U Pitt), Zhang GQ (UT Health) and Becich MJ (U Pitt). 2019. Open Source Software Sustainability Models: Initial White Paper from the Informatics Technology for Cancer Research Sustainability and Industry Partnership Work Group. Arxiv. https://arxiv.org/abs/1912.12371
38. Savova GK, Danciu I, Alamudun F, Miller T, Lin C, Bitterman DS, Tourassi G, Warner JL. Use of Natural Language Processing to Extract Clinical Cancer Phenotypes from Electronic Medical Records. Cancer Res. 2019 Nov 1;79(21):5463-5470. doi: 10.1158/0008-5472.CAN-19-0579. Epub 2019 Aug 8. Review. PubMed PMID: 31395609; PubMed Central PMCID: PMC7227798.
39. Warner JL, Dymshyts D, Reich CG, Gurley MJ, Hochheiser H, Moldwin ZH, Belenkaya R, Williams AE, Yang PC. HemOnc: A new standard vocabulary for chemotherapy regimen representation in the OMOP common data model. J Biomed Inform. 2019 Aug;96:103239. doi: 10.1016/j.jbi.2019.103239. Epub 2019 Jun 22. PubMed PMID: 31238109; PubMed Central PMCID: PMC6697579.
40. Malty AM, Jain SK, Yang PC, Harvey K, Warner JL. Computerized Approach to Creating a Systematic Ontology of Hematology/Oncology Regimens. JCO Clin Cancer Inform. 2018;2. doi: 10.1200/CCI.17.00142. Epub 2018 May 11. PubMed PMID: 30238070; PubMed Central PMCID: PMC6141041.
41. Miller, Timothy; Dligach, Dmitriy; Bethard, Steven; Lin, Chen; Savova, Guergana. 2017. Towards Portable Entity-Centric Clinical Coreference Resolution. Journal of Biomedical Informatics. Vol. 69, May 2017, pp. 251-258. https://doi.org/10.1016/j.jbi.2017.04.015; http://www.sciencedirect.com/science/article/pii/S1532046417300850
42. Castro SM, Tseytlin E, Medvedeva O, Mitchell K, Visweswaran S, Bekhuis T, Jacobson RS. 2017. Automated annotation and classification of BI-RADS assessment from radiology reports. J Biomed Inform. 2017 May;69:177-187. doi: 10.1016/j.jbi.2017.04.011. PMID: 28428140; PMCID: PMC5706448 [Available on 2018-05-01] DOI:10.1016/j.jbi.2017.04.011
43. Lin, Chen; Miller, Timothy; Dligach, Dmitriy; Bethard, Steven; Savova, Guergana. 2017. Representations of Time Expressions for Temporal Relation Extraction with Convolutional Neural Networks. BioNLP workshop at the Association for Computational Linguistics conference. Vancouver, Canada, Friday August 4, 2017
44. Miller, T; Bethard, S; Amiri, H; Savova, G. 2017. Unsupervised Domain Adaptation for Clinical Negation Detection. BioNLP workshop at the Association for Computational Linguistics conference. Vancouver, Canada, Friday August 4, 2017
45. Savova, G., Tseytlin, E., Finan, S., Castine, M., Miller, T., Medvedeva O., Haris, D., Hochheiser, H., Lin, C., Chavan, G., Jacobson R. 2017. DeepPhe - A Natural Language Processing System for Extracting Cancer Phenotypes from Clinical Records. Annual Symposium of the American Medical Informatics Association (AMIA). Nov 2017. Washington DC
46. Savova, G., Tseytlin, E., Finan, S., Castine, M., Miller, T., Medvedeva O., Haris, D., Hochheiser, H., Lin, C., Chavan, G., Jacobson R. 2017. DeepPhe: A Natural Language Processing System for Extracting Cancer Phenotypes from Clinical Records Cancer Research 77(21), November 2017 DOI: 10.1158/0008-5472.CAN-17-0615.
47. Savova, G; Miller, T. 2018. DeepPhe and Extraction of Oncology Patient Phenotypes from Unstructured Text Using NLP and Other AI Tools. Presentation to Dana Farber Cancer Institute. January 24 2018. Boston, MA.
48. Chen, Lin; Miller, Timothy; Dligach, Dmitriy; Bethard, Steven; Savova, Guergana. 2016. Improving Temporal Relation Extraction with Training Instance Augmentation. BioNLP workshop at the Association for Computational Linguistics conference. Berlin, Germany, Aug 2016
49. Hochheiser, Harry; Castine, Melissa; Harris, David; Savova, Guergana; Jacobson, Rebecca. 2016. An Information Model for Cancer Phenotypes. BMC Medical Informatics and Decision Making. https://bmcmedinformdecismak.biomedcentral.com/articles/10.1186/s12911-016-0358-4
50. Ethan Hartzell, Chen Lin. 2016. Enhancing Clinical Temporal Relation Discovery with Syntactic Embeddings from GloVe. International Conference on Intelligent Biology and Medicine (ICIBM 2016). December 2016, Houston, Texas, USA
51. Dligach, Dmitriy; Miller, Timothy; Lin, Chen; Bethard, Steven; Savova, Guergana. 2017. Neural temporal relation extraction. European Chapter of the Association for Computational Linguistics (EACL 2017). April 3-7, 2017. Valencia, Spain.
52. Hochheiser H; Jacobson R; Washington N; Denny J; Savova G. 2015. Natural language processing for phenotype extraction: challenges and representation. AMIA Annual Symposium. Nov 2015, San Francisco, CA.
53. Dmitriy Dligach, Timothy Miller, Guergana K. Savova. 2015. Semi-supervised Learning for Phenotyping Tasks. AMIA Annual Symposium. Nov 2015, San Francisco, CA.
54. Chen, Lin; Dligach, Dmitriy; Miller, Timothy; Bethard, Steven; Savova, Guergana. 2015. Layered temporal modeling for the clinical domain. Journal of the American Medical Informatics Association. http://jamia.oxfordjournals.org/content/early/2015/10/31/jamia.ocv113
55. Savova G, Hochheiser H. Cancer Deep Phenotyping from Electronic Medical Records. In Workshop at 2021 North American Association of Central Cancer Registries. 2021 June. Virtual due to COVID-19.
56. Savova G, Hochheiser H. Cancer Deep Phenotyping from Electronic Medical Records. Seminar series at Department of Biomedical Informatics, Vanderbilt University. 2021 April; Nashville, TN.
57. Savova G. Natural Language Processing for Biomedicine. Informatics and Implementation Science Learning Series (I2S2).. 2021 April; Brown University, RI, USA.
58. Meystre S, Silverstein J, Savova G, Petkov V, Savova G, Malin B. De-identification of Clinical Text: Stakeholder's Perspectives and Acceptance of Automatic De-identification. Panel at the American Medical Informatics Association Annual Symposium. 2020 November; virtual due to COVID-19.
59. Savova G. Natural Language Processing for Cancer Deep Phenotyping. Observational Health Data Sciences and Informatics (OHDSI) consortium. 2020 October; virtual due to COVID-19 pandemic.
60. Savova G. Clinical Natural Language Processing, Some Tasks and Applications in Medicine. 11th International Workshop on Heath Text Mining and Information Analysis (LOUHI), Conference on Empirical Methods for Natural Language Processing (EMNLP). 2020 October; Virtual due to COVID-19.
61. Savova G. Current status, performance, and future development of clinical text de-identification systems: MIST system. National Cancer Institute, National Institutes of Health. 2020 February; Washington, DC.
62. Savova G. Acceptance of machine text de-identification of EMR data by all stakeholders: What do we need to consider?. National Cancer Institute, National Institutes of Health. 2020 February; Washington, DC.
63. Savova G, Hochheiser H. Cancer Deep Phenotype Extraction from Electronic Medical Records. Data Science Seminar Series. National Cancer Institute, National Institutes of Health. 2019 October; Washington, DC.
64. Warner J, Durbin E, Petkov V, Savova G. Tools and Software to Automate and Normalize the Cancer Data Abstraction Workflow. Vancouver, Canada: Workshop at 2019 Conference of the North American Association of Central Cancer Registries and the International Association of Cancer Registries; 2019 June.
65. Savova G. Cancer Deep Phenotype Extraction from Electronic Medical Records. Molecular Med Tri-con. 2019 March; San Francisco, CA, USA.
66. Yuan Z, Finan S, Warner J, Savova G, Hochheiser H. Toward Longitudinal Visual Analytics for Cancer Patient Trajectories Extracted from Clinical Text. 2018 Workshop on Visual Analytics and Healthcare, Demonstration Presentation. AMIA 2018. 2018 November; San Francisco, CA, USA.
67. Warner J, Elhadad N, Bastrache L, Gotz D, Savova G. Panel - Didactic: Computable Longitudinal Patient Trajectories. Annual Symposium of the American Medical Informatics Association. 2018 November; San Francisco, CA, USA.
68. Savova G. Software and Research Challenges for Clinical NLP. Dana Farber Cancer Institute. 2018 October; Boston, MA, USA.
69. Savova G. Software and Research Challenges for Clinical NLP. UPMC. 2018 September; Pittsburgh, PA, United States.
70. Savova G. Cancer Deep Phenotype Extraction form Electronic Medical Records (DeepPhe). Astra Zeneca (invited talk). 2018 July; Waltham, MA, USA.
71. Savova G, Tseytlin E, Finan S, Castine M, Miller T, Medvedeva O, Harris D, Hochheiser H, Lin C, Chavan G, Warner J, Jacobson R. DeepPhe - a natural language processing system for extracting cancer phenotypes from clinical records. Annual conference of the North American Association of Central Cancer Registries (NAACCR). 2018 June; Pittsburgh, PENNSYLVANIA, United States.
72. Yang C, Malty A, Jain S, Harvey K, Finan S, Warner J. A Comprehensive Ontology of Hematology/Oncology Regimens. Annual conference of the North American Association of Central Cancer Registries (NAACCR). 2018 June; Pittsburgh, PENNSYLVANIA, United States.
73. Warner J, Harris D, Rubenstein S, Finan S, Lin C, Miller T, Amiri H, Hochheiser H, Savova G. Capturing high-resolution temporal cancer phenotypes using DeepPhe. Annual conference of the North American Association of Central Cancer Registries (NAACCR). 2018 June; Pittsburgh, PENNSYLVANIA, United States.
74. Savova G, Miller T. DeepPhe and Extraction of Oncology Patient Phenotypes from Unstructured Text Using NLP and Other AI Tools. Dana Farber Cancer Institute. 2018 January; Boston, MA, USA.
75. Warner J. Supporting cancer registries through automated extraction of pathology and chemotherapy regimen information. CDC/NCI/FDA/VA Clinical Natural Language Processing Workshop (invited). 2017 December; Atlanta, GA, USA.
76. Savova G. Select Applications of Natural Language Processing in Biomedicine. Natural Language Processing Symposium, Boston University (invited). 2017 November; Boston, MA, United States.
77. Jacobson R. Invited presentation at Case Western University Comprehensive Cancer Center Seminar Series. Case Western University Comprehensive Cancer Center Seminar Series. 2017 March; Cleveland, OH, USA.
78. Jacobson R. Invited presentation at Ohio State University James Cancer Center Grand Rounds. Ohio State University James Cancer Center Grand Rounds. 2017 January; Columbus, OH, USA.
79. Jacobson R, Savova G. Invited presentation at SEER meeting. SEER meeting. 2016 December; Gaithersburg, MD, USA.
80. Jacobson R. Invited presentation at University of Pittsburgh Cancer Institute Scientific Retreat. University of Pittsburgh Cancer Institute Scientific Retreat. 2016 June; Pittsburgh, PENNSYLVANIA, United States.
81. Jacobson R. Invited presentation at Pathology Informatics. Pathology Informatics. 2016 May; Pittsburgh, PENNSYLVANIA, United States.
82. Jacobson R. Invited presentation at University of Michigan Department of Learning Health Sciences. University of Michigan Department of Learning Health Sciences. 2016 April; Ann Arbor, MI, USA.
83. Finan S. Invited presentation at CI4CC. Cancer Informatics for Cancer Centers. 2016 March; Napa, CA, USA.
84. Jacobson R. Invited presentation at University of Pittsburgh Cancer Informatics (UPCI) External Advisory Board. University of Pittsburgh Cancer Informatics (UPCI). 2016 March; Pittsburgh, PENNSYLVANIA, United States.
85. Jacobson R. Invited presentation at SEER PI meeting. SEER PI meeting. 2016 March; New Mexico, NM, USA.

  </section>

  <section class="publications-panel" id="publications-search-panel" role="tabpanel" data-publications-view="search" aria-labelledby="publications-search-tab" hidden>

<div class="publications" data-publications>
  <header class="publications-header">
    <h1>Publications</h1>
    <p>Search DeepPhe journal articles, preprints, conference papers, talks, and panels.</p>
  </header>

  <div class="publications-controls" role="search" aria-label="Publication search and filters">
    <div class="publications-search">
      <label for="publications-search">Search publications</label>
      <div class="publications-search-field">
        <span class="publications-search-icon" aria-hidden="true">&#128269;</span>
        <input id="publications-search" type="search" placeholder="Search title, author, venue..." data-publications-search>
      </div>
    </div>
    <div class="publications-filters" role="group" aria-label="Filter by publication category">
      <button class="publications-filter" type="button" data-publications-filter="journal" aria-pressed="false">Journal</button>
      <button class="publications-filter" type="button" data-publications-filter="presentation" aria-pressed="false">Conference / Talk / Panel</button>
    </div>
  </div>

  <p class="publications-count" aria-live="polite" data-publications-count>{{ searchable_count }} of {{ searchable_count }} shown</p>
  <p class="publications-empty" data-publications-empty hidden>No matches.</p>

  <section class="publications-featured" data-publications-featured aria-labelledby="featured-publications-heading">
    <h2 id="featured-publications-heading">Cite this for general background</h2>
    <div class="publications-featured-grid">
{% for item in featured_entries %}
{% include publication-entry.html item=item track=false heading_level=3 %}
{% endfor %}
    </div>
  </section>

  <section class="publications-section" data-publication-section aria-labelledby="publications-heading">
    <h2 id="publications-heading">Journal</h2>
{% assign publication_groups = journal_entries | group_by: "year" | sort: "name" | reverse %}
{% for group in publication_groups %}
{% assign entries = group.items | sort: "title" %}
    <div class="publication-year-group" data-publication-year-group>
      <h3 class="publication-year" id="publications-{{ group.name }}">{{ group.name }}</h3>
{% for item in entries %}
{% include publication-entry.html item=item heading_level=4 %}
{% endfor %}
    </div>
{% endfor %}
  </section>

  <section class="publications-section" data-publication-section aria-labelledby="presentations-heading">
    <h2 id="presentations-heading">Conference / Talk / Panel</h2>
{% assign presentation_groups = presentation_entries | group_by: "year" | sort: "name" | reverse %}
{% for group in presentation_groups %}
{% assign entries = group.items | sort: "title" %}
    <div class="publication-year-group" data-publication-year-group>
      <h3 class="publication-year" id="presentations-{{ group.name }}">{{ group.name }}</h3>
{% for item in entries %}
{% include publication-entry.html item=item heading_level=4 %}
{% endfor %}
    </div>
{% endfor %}
  </section>
</div>

  </section>
</div>
