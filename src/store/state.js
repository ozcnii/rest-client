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

  folders: [
    {
      id: 1,
      name: "users",
      isOpen: false,
      requests: [
        {
          id: Date.now(),
          method: "GET",
          name: "get users",
          url: "https://jsonplaceholder.typicode.com/users",
        },
        {
          id: Date.now(),
          method: "GET",
          name: "get 2 users",
          url: "https://jsonplaceholder.typicode.com/users?_limit=2",
        },
      ],
    },
    {
      id: 2,
      name: "posts",
      isOpen: false,
      requests: [
        {
          id: Date.now(),
          method: "POST",
          name: "get users",
          url: "https://jsonplaceholder.typicode.com/users",
        },
        {
          id: Date.now(),
          method: "PATCH",
          name: "get 2 users",
          url: "https://jsonplaceholder.typicode.com/users?_limit=2",
        },
        {
          id: Date.now(),
          method: "DELETE",
          name: "get 2 users",
          url: "https://jsonplaceholder.typicode.com/users?_limit=2",
        },
      ],
    },
    {
      id: 3,
      name: "todos",
      isOpen: false,
      requests: [
        {
          id: Date.now(),
          method: "POST",
          name: "get users",
          url: "https://jsonplaceholder.typicode.com/users",
        },
        {
          id: Date.now(),
          method: "PATCH",
          name: "get 2 users",
          url: "https://jsonplaceholder.typicode.com/users?_limit=2",
        },
        {
          id: Date.now(),
          method: "DELETE",
          name: "get 2 users",
          url: "https://jsonplaceholder.typicode.com/users?_limit=2",
        },
      ],
    },
    {
      id: 4,
      name: "users",
      isOpen: false,
      requests: [
        {
          id: Date.now(),
          method: "GET",
          name: "get users",
          url: "https://jsonplaceholder.typicode.com/users",
        },
        {
          id: Date.now(),
          method: "GET",
          name: "get 2 users",
          url: "https://jsonplaceholder.typicode.com/users?_limit=2",
        },
      ],
    },
    {
      id: 5,
      name: "posts",
      isOpen: false,
      requests: [
        {
          id: Date.now(),
          method: "POST",
          name: "get users",
          url: "https://jsonplaceholder.typicode.com/users",
        },
        {
          id: Date.now(),
          method: "PATCH",
          name: "get 2 users",
          url: "https://jsonplaceholder.typicode.com/users?_limit=2",
        },
        {
          id: Date.now(),
          method: "DELETE",
          name: "get 2 users",
          url: "https://jsonplaceholder.typicode.com/users?_limit=2",
        },
      ],
    },
    {
      id: 6,
      name: "todos",
      isOpen: false,
      requests: [
        {
          id: Date.now(),
          method: "POST",
          name: "get users",
          url: "https://jsonplaceholder.typicode.com/users",
        },
        {
          id: Date.now(),
          method: "PATCH",
          name: "get 2 users",
          url: "https://jsonplaceholder.typicode.com/users?_limit=2",
        },
        {
          id: Date.now(),
          method: "DELETE",
          name: "get 2 users",
          url: "https://jsonplaceholder.typicode.com/users?_limit=2",
        },
      ],
    },
  ],
});
