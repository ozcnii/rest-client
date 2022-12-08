import { Folder } from "../store/folders";
import { MyNotActiveRequest, MyRequest } from "../store/request";

const Items = {
  FOLDERS: "FOLDERS",
  ACTIVE_REQUEST: "ACTIVE_REQUEST",
  NOT_ACTIVE_REQUEST: "NOT_ACTIVE_REQUEST",
};

const getItem = (itemName: string) => JSON.parse(localStorage.getItem(itemName)!);

const setItem = (itemName: string, data: any) =>
  localStorage.setItem(itemName, JSON.stringify(data));

export const getFolders = () => getItem(Items.FOLDERS);

export const getActiveRequest = () => getItem(Items.ACTIVE_REQUEST);

export const getNotActiveRequest = () => getItem(Items.NOT_ACTIVE_REQUEST);

export const saveFolders = (folders: Folder[]) => setItem(Items.FOLDERS, folders);

export const saveActiveRequest = (request: MyRequest | null) =>
  setItem(Items.ACTIVE_REQUEST, request);

export const saveNotActiveRequest = (request: MyRequest | MyNotActiveRequest | null) =>
  setItem(Items.NOT_ACTIVE_REQUEST, request);
