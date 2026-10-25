"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  List,
  Plus,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "داشبورد",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "لیست‌ها",
    url: "/dashboard/lists",
    icon: List,
  },
  {
    title: "ساخت لیست",
    url: "/dashboard/lists/create",
    icon: Plus,
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar side="right">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>داشبورد</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.url;

                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton isActive={isActive} >
                      <Link href={item.url} className="flex gap-1">
                        <Icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}