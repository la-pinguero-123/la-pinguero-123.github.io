document.addEventListener("DOMContentLoaded", () => {
  State.load();

  document.querySelector(".map-container").classList.add("visible");
  PointsModule.init();
  ModalModule.init();
  SearchModule.init();
  ZoomModule.init();
  AchievementsModule.init();

  window.addEventListener("beforeunload", () => State.save());
});
