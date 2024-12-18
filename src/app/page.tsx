"use client"

import Link from "next/link";
import LoginButton from "@/components/LoginButton";
import { auth } from "@/lib/firebse/firebase";
import AuthContextProvider from "@/lib/context/authContext/auth";


export default function Home() {
  return (
    <div className="h-screen w-screen bg-black">
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-white text-4xl font-bold mb-4">Welcome to Social Media App</h1>
        <p className="text-white text-xl mt-4">This is a social media app built with Next.js, Tailwind CSS, and TypeScript.</p>
        <p className="text-white text-xl mt-4">This is an assignment for the i got skills</p>
          <Link href="/auth" className="mt-4">
          <button className="bg-blue-200 hover:bg-blue-500 hover:text-white text-black px-4 py-2 rounded-lg">visit auth page</button>
        </Link>
        <AuthContextProvider>
          <LoginButton />
        </AuthContextProvider>
      </div>
    </div>
  );
}
