import AuthProvider from "@/provider/AuthProvider";
import { Suspense } from "react";



export default async function DashboardLayout({children}:{children:React.ReactNode}) {


  return (
     <Suspense fallback={null}>
      <AuthProvider>{children}</AuthProvider>
    </Suspense>
  );
}