import { getTokenLocal } from "../utils/localStorage.util";
import ApiRoutes from "../conffigs/endpoints.config";
import HttpClient from "./index.api";
const baseURL = process.env.REACT_APP_API_URL;

class ProductList extends HttpClient {
  constructor() {
    super(baseURL);
    this._initializeRequestInterceptor();
    this._initializeResponseInterceptor();
  }

  _initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use((config) => {
      config.headers["Authorization"] = `Bearer ${getTokenLocal()}`;
      return config;
    });
  };

  _initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (response) => {
        return Promise.resolve(response);
      }
    );
  };

  AllProductListConfig = ApiRoutes.Product.All;
  AllProductFrenciseConfig = ApiRoutes.Product.AllProductFrencise;
  ProductListByIdConfig = ApiRoutes.Product.ProductById;
  AddProductListConfig = ApiRoutes.Product.AddProduct;
  addProductVarientsListConfig = ApiRoutes.Product.addProductVarients;
  EditProductListConfig = ApiRoutes.Product.EditProduct;
  EditProductVariantListConfig = ApiRoutes.Product.EditProductVariant;
  DeleteProductListConfig = ApiRoutes.Product.DeleteProduct;

  getAllProduct = async () => {
    return this.instance({
      method: this.AllProductListConfig.Method,
      url: this.AllProductListConfig.Endpoint,
      headers: {},
      data: null,
    });
  };
  getFranchiseProduct = async () => {
    return this.instance({
      method: this.AllProductFrenciseConfig.Method,
      url: this.AllProductFrenciseConfig.Endpoint,
      headers: {},
      data: null,
    });
  };
  getProductById = async (data) => {
    return this.instance({
      method: this.ProductListByIdConfig.Method,
      url: this.ProductListByIdConfig.Endpoint,
      headers: {},
      data: data,
    });
  };
  addProduct = async (data) => {
    return this.instance({
      method: this.AddProductListConfig.Method,
      url: this.AddProductListConfig.Endpoint,
      headers: {},
      data: data,
    });
  };
  addProductVarients = async (data) => {
    return this.instance({
      method: this.addProductVarientsListConfig.Method,
      url: this.addProductVarientsListConfig.Endpoint,
      headers: {},
      data: data,
    });
  };
  editProduct = async (data) => {
    return this.instance({
      method: this.EditProductListConfig.Method,
      url: this.EditProductListConfig.Endpoint,
      headers: {},
      data: data,
    });
  };
  editProductVariant = async (data) => {
    return this.instance({
      method: this.EditProductVariantListConfig.Method,
      url: this.EditProductVariantListConfig.Endpoint,
      headers: {},
      data: data,
    });
  };
  deleteProduct = async (data) => {
    return this.instance({
      method: this.DeleteProductListConfig.Method,
      url: this.DeleteProductListConfig.Endpoint,
      headers: {},
      data: data,
    });
  };
}

export default ProductList;
