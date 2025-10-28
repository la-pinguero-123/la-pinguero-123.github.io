const AchievementsModule = (() => {
  const progressEl = document.getElementById("achievementProgress");
  const counterEl = document.getElementById("contactsOpened");

  const check = (count) => {
    if (count === 2) {
      Notifications.send("КОНТАКТЫ НАЙДЕНЫ", "Прогресс: 2/8", "success");
    } else if (count === 4) {
      Notifications.send("ПОЛОВИНА ПУТИ", "Прогресс: 4/8", "success");
    } else if (count === 6) {
      Notifications.send("ПОЧТИ ГОТОВО", "Прогресс: 6/8", "success");
    }
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
  };

  return { init };
})();