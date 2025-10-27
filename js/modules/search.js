const SearchModule = (() => {
  const inp = document.getElementById("searchInput");
  const resCont = document.getElementById("searchResults");
  const init = () => {
    inp.addEventListener("input", search);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && inp.value) {
        inp.value = "";
        search();
      }
    });
  };
  const search = () => {
    const term = inp.value.toLowerCase().trim();
    const pts = document.querySelectorAll(".point");
    if (!term) {
      pts.forEach((p) => p.classList.remove("hidden", "found"));
      resCont.innerHTML = '<span class="results-text">ЖДЁМ ВВОД...</span>';
      return;
    }
    const found = [];
    pts.forEach((p) => {
      const name = p.dataset.name;
      if (name.includes(term)) {
        p.classList.add("found");
        p.classList.remove("hidden");
        found.push(name.toUpperCase());
      } else {
        p.classList.add("hidden");
        p.classList.remove("found");
      }
    });
    if (found.length) {
      resCont.innerHTML = `
        <span class="results-text found-text">✓ НАЙДЕНО: ${found.length}</span>
        <div class="found-list">
        ${found.map((n) => `<span class="found-item">> ${n}</span>`).join("")}
        </div>
      `;
    } else {
      resCont.innerHTML = '<span class="results-text no-results">✗ НЕ НАЙДЕНО</span>';
    }
  };
  return { init };
 })();
