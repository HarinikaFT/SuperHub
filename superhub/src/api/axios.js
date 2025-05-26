import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/", // plain string, NOT markdown link
});

// Add token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
