import axios from "axios";
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://api.gozin.ir/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
   withCredentials: true,
});

// اینترسپتور برای افزودن خودکار توکن به ریکوئست‌ها
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);
