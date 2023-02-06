const axios = require("axios");
const baseURL = process.env.BENQUEST_URI;
//    process.env.NEXT_PUBLIC_BASEURL || process.env.REACT_APP_BACKEND_URL;
let headers = { "Content-Type": "application/json" };

headers.Authorization = process.env.BENQUEST_AUTH;
const axiosInstance = axios.create({
  baseURL: baseURL,
  headers,
});

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = cookie.get("token");
//     if (token) {
//       //   config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

module.exports = axiosInstance;
