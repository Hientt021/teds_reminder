import { getValidToken, onLogout } from "@/utils/auth";
import axios from "axios";

const request = async (options: any) => {
  const reqOptions = {
    ...options,
    baseURL: "https://teds-reminder-be.onrender.com",
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
      if (!token) onLogout();
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
