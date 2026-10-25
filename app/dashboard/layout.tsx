import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/features/dashboard/DashboardSidebar";
import { Suspense } from "react";
import AuthProvider from './../provider/AuthProvider';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return( <div dir="rtl" className="mt-6">
    <SidebarProvider>
      <Suspense fallback={null}>
      <DashboardSidebar />
    </Suspense>

      <main className="flex-1">
        <Suspense fallback={null}>
        <AuthProvider>{children}</AuthProvider>
      </Suspense>
      </main>
    </SidebarProvider>;
  </div>
  )
}