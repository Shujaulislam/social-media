"use client"

import { ArrowLeft } from 'lucide-react'
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { PostCard } from '@/components/post-card'
import Link from 'next/link'
import { useAuth } from '@/lib/context/authContext/auth'
import { useEffect, useState } from 'react'
import { Post, getUserPosts, getUserDetails } from '@/lib/firebse/posts'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

export default function ProfilePage() {
  const { user } = useAuth()
  const name = user?.displayName
 
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const bio = "Just someone who loves designing, sketching, and finding beauty in the little things 💕"
  const coverImage = "/placeholder.svg?height=300&width=800"

  useEffect(() => {
    async function fetchUserPosts() {
      if (!user?.uid) return

      try {
        setLoading(true)
        setError(null)
        const userPosts = await getUserPosts(user.uid)
        setPosts(userPosts)
      } catch (err) {
        console.error('Error fetching user posts:', err)
        setError('Failed to load your posts. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchUserPosts()
  }, [user?.uid])

  if (!user) {
    return (
      <div className="flex min-h-[80vh] flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Please log in to view your profile</h1>
        <Link href="/" className="mt-4 text-blue-500 hover:underline">
          Go to Home
        </Link>
      </div>
    )
  }

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
          <Link href="/feed">
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-6 text-white hover:bg-black/20"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>
        </div>

        {/* Profile Image */}
        <div className="absolute -bottom-14 left-4 h-28 w-28 overflow-hidden rounded-full border-4 border-white bg-white">
          {user?.photoURL ? (
            <Image
              src={user.photoURL}
              alt="Profile"
              width={112}
              height={112}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-gray-200" />
          )}
        </div>

        {/* Edit Profile Button */}
        <div className="absolute -bottom-8 right-4">
          <Link href="/profile/edit_profile">
            <Button
              variant="outline"
              className="rounded-full border-black/30 px-6 text-xs font-bold hover:bg-gray-100"
            >
              Edit Profile
            </Button>
          </Link>
        </div>
      </div>

      {/* Profile Info */}
      <div className="mt-16 px-4">
        <h1 className="mb-2 text-2xl font-extrabold">{user.displayName}</h1>
        <p className="text-sm text-gray-800">{bio}</p>
      </div>

      {/* Error State */}
      {error && (
        <div className="mx-4 mt-8">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      )}

      {/* Posts Section */}
      <div className="mt-8 px-4">
        <h2 className="mb-4 text-lg font-semibold">My Posts</h2>
        
        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="space-y-3">
                <Skeleton className="aspect-square rounded-xl" />
                <Skeleton className="h-4 w-[80%]" />
                <Skeleton className="h-4 w-[60%]" />
              </div>
            ))}
          </div>
        )}

        {/* Posts Grid */}
        {!loading && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {posts.map((post, index) => (
              <PostCard
                key={post.id}
                post={post}
                index={index}
                total={posts.length}
              />
            ))}
            {posts.length === 0 && !error && (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-500">No posts yet. Start sharing your moments!</p>
                <Link href="/create-post">
                  <Button className="mt-4" variant="outline">
                    Create Your First Post
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
