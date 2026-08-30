import { apiClient } from "@/services/http/client";
import {
  AuthResponse,
 LoginFormValues,
  RegisterPayload,
} from "../types/auth.types";

// import {
//   AuthResponse,
//   LoginPayload,
//   RegisterPayload,
// } from "@/features/auth/types/auth.types";

export const authApi = {
  login: async (data: LoginFormValues): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>("/auth/login", data);
    return response.data;
  },

  register: async (data: RegisterPayload): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>("/auth/register", data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post("/auth/logout");
  },
};
