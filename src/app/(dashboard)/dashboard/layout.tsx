import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This layout is nested inside the (dashboard)/layout.tsx
  // which already includes the AppSidebar
  // We just need to render the children with appropriate styling
  return <div className="flex-1 overflow-auto w-full">{children}</div>;
}
