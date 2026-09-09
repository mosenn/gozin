"use client";


import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useGetProfileQuery } from "@/features/auth/services/ProfileAction";


export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const {
    data: user,
    isLoading,
    isError,
  } = useGetProfileQuery();

  useEffect(() => {
    if (isLoading) return;

    // کاربر لاگین نیست
    if (isError || !user) {
      router.replace("/login");
      return;
    }

    // مسیرهای ادمین فقط برای ADMIN
    if (pathname.startsWith("/admin") && user.data.role !== "ADMIN") {
      router.replace("/dashboard");
    }
  }, [isLoading, isError, user, pathname, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !user) {
    return null;
  }

  // جلوگیری از نمایش موقت صفحه Admin برای USER
  if (pathname.startsWith("/admin") && user.data.role !== "ADMIN") {
    return null;
  }

  return <>{children}</>;
}