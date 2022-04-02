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
      return axios.post(url, configuredOptions);
    case "PUT":
      return await axios.put(url, configuredOptions);
    case "PATCH":
      return axios.patch(url, configuredOptions);
    case "DELETE":
      return axios.delete(url, configuredOptions);
    default:
      throw new Error("internal error");
  }
};
