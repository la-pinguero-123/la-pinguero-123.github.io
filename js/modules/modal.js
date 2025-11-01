const ModalModule = (() => {
  const modal = document.getElementById("modal");
  const closeBtn = document.getElementById("closeBtn");
  const resumeFrame = document.getElementById("resumeFrame");

  const init = () => {
    EventBus.on("point:clicked", (resume) => {
      resumeFrame.src = resume.path;
      resumeFrame.dataset.lastResume = resume.id;
      modal.classList.add("active");
    });

    const close = () => {
      const contactId = resumeFrame.dataset.lastResume;
      modal.classList.remove("active");
      resumeFrame.src = "";

      if (contactId && State.addContact(contactId)) {
        EventBus.emit("contact:opened", contactId);
      }
    };

    closeBtn.addEventListener("click", close);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) close();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("active")) {
        close();
      }
    });
  };
  return { init };
})();
