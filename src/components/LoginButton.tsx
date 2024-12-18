"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { useAuth } from "@/lib/context/authContext/auth";

export default function LoginButton() {
  const { user, isLoading, error, handleSignIn, handleLogout } = useAuth();

  // Render loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-spinner loading-xs"></span>
      </div>
    );
  }

  // Render logged-in state
  if (user) {
    return (
      <div className="flex items-center gap-3">
        <Link href="/admin" className="flex items-center gap-3">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt="Profile"
              width={32}
              height={32}
              className="rounded-full"
            />
          ) : (
            <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
          )}
          <p className="text-sm font-medium">{user.displayName || "User"}</p>
        </Link>

        <button
          className="px-3 py-1 bg-black text-white rounded-md hover:bg-gray-800 transition"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    );
  }

  // Render login state
  return (
    <button
      onClick={handleSignIn}
      className="px-3 py-1 flex items-center gap-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
    >
      <Image
        src="/gogle.webp"
        alt="Google"
        width={24}
        height={24}
        className="h-7 w-auto"
      />
      <span>Sign In with Google</span>
    </button>
  );
}
