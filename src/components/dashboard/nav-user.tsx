"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BadgeCheck, ChevronsUpDown, LogOut } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { useMobileSidebar } from "@/app/(dashboard)/layout";

export function NavUser({
  user,
  onLogout,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  onLogout?: () => Promise<void>;
}) {
  const { isMobile } = useSidebar();
  const router = useRouter();
  const { setIsMobileSidebarOpen } = useMobileSidebar();

  const handleLogout = async () => {
    try {
      if (onLogout) {
        await onLogout();
      } else {
        // Fallback logout mechanism if no onLogout prop is provided
        router.push("/login");
      }

      // Close mobile sidebar when logging out
      if (isMobile) {
        setIsMobileSidebarOpen(false);
      }

      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Failed to log out. Please try again.");
    }
  };

  const handleNavigateToSettings = () => {
    // Close mobile sidebar when navigating to settings
    if (isMobile) {
      setIsMobileSidebarOpen(false);
    }
    router.push("/dashboard/settings");
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={user.avatar}
                  alt={user.name}
                />
                <AvatarFallback className="rounded-lg">CB</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="end"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={user.avatar}
                    alt={user.name}
                  />
                  <AvatarFallback className="rounded-lg">CB</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex items-center gap-2 cursor-pointer"
              onClick={handleNavigateToSettings}
            >
              <BadgeCheck className="h-4 w-4" /> Account
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex items-center gap-2 cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" /> Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
