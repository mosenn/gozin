import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { toast } from "sonner";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://api.gozin.ir/api/v1";

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
  withCredentials: true,
});

let isRefreshing = false;

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // https cookie 
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const status = error.response?.status;
    const originalRequest = error.config;

    if (status === 401 && originalRequest && !isRefreshing) {
      try {
        isRefreshing = true;

        // await apiClient.post("/auth/refresh");

        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh Token is not valid
        // redirect to login page
        window.location.href =
          "/login?reason=session-expired";
        // read reason in login page with searchParams
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    if (status === 403) {

      toast.error("شما اجازه دسترسی به این بخش را ندارید.");
    }

    return Promise.reject(error);
  }
);