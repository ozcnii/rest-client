import axios from "axios";

export const fetchData = async (request) => {
  const { url, method } = request;
  const configuredOptions = {
    params: {},
    headers: {},
    body: request?.body || {},
  };

  request?.params?.forEach((q) => {
    configuredOptions.params[q.key] = q.value;
  });

  request?.headers?.forEach((q) => {
    if (q.key) configuredOptions.headers[q.key] = q.value;
  });

  switch (method) {
    case "GET":
      return await axios.get(url, configuredOptions);
    case "POST":
      return axios.post(url, configuredOptions.body, {
        headers: {
          "Content-Type": "application/json",
          ...configuredOptions.headers,
        },
        params: configuredOptions.params,
      });

    case "PUT":
      return axios.put(url, configuredOptions.body, {
        headers: {
          "Content-Type": "application/json",
          ...configuredOptions.headers,
        },
        params: configuredOptions.params,
      });
    case "PATCH":
      return axios.patch(url, configuredOptions.body, {
        headers: {
          "Content-Type": "application/json",
          ...configuredOptions.headers,
        },
        params: configuredOptions.params,
      });
    case "DELETE":
      return axios.delete(url, {
        data: configuredOptions.body,
        headers: {
          "Content-Type": "application/json",
          ...configuredOptions.headers,
        },
        params: configuredOptions.params,
      });
    default:
      throw new Error("internal error");
  }
};
