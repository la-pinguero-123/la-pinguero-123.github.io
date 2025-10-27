const PointsModule = (() => {
  const container = document.getElementById("pointsContainer");
  const create = (resume) => {
    const point = document.createElement("div");
    point.className = "point";
    point.style.left = resume.x + "%";
    point.style.top = resume.y + "%";
    const iconHTML = resume.icon
      ? `<img src="${resume.icon}" class="icon-image">`
      : `<div>⚡</div>`;
    point.innerHTML = `<div class="point-icon">${iconHTML}</div><div class="point-preview"><div class="preview-name">${resume.name}</div></div>`;
    point.addEventListener("click", () =>
      EventBus.emit("point:clicked", resume)
    );
    container.appendChild(point);
  };
  const init = () => {
    CONSTANTS.RESUMES.forEach(create);
  };
  return { init };
})();
