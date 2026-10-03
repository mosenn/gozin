"use client";

import Link from "next/link";

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

type Props = {
  id: string;
};

export default function DashboardSidebar({ id }: Props) {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  render={
                    <Link href={`/dashboard/${id}`}>
                      Overview
                    </Link>
                  }
                />
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  render={
                    <Link href={`/dashboard/${id}/profile`}>
                      Profile
                    </Link>
                  }
                />
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  render={
                    <Link href={`/dashboard/${id}/settings`}>
                      Settings
                    </Link>
                  }
                />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}