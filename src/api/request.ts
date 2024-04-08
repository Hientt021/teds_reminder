import { store } from "@/store";
import { appActions } from "@/store/features/appSlice";
import { getAccessToken, getValidToken, onLogout } from "@/utils/auth";
import axios from "axios";

const request = axios;
let refreshTokenPromise: any = null;

request.interceptors.request.use(
  async (config) => {
    const endPoint = config.url?.split("/api/v1")[1] || "";
    const isPrivate = !endPoint.startsWith("/auth");

    if (isPrivate) {
      const token = getAccessToken();
      if (token) config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  async function (response) {
    return response;
  },
  async function (error) {
    const status = error.response.status;
    const originalRequest = error.config;
    if (originalRequest && status === 403) {
      if (!refreshTokenPromise) {
        refreshTokenPromise = store
          .dispatch(appActions.handleRefreshToken())
          .then((data) => {
            refreshTokenPromise = null;
            const newToken = (data.payload as any).accessToken;
            return newToken;
          });
      }

      return refreshTokenPromise
        .then((newToken: string) => {
          error.config.headers["Authorization"] = "Bearer " + newToken;
          return axios.request(error.config);
        })
        .catch(() => onLogout());
    }

    return Promise.reject(error);
  }
);

export default request;
