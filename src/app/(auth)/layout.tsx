import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication - ClickBloom",
  description: "Authentication pages for ClickBloom",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen">{children}</div>;
}
