import axios from "axios";
import { checkAuthCookies } from "../utils/Cookies/cookies";
import { logoutUser } from "../Slices/userSlices";
import { API_BASE_URL } from "./config";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const cookies = checkAuthCookies() 
    if (cookies) {
      const token = localStorage.getItem("user");
      const parsedTokenData = token ? JSON.parse(token) : null;
      if (parsedTokenData && parsedTokenData?.data?.accessToken) {
        config.headers.Authorization = `${parsedTokenData?.data?.accessToken}`;
      }
      return config;
    } else {
      window.location.href = '/';
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
