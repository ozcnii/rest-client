import { beforeEach, describe, expect, it } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { nanoid } from "nanoid";

import { useRequestStore, Methods, MyRequest } from "@/store/request";

describe("useRequestStore", () => {
  let store: ReturnType<typeof useRequestStore>;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useRequestStore();
    store.reset();
  });

  it("set request result", () => {
    const requestResult = "some-result";
    store.setRequestResult(requestResult);
    expect(store.requestResult).toBe(requestResult);
  });

  it("set request time", () => {
    const time = Date.now();
    store.setRequestTime(time);
    expect(store.requestTime).toBe(time);
  });

  it("set status code", () => {
    const statusCode = 200;
    store.setStatusCode(statusCode);
    expect(store.statusCode).toBe(statusCode);
  });

  it("set loading", () => {
    const loading = true;
    store.setLoading(loading);
    expect(store.isLoading).toBe(loading);
  });

  it("set error", () => {
    const error = "some-error";
    store.setError(error);
    expect(store.error).toBe(error);
  });

  it("set active request", () => {
    const request: MyRequest = {
      folder_id: "some-folder-id",
      id: nanoid(),
      method: Methods.DELETE,
      name: "some-request-name",
      url: "some-url.com",
    };

    store.setActiveRequest(request);
    expect(store.activeRequest).toEqual(request);
    expect(store.notActiveRequest).toBeNull();
  });

  it("set nullable active request", () => {
    store.setActiveRequest(null);
    expect(store.activeRequest).toBeNull();
    expect(store.notActiveRequest).toBeNull();
  });

  it("set not active request", () => {
    const request: MyRequest = {
      folder_id: "some-folder-id",
      id: nanoid(),
      method: Methods.DELETE,
      name: "some-request-name",
      url: "some-url.com",
    };

    store.setNotActiveRequest(request);
    expect(store.notActiveRequest).toEqual(request);
  });

  it("set nullable not active request", () => {
    store.setNotActiveRequest(null);
    expect(store.notActiveRequest).toBeNull();
  });
});
