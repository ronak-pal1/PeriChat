"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

interface AuthContextType {
  user: {
    id: string;
    email: string | undefined;
    phone: string | undefined;
  } | null;
  setUser: (
    user: {
      id: string;
      email: string | undefined;
      phone: string | undefined;
    } | null
  ) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{
    id: string;
    email: string | undefined;
    phone: string | undefined;
  } | null>(null);
  const router = useRouter();

  const setUserFunc = async () => {
    const { data } = await supabase.auth.getSession();
    setUser(
      data.session?.user
        ? {
            id: data.session.user.id,
            email: data.session.user.email,
            phone: data.session.user.phone,
          }
        : null
    );

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const uData = session?.user
          ? {
              id: session.user.id,
              email: session.user.email,
              phone: session.user.phone,
            }
          : null;

        setUser(uData);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  };

  // Check if the user is authenticated (when app loads)
  useEffect(() => {
    setUserFunc();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/login"); // Redirect to login page after logout
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuthContext must be used within AuthProvider");
  return context;
};
