
export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: "user" | "admin";
};

export type LoginPayload = {
  identifier: string; // ایمیل یا نام کاربری
  password: string;
};

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
