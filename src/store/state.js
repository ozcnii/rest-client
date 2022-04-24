export const state = () => ({
  method: "GET",
  httpMethods: ["GET", "POST", "PUT", "PATCH", "DELETE"],

  requestResult: null,
  requestTime: null,
  statusCode: null,

  isLoading: false,
  error: null,

  activeRequest: null,

  notActiveRequest: null,

  folders: [
    {
      id: 1,
      name: "users",
      isOpen: false,
      requests: [
        {
          id: 111,
          method: "GET",
          name: "get users",
          url: "https://jsonplaceholder.typicode.com/users",
          folder_id: 1,
          body: '{"data": 12}',
          headers: [
            {
              key: "1",
              value: "2",
              id: 111_1,
            },
          ],
        },
        {
          id: 1112,
          method: "GET",
          name: "get 2 users",
          url: "https://jsonplaceholder.typicode.com/users?_limit=2",
          folder_id: 1,
          body: '{"data": 12333}',
        },
      ],
    },
    {
      id: 2,
      name: "posts",
      isOpen: false,
      requests: [
        {
          id: 222,
          method: "POST",
          name: "get users",
          url: "https://jsonplaceholder.typicode.com/users",
          folder_id: 2,
        },
        {
          id: 2221,
          method: "PATCH",
          name: "get 2 users",
          url: "https://jsonplaceholder.typicode.com/users?_limit=2",
          folder_id: 2,
        },
        {
          id: 2223,
          method: "DELETE",
          name: "get 2 users",
          url: "https://jsonplaceholder.typicode.com/users?_limit=2",
          folder_id: 2,
        },
      ],
    },
    {
      id: 3,
      name: "todos",
      isOpen: false,
      requests: [
        {
          id: 333,
          method: "POST",
          name: "get users",
          url: "https://jsonplaceholder.typicode.com/users",
          folder_id: 3,
        },
        {
          id: 3332,
          method: "PATCH",
          name: "get 2 users",
          url: "https://jsonplaceholder.typicode.com/users?_limit=2",
          folder_id: 3,
        },
        {
          id: 3333,
          method: "DELETE",
          name: "get 2 users",
          url: "https://jsonplaceholder.typicode.com/users?_limit=2",
          folder_id: 3,
        },
      ],
    },
  ],
});
