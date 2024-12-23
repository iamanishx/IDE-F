import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // Replace with your actual API base URL
});

api.interceptors.request.use(
  (config) => {
    // Retrieve the token from local storage
    const token = localStorage.getItem("token");

    if (token) {
      console.log("Token found in local storage:", token);
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
