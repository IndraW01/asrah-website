import axios from "axios";

const httpRequest = axios.create({
  // baseURL: "https://apis.teraskill.id",
  // baseURL: "http://116.193.190.10:5001/",
  baseURL: ".lc",
});

httpRequest.interceptors.request.use((config) => {
  const appToken = localStorage.getItem("@token");
  const refreshToken = localStorage.getItem("@refreshToken");

  if (appToken) {
    config.headers = {
      Authorization: `Bearer ${appToken}`,
    };
  }

  return config;
});

httpRequest.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem("@token");
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default httpRequest;
