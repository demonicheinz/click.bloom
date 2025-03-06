"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { AuthProvider } from "@/components/auth/auth-provider";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // This would be implemented with Supabase Auth
      // await supabase.auth.resetPasswordForEmail(email)
      setIsSubmitted(true);
      toast.success("Password reset link sent to your email");
    } catch (error) {
      toast.error("Failed to send reset link. Please try again.");
    }
  };

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
            <p className="text-sm text-muted-foreground">Reset your password</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Reset Password</CardTitle>
              <CardDescription>
                {!isSubmitted
                  ? "Enter your email and we'll send you a link to reset your password"
                  : "Check your email for a link to reset your password"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!isSubmitted ? (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                  >
                    Send Reset Link
                  </Button>
                </form>
              ) : (
                <div className="space-y-4">
                  <p className="text-center text-sm text-muted-foreground">
                    We've sent a password reset link to <strong>{email}</strong>. Please check your
                    email and follow the instructions to reset your password.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Try a different email
                  </Button>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-center border-t p-4">
              <div className="text-center text-sm">
                <Link
                  href="/login"
                  className="text-primary hover:underline"
                >
                  Back to login
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </AuthProvider>
  );
}
