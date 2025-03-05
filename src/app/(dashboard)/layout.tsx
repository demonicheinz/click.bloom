"use client";

import React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { useEffect, useState, createContext, useContext } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Create context for sidebar state
type SidebarContextType = {
  isMobileSidebarOpen: boolean;
  setIsMobileSidebarOpen: (open: boolean) => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useMobileSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useMobileSidebar must be used within a SidebarContext.Provider");
  }
  return context;
};

// Helper function to get breadcrumb items from pathname
function getBreadcrumbItems(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);

  // Return empty array for root dashboard
  if (segments.length === 1 && segments[0] === "dashboard") {
    return [{ label: "Dashboard", path: "/dashboard", isActive: true }];
  }

  return segments.map((segment, index) => {
    // Create path up to this segment
    const path = `/${segments.slice(0, index + 1).join("/")}`;
    // Format label (capitalize first letter)
    const label = segment.charAt(0).toUpperCase() + segment.slice(1);
    // Check if this is the last segment (current page)
    const isActive = index === segments.length - 1;

    return { label, path, isActive };
  });
}

export default function DashboardGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const pathname = usePathname();
  const breadcrumbItems = getBreadcrumbItems(pathname);

  // Close mobile sidebar when pathname changes
  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [pathname]);

  return (
    <SidebarContext.Provider value={{ isMobileSidebarOpen, setIsMobileSidebarOpen }}>
      <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-screen w-full">
          <AppSidebar
          // className="shrink-0"
          />
          <SidebarInset
          // className="flex flex-col flex-1 w-full"
          >
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 w-full">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator
                  orientation="vertical"
                  className="mr-2 h-4"
                />
                <Breadcrumb>
                  <BreadcrumbList>
                    {breadcrumbItems.map((item, index) => (
                      <React.Fragment key={item.path}>
                        <BreadcrumbItem className="hidden md:block">
                          {item.isActive ? (
                            <BreadcrumbPage>{item.label}</BreadcrumbPage>
                          ) : (
                            <BreadcrumbLink href={item.path}>{item.label}</BreadcrumbLink>
                          )}
                        </BreadcrumbItem>
                        {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
                      </React.Fragment>
                    ))}
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <div className="flex-1 overflow-auto w-full">{children}</div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </SidebarContext.Provider>
  );
}
