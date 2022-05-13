const Items = {
  FOLDERS: "FOLDERS",
  ACTIVE_REQUEST: "ACTIVE_REQUEST",
  NOT_ACTIVE_REQUEST: "NOT_ACTIVE_REQUEST",
};

const getItem = (itemName) => JSON.parse(localStorage.getItem(itemName));
const setItem = (itemName, data) => localStorage.setItem(itemName, JSON.stringify(data));

export const getFolders = () => getItem(Items.FOLDERS);
export const getActiveRequest = () => getItem(Items.ACTIVE_REQUEST);
export const getNotActiveRequest = () => getItem(Items.NOT_ACTIVE_REQUEST);

export const saveFolders = (folders) => setItem(Items.FOLDERS, folders);
export const saveActiveRequest = (request) => setItem(Items.ACTIVE_REQUEST, request);
export const saveNotActiveRequest = (request) =>
  setItem(Items.NOT_ACTIVE_REQUEST, request);
