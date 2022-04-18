export const getters = {
  getParams(state) {
    return state.options.params;
  },

  getHeaders(state) {
    return state.options.headers;
  },

  getBody(state) {
    return state.options.body;
  },

  getFolders(state) {
    return state.folders;
  },
};
