const Notifications = (() => {
  const container = document.getElementById("notificationsContainer");

  const send = (title, text, type = "info") => {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;

    const icon = type === "success" ? "✓" : "ⓘ";
    notification.innerHTML = `
        <div class="notification-icon">${icon}</div>
        <div class="notification-title">${title}</div>
        <div class="notification-text">${text}</div>
        `;

    container.appendChild(notification);

    setTimeout(() => {
      notification.classList.add("removing");
      setTimeout(() => notification.remove(), 800);
    }, 6000);
  };

  const random = () => {
    const messages = [
      { title: "ПРОФИЛЬ ОТКРЫТ", text: "Новый контакт добавлен." },
      { title: "ДАННЫЕ ЗАГРУЖЕНЫ", text: "Информация синхронизирована." },
      { title: "КОНТАКТ ДОСТУПЕН", text: "Профиль загружен." },
      { title: "РЕЗЮМЕ АКТИВНО", text: "Контакт добавлен в список." },
      { title: "ПРОГРЕСС +1", text: "Вы открыли ещё один контакт." },
    ];
    const msg = messages[Math.floor(Math.random() * messages.length)];
    send(msg.title, msg.text, "success");
  };

  return { send, random };
})();
