import z from "zod";


export const LoginSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(1, "نام کاربری یا ایمیل الزامی است"),

  password: z
    .string()
    .trim()
    .min(8, "رمز عبور باید حداقل 8 کاراکتر باشد"),
});

