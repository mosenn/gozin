import AuthProvider from "@/provider/AuthProvider";
import { Suspense } from "react";

export default async function AdminPanelLayout({ children}: {children:React.ReactNode}) {


  return (
     <Suspense fallback={null}>
      <AuthProvider>{children}</AuthProvider>
    </Suspense>
  );
}