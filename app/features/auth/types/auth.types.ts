import z from "zod";
import { LoginSchema } from "../schemas/loginSchema";
import { registerSchema } from "../schemas/RegisterSchema";

export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: "user" | "admin";
};

export type LoginFormValues = z.infer<typeof LoginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export type AuthResponse = {
  user: User;
  token: string;
  refreshToken?: string;
};
