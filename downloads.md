---
title: Downloads
permalink: /downloads/
layout: default
description: software release downloads
---

# Software Release Downloads

{% if site.data.downloads %}
<div class="strip strip-grey">
  <div class="container pt-6 pb-6 pt-md-10 pb-md-10">
    <div class="row justify-content-center">

      {% for download in site.data.downloads %}
      <div class="col-12 col-md-6 col-lg-4 mb-2">
        <div class="feature">
          <h2 class="feature-title"><A HREF="{{ download.link }}">{{ download.title }}</a></h2>
          <div class="feature-content">{{ download.description }}</div>
        </div>
      </div>
      {% endfor %}

    </div>
  </div>
</div>
{% endif %}
