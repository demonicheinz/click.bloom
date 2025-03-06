"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

export default function NewPasswordPage({ params }: { params: { token: string } }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    setIsSubmitting(true);

    try {
      // This would be implemented with Supabase Auth
      // await supabase.auth.updateUser({ password })
      setIsComplete(true);
      toast.success("Password updated successfully");
    } catch (error) {
      toast.error("Failed to update password. Please try again.");
    } finally {
      setIsSubmitting(false);
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
            <p className="text-sm text-muted-foreground">Create a new password</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Set New Password</CardTitle>
              <CardDescription>
                {!isComplete
                  ? "Create a new password for your account"
                  : "Your password has been updated"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!isComplete ? (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="password">New Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Password must be at least 8 characters
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Updating..." : "Update Password"}
                  </Button>
                </form>
              ) : (
                <div className="space-y-4">
                  <p className="text-center text-sm text-muted-foreground">
                    Your password has been updated successfully. You can now log in with your new
                    password.
                  </p>
                  <Button
                    className="w-full"
                    onClick={() => router.push("/login")}
                  >
                    Go to Login
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
