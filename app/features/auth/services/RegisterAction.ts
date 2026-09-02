"use server";

import { RegisterFormValues } from "../types/auth.types";

export async function registerAction(data: RegisterFormValues) {
  
  const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/register`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {

      return {
        success: false,
        message: result.message || "ثبت نام ناموفق بود",
      };
    }

    

    return {
      success: true,
      message: "ثبت نام شما با موفقیت انجام شد",
    };
  } catch (error) {

    return {
      success: false,
      message: "خطایی در ارتباط با سرور رخ داد",
    };
  }
}