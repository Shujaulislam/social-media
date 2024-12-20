"use client";

import Link from "next/link";
import { useAuth } from "@/lib/context/authContext/auth";

// import Login from "@/components/auth/Login";
import LoginButton from "@/components/LoginButton";
import { FeedPosts } from "@/components/FeedPosts";
import AddPostButton from "@/components/AddPostButton";
import { useRouter } from "next/navigation";

const SAMPLE_POSTS = [
  {
    id: '1',
    author: {
      name: 'Aarav',
      avatar: '/placeholder.svg',
      username: 'aarav',
    },
    content: 'Just arrived in New York City! Excited to explore the sights, sounds, and energy of this amazing place. 🗽',
    timestamp: '2 hours ago',
    media: [
      {
        type: 'image' as const,
        url: '/placeholder.svg',
        alt: 'Statue of Liberty with Empire State Building',
      },
      {
        type: 'image' as const,
        url: '/placeholder.svg',
        alt: 'New York City street view',
      },
    ],
    likes: 67,
    hashtags: ['NYC', 'Travel'],
  },
  {
    id: '2',
    author: {
      name: 'Sarah',
      avatar: '/placeholder.svg',
      username: 'sarah',
    },
    content: 'Beautiful sunset at the beach today! 🌅 Nature never fails to amaze me.',
    timestamp: '4 hours ago',
    media: [
      {
        type: 'image' as const,
        url: '/placeholder.svg',
        alt: 'Beach sunset',
      },
    ],
    likes: 42,
    hashtags: ['Nature', 'Sunset', 'BeachVibes'],
  },
]

export default function Feed() {
  
  const { user, handleLogout } = useAuth();
  const router  = useRouter()
  const handleAddPost = () => {
    router.push("/create-post"); // Redirect to create post
  };
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
          <div className="min-h-screen p-4 space-y-6">
          {SAMPLE_POSTS.map((post) => (
        <FeedPosts key={post.id} post={post} />
      ))}
          </div>
        
          
        </div>

      ) : (
        <div className="text-center">
          <p className="text-lg font-medium">Please log in to access your feed.</p>
          <LoginButton/>
        </div>
      )}
      <AddPostButton  onClick={handleAddPost}/>
    </section>
  );
}