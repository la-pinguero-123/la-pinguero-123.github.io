const AchievementsModule = (() => {
  const progressEl = document.getElementById("achievementProgress");
  const counterEl = document.getElementById("contactsOpened");

  const check = (count) => {
    if (count === 2) {
      Notifications.send("КОНТАКТЫ НАЙДЕНЫ", "Прогресс: 2/9", "success");
    } else if (count === 5) {
      Notifications.send("ПОЛОВИНА ПУТИ ПРОЙДЕНА", "Прогресс: 5/9", "success");
    } else if (count === 8) {
      Notifications.send("ПОЧТИ ГОТОВО", "Прогресс: 8/9", "success");
    }
  };

  const confetti = () => {
    const endTime = Date.now() + 6000;

    const burst = () => {
      if (Date.now() > endTime) return;

      for (let i = 0; i < 3 + Math.random() * 3; i++) {
        const conf = document.createElement("div");
        conf.style.position = "fixed";
        conf.style.width = Math.random() * 10 + 4 + "px";
        conf.style.height = conf.style.width;

        const colors = [
          "var(--red-primary)",
          "var(--yellow-accent)",
          "var(--cyan-accent)",
          "var(--green-status)",
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];
        conf.style.background = color;
        conf.style.left = Math.random() * 100 + "vw";
        conf.style.top = "-30px";
        conf.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";
        conf.style.zIndex = "4000";
        conf.style.pointerEvents = "none";
        conf.style.boxShadow = `0 0 20px ${color}`;

        const duration = 1.8 + Math.random() * 0.4;
        conf.style.animation = `fall ${duration}s linear forwards`;

        document.body.appendChild(conf);
        setTimeout(() => conf.remove(), duration * 1000 + 100);
      }

      setTimeout(burst, 50 + Math.random() * 50);
    };

    burst();
  };

  const update = () => {
    const count = State.getOpenedCount();
    const percent = (count / CONSTANTS.TOTAL_CONTACTS) * 100;
    counterEl.textContent = count;
    progressEl.style.width = percent + "%";
    check(count);
  };

  const init = () => {
    update();

    EventBus.on("contact:opened", update);

    EventBus.on("network:complete", () => {
      setTimeout(() => {
        confetti();

        setTimeout(() => {
          Notifications.send(
            "КАРТА ПОЛНА",
            "ВСЕ 9 КОНТАКТОВ ОТКРЫТЫ! 🔴",
            "success"
          );
        }, 7000);
      }, 1500);
    });
  };

  return { init };
})();
