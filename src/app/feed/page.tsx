"use client"

import Link from "next/link";

import LoginButton from "@/components/LoginButton";
import AuthContextProvider, { useAuth } from "@/lib/context/authContext/auth";



export default function Feed() {


    return (
    <div className="h-screen w-screen">
<AuthContextProvider>
  <LoginButton />
</AuthContextProvider>
    </div>
  );
}
