import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2,  "نام باید حداقل ۲ کاراکتر باشد")
    .max(50, "نام باید حداکثر ۵۰ کاراکتر باشد"),

  email: z
    .string()
    .trim()
    .check(z.email("لطفاً یک ایمیل معتبر وارد کنید")),

  password: z
    .string()
    .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد")
    .max(100, "رمز عبور باید حداکثر ۱۰۰ کاراکتر باشد"),
});