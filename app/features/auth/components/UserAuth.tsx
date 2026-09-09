"use client";

import Link from "next/link";
import { useGetProfileQuery } from '@/features/auth/services/ProfileAction';
import { useLogoutMutation } from "../services/LogoutAction";
import { useRouter } from "next/navigation";


export default function UserAuth() {
    const router = useRouter()
    const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();

  const {
    data: user,
    isLoading,
    isError,
  } = useGetProfileQuery();
  

  const handleLogout = async () => {
  try {
    await logout().unwrap();
    router.replace("/login");
  } catch (error) {
    console.error(error);
  }
};

console.log("USER IN HEADER:", user);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !user) {
    return (
      <div className="flex items-center gap-3">
        <Link href="/login">
          ورود
        </Link>

        <Link href="/register">
          ثبت نام
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div>
        <p className=''>{user.data.email}</p>
        <span className='text-red-500'>{user.data.role}</span>
      </div>
      <button
  type="button"
  onClick={handleLogout}
  disabled={isLoggingOut}
>
  {isLoggingOut ? "در حال خروج..." : "خروج"}
</button>
    </div>
  );
}