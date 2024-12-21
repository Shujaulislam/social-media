"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/context/authContext/auth";
import LoginButton from "@/components/LoginButton";
import { FeedPosts } from "@/components/FeedPosts";
import AddPostButton from "@/components/AddPostButton";
import { useRouter } from "next/navigation";
import { getAllPosts, Post } from "@/lib/firebse/posts";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function Feed() {

  // const {check} = getAllPosts()
  // const name = check.email
  // console.log(name)
  const { user, handleLogout } = useAuth();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        setError(null);
        const fetchedPosts = await getAllPosts();
        setPosts(fetchedPosts);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    if (user) {
      fetchPosts();
    }
  }, [user]);

  const handleAddPost = () => {
    router.push("/create-post");
  };

  if (!user) {
    return (
      <div className="flex min-h-[80vh] flex-col items-center justify-center text-center">
        <h2 className="mb-4 text-2xl font-bold">Welcome to Your Social Feed</h2>
        <p className="mb-8 text-lg text-gray-600">Please log in to access your personalized feed.</p>
        <LoginButton />
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt="Profile"
              className="h-12 w-12 rounded-full object-cover"
            />
          ) : (
            <div className="h-12 w-12 rounded-full bg-gray-200" />
          )}
          <div>
            <h2 className="text-lg font-semibold">Welcome Back</h2>
            <p className="text-sm text-gray-600">{user.displayName || "User"}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
        >
          Logout
        </button>
      </div>

      {/* Error State */}
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Loading State */}
      {loading && (
        <div className="space-y-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="rounded-2xl bg-white p-4">
              <div className="flex items-center gap-4 mb-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <Skeleton className="h-[300px] w-full rounded-xl" />
            </div>
          ))}
        </div>
      )}

      {/* Posts */}
      {!loading && (
        <div className="space-y-6">
          {posts.map((post) => (
            <FeedPosts key={post.id} post={post} />
          ))}
          {posts.length === 0 && !error && (
            <div className="text-center py-10">
              <p className="text-gray-600">No posts yet. Be the first to share something!</p>
            </div>
          )}
        </div>
      )}

      {/* Add Post Button */}
      <div className="fixed bottom-6 right-6">
        <AddPostButton onClick={handleAddPost} />
      </div>
    </section>
  );
}