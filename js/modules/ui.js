const UI = (() => {
  const elements = {
    modal: document.getElementById("modal"),
    searchInput: document.getElementById("searchInput"),
    searchResults: document.getElementById("searchResults"),
    mapContainer: document.querySelector(".map-container"),
    mapWrapper: document.getElementById("mapWrapper"),
    pointsContainer: document.getElementById("pointsContainer"),
    infoBtn: document.getElementById("infoBtn"),
    infoModal: document.getElementById("infoModal"),
    infoClose: document.getElementById("infoClose"),
  };

  const toggleModal = (show) => {
    elements.modal.classList.toggle("active", show);
  };

  const toggleInfoModal = (show) => {
    elements.infoModal.classList.toggle("active", show);
  };

  return {
    getElements: () => elements,
    toggleModal,
    toggleInfoModal,
  };
})();