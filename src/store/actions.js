import { fetchData } from "./../helpers";
import { Mutations } from "./mutations";

const {
  setLoading,
  setError,
  setRequestResult,
  setStatusCode,
  setRequestTime,
} = Mutations;

export const actions = {
  async getRrequest({ commit, state }) {
    const start = Date.now();
    try {
      commit(setLoading, true);
      commit(setError, null);
      commit(setStatusCode, null);
      commit(setRequestResult, null);

      const request = state.activeRequest || state.notActiveRequest;
      const result = await fetchData(request);
      console.log(result);

      commit(setRequestResult, result.data || "no data");
      commit(setStatusCode, result.status);

      commit(setRequestTime, Date.now() - start);
    } catch (e) {
      commit(setStatusCode, null);
      commit(setRequestResult, null);
      commit(setRequestTime, Date.now() - start);

      const error = e.response?.data || e.response?.statusText || e.message;
      commit(setError, error);
      commit(setStatusCode, e.response?.status || 9999);
    } finally {
      commit(setLoading, false);
    }
  },
};
