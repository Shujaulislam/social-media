"use client"

import { ArrowLeft, Plus } from 'lucide-react'
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { PostCard } from '@/components/post-card' // this is temporary replace this with actual dynamic post file wherever you are going to create it.


const posts = [
  {
    title: "Design meet",
    likes: 67,
    imageUrl: "/placeholder.svg?height=400&width=300",
  },
  {
    title: "Working on a B2B...",
    likes: 40,
    imageUrl: "/placeholder.svg?height=400&width=300",
  },
  {
    title: "Parachute ❤️",
    likes: 65,
    imageUrl: "/placeholder.svg?height=400&width=300",
  },
]

export default function ProfilePage() {
  const name = "Sakshi Agarwal"
  const bio = "Just someone who loves designing, sketching, and finding beauty in the little things 💕"
  const profileImage = "/placeholder.svg?height=112&width=112"
  const coverImage = "/placeholder.svg?height=300&width=800"

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Profile Header */}
      <div className="relative">
        {/* Cover Image */}
        <div className="relative h-48 w-full overflow-hidden sm:h-64">
          <Image
            src={coverImage}
            alt="Cover"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-6 text-white"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </div>

        {/* Profile Image */}
        <div className="absolute -bottom-14 left-4 h-28 w-28 overflow-hidden rounded-full border-4 border-white">
          <Image
            src={profileImage}
            alt={name}
            fill
            className="object-cover"
            sizes="112px"
          />
        </div>

        {/* Edit Profile Button */}
        <div className="absolute -bottom-8 right-4">
          <Button
            variant="outline"
            className="rounded-full border-black/30 px-6 text-xs font-bold"
          >
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Profile Info */}
      <div className="mt-16 px-4">
        <h1 className="mb-2 text-2xl font-extrabold">{name}</h1>
        <p className="text-sm text-gray-800">{bio}</p>
      </div>

      {/* Posts Section */}
      <div className="mt-8 px-4">
        <h2 className="mb-4 text-lg font-semibold">My Posts</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {posts.map((post, index) => (
            <PostCard
              key={post.title}
              {...post}
              index={index}
              total={posts.length}
            />
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <Button
        size="icon"
        className="fixed bottom-6 right-6 h-12 w-12 rounded-full bg-black shadow-lg hover:bg-black/90"
      >
        <Plus className="h-5 w-5 text-white" />
      </Button>
    </div>
  )
}

