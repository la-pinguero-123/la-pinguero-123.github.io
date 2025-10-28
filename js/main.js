document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".map-container").classList.add("visible");
  PointsModule.init();
  ModalModule.init();
  SearchModule.init();
  ZoomModule.init();
});