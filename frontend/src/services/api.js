import axios from "axios";

// Force fresh build (cache-bust) - reading VITE_API_URL at build time
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
});

// Attach the JWT to every outgoing request automatically, if one exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
