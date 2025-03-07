"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { useMobileSidebar } from "@/app/(dashboard)/layout";

export function NavHeader({
  items,
}: {
  items: {
    name: string;
    logo: string;
  }[];
}) {
  const router = useRouter();
  const [activeItem] = React.useState(items[0]);
  const { isMobile } = useSidebar();
  const mobileSidebar = useMobileSidebar();

  if (!activeItem) {
    return null;
  }

  const handleClick = () => {
    router.push("/dashboard");

    // Close mobile sidebar when logo is clicked
    if (isMobile) {
      mobileSidebar.setIsMobileSidebarOpen(false);
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          onClick={handleClick}
          className="cursor-pointer"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-transparent text-sidebar-primary-foreground">
            <Image
              src={activeItem.logo}
              alt={activeItem.name}
              width={32}
              height={32}
            />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{activeItem.name}</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
