import axios from "axios";

export const fetchData = async (url, method, options) => {
  const configuredOptions = {
    params: {},
    headers: {},
    body: options.body,
  };

  options.params.forEach((q) => {
    configuredOptions.params[q.key] = q.value;
  });

  options.headers.forEach((q) => {
    configuredOptions.headers[q.key] = q.value;
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
