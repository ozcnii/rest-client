import axios from "axios";

export const fetchData = async (url, method, options) => {
  const params = {};
  // const body = {};
  const headers = {};

  options.params.forEach((q) => {
    params[q.key] = q.value;
  });

  options.headers.forEach((q) => {
    headers[q.key] = q.value;
  });

  console.log(params, headers);

  switch (method) {
    case "GET":
      return await axios.get(url, {
        params,
        headers,
      });
    case "POST":
      return axios.post(url, {
        params,
        headers,
      });
    default:
      throw new Error("internal error");
  }
};
