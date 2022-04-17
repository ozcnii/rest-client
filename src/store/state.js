export const state = () => ({
  url: "",
  method: "GET",
  httpMethods: ["GET", "POST", "PUT", "PATCH", "DELETE"],

  requestResult: null,
  requestTime: null,
  statusCode: null,

  isLoading: false,
  error: null,

  // activeRequestId: "",
  // request: [],
});
