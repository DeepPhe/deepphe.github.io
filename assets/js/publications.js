(function () {
  var page = document.querySelector("[data-publications-page]");
  if (page) {
    var viewButtons = Array.prototype.slice.call(page.querySelectorAll("[data-publications-view-button]"));
    var viewPanels = Array.prototype.slice.call(page.querySelectorAll("[data-publications-view]"));

    function setActiveView(view) {
      viewButtons.forEach(function (button) {
        var active = button.getAttribute("data-publications-view-button") === view;
        button.setAttribute("aria-selected", active ? "true" : "false");
        button.setAttribute("tabindex", active ? "0" : "-1");
      });

      viewPanels.forEach(function (panel) {
        panel.hidden = panel.getAttribute("data-publications-view") !== view;
      });
    }

    viewButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        setActiveView(button.getAttribute("data-publications-view-button"));
      });

      button.addEventListener("keydown", function (event) {
        var index = viewButtons.indexOf(button);
        var nextIndex = -1;

        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
          nextIndex = (index + 1) % viewButtons.length;
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          nextIndex = (index - 1 + viewButtons.length) % viewButtons.length;
        } else if (event.key === "Home") {
          nextIndex = 0;
        } else if (event.key === "End") {
          nextIndex = viewButtons.length - 1;
        }

        if (nextIndex !== -1) {
          event.preventDefault();
          var nextButton = viewButtons[nextIndex];
          setActiveView(nextButton.getAttribute("data-publications-view-button"));
          nextButton.focus();
        }
      });
    });

    setActiveView(window.location.hash === "#search" ? "search" : "all");
  }

  var root = document.querySelector("[data-publications]");
  if (!root) {
    return;
  }

  var searchInput = root.querySelector("[data-publications-search]");
  var filters = Array.prototype.slice.call(root.querySelectorAll("[data-publications-filter]"));
  var entries = Array.prototype.slice.call(root.querySelectorAll("[data-publication-entry]"));
  var count = root.querySelector("[data-publications-count]");
  var empty = root.querySelector("[data-publications-empty]");
  var featured = root.querySelector("[data-publications-featured]");
  var groups = Array.prototype.slice.call(root.querySelectorAll("[data-publication-year-group]"));
  var sections = Array.prototype.slice.call(root.querySelectorAll("[data-publication-section]"));

  function normalize(value) {
    return (value || "").toLowerCase();
  }

  function activeFilter() {
    var active = filters.find(function (button) {
      return button.getAttribute("aria-pressed") === "true";
    });
    return active ? active.getAttribute("data-publications-filter") : "";
  }

  function clean(value) {
    return (value || "").replace(/\s+/g, " ").trim();
  }

  function xml(value) {
    return clean(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  }

  function bib(value) {
    return clean(value)
      .replace(/\\/g, "\\textbackslash{}")
      .replace(/[{}]/g, "\\$&");
  }

  function splitAuthors(value) {
    return clean(value).split(/\s*,\s*/).filter(Boolean);
  }

  function parseAuthor(value) {
    var literal = clean(value);
    var parts = literal.split(/\s+/).filter(Boolean);
    if (parts.length <= 1) {
      return { literal: literal, family: literal, given: "" };
    }

    var last = parts[parts.length - 1];
    var normalizedLast = last.replace(/[^A-Za-z.]/g, "");
    var looksLikeInitials = /^[A-Z.]+$/.test(normalizedLast) && normalizedLast.replace(/\./g, "").length <= 4;
    if (looksLikeInitials) {
      return {
        literal: literal,
        family: parts.slice(0, -1).join(" "),
        given: last
      };
    }

    return {
      literal: literal,
      family: last,
      given: parts.slice(0, -1).join(" ")
    };
  }

  function slug(value) {
    return clean(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80) || "citation";
  }

  function citationKey(data) {
    var author = data.parsedAuthors[0] ? data.parsedAuthors[0].family : "citation";
    var titleWord = clean(data.title).split(/\s+/).find(function (word) {
      return word.length > 3;
    }) || "work";
    return slug(author + "-" + data.year + "-" + titleWord).replace(/-/g, "");
  }

  function getCitationData(entry) {
    var doi = clean(entry.getAttribute("data-cite-doi"));
    var url = clean(entry.getAttribute("data-cite-url"));
    var authors = splitAuthors(entry.getAttribute("data-cite-authors"));
    return {
      type: clean(entry.getAttribute("data-cite-type")),
      title: clean(entry.getAttribute("data-cite-title")),
      authors: authors,
      parsedAuthors: authors.map(parseAuthor),
      year: clean(entry.getAttribute("data-cite-year")),
      venue: clean(entry.getAttribute("data-cite-venue")),
      location: clean(entry.getAttribute("data-cite-location")),
      doi: doi,
      pmid: clean(entry.getAttribute("data-cite-pmid")),
      pmcid: clean(entry.getAttribute("data-cite-pmcid")),
      url: url || (doi ? "https://doi.org/" + doi : "")
    };
  }

  function risType(type) {
    if (type === "journal") {
      return "JOUR";
    }
    if (type === "conference") {
      return "CPAPER";
    }
    return "GEN";
  }

  function cslType(type) {
    if (type === "journal") {
      return "article-journal";
    }
    if (type === "conference") {
      return "paper-conference";
    }
    if (type === "talk" || type === "panel" || type === "pres") {
      return "speech";
    }
    return "article";
  }

  function bibType(type) {
    if (type === "journal") {
      return "article";
    }
    if (type === "preprint") {
      return "unpublished";
    }
    if (type === "conference") {
      return "inproceedings";
    }
    return "misc";
  }

  function endNoteType(type) {
    if (type === "journal") {
      return "Journal Article";
    }
    if (type === "conference") {
      return "Conference Paper";
    }
    return "Generic";
  }

  function line(tag, value) {
    return value ? tag + "  - " + clean(value) + "\r\n" : "";
  }

  function buildRis(data) {
    var output = "TY  - " + risType(data.type) + "\r\n";
    data.authors.forEach(function (author) {
      output += line("AU", author);
    });
    output += line("TI", data.title);
    output += line(data.type === "journal" ? "JO" : "T2", data.venue);
    output += line("PY", data.year);
    output += line("CY", data.location);
    output += line("DO", data.doi);
    output += line("UR", data.url);
    output += line("AN", data.pmid);
    output += line("N1", data.pmcid ? "PMCID: " + data.pmcid : "");
    output += "ER  - \r\n";
    return output;
  }

  function buildCslJson(data) {
    var item = {
      id: citationKey(data),
      type: cslType(data.type),
      title: data.title,
      author: data.parsedAuthors.map(function (author) {
        return author.given ? { family: author.family, given: author.given } : { literal: author.literal };
      })
    };
    if (data.year) {
      item.issued = { "date-parts": [[Number(data.year) || data.year]] };
    }
    if (data.venue) {
      if (item.type === "speech") {
        item.event = data.venue;
      } else {
        item["container-title"] = data.venue;
      }
    }
    if (data.location) {
      item["publisher-place"] = data.location;
    }
    if (data.doi) {
      item.DOI = data.doi;
    }
    if (data.pmid) {
      item.PMID = data.pmid;
    }
    if (data.pmcid) {
      item.PMCID = data.pmcid;
    }
    if (data.url) {
      item.URL = data.url;
    }
    if (data.type === "preprint") {
      item.genre = "Preprint";
    }
    return JSON.stringify([item], null, 2) + "\n";
  }

  function buildBibLatex(data) {
    var entryType = bibType(data.type);
    var fields = [
      ["title", data.title],
      ["author", data.authors.join(" and ")],
      ["date", data.year]
    ];
    if (data.type === "journal") {
      fields.push(["journaltitle", data.venue]);
    } else if (data.type === "conference") {
      fields.push(["eventtitle", data.venue]);
    } else if (data.type === "preprint") {
      fields.push(["note", "Preprint"]);
      fields.push(["institution", data.venue]);
    } else {
      fields.push(["howpublished", data.venue]);
    }
    fields.push(["location", data.location]);
    fields.push(["doi", data.doi]);
    fields.push(["url", data.url]);
    fields.push(["pmid", data.pmid]);
    fields.push(["pmcid", data.pmcid]);

    return "@" + entryType + "{" + citationKey(data) + ",\n" + fields.filter(function (field) {
      return field[1];
    }).map(function (field) {
      return "  " + field[0] + " = {" + bib(field[1]) + "},";
    }).join("\n") + "\n}\n";
  }

  function buildEndNoteEnw(data) {
    var output = "%0 " + endNoteType(data.type) + "\n";
    data.authors.forEach(function (author) {
      output += "%A " + clean(author) + "\n";
    });
    output += data.title ? "%T " + data.title + "\n" : "";
    output += data.year ? "%D " + data.year + "\n" : "";
    output += data.venue ? "%J " + data.venue + "\n" : "";
    output += data.location ? "%C " + data.location + "\n" : "";
    output += data.doi ? "%R " + data.doi + "\n" : "";
    output += data.url ? "%U " + data.url + "\n" : "";
    output += data.pmid ? "%M PMID: " + data.pmid + "\n" : "";
    output += data.pmcid ? "%Z PMCID: " + data.pmcid + "\n" : "";
    return output;
  }

  function buildEndNoteXml(data) {
    var refType = data.type === "journal" ? "17" : data.type === "conference" ? "47" : "13";
    return "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
      "<xml>\n  <records>\n    <record>\n" +
      "      <ref-type name=\"" + xml(endNoteType(data.type)) + "\">" + refType + "</ref-type>\n" +
      "      <contributors><authors>\n" +
      data.authors.map(function (author) {
        return "        <author>" + xml(author) + "</author>";
      }).join("\n") +
      "\n      </authors></contributors>\n" +
      "      <titles>\n        <title>" + xml(data.title) + "</title>\n" +
      (data.venue ? "        <secondary-title>" + xml(data.venue) + "</secondary-title>\n" : "") +
      "      </titles>\n" +
      (data.year ? "      <dates><year>" + xml(data.year) + "</year></dates>\n" : "") +
      (data.location ? "      <pub-location>" + xml(data.location) + "</pub-location>\n" : "") +
      (data.doi ? "      <electronic-resource-num>" + xml(data.doi) + "</electronic-resource-num>\n" : "") +
      (data.pmid ? "      <accession-num>" + xml(data.pmid) + "</accession-num>\n" : "") +
      (data.url ? "      <urls><related-urls><url>" + xml(data.url) + "</url></related-urls></urls>\n" : "") +
      (data.pmcid ? "      <notes><style face=\"normal\" font=\"default\" size=\"100%\">PMCID: " + xml(data.pmcid) + "</style></notes>\n" : "") +
      "    </record>\n  </records>\n</xml>\n";
  }

  function buildMods(data) {
    return "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
      "<mods xmlns=\"http://www.loc.gov/mods/v3\" version=\"3.7\">\n" +
      "  <titleInfo><title>" + xml(data.title) + "</title></titleInfo>\n" +
      data.authors.map(function (author) {
        return "  <name type=\"personal\"><namePart>" + xml(author) + "</namePart><role><roleTerm type=\"text\">author</roleTerm></role></name>";
      }).join("\n") + "\n" +
      "  <typeOfResource>text</typeOfResource>\n" +
      (data.type ? "  <genre>" + xml(data.type) + "</genre>\n" : "") +
      "  <originInfo>\n" +
      (data.location ? "    <place><placeTerm type=\"text\">" + xml(data.location) + "</placeTerm></place>\n" : "") +
      (data.year ? "    <dateIssued>" + xml(data.year) + "</dateIssued>\n" : "") +
      "  </originInfo>\n" +
      (data.venue ? "  <relatedItem type=\"host\"><titleInfo><title>" + xml(data.venue) + "</title></titleInfo></relatedItem>\n" : "") +
      (data.doi ? "  <identifier type=\"doi\">" + xml(data.doi) + "</identifier>\n" : "") +
      (data.pmid ? "  <identifier type=\"pmid\">" + xml(data.pmid) + "</identifier>\n" : "") +
      (data.pmcid ? "  <identifier type=\"pmcid\">" + xml(data.pmcid) + "</identifier>\n" : "") +
      (data.url ? "  <location><url>" + xml(data.url) + "</url></location>\n" : "") +
      "</mods>\n";
  }

  function buildMarcXml(data) {
    var firstAuthor = data.authors[0] || "";
    var otherAuthors = data.authors.slice(1);
    return "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
      "<record xmlns=\"http://www.loc.gov/MARC21/slim\">\n" +
      "  <leader>00000nam a2200000 i 4500</leader>\n" +
      (data.year ? "  <controlfield tag=\"008\">" + xml(data.year) + "|||||||||||||||||||||||||||||||||||||</controlfield>\n" : "") +
      (firstAuthor ? "  <datafield tag=\"100\" ind1=\"1\" ind2=\" \"><subfield code=\"a\">" + xml(firstAuthor) + "</subfield></datafield>\n" : "") +
      otherAuthors.map(function (author) {
        return "  <datafield tag=\"700\" ind1=\"1\" ind2=\" \"><subfield code=\"a\">" + xml(author) + "</subfield></datafield>";
      }).join("\n") + (otherAuthors.length ? "\n" : "") +
      "  <datafield tag=\"245\" ind1=\"1\" ind2=\"0\"><subfield code=\"a\">" + xml(data.title) + "</subfield></datafield>\n" +
      (data.venue ? "  <datafield tag=\"773\" ind1=\"0\" ind2=\" \"><subfield code=\"t\">" + xml(data.venue) + "</subfield></datafield>\n" : "") +
      (data.doi ? "  <datafield tag=\"024\" ind1=\"7\" ind2=\" \"><subfield code=\"a\">" + xml(data.doi) + "</subfield><subfield code=\"2\">doi</subfield></datafield>\n" : "") +
      (data.url ? "  <datafield tag=\"856\" ind1=\"4\" ind2=\"0\"><subfield code=\"u\">" + xml(data.url) + "</subfield></datafield>\n" : "") +
      "</record>\n";
  }

  function buildDublinCore(data) {
    return "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
      "<oai_dc:dc xmlns:oai_dc=\"http://www.openarchives.org/OAI/2.0/oai_dc/\" xmlns:dc=\"http://purl.org/dc/elements/1.1/\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:schemaLocation=\"http://www.openarchives.org/OAI/2.0/oai_dc/ http://www.openarchives.org/OAI/2.0/oai_dc.xsd\">\n" +
      "  <dc:title>" + xml(data.title) + "</dc:title>\n" +
      data.authors.map(function (author) {
        return "  <dc:creator>" + xml(author) + "</dc:creator>";
      }).join("\n") + "\n" +
      (data.year ? "  <dc:date>" + xml(data.year) + "</dc:date>\n" : "") +
      (data.venue ? "  <dc:source>" + xml(data.venue) + "</dc:source>\n" : "") +
      (data.type ? "  <dc:type>" + xml(data.type) + "</dc:type>\n" : "") +
      (data.doi ? "  <dc:identifier>doi:" + xml(data.doi) + "</dc:identifier>\n" : "") +
      (data.pmid ? "  <dc:identifier>pmid:" + xml(data.pmid) + "</dc:identifier>\n" : "") +
      (data.pmcid ? "  <dc:identifier>pmcid:" + xml(data.pmcid) + "</dc:identifier>\n" : "") +
      (data.url ? "  <dc:identifier>" + xml(data.url) + "</dc:identifier>\n" : "") +
      "</oai_dc:dc>\n";
  }

  function buildCitation(data, format) {
    var formats = {
      "ris": { extension: "ris", mime: "application/x-research-info-systems", content: buildRis(data) },
      "csl-json": { extension: "json", mime: "application/json", content: buildCslJson(data) },
      "biblatex": { extension: "bib", mime: "application/x-bibtex", content: buildBibLatex(data) },
      "endnote-enw": { extension: "enw", mime: "application/x-endnote-refer", content: buildEndNoteEnw(data) },
      "endnote-xml": { extension: "endnote.xml", mime: "application/xml", content: buildEndNoteXml(data) },
      "mods": { extension: "mods.xml", mime: "application/xml", content: buildMods(data) },
      "marcxml": { extension: "marcxml.xml", mime: "application/xml", content: buildMarcXml(data) },
      "dublin-core": { extension: "dc.xml", mime: "application/xml", content: buildDublinCore(data) }
    };
    return formats[format];
  }

  function downloadCitation(data, format) {
    var citation = buildCitation(data, format);
    if (!citation) {
      return;
    }
    var file = slug(data.title) + "." + citation.extension;
    var blob = new Blob([citation.content], { type: citation.mime + ";charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.href = url;
    link.download = file;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 0);
  }

  function closeCiteMenus(except) {
    Array.prototype.slice.call(root.querySelectorAll("[data-publication-cite]")).forEach(function (control) {
      if (control === except) {
        return;
      }
      var toggle = control.querySelector("[data-cite-toggle]");
      var menu = control.querySelector("[data-cite-menu]");
      if (toggle && menu) {
        toggle.setAttribute("aria-expanded", "false");
        menu.hidden = true;
      }
    });
  }

  Array.prototype.slice.call(root.querySelectorAll("[data-publication-cite]")).forEach(function (control) {
    var toggle = control.querySelector("[data-cite-toggle]");
    var menu = control.querySelector("[data-cite-menu]");
    var options = Array.prototype.slice.call(control.querySelectorAll("[data-cite-format]"));
    if (!toggle || !menu) {
      return;
    }

    toggle.addEventListener("click", function (event) {
      event.stopPropagation();
      var expanded = toggle.getAttribute("aria-expanded") === "true";
      closeCiteMenus(control);
      toggle.setAttribute("aria-expanded", expanded ? "false" : "true");
      menu.hidden = expanded;
    });

    options.forEach(function (option) {
      option.addEventListener("click", function (event) {
        event.stopPropagation();
        var entry = option.closest(".publication-entry");
        if (entry) {
          downloadCitation(getCitationData(entry), option.getAttribute("data-cite-format"));
        }
        closeCiteMenus();
        toggle.focus();
      });
    });

    control.addEventListener("focusout", function () {
      window.setTimeout(function () {
        if (!control.contains(document.activeElement)) {
          closeCiteMenus();
        }
      }, 0);
    });
  });

  document.addEventListener("click", function () {
    closeCiteMenus();
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      var openToggle = root.querySelector('[data-cite-toggle][aria-expanded="true"]');
      closeCiteMenus();
      if (openToggle) {
        openToggle.focus();
      }
    }
  });

  function updateGroups() {
    groups.forEach(function (group) {
      var visible = group.querySelector("[data-publication-entry]:not([hidden])");
      group.hidden = !visible;
    });

    sections.forEach(function (section) {
      var visible = section.querySelector("[data-publication-entry]:not([hidden])");
      section.hidden = !visible;
    });
  }

  function applyFilters() {
    var query = normalize(searchInput ? searchInput.value : "");
    var filter = activeFilter();
    var shown = 0;

    entries.forEach(function (entry) {
      var text = normalize(entry.getAttribute("data-search"));
      var category = entry.getAttribute("data-category") || entry.getAttribute("data-type");
      var matchesQuery = !query || text.indexOf(query) !== -1;
      var matchesType = !filter || filter === category;
      var visible = matchesQuery && matchesType;
      entry.hidden = !visible;
      if (visible) {
        shown += 1;
      }
    });

    updateGroups();

    if (featured) {
      featured.hidden = query || filter;
    }

    if (count) {
      count.textContent = shown + " of " + entries.length + " shown";
    }
    if (empty) {
      empty.hidden = shown !== 0;
    }
  }

  filters.forEach(function (button) {
    button.addEventListener("click", function () {
      var wasPressed = button.getAttribute("aria-pressed") === "true";
      filters.forEach(function (item) {
        item.setAttribute("aria-pressed", "false");
      });
      if (!wasPressed) {
        button.setAttribute("aria-pressed", "true");
      }
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", applyFilters);
  }

  applyFilters();
})();
