import axios from "axios";
import {
  getAccessToken,
  getValidToken,
  isTokenExpired,
  onLogout,
} from "@/utils/auth";
import { store } from "@/store";
import { appActions } from "@/store/features/appSlice";

const request = async (options: any) => {
  const reqOptions = {
    ...options,
    baseURL: "http://localhost:5000",
    headers: { "Content-Type": "application/json" },
  };
  return axios(reqOptions)
    .then((res) => {
      return Promise.resolve(res.data.data);
    })
    .catch((error) => {
      return Promise.reject(error.response.data.message);
    });
};

axios.interceptors.request.use(
  async (config) => {
    const isPrivate = !config.url?.includes("/auth");

    if (isPrivate) {
      const token = await getValidToken();
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default request;
