import UserAuth from "@/features/auth/components/UserAuth";
import Link from "next/link";
import { Suspense } from "react";




export default function Header() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-white">
      <div className="flex items-center justify-between px-4 py-4">
        
        {/* Logo */}
        <div>
          Logo
        </div>

       
    <Suspense fallback={null}>
      <Link href={`/dahboard/lists`}>داشبورد</Link>
        <UserAuth />
      </Suspense>

      </div>
    </header>
  );
}