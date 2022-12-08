import { Methods, ReqeuestState } from "./types";

export const initialState: ReqeuestState = {
  method: Methods.GET,
  httpMethods: [Methods.GET, Methods.POST, Methods.PUT, Methods.PATCH, Methods.DELETE],

  requestResult: null,
  requestTime: -1,
  statusCode: -1,

  isLoading: false,
  error: null,

  activeRequest: null,
  notActiveRequest: null,
};
