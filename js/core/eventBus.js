const EventBus = (() => {
    const listeners = {};
    return {
        on: (event, callback) => {
            if (!listeners[event]) listeners[event] = [];
            listeners[event].push(callback);
        },
        emit: (event, data) => {
            if (listeners[event]) {
                listeners[event].forEach((cb) => cb(data));
            }
        },
        off: (event, callback) => {
            if (listeners[event]) {
                listeners[event] = listeners[event].filter((cb) => cb !== callback);
            }
        },
    };
})();
