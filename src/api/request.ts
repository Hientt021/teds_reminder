import axios from "axios";
import { getToken } from "./auth";

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

// Thêm một bộ đón chặn request
axios.interceptors.request.use(
  async (config) => {
    // console.log(config);
    const isAuth = config.url?.includes("/auth");
    if (!isAuth) {
      const token = await getToken();
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  },
  function (error) {
    // Làm gì đó với lỗi request
    return Promise.reject(error);
  }
);

// Thêm một bộ đón chặn response
axios.interceptors.response.use(
  function (response) {
    // Bất kì mã trạng thái nào nằm trong tầm 2xx đều khiến hàm này được trigger
    // Làm gì đó với dữ liệu response
    // console.log(response);
    return response;
  },
  function (error) {
    // Bất kì mã trạng thái nào lọt ra ngoài tầm 2xx đều khiến hàm này được trigger\
    // Làm gì đó với lỗi response
    // console.log(error);
    return Promise.reject(error);
  }
);

export default request;
