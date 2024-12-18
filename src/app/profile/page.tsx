"use client";

import Link from "next/link";
import { useAuth } from "@/lib/context/authContext/auth";
import FeedPosts from "@/components/FeedPosts";


export default function MyProfile() {
  const { user, handleLogout } = useAuth();

  return (
    <section className=" container my-3">
    
    </section>
  );
}