"use client";
import { setCookie, destroyCookie } from 'nookies';
import { FirebaseError } from 'firebase/app';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebse/firebase";
import { createUser } from "@/lib/profile/authProfile";

// Define the Auth Context Type
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  handleSignIn: () => Promise<void>;
  handleLogout: () => Promise<void>;
}

// Create Auth Context
const AuthContext = createContext<AuthContextType | null>(null);

// Props for AuthContextProvider
interface AuthContextProviderProps {
  children: ReactNode;
}

export default function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Listen for Firebase Auth state changes
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
      if (!currentUser) setError(null);
    });

    return () => unsub();
  }, []);

  // Redirect user to home page if signed in
  useEffect(() => {
    if (user) router.push("/feed");
  }, [user, router]);

  // Handle Google Sign-In
  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log("User signed in:", user.email);

      // Save user data in Firestore
      await createUser({
        uid: user.uid,
        name: user.displayName || "Unnamed User",
        email: user.email || "No Email Provided",
        photoURL: user.photoURL || "",
      });
       // Get Firebase token and save to cookies
    const token = await user.getIdToken();
    setCookie(null, "firebaseToken", token, {
      path: "/",
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });

      console.log("User document created/updated:", user.email);
    } catch (error: any) {
      console.error("Sign-in error:", error.message);
      setError(error.message || "Failed to sign in.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await signOut(auth);
      setUser(null);
          // Clear the Firebase token cookie
    destroyCookie(null, "firebaseToken");
      router.push("/");
    } catch (error: any) {
      console.error("Logout error:", error.message);
      setError(error.message || "Failed to log out.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        handleSignIn,
        handleLogout,
      }}
    >
      {isLoading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
}

// Custom Hook for Using Auth Context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};
