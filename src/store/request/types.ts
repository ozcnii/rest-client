export const Methods = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
} as const;

export type TMethods = keyof typeof Methods;

export interface MyHeader {
  key: string;
  value: string;
  id: string;
}

export interface MyParam extends MyHeader {}

export interface MyRequest {
  id: string;
  method: TMethods;
  name: string;
  url: string;
  folder_id: string;
  body?: string;
  headers?: MyHeader[];
  params?: MyParam[];
}

export interface MyNotActiveRequest {
  id?: string;
  method: TMethods;
  name?: string;
  url: string;
  folder_id?: string;
  body?: string;
  headers?: MyHeader[];
  params?: MyParam[];
}

export interface ReqeuestState {
  method: TMethods;

  httpMethods: TMethods[];

  requestResult: null | any;
  requestTime: number;
  statusCode: number;

  isLoading: boolean;
  error: null | any;

  activeRequest: MyRequest | null;
  notActiveRequest: MyNotActiveRequest | null;
}
