const NetworkModule = (() => {
  const svg = document.getElementById("networkSVG");
  let animationFrameId = null;
  let drawnLineCount = 0;
  let networkComplete = false;
  let closingLineScheduled = false;

  const getPointPixelCoords = (contactId, svgWidth, svgHeight) => {
    const point = document.getElementById(`point-${contactId}`);
    if (!point) return null;

    const x = parseFloat(point.style.left) || 0;
    const y = parseFloat(point.style.top) || 0;

    return {
      id: contactId,
      px: (x / 100) * svgWidth,
      py: (y / 100) * svgHeight,
    };
  };

  const drawLine = (fromCoords, toCoords, isClosing = false) => {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", fromCoords.px);
    line.setAttribute("y1", fromCoords.py);
    line.setAttribute("x2", toCoords.px);
    line.setAttribute("y2", toCoords.py);
    line.setAttribute("stroke", "#ff3333");
    line.setAttribute("stroke-width", "3");
    line.setAttribute("opacity", "1");

    if (isClosing) {
      line.setAttribute("data-closing", "true");
      line.classList.add("closing-line");
    }

    svg.appendChild(line);
  };

  const animatePacket = (x1, y1, x2, y2, startDelay) => {
    const packet = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    packet.setAttribute("r", "4");
    packet.setAttribute("fill", "#ff3333");
    packet.setAttribute("opacity", "1");
    packet.setAttribute("class", "data-packet");

    svg.appendChild(packet);

    const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    const duration = 2000 + distance * 0.5;
    const startTime = performance.now() + startDelay;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;

      if (elapsed < 0) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      const progress = (elapsed % duration) / duration;

      const currentX = x1 + (x2 - x1) * progress;
      const currentY = y1 + (y2 - y1) * progress;

      packet.setAttribute("cx", currentX);
      packet.setAttribute("cy", currentY);

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
  };

  const drawClosingLine = (coords) => {
    const lastCoord = coords[coords.length - 1];
    const firstCoord = coords[0];

    drawLine(lastCoord, firstCoord, true);

    for (let p = 0; p < 2; p++) {
      const startDelay = p * 700;
      animatePacket(
        lastCoord.px,
        lastCoord.py,
        firstCoord.px,
        firstCoord.py,
        startDelay
      );
    }

    setTimeout(() => {
      activateNetworkCompletion();
    }, 2500);
  };

  const activateNetworkCompletion = () => {
    if (networkComplete) return;
    networkComplete = true;

    svg.classList.add("network-complete");
    EventBus.emit("network:complete");
  };

  const draw = () => {
    const rect = svg.getBoundingClientRect();
    svg.setAttribute("width", Math.round(rect.width));
    svg.setAttribute("height", Math.round(rect.height));

    const openedIds = State.getNetworkData();

    if (openedIds.length < 2) {
      drawnLineCount = 0;
      networkComplete = false;
      closingLineScheduled = false;
      svg.innerHTML = "";
      svg.classList.remove("network-complete");
      return;
    }

    const coords = openedIds
      .map((id) => getPointPixelCoords(id, rect.width, rect.height))
      .filter(Boolean);

    if (coords.length < 2) {
      return;
    }

    for (let i = drawnLineCount; i < coords.length - 1; i++) {
      const from = coords[i];
      const to = coords[i + 1];

      drawLine(from, to, false);

      for (let p = 0; p < 2; p++) {
        const startDelay = p * 700;
        animatePacket(from.px, from.py, to.px, to.py, startDelay);
      }
    }

    drawnLineCount = coords.length - 1;

    if (
      openedIds.length === CONSTANTS.TOTAL_CONTACTS &&
      coords.length >= 2 &&
      !closingLineScheduled
    ) {
      closingLineScheduled = true;

      setTimeout(() => {
        drawClosingLine(coords);
      }, 1500);
    }
  };

  const init = () => {
    EventBus.on("contact:opened", () => {
      setTimeout(draw, 100);
    });

    EventBus.on("map:transform", () => {
      setTimeout(draw, 100);
    });

    window.addEventListener("resize", () => {
      drawnLineCount = 0;
      networkComplete = false;
      closingLineScheduled = false;
      svg.innerHTML = "";
      svg.classList.remove("network-complete");
      setTimeout(draw, 100);
    });

    setTimeout(() => {
      if (State.getNetworkData().length > 1) {
        draw();
      }
    }, 300);
  };

  return { init, draw };
})();