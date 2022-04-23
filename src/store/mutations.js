export const Mutations = {
  setMethod: "setMethod",
  setUrl: "setUrl",
  setRequestResult: "setRequestResult",
  setRequestTime: "setRequestTime",
  setStatusCode: "setStatusCode",
  setLoading: "setLoading",
  setError: "setError",
  setFolderName: "setFolderName",
  deleteFolder: "deleteFolder",
  createFolder: "createFolder",
  SET_ACTIVE_REQUEST: "SET_ACTIVE_REQUEST",
  DELETE_REQUEST: "DELETE_REQUEST",
  SAVE_REQUEST: "SAVE_REQUEST",
  SET_NOT_ACTIVE_REQUEST: "SET_NOT_ACTIVE_REQUEST",
  CREATE_REQUEST: "CREATE_REQUEST",
  OPEN_FOLDER: "OPEN_FOLDER",
};

export const mutations = {
  [Mutations.setMethod](state, method) {
    state.method = method;
  },

  [Mutations.setUrl](state, url) {
    state.url = url;
  },

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
    const currentFolder = state.folders.find(
      (folder) => folder.id === folder_id
    );
    currentFolder.name = name;
  },

  [Mutations.deleteFolder](state, { folder_id }) {
    state.folders = state.folders.filter((folder) => folder.id !== folder_id);
  },

  [Mutations.createFolder](state, { name }) {
    state.folders.unshift({
      id: Date.now(),
      name,
      isOpen: false,
      requests: [],
    });
  },

  [Mutations.SET_ACTIVE_REQUEST](state, newRequest) {
    state.activeRequest = newRequest;
  },

  [Mutations.DELETE_REQUEST](state, { request_id, folder_id }) {
    const currentFolder = state.folders.find(
      (folder) => folder.id === folder_id
    );

    if (currentFolder)
      currentFolder.requests = currentFolder.requests.filter(
        (request) => request.id !== request_id
      );
  },

  [Mutations.SAVE_REQUEST](state, request) {
    const currentFolder = state.folders.find(
      (folder) => folder.id === request.folder_id
    );

    if (currentFolder) {
      const currentRequestIndex = currentFolder.requests.findIndex(
        (req) => req.id === request.id
      );

      if (currentRequestIndex !== null)
        currentFolder.requests[currentRequestIndex] = request;
    }
  },

  [Mutations.SET_NOT_ACTIVE_REQUEST](state, request) {
    state.notActiveRequest = request;
  },

  [Mutations.CREATE_REQUEST](state, { folder_id, request }) {
    const currentFolder = state.folders.find(
      (folder) => folder.id === folder_id
    );
    if (currentFolder) currentFolder.requests.push(request);
  },

  [Mutations.OPEN_FOLDER](state, folder_id) {
    const currentFolder = state.folders.find(
      (folder) => folder.id === folder_id
    );
    if (currentFolder) currentFolder.isOpen = true;
  },
};
