"use client";

import type React from "react";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { useEffect, useState, createContext, useContext } from "react";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { AuthProvider } from "@/components/auth/auth-provider";

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

// Helper function to generate breadcrumb items from pathname
function generateBreadcrumbItems(pathname: string) {
  // Remove the leading slash and split by slashes
  const segments = pathname.replace(/^\//, "").split("/");

  // Create breadcrumb items
  return segments.map((segment, index) => {
    // Create the href by joining all segments up to the current one
    const href = "/" + segments.slice(0, index + 1).join("/");

    // Format the label (capitalize first letter, replace hyphens with spaces)
    const label = segment.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase());

    return {
      id: `breadcrumb-${index}`,
      href,
      label,
    };
  });
}

export default function DashboardGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile sidebar when pathname changes
  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [pathname]);

  const breadcrumbItems = generateBreadcrumbItems(pathname);

  return (
    <AuthProvider>
      <SidebarContext.Provider value={{ isMobileSidebarOpen, setIsMobileSidebarOpen }}>
        <SidebarProvider defaultOpen={true}>
          <AppSidebar />

          {/* Main Content */}
          <SidebarInset>
            {/* Header */}
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator
                  orientation="vertical"
                  className="mr-2 h-4"
                />
                <Breadcrumb className="hidden md:flex">
                  <BreadcrumbList>
                    {breadcrumbItems.map((item) => (
                      <BreadcrumbItem key={item.id}>
                        {item.id === `breadcrumb-${breadcrumbItems.length - 1}` ? (
                          <BreadcrumbPage>{item.label}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                        )}
                        {item.id !== `breadcrumb-${breadcrumbItems.length - 1}` && (
                          <BreadcrumbSeparator />
                        )}
                      </BreadcrumbItem>
                    ))}
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>

            {/* Content */}
            <main className="flex-1 overflow-auto">{children}</main>
          </SidebarInset>
        </SidebarProvider>
      </SidebarContext.Provider>
    </AuthProvider>
  );
}
