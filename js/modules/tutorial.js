const TutorialModule = (() => {
  const modal = document.getElementById("tutorialModal");
  const closeBtn = document.getElementById("tutorialClose");
  const startBtn = document.getElementById("tutorialStart");
  const overlay = document.getElementById("scanningOverlay");
  const content = document.getElementById("main-content");
  const mapContainer = document.querySelector(".map-container");

  let shown = false;

  const show = () => {
    if (shown) return;
    shown = true;

    const hasVisited = localStorage.getItem(CONSTANTS.VISIT_KEY);

    if (!hasVisited) {
      overlay.classList.add("active");

      setTimeout(() => {
        overlay.classList.add("hidden");
        content.classList.add("visible");
        mapContainer.classList.add("visible");
        modal.classList.add("active");
      }, 3500);

      localStorage.setItem(CONSTANTS.VISIT_KEY, "true");
    } else {
      overlay.classList.add("hidden");
      content.classList.add("visible");
      mapContainer.classList.add("visible");
    }
  };

  const init = () => {
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("active");
    });

    startBtn.addEventListener("click", () => {
      modal.classList.remove("active");
      Notifications.send(
        "КАРТА АКТИВНА",
        "Начните нажимать на точки или используйте поиск.",
        "success"
      );
    });

    window.addEventListener("load", show);
  };

  return { init };
})();