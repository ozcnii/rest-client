import { fetchData } from "./../helpers";

export const actions = {
  async getRrequest({ commit, state }, payload) {
    if (state.url) {
      const start = Date.now();
      try {
        commit("setLoading", true);

        commit("setError", null);
        commit("setStatusCode", null);
        commit("setRequestResult", null);

        const result = await fetchData(state.url, state.method, state.options);
        console.log(result);
        commit("setRequestResult", result.data || "no data");
        commit("setStatusCode", result.status);
        commit("setRequestTime", Date.now() - start);
      } catch (e) {
        commit("setStatusCode", null);
        commit("setRequestResult", null);

        commit("setRequestTime", Date.now() - start);

        commit(
          "setError",
          e.response?.data || e.response?.statusText || e.message
        );
        commit("setStatusCode", e.response?.status || 9999);
      } finally {
        commit("setLoading", false);
      }
    }
  },
};
