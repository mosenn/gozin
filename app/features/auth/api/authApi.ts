import { apiClient } from "@/services/http/client";


interface RegisterData {
  email: string;
  password: string;
  age: number;
}

interface LoginData {
  email: string;
  password: string;
}

export const register = async (data: RegisterData) => {
  const response = await apiClient.post(
    '/auth/register',
    data,
  );

  return response.data;
};

export const login = async (data: LoginData) => {
  const response = await apiClient.post(
    '/auth/login',
    data,
  );

  return response.data;
};

export const getProfile = async () => {
  const response = await apiClient.get(
    '/auth/profile',
  );

  return response.data;
};