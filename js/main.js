document.addEventListener("DOMContentLoaded", () => {
  State.load();

  document.querySelector(".map-container").classList.add("visible");

  PointsModule.init();
  SearchModule.init();
  ZoomModule.init();
  ModalModule.init();
  NetworkModule.init();
  AchievementsModule.init();

  if (State.getNetworkData().length >= 2) {
    setTimeout(() => {
      NetworkModule.draw();
    }, 200);
  }

  window.addEventListener("beforeunload", () => State.save());
});