import { beforeEach, describe, expect, it, vi } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { nanoid } from "nanoid";
import axios from "axios";

import { useRequestStore, Methods, MyRequest, MyNotActiveRequest } from "@/store/request";

describe("useRequestStore", () => {
  let store: ReturnType<typeof useRequestStore>;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useRequestStore();
    store.reset();

    vi.restoreAllMocks();
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

  it("get request success", async () => {
    const data = "some-data";
    const status = 200;

    const spy = vi.spyOn(axios, "get").mockImplementation(async () => {
      return { data, status };
    });

    const request: MyNotActiveRequest = {
      method: Methods.GET,
      url: "aaa.com",
    };

    store.setNotActiveRequest(request);

    await store.getRequest();

    expect(spy).toHaveBeenCalled();
    expect(store.error).toBeNull();

    expect(store.requestResult).toBe(data);
    expect(store.statusCode).toBe(status);

    expect(store.isLoading).toBeFalsy();
    expect(store.requestTime).not.toBe(-1);
  });

  it("get request failed", async () => {
    const data = "some-failed-data";
    const status = 400;

    const spy = vi.spyOn(axios, "get").mockImplementation(async () => {
      throw {
        response: {
          data,
          status,
        },
      };
    });

    const request: MyNotActiveRequest = {
      method: Methods.GET,
      url: "aaa.com",
    };

    store.setNotActiveRequest(request);

    await store.getRequest();

    expect(spy).toHaveBeenCalled();
    expect(store.error).toBe(data);

    expect(store.requestResult).toBeNull();
    expect(store.statusCode).toBe(status);

    expect(store.isLoading).toBeFalsy();
    expect(store.requestTime).not.toBe(-1);
  });
});
