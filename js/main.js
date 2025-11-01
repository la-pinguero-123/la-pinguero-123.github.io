document.addEventListener("DOMContentLoaded", () => {
  State.load();

  PointsModule.init();
  SearchModule.init();
  ZoomModule.init();
  ModalModule.init();
  NetworkModule.init();
  AchievementsModule.init();
  TutorialModule.init();

  if (State.getNetworkData().length >= 2) {
    setTimeout(() => {
      NetworkModule.draw();
    }, 300);
  }

  window.addEventListener("beforeunload", () => State.save());

  UI.getElements().infoBtn.addEventListener("click", () => {
    UI.toggleInfoModal(true);
  });

  document.getElementById("infoClose").addEventListener("click", () => {
    UI.toggleInfoModal(false);
  });

  document.getElementById("infoModal").addEventListener("click", (e) => {
    if (e.target === document.getElementById("infoModal")) {
      UI.toggleInfoModal(false);
    }
  });
});