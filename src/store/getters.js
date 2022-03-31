export const getters = {
  getQueries(state) {
    return state.options.query;
  },
  getHeaders(state) {
    return state.options.headers;
  },
  getBody(state) {
    return state.options.body;
  },
};
