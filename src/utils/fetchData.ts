import axios from "axios";
import { Methods, MyNotActiveRequest, MyRequest } from "../store/request";
import { ConfiguredOptions } from "./types";

export const fetchData = async (request: MyNotActiveRequest) => {
  const { url, method } = request;

  const configuredOptions: ConfiguredOptions = {
    params: {},
    headers: {},
    body: request?.body ?? {},
  };

  if (request.params) {
    request.params.forEach(({ key, value }) => {
      configuredOptions.params[key] = value;
    });
  }

  if (request.headers) {
    request.headers.forEach(({ key, value }) => {
      if (key) {
        configuredOptions.headers[key] = value;
      }
    });
  }

  switch (method) {
    case Methods.GET: {
      return await axios.get(url, configuredOptions);
    }

    case Methods.POST: {
      return axios.post(url, configuredOptions.body, {
        headers: {
          "Content-Type": "application/json", // TODO
          ...configuredOptions.headers,
        },
        params: configuredOptions.params,
      });
    }

    case Methods.PUT: {
      return axios.put(url, configuredOptions.body, {
        headers: {
          "Content-Type": "application/json",
          ...configuredOptions.headers,
        },
        params: configuredOptions.params,
      });
    }

    case Methods.PATCH: {
      return axios.patch(url, configuredOptions.body, {
        headers: {
          "Content-Type": "application/json",
          ...configuredOptions.headers,
        },
        params: configuredOptions.params,
      });
    }

    case Methods.DELETE: {
      return axios.delete(url, {
        data: configuredOptions.body,
        headers: {
          "Content-Type": "application/json",
          ...configuredOptions.headers,
        },
        params: configuredOptions.params,
      });
    }

    default:
      throw new Error("IDK");
  }
};
