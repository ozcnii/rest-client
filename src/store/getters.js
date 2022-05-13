export const getters = {
  getFolders(state) {
    return state.folders;
  },

  getActiveRequest(state) {
    return state.activeRequest;
  },

  getNotActiveRequest(state) {
    return state.notActiveRequest;
  },
};
