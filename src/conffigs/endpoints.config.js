export const HttpMethod = {
  Get: "GET",
  Post: "POST",
  Put: "PUT",
  Patch: "PATCH",
  Delete: "DELETE",
};

const ApiRoutes = {
  Dashboard: {
    Data: {
      Endpoint: "/dashboard",
      Method: HttpMethod.Post,
    },
  },
  Auth: {
    Login: {
      Endpoint: "/adminLogin",
      Method: HttpMethod.Post,
    },
  },
  User: {
    All: {
      Endpoint: "/getAllUser",
      Method: HttpMethod.Post,
    },
    AllRefferalUser: {
      Endpoint: "/getRefferalDataById",
      Method: HttpMethod.Post,
    },
    UserById: {
      Endpoint: "/getUserById",
      Method: HttpMethod.Post,
    },
  },
};

export default ApiRoutes;
