"use client"

import React, { useState } from "react";
import { Camera, ChevronLeft, Image, Video } from 'lucide-react';
import { createPost } from "@/lib/firebse/createPost/createPost";

interface AddPostFormProps {
  userId: string;
}

const AddPostForm: React.FC<AddPostFormProps> = ({ userId }) => {
  const [text, setText] = useState<string>("");
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text && !mediaFiles.length) {
      alert("Please add text or media to create a post.");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await createPost({
        userId,
        text,
        mediaFiles
      });

      if (result.success) {
        setText("");
        setMediaFiles([]);
        setPreviewUrls([]);
        alert("Post created successfully!");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert(error instanceof Error ? error.message : "Failed to create post");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      
      // Validate file sizes (e.g., 5MB limit)
      const MAX_SIZE = 5 * 1024 * 1024; // 5MB
      const validFiles = newFiles.filter(file => file.size <= MAX_SIZE);
      
      if (validFiles.length !== newFiles.length) {
        alert("Some files were too large and were not added. Maximum size is 5MB.");
      }

      // Create preview URLs for valid files
      const urls = await Promise.all(
        validFiles.map(file => URL.createObjectURL(file))
      );

      setMediaFiles(prev => [...prev, ...validFiles]);
      setPreviewUrls(prev => [...prev, ...urls]);
    }
  };

  const removeFile = (index: number) => {
    setMediaFiles(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => {
      // Revoke the URL to prevent memory leaks
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex items-center px-4 py-3 border-b">
        <button className="mr-4">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold">New post</h1>
      </div>

      <form onSubmit={handleSubmit} className="p-4 flex flex-col h-[calc(100vh-60px)]">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full h-48 p-4 bg-gray-100 rounded-lg resize-none text-base focus:outline-none focus:ring-0 border-0"
        />

        {/* Media Preview Section */}
        {previewUrls.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-2">
            {previewUrls.map((url, index) => (
              <div key={url} className="relative">
                {mediaFiles[index]?.type.startsWith('image/') ? (
                  <img
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                ) : (
                  <video
                    src={url}
                    className="w-full h-32 object-cover rounded-lg"
                    controls
                  />
                )}
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full text-xs"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col gap-4 mt-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <div className="w-8 h-8 flex items-center justify-center">
              <Image className="w-6 h-6 text-green-500" />
            </div>
            <span className="text-base">Photos</span>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <div className="w-8 h-8 flex items-center justify-center">
              <Video className="w-6 h-6 text-red-500" />
            </div>
            <span className="text-base">Video</span>
            <input
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <div className="w-8 h-8 flex items-center justify-center">
              <Camera className="w-6 h-6 text-blue-500" />
            </div>
            <span className="text-base">Camera</span>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        <button
          type="submit"
          className="mt-auto w-full py-3 bg-black text-white rounded-full font-medium text-base disabled:bg-gray-400"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "CREATE"}
        </button>
      </form>
    </div>
  );
};

export default AddPostForm;