const State = (() => {
  let opened = new Set();
  let networkData = [];

  const load = () => {
    const saved = localStorage.getItem(CONSTANTS.STORAGE_KEY);
    if (saved) {
      opened = new Set(JSON.parse(saved));
      networkData = Array.from(opened);
    }
  };

  const save = () => {
    localStorage.setItem(CONSTANTS.STORAGE_KEY, JSON.stringify([...opened]));
  };

  return {
    load,
    save,
    addContact: (contactId) => {
      if (!opened.has(contactId)) {
        opened.add(contactId);
        networkData.push(contactId);
        save();
        return true;
      }
      return false;
    },
    getOpenedCount: () => opened.size,
    getNetworkData: () => [...networkData],
    isOpened: (contactId) => opened.has(contactId),
    getAll: () => ({ opened: new Set(opened), networkData: [...networkData] }),
  };
})();
