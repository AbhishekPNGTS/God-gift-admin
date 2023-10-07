import { getTokenLocal } from "../utils/localStorage.util.js";
import ApiRoutes from "../conffigs/endpoints.config";
import HttpClient from "./index.api";
const baseURL = process.env.REACT_APP_API_URL;

class UserList extends HttpClient {
  constructor() {
    super(baseURL);
    this._initializeRequestInterceptor();
    this._initializeResponseInterceptor();
  }

  _initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use((config) => {
      config.headers["Authorization"] = `Bearer ${getTokenLocal()}`;
      config.headers["Authkey"] = process.env.REACT_APP_AUTH_KEY;
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

  AllUserListConfig = ApiRoutes.User.All;
  UserRefferalConfig = ApiRoutes.User.AllRefferalUser;
  UserListByIdConfig = ApiRoutes.User.UserById;

  getAllProduct = async () => {
    return this.instance({
      method: this.AllUserListConfig.Method,
      url: this.AllUserListConfig.Endpoint,
      headers: {},
      data: null,
    });
  };
  getFranchiseProduct = async () => {
    return this.instance({
      method: this.UserRefferalConfig.Method,
      url: this.UserRefferalConfig.Endpoint,
      headers: {},
      data: null,
    });
  };
  getProductById = async (data) => {
    return this.instance({
      method: this.UserListByIdConfig.Method,
      url: this.UserListByIdConfig.Endpoint,
      headers: {},
      data: data,
    });
  };
}

export default UserList;
