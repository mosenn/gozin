import z from "zod";


export const LoginSchema = z.object({
   email: z
    .string()
    .trim()
    .check(z.email("لطفاً یک ایمیل معتبر وارد کنید")),

  password: z
  .string()
  .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد")
  .regex(/[a-z]/, "رمز عبور باید شامل یک حرف کوچک باشد")
  .regex(/[A-Z]/, "رمز عبور باید شامل یک حرف بزرگ باشد")
  .regex(/[0-9]/, "رمز عبور باید شامل یک عدد باشد")
  .regex(
    /[@$!%*#?&]/,
    "رمز عبور باید شامل یک کاراکتر خاص باشد"
  ),
});

