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

  // setParams(state, params) {
  //   state.options.params = params;
  // },

  // setHeaders(state, headers) {
  //   state.options.headers = headers;
  // },

  // setBody(state, body) {
  //   state.options.body = body;
  // },

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
};
