const MapResizeModule = (() => {
  const mapImage = document.querySelector(".map-image");
  const mapWrapper = document.getElementById("mapWrapper");

  let visibleArea = { offsetX: 0, offsetY: 0, width: 100, height: 100 };

  const calculateVisibleArea = () => {
    const containerWidth = mapWrapper.clientWidth;
    const containerHeight = mapWrapper.clientHeight;

    if (containerWidth === 0 || containerHeight === 0) {
      requestAnimationFrame(calculateVisibleArea);
      return;
    }

    const imageRatio = CONSTANTS.MAP_WIDTH / CONSTANTS.MAP_HEIGHT;
    const containerRatio = containerWidth / containerHeight;

    let scale, offsetX, offsetY, visibleWidth, visibleHeight;

    if (containerRatio > imageRatio) {
      scale = containerWidth / CONSTANTS.MAP_WIDTH;
      visibleWidth = 100;
      visibleHeight = (containerHeight / scale / CONSTANTS.MAP_HEIGHT) * 100;
      offsetX = 0;
      offsetY = (100 - visibleHeight) / 2;
    } else {
      scale = containerHeight / CONSTANTS.MAP_HEIGHT;
      visibleHeight = 100;
      visibleWidth = (containerWidth / scale / CONSTANTS.MAP_WIDTH) * 100;
      offsetY = 0;
      offsetX = (100 - visibleWidth) / 2;
    }

    visibleArea = {
      offsetX,
      offsetY,
      width: visibleWidth,
      height: visibleHeight,
    };

    updatePointPositions();
  };

  const updatePointPositions = () => {
    CONSTANTS.RESUMES.forEach((resume) => {
      const point = document.getElementById(`point-${resume.id}`);
      if (!point) return;

      const adjustedX =
        ((resume.x - visibleArea.offsetX) / visibleArea.width) * 100;
      const adjustedY =
        ((resume.y - visibleArea.offsetY) / visibleArea.height) * 100;

      point.style.left = `${adjustedX}%`;
      point.style.top = `${adjustedY}%`;
    });
  };

  const init = () => {
    requestAnimationFrame(() => {
      if (mapImage.complete) {
        calculateVisibleArea();
      } else {
        mapImage.addEventListener("load", calculateVisibleArea);
      }
    });

    window.addEventListener("resize", calculateVisibleArea);

    EventBus.on("map:transform", () => {
      setTimeout(calculateVisibleArea, 50);
    });
  };

  return { init, getVisibleArea: () => visibleArea };
})();
