"use server";

import { RegisterFormValues } from "../types/auth.types";

export async function registerAction(data: RegisterFormValues) {
  try {
    const response = await fetch(
      `${process.env.API_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "ثبت نام ناموفق بود",
      };
    }

    return {
      success: true,
      message:`کاربر ${data.name}، ثبت نام شما با موفقیت انجام شد`,
    };
  } catch {
    return {
      success: false,
      message: "خطایی در ارتباط با سرور رخ داد",
    };
  }
}