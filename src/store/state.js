export const state = () => ({
  url: "",
  method: "GET",
  // httpMethods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  httpMethods: ["GET", "POST"],

  requestResult: null,
  requestTime: null,
  statusCode: null,

  isLoading: false,
  error: null,

  options: {
    query: [],
    headers: [],
    body: [],
  },
});
