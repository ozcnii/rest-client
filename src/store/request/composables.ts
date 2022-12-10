import axios from "axios";
import { defineStore } from "pinia";
import { fetchData, saveActiveRequest, saveNotActiveRequest } from "@/utils";
import { initialState } from "./data";
import { MyNotActiveRequest, MyRequest, ReqeuestState } from "./types";

export const useRequestStore = defineStore("request", {
  state: (): ReqeuestState => ({ ...initialState }),

  actions: {
    reset() {
      for (const key in initialState) {
        // @ts-ignore
        this[key] = initialState[key];
      }
    },

    setRequestResult(result: any) {
      this.requestResult = result;
    },

    setRequestTime(time: number) {
      this.requestTime = time;
    },

    setStatusCode(statusCode: number) {
      this.statusCode = statusCode;
    },

    setLoading(loading: boolean) {
      this.isLoading = loading;
    },

    setError(error: any) {
      this.error = error;
    },

    setActiveRequest(request: MyRequest | null) {
      this.activeRequest = request;
      saveActiveRequest(request);
      this.setNotActiveRequest(null);
    },

    setNotActiveRequest(request: MyNotActiveRequest | null) {
      this.notActiveRequest = request;
      saveNotActiveRequest(request);
    },

    async getRequest() {
      const start = Date.now();

      this.setLoading(true);
      this.setError(null);
      this.setStatusCode(-1);
      this.setRequestResult(null);

      const request = this.activeRequest || (this.notActiveRequest as MyNotActiveRequest);
      try {
        const result = await fetchData(request);

        this.setRequestResult(result.data ?? "NO DATA");
        this.setStatusCode(result.status);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          this.setStatusCode(error.response?.status ?? -1);
          this.setRequestResult(null);

          const errorRaw =
            error.response?.data || error.response?.statusText || error.message;
          this.setError(errorRaw);
        }
      } finally {
        this.setLoading(false);
        this.setRequestTime(Date.now() - start);
      }
    },
  },
});
