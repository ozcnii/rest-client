export const enum Methods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export interface MyHeader {
  key: string;
  value: string;
  id: string;
}

export interface MyParam extends MyHeader {}

export interface MyRequest {
  id: string;
  method: Methods;
  name: string;
  url: string;
  folder_id: string;
  body?: string;
  headers?: MyHeader[];
  params?: MyParam[];
}

export interface MyNotActiveRequest {
  id?: string;
  method: Methods;
  name?: string;
  url: string;
  folder_id?: string;
  body?: string;
  headers?: MyHeader[];
  params?: MyParam[];
}

export interface ReqeuestState {
  method: Methods;

  httpMethods: [Methods.GET, Methods.POST, Methods.PUT, Methods.PATCH, Methods.DELETE];

  requestResult: null | any;
  requestTime: number;
  statusCode: number;

  isLoading: boolean;
  error: null | any;

  activeRequest: MyRequest | null;
  notActiveRequest: MyNotActiveRequest | null;
}
