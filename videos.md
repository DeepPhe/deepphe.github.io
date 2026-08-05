---
title: Video
permalink: /videos/
layout: papers
description: DeepPhe introductory video presentation.
---

{% assign videos = site.data.videos %}

<div class="videos-page">
{% if videos.size == 1 %}
{% assign v = videos.first %}
  <section class="video-feature" aria-labelledby="video-title-1">
    <div class="video-caption">
      <h1 id="video-title-1">{{ v.title }}</h1>
{% if v.event %}
      <p>{{ v.event }}</p>
{% else %}
      <p>{{ v.venue }} &middot; {{ v.year }}</p>
{% endif %}
{% if v.description and v.description != "" %}
      <p class="video-description">{{ v.description }}</p>
{% endif %}
    </div>
    <div class="video-embed">
      <iframe src="https://www.youtube-nocookie.com/embed/{{ v.youtube_id }}" title="{{ v.title | escape }}" loading="lazy" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
    </div>
  </section>
{% else %}
  <header class="videos-header">
    <h1>Videos</h1>
  </header>

  <div class="video-grid">
{% for v in videos %}
    <article class="video-card" aria-labelledby="video-title-{{ forloop.index }}">
      <div class="video-caption">
        <h2 id="video-title-{{ forloop.index }}">{{ v.title }}</h2>
{% if v.event %}
        <p>{{ v.event }}</p>
{% else %}
        <p>{{ v.venue }} &middot; {{ v.year }}</p>
{% endif %}
{% if v.description and v.description != "" %}
        <p class="video-description">{{ v.description }}</p>
{% endif %}
      </div>
      <div class="video-embed">
        <iframe src="https://www.youtube-nocookie.com/embed/{{ v.youtube_id }}" title="{{ v.title | escape }}" loading="lazy" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
      </div>
    </article>
{% endfor %}
  </div>
{% endif %}
</div>
