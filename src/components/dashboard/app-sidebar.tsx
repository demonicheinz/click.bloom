"use client";

import type * as React from "react";
import { Settings2, SquareTerminal, BarChart, Link, FolderTree, Palette, X } from "lucide-react";

import { NavMain } from "@/components/dashboard/nav-main";
import { NavUser } from "@/components/dashboard/nav-user";
import { NavHeader } from "@/components/dashboard/nav-header";
import {
  Sidebar,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/components/auth/auth-provider";
import { useMobileSidebar } from "@/app/(dashboard)/layout";

// This is sample data.
const data = {
  user: {
    name: "Heinz",
    email: "admin@heinz.id",
    avatar: "/default-avatar.svg",
  },
  navHeader: [
    {
      name: "ClickBloom",
      logo: "/logo.png",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: SquareTerminal,
      isActive: true,
      directLink: true,
    },
    {
      title: "Analytics",
      url: "/dashboard/analytics",
      icon: BarChart,
      directLink: true,
    },
    {
      title: "Links",
      url: "/dashboard/links",
      icon: Link,
      directLink: true,
    },
    {
      title: "Categories",
      url: "/dashboard/categories",
      icon: FolderTree,
      directLink: true,
    },
    {
      title: "Customization",
      url: "/dashboard/customization",
      icon: Palette,
      directLink: true,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings2,
      directLink: true,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { logout } = useAuth();
  const { isMobile } = useSidebar();
  const { setIsMobileSidebarOpen } = useMobileSidebar();

  return (
    <Sidebar
      collapsible="icon"
      {...props}
    >
      <SidebarHeader>
        <NavHeader items={data.navHeader} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={data.user}
          onLogout={logout}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
