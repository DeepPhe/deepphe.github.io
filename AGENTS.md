# AGENTS.md

## Project Overview

This repository is the Jekyll static site for DeepPhe. Netlify builds it with `jekyll build` and publishes `_site`.

The publications page lives at `/papers/` and in `papers.md`, but user-facing navigation should call it `Publications`.

## Canonical Names

- Use `DeepPhe` for the overall project, platform, and organization-level umbrella.
- Use `DeepPhe Translational` for the translational research product/release in user-facing copy.
- Use `DeepPhe-CR` for the cancer registry product/workflow in user-facing copy.
- Use `DeepPhe-CR Final` only when referring specifically to the final software release or a page/release artifact that is already named that way.
- Use `DeepPhe Visualizer` for the visualization product and its work across versions in ordinary user-facing copy.
- Use `DeepPhe Visualizer 2` only when referring specifically to version 2, its installer, source package, repository, or versioned documentation.
- Avoid introducing alternate spellings such as `DeepPhe CR`, `DeepPhe-Translational`, or `DeepPhe XN` in new user-facing copy unless quoting an existing release name, file name, URL, or historical title.

## Team And Profile Rules

- The Team page lists the current team only. Do not add a past-contributors section or infer current membership from GitHub history.
- Do not list former contributors Dennis Johns or Zhou Yuan on the current Team page.
- Project leadership is Guergana K. Savova (principal investigator), Harry Hochheiser (site principal investigator), and Jeremy L. Warner (site principal investigator).
- Jeremy Warner is a medical oncologist and hematologist; include that clinically relevant role when space permits.
- Sean Finan's title is `Principal Engineer`. He is DeepPhe's lead/principal developer and belongs under technical leadership. Do not assign that role to John Levander.
- John Levander's title is `Software Developer`. His DeepPhe work includes the DeepPhe Visualizer, project website, cross-platform installer, Data API, database pipeline, and related distribution infrastructure; do not label him a designer.
- Spell Eli Goldner's name exactly as shown here. He is an NLP Data Scientist and current contributor.
- Use a person's official institutional profile as the primary profile link when one is publicly available. Do not use GitHub as a person's primary professional profile.
- Show current affiliations on team cards and profiles. Use a professional photograph only when its identity and public source are verified; otherwise omit the photograph.
- Keep biographies factual, specific, and restrained. Avoid promotional language, superlatives, or describing an academic as an industry leader or expert unless directly supported and necessary.

## Funding And Institutional Credit

- Acknowledge the participating institutions and current grants where appropriate.
- When a grant number is shown, link the visible grant number to its NIH RePORTER project page.
- Keep product-wide funding language version-neutral unless the cited award or artifact is explicitly version-specific.

## Design And Accessibility

- Treat WCAG 2.2 AA as the baseline: semantic structure, keyboard operation, visible focus, sufficient text and control contrast, descriptive link text, meaningful image alternatives, and no horizontal scrolling at 320 CSS pixels.
- The default theme itself must be accessible. Do not use a high-contrast toggle as a substitute for fixing contrast in the base theme.
- Reserve teal link styling for interactive text. Non-interactive headings and labels should not look like links.
- Use the shared `--page-top-space` and `--page-bottom-space` values in `assets/css/style.scss` instead of stacking Bootstrap spacing utilities with layout-specific margins. Current page offsets are 40/32 pixels on desktop and 28/24 pixels on small screens.
- Standard content panels use approximately 30 pixels of internal bottom padding. Do not reintroduce `section-with-bottom-air`, `pb-6`, `pb-md-10`, arbitrary fixed heights, or other one-off spacing that leaves content stranded far above a border or footer.
- Keep team cards aligned within each grid row despite different name, institution, and specialty lengths. Preserve the responsive three-column, two-column, and one-column progression.

## Publications Page Rules

- Keep the route as `/papers/`, but keep the menu label as `Publications`.
- The default view is `All`, showing the old long wall-of-text publications list from `https://deepphe.github.io/papers/`.
- The secondary view is `Search`, showing the searchable structured publications display.
- Search categories should use these unified labels:
  - `Journal` includes `journal` and `preprint`.
  - `Presentation` includes `conference`, `talk`, `panel`, and `pres`.
- Do not feature the old `DeepPhe-CR: Natural Language Processing Software Services for Cancer Registrar Case Abstraction` medRxiv preprint in the `Cite this for general background` area.
- Keep citation export controls available on structured publication entries.

## Key Files

- `_config.yml` controls the Jekyll site configuration, including `baseurl`.
- `_data/menus.yml` controls the main navigation labels.
- `papers.md` contains the publications page layout and view controls.
- `_data/publications.yml` contains structured publication records.
- `_includes/publication-entry.html` renders structured publication cards.
- `assets/js/publications.js` powers publications search, filters, and citation export.
- `assets/css/publications.css` styles the publications page.
- `_team/` contains current team profile data and biography copy.
- `_layouts/teams.html`, `_includes/team-card.html`, and `_sass/pages/team/_team-summary.scss` control the Team page and profiles.
- `assets/css/style.scss` contains the site-wide theme, accessibility treatments, and shared spacing rules.
- `_site/` is generated output and is tracked in this repository.

## Build And Verify

Use these checks after site changes:

```bash
bundle exec jekyll build --disable-disk-cache
node --check assets/js/publications.js
node scripts/check-links.mjs _site
git diff --check
```

Use `node scripts/check-links.mjs _site --external` when you also want to check external URLs. Some publishers and LinkedIn block automated checks with 401/403/429/999 responses; the script counts those as blocked instead of broken.

Useful publication count checks:

```bash
sed -n '/id="publications-all-panel"/,/id="publications-search-panel"/p' _site/papers/index.html | rg -c '<li>'
rg -c 'data-publication-entry' _site/papers/index.html
```

Expected counts after the current publications work:

- Old `All` list: `85` list items.
- Structured `Search` entries: `74` publication entries.
- `Journal`: `22` entries from `journal` and `preprint`.
- `Presentation`: `52` entries from `conference`, `talk`, `panel`, and `pres`.

For visual or theme changes, inspect Home, Mission, Team, Software, Downloads, Documentation, Video, Publications, one team profile, and one software detail page at desktop width and at 320 CSS pixels. Check for horizontal overflow, premature text wrapping, missing images, inconsistent card alignment, and excessive top or bottom whitespace.

## Generated Files

Prefer editing source files first, then rebuild with Jekyll when generated output needs to match. Because `_site/` is tracked here, include rebuilt `_site/` files when the user asks for a deployable or committed site state.

Do not commit `.jekyll-cache`, `.bundle`, or `vendor` unless the user explicitly asks for dependency artifacts.

## Git Workflow

Check `git status -sb` before editing or committing. The worktree may contain user changes; do not revert unrelated changes. If the user asks for an exact commit message, use that message exactly. Push `main` when the user asks to push.

## Local Server

Run the local site with:

```bash
bundle exec jekyll serve --host 127.0.0.1 --port 4000 --disable-disk-cache
```

The local publications page is usually available at:

```text
http://127.0.0.1:4000/<configured-baseurl>/papers/
```
