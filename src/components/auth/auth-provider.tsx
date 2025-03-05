"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";

// Define the user type
type User = {
  id: string;
  email: string;
  name?: string;
};

// Define the auth context type
type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
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
  const pathname = usePathname();

  // Check if user is logged in on mount
  useEffect(() => {
    const checkUser = async () => {
      try {
        // Check for user in cookies
        const userCookie = Cookies.get("user");

        if (userCookie) {
          setUser(JSON.parse(userCookie));
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        // If there's an error parsing the cookie, clear it
        Cookies.remove("user");
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();
  }, []);

  // Redirect based on auth state
  useEffect(() => {
    if (!isLoading) {
      // If user is not logged in and trying to access protected routes
      if (!user && pathname?.startsWith("/dashboard")) {
        router.push("/login");
      }

      // If user is logged in and trying to access auth routes
      if (user && pathname === "/login") {
        router.push("/dashboard");
      }
    }
  }, [user, isLoading, pathname, router]);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);

    try {
      // This is a mock login - we'll implement the actual login later
      // For now, just check if email contains "admin"
      if (email.includes("admin")) {
        const mockUser = {
          id: "1",
          email,
          name: "Admin User",
        };

        // Store user in cookie (expires in 7 days)
        Cookies.set("user", JSON.stringify(mockUser), { expires: 7 });

        // Set user in state
        setUser(mockUser);

        // Redirect to dashboard
        router.push("/dashboard");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setIsLoading(true);

    try {
      // Clear cookie
      Cookies.remove("user");

      // Clear user from state
      setUser(null);

      // Redirect to login
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
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
