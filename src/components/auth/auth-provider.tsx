"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { AuthError } from "@supabase/supabase-js";

// Define the user type
type User = {
  id: string;
  email: string;
  name?: string;
};

// Define profile type
type Profile = {
  id: string;
  full_name?: string;
  [key: string]: any;
};

// Define the auth context type
type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
};

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider props
interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      try {
        setIsLoading(true);

        // Get the current session
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session) {
          // Get the user details
          const {
            data: { user: authUser },
          } = await supabase.auth.getUser();

          if (authUser) {
            // Get the user profile from the database
            const { data: profile } = await supabase
              .from("admin_profile")
              .select("*")
              .eq("id", authUser.id)
              .single();

            setUser({
              id: authUser.id,
              email: authUser.email || "",
              name: (profile as Profile | null)?.full_name || authUser.email?.split("@")[0] || "",
            });
          }
        }
      } catch (error) {
        console.error("Error checking user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Initial check
    checkUser();

    // Set up auth state change listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        // Get the user profile from the database
        const { data: profile } = await supabase
          .from("admin_profile")
          .select("*")
          .eq("id", session.user.id)
          .single();

        setUser({
          id: session.user.id,
          email: session.user.email || "",
          name: (profile as Profile | null)?.full_name || session.user.email?.split("@")[0] || "",
        });
      } else {
        setUser(null);
      }

      // Refresh the page to update server-side data
      if (event === "SIGNED_IN" || event === "SIGNED_OUT") {
        router.refresh();
      }
    });

    // Clean up the subscription
    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, router]);

  const login = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      toast.success("Logged in successfully");
    } catch (error) {
      const authError = error as AuthError;
      toast.error(authError.message || "Failed to log in");
      throw error;
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }

      setUser(null);
      toast.success("Logged out successfully");
    } catch (error) {
      const authError = error as AuthError;
      toast.error(authError.message || "Failed to log out");
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password/update`,
      });

      if (error) {
        throw error;
      }

      toast.success("Password reset email sent");
    } catch (error) {
      const authError = error as AuthError;
      toast.error(authError.message || "Failed to send reset email");
      throw error;
    }
  };

  const updatePassword = async (password: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        throw error;
      }

      toast.success("Password updated successfully");
    } catch (error) {
      const authError = error as AuthError;
      toast.error(authError.message || "Failed to update password");
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        resetPassword,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
