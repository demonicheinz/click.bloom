"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "@/components/auth/login-form";
import { AuthProvider } from "@/components/auth/auth-provider";

export default function LoginPage() {
  return (
    <AuthProvider>
      <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 h-12 w-12 overflow-hidden rounded-full bg-primary/10">
              <Image
                src="/logo.svg"
                alt="ClickBloom Logo"
                width={48}
                height={48}
                className="h-full w-full object-cover"
              />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">ClickBloom</h1>
            <p className="text-sm text-muted-foreground">Sign in to manage your links</p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Sign In</CardTitle>
              <CardDescription>
                Enter your email and password to access your dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LoginForm />
            </CardContent>
            <CardFooter className="flex justify-center border-t p-4">
              <p className="text-xs text-muted-foreground">
                By continuing, you agree to our Terms of Service and Privacy Policy
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </AuthProvider>
  );
}
