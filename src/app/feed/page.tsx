"use client";

import Link from "next/link";
import { useAuth } from "@/lib/context/authContext/auth";
import FeedPosts from "@/components/FeedPosts";
// import Login from "@/components/auth/Login";
import LoginButton from "@/components/LoginButton";


export default function Feed() {
  const { user, handleLogout } = useAuth();

  return (
    <section className=" container my-3">
      <div>

      </div>
      {user ? (
        <div className=" ">

          <div className="flex order-1 gap-3"> 

            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt="Profile"
                width={50}
                height={52}
                className="rounded-full"
              />
            ) : (
              <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
            )}
            <div>
              <p>welcome Back</p>
              <p className="text-sm font-medium">{user.displayName || "User"}</p>
            </div>
          </div>


          
          <button
            className="px-3 py-1 bg-black text-white rounded-md hover:bg-gray-800 transition"
            onClick={handleLogout}
          >
            Logout
          </button>
          <FeedPosts />
        </div>

      ) : (
        <div className="text-center">
          <p className="text-lg font-medium">Please log in to access your feed.</p>
          <LoginButton/>
        </div>
      )}
    </section>
  );
}