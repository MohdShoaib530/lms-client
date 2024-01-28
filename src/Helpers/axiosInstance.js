import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = backendUrl;
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;

