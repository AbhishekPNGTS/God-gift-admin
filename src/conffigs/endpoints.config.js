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
      Endpoint: "/login",
      Method: HttpMethod.Post,
    },
  },
  Product: {
    All: {
      Endpoint: "/getAllProduct",
      Method: HttpMethod.Post,
    },
    AllProductFrencise: {
      Endpoint: "/getFranchiseProduct",
      Method: HttpMethod.Post,
    },
    ProductById: {
      Endpoint: "/getProductById",
      Method: HttpMethod.Post,
    },
    AddProduct: {
      Endpoint: "/addProduct",
      Method: HttpMethod.Post,
    },
    addProductVarients: {
      Endpoint: "/addProductVarients",
      Method: HttpMethod.Post,
    },
    EditProduct: {
      Endpoint: "/updateProduct",
      Method: HttpMethod.Post,
    },
    EditProductVariant: {
      Endpoint: "/updateProductVarients",
      Method: HttpMethod.Post,
    },
    DeleteProduct: {
      Endpoint: "/deleteProduct",
      Method: HttpMethod.Post,
    },
  },
};

export default ApiRoutes;
