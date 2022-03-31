import axios from "axios";

export const fetchData = async (url, method, options) => {
  const params = {};
  // const body = {};
  // const headers = {};

  options.query.forEach((q) => {
    params[q.key] = q.value;
  });

  switch (method) {
    case "GET":
      return await axios.get(url, {
        params,
      });
    case "POST":
      return axios.post(url, {
        params,
      });
    default:
      throw new Error("internal error");
  }
};
