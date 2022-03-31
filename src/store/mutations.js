export const mutations = {
  setMethod(state, method) {
    state.method = method;
  },

  setUrl(state, url) {
    state.url = url;
  },

  setRequestResult(state, result) {
    state.requestResult = result;
  },

  setRequestTime(state, time) {
    state.requestTime = time;
  },

  setStatusCode(state, statusCode) {
    state.statusCode = statusCode;
  },

  setLoading(state, loading) {
    state.isLoading = loading;
  },

  setError(state, error) {
    state.error = error;
  },

  setQueries(state, queries) {
    state.options.query = queries;
  },
};
