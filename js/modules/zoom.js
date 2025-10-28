const ZoomModule = (() => {
  const mapContainer = document.querySelector(".map-container");
  const mapWrapper = document.getElementById("mapWrapper");
  const controls = {
    zoomIn: document.getElementById("zoomIn"),
    zoomOut: document.getElementById("zoomOut"),
    zoomReset: document.getElementById("zoomReset"),
    zoomLevel: document.getElementById("zoomLevel"),
  };

  let zoom = 1;
  let offsetX = 0;
  let offsetY = 0;
  let isDragging = false;
  let dragStart = { x: 0, y: 0 };

  const update = () => {
    mapWrapper.style.transform = `scale(${zoom}) translate(${
      offsetX / zoom
    }px, ${offsetY / zoom}px)`;
    controls.zoomLevel.textContent = Math.round(zoom * 100) + "%";
    constrain();

    EventBus.emit("map:transform");
  };

  const constrain = () => {
    const rect = mapWrapper.getBoundingClientRect();
    const maxOffsetX = (rect.width * (zoom - 1)) / (2 * zoom);
    const maxOffsetY = (rect.height * (zoom - 1)) / (2 * zoom);

    offsetX = Math.max(-maxOffsetX, Math.min(maxOffsetX, offsetX));
    offsetY = Math.max(-maxOffsetY, Math.min(maxOffsetY, offsetY));
  };

  const init = () => {
    controls.zoomIn.addEventListener("click", () => {
      if (zoom < CONSTANTS.MAX_ZOOM) {
        zoom += CONSTANTS.ZOOM_STEP;
        update();
      }
    });

    controls.zoomOut.addEventListener("click", () => {
      if (zoom > CONSTANTS.MIN_ZOOM) {
        zoom -= CONSTANTS.ZOOM_STEP;
        update();
      }
    });

    controls.zoomReset.addEventListener("click", () => {
      zoom = 1;
      offsetX = 0;
      offsetY = 0;
      update();
    });

    mapContainer.addEventListener(
      "wheel",
      (e) => {
        if (e.ctrlKey) {
          e.preventDefault();
          if (e.deltaY < 0 && zoom < CONSTANTS.MAX_ZOOM) {
            zoom += CONSTANTS.ZOOM_STEP;
          } else if (e.deltaY > 0 && zoom > CONSTANTS.MIN_ZOOM) {
            zoom -= CONSTANTS.ZOOM_STEP;
          }
          update();
        }
      },
      { passive: false }
    );

    mapWrapper.addEventListener("mousedown", (e) => {
      if (zoom > 1) {
        isDragging = true;
        dragStart = { x: e.clientX, y: e.clientY };
        mapWrapper.classList.add("dragging");
      }
    });

    document.addEventListener("mousemove", (e) => {
      if (isDragging) {
        offsetX += e.clientX - dragStart.x;
        offsetY += e.clientY - dragStart.y;
        dragStart = { x: e.clientX, y: e.clientY };
        constrain();
        mapWrapper.style.transform = `scale(${zoom}) translate(${
          offsetX / zoom
        }px, ${offsetY / zoom}px)`;
        EventBus.emit("map:transform");
      }
    });

    document.addEventListener("mouseup", () => {
      isDragging = false;
      mapWrapper.classList.remove("dragging");
    });
  };

  return { init, getZoom: () => zoom };
})();