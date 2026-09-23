import z from "zod";
import { LoginSchema } from "../schemas/loginSchema";
import { registerSchema } from "../schemas/RegisterSchema";

export type User = {
  id: string;
  email: string;
  username: string | null;
  role: "USER" | "ADMIN";
};

export type LoginFormValues = z.infer<typeof LoginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;


export type LoginResponse = {
  message: string;
  user: User;
  };

  export type ProfileResponse = {
  data: User;
  message: string;
  statusCode: number;
};

