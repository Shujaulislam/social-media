'use client'
import AddPostForm from "@/components/PostForm";
import { useAuth } from "@/lib/context/authContext/auth";
import React from "react";
// import AddPostForm from "@/components/AddPostForm";
// import { useAuth } from "@/context/AuthContext";

const CreatePostPage = () => {
  const { user } = useAuth();

  if (!user) return <div>Please log in to create a post.</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Create a Post</h1>
      <AddPostForm userId={user.uid} />
    </div>
  );
};

export default CreatePostPage;
