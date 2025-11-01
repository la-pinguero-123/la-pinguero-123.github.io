const PointsModule = (() => {
  const container = document.getElementById("pointsContainer");
  const create = (resume) => {
    const point = document.createElement("div");
    point.className = "point";
    point.id = `point-${resume.id}`;
    point.style.left = resume.x + "%";
    point.style.top = resume.y + "%";
    point.dataset.name = resume.name.toLowerCase();
    const iconHTML = resume.icon
      ? `<img src="${resume.icon}" alt="${resume.name}" class="icon-image">`
      : `<div class="icon-default">⚡</div>`;
    const avatarSrc = resume.avatar || "";
    point.innerHTML = `
 <div class="point-icon">
 <div class="icon-glow"></div>
 <div class="icon-inner">${iconHTML}</div>
 </div>
 <div class="point-preview">
 ${
   avatarSrc
     ? `<img src="${avatarSrc}" alt="${resume.name}" class="preview-image">`
     : ""
 }
 <div class="preview-info">
 <div class="preview-name">${resume.name}</div>
 </div>
 </div>
 `;
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
