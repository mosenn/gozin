import axios from "axios";
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://api.gozin.ir/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
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

apiClient.interceptors.response.use(
  (response) => response,

  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      // بعداً:
      // refresh token handle / redirect login
    }

    if (status === 403) {
      // بعداً:
      // نمایش خطای عدم دسترسی
      //toast for example
    }

    return Promise.reject(error);
  }
);
