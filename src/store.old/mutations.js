import { nanoid } from "nanoid";
import {
  saveActiveRequest,
  saveFolders,
  saveNotActiveRequest,
} from "../utils/localStorage";

export const Mutations = {
  setRequestResult: "setRequestResult",
  setRequestTime: "setRequestTime",
  setStatusCode: "setStatusCode",
  setLoading: "setLoading",
  setError: "setError",

  setFolderName: "setFolderName",
  deleteFolder: "deleteFolder",
  createFolder: "createFolder",
  OPEN_FOLDER: "OPEN_FOLDER",
  SET_FOLDERS: "SET_FOLDERS",
  TOGGLE_OPEN_FOLDER: "TOGGLE_OPEN_FOLDER",

  SET_ACTIVE_REQUEST: "SET_ACTIVE_REQUEST",
  DELETE_REQUEST: "DELETE_REQUEST",
  SAVE_REQUEST: "SAVE_REQUEST",
  CREATE_REQUEST: "CREATE_REQUEST",

  SET_NOT_ACTIVE_REQUEST: "SET_NOT_ACTIVE_REQUEST",
};

export const mutations = {
  [Mutations.setRequestResult](state, result) {
    state.requestResult = result;
  },

  [Mutations.setRequestTime](state, time) {
    state.requestTime = time;
  },

  [Mutations.setStatusCode](state, statusCode) {
    state.statusCode = statusCode;
  },

  [Mutations.setLoading](state, loading) {
    state.isLoading = loading;
  },

  [Mutations.setError](state, error) {
    state.error = error;
  },

  [Mutations.setFolderName](state, { folder_id, name }) {
    const currentFolder = state.folders.find((folder) => folder.id === folder_id);
    currentFolder.name = name;
    saveFolders(state.folders);
  },

  [Mutations.deleteFolder](state, { folder_id }) {
    state.folders = state.folders.filter((folder) => folder.id !== folder_id);
    saveFolders(state.folders);
  },

  [Mutations.createFolder](state, { name }) {
    state.folders.unshift({
      id: nanoid(),
      name,
      isOpen: false,
      requests: [],
    });

    saveFolders(state.folders);
  },

  [Mutations.SET_ACTIVE_REQUEST](state, request) {
    state.activeRequest = request;
    saveActiveRequest(request);
    this.commit(Mutations.SET_NOT_ACTIVE_REQUEST, null);
  },

  [Mutations.DELETE_REQUEST](state, { request_id, folder_id }) {
    const currentFolder = state.folders.find((folder) => folder.id === folder_id);

    if (currentFolder) {
      currentFolder.requests = currentFolder.requests.filter(
        (request) => request.id !== request_id
      );
      saveFolders(state.folders);
    }
  },

  [Mutations.SAVE_REQUEST](state, request) {
    const currentFolder = state.folders.find((folder) => folder.id === request.folder_id);

    if (currentFolder) {
      const currentRequestIndex = currentFolder.requests.findIndex(
        (req) => req.id === request.id
      );

      if (typeof currentRequestIndex === "number") {
        currentFolder.requests[currentRequestIndex] = request;
        saveFolders(state.folders);
      }
    }
  },

  [Mutations.SET_NOT_ACTIVE_REQUEST](state, request) {
    state.notActiveRequest = request;
    saveNotActiveRequest(request);
  },

  [Mutations.CREATE_REQUEST](state, { folder_id, request }) {
    const currentFolder = state.folders.find((folder) => folder.id === folder_id);
    if (currentFolder) {
      currentFolder.requests.push(request);
      saveFolders(state.folders);
    }
  },

  [Mutations.OPEN_FOLDER](state, folder_id) {
    const currentFolder = state.folders.find((folder) => folder.id === folder_id);
    if (currentFolder) {
      currentFolder.isOpen = true;
      saveFolders(state.folders);
    }
  },

  [Mutations.TOGGLE_OPEN_FOLDER](state, folder_id) {
    const currentFolder = state.folders.find((folder) => folder.id === folder_id);
    if (currentFolder) {
      currentFolder.isOpen = !currentFolder.isOpen;
      saveFolders(state.folders);
    }
  },

  [Mutations.SET_FOLDERS](state, folders) {
    state.folders = folders;
  },
};
