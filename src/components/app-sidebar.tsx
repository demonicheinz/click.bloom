"use client";

import type * as React from "react";
import { Settings2, SquareTerminal, BarChart, Link, FolderTree, Palette } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { NavHeader } from "@/components/nav-header";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "Heinz",
    email: "contact@heinz.id",
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
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
