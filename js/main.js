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
});