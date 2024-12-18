"use client";

import { useState } from "react";
// import { useAuth } from "@/context/AuthContext";

// import { firestore, storage } from "@/lib/firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp, Firestore } from "firebase/firestore";
import { useAuth } from "@/lib/context/authContext/auth";
import { db, storage } from "@/lib/firebse/firebase";

const CreatePost: React.FC = () => {
  const { user } = useAuth(); // Get the logged-in user details
  const [text, setText] = useState<string>("");
  const [mediaFiles, setMediaFiles] = useState<FileList | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleMediaUpload = async (files: FileList): Promise<string[]> => {
    const uploadedUrls: string[] = [];
    for (const file of Array.from(files)) {
      const fileRef = ref(storage, `posts/${user?.uid}/${file.name}`);
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);
      uploadedUrls.push(url);
    }
    return uploadedUrls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return alert("You must be logged in to post!");

    setIsLoading(true);
    try {
      const uploadedUrls = mediaFiles ? await handleMediaUpload(mediaFiles) : [];

      await addDoc(collection(db, "posts"), {
        userId: user.uid,
        userName: user.displayName,
        userPhoto: user.photoURL,
        text,
        media: uploadedUrls,
        timestamp: serverTimestamp(),
      });

      setText("");
      setMediaFiles(null);
      alert("Post created successfully!");
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Write something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <input
        type="file"
        multiple
        accept="image/*,video/*"
        onChange={(e) => setMediaFiles(e.target.files)}
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Posting..." : "Post"}
      </button>
    </form>
  );
};

export default CreatePost;
