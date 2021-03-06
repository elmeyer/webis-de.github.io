doFilterWebisDe = (query) => {
    const filteredAll = doFilter(document, query);

    const filteredAllMessage = document.getElementById("filtered-all-message");
    if (filteredAll) {
        filteredAllMessage.classList.remove("uk-hidden");
        filteredAllMessage.removeAttribute("aria-hidden");
    } else {
        filteredAllMessage.classList.add("uk-hidden");
        filteredAllMessage.setAttribute("aria-hidden", "true");
    }

    document.location.hash = "#?q=" + query;

    // Force UIkit update to prevent glitches
    UIkit.update();
};

// legacy 'filter:' option
if (document.location.hash.startsWith("#filter:")) {
    const query = decodeURIComponent(document.location.hash.substr(8));
    document.location.hash = "#?q=" + query;
}
// remove spurious "\"
if (document.location.hash.indexOf("\\") > 0) {
  document.location.hash = document.location.hash.replace(/\\/g, "");
}

// Set up filter field
const filterField = document.getElementById("bib-filter-field");
if (document.location.hash.startsWith("#?q=")) {
    const query = decodeURIComponent(document.location.hash.substr(4));
    filterField.value = query;
}
filterField.addEventListener("input", event => doFilterWebisDe(event.target.value));
activateBibtexToggle(document);
doFilterWebisDe(filterField.value);
if (document.location.hash.startsWith("#?q=") || document.location.hash === "") {
  filterField.focus();
}

// Update if hash in URL changed (e.g., browser back button)
window.addEventListener("hashchange", event => {
    if (document.location.hash.startsWith("#?q=")) {
        const query = decodeURIComponent(document.location.hash.substr(4));
        if (query !== filterField.value) {
          filterField.value = query;
          doFilterWebisDe(query);
        }
    }
});

