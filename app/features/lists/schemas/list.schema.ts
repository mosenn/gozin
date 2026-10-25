import { z } from "zod";

export const createListSchema = z.object({
  title: z.string().min(1, "عنوان الزامی است"),
  description: z.string().optional(),
  coverUrl: z
  .string()
  .optional()
  .refine(
    (value) => !value || z.string().url().safeParse(value).success,
    "لینک کاور معتبر نیست"
  ),
  tags: z.array(z.string()).optional(),
  privacy: z.enum(["PUBLIC", "PRIVATE"]).optional(),
});



export const editListItemSchema = z.object({
  status: z.enum([
    "PLANNED",
    "WATCHING",
    "COMPLETED",
    "DROPPED",
  ]).optional(),

  order: z.number()
    .int("ترتیب باید عدد صحیح باشد")
    .min(0, "ترتیب نمی‌تواند منفی باشد")
    .optional(),

  note: z.string()
    .max(500, "یادداشت حداکثر ۵۰۰ کاراکتر است")
    .optional(),
});

export type EditListItemFormValues = z.infer<
  typeof editListItemSchema
>;

