'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Heart, MessageCircle, Share2 } from 'lucide-react'
import { cn } from "@/lib/utils"
import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns'
import { Post } from '@/lib/firebse/posts'
import { useAuth } from '@/lib/context/authContext/auth'

export function FeedPosts({ post }: { post: Post }) {
  const {user} = useAuth()
  const [liked, setLiked] = useState(false)

  const formattedDate = post.timestamp 
    ? formatDistanceToNow(post.timestamp.toDate(), { addSuffix: true })
    : ''

  return (
    <Card className="w-full max-w-2xl mx-auto overflow-hidden rounded-xl bg-white shadow-sm">
      <CardHeader className="flex flex-row items-center gap-3 p-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src={post.author?.photoURL} />
          <AvatarFallback>{post.author?.name?.[0] || 'U'}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-semibold">{post.author?.name || 'Anonymous'}</span>
          <span className="text-sm text-muted-foreground">{formattedDate}</span>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {post.media && (
          <div className="relative">
            <img
              src={post.media}
              alt={post.message}
            
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        <div className="p-4">
          <p className="text-xl">{post.message}</p>
        </div>
      </CardContent>

      <CardFooter className="flex items-center gap-4 p-4">
        <button
          className={cn(
            "flex items-center gap-1 text-gray-500 hover:text-gray-700",
            liked && "text-red-500 hover:text-red-600"
          )}
          onClick={() => setLiked(!liked)}
        >
          <Heart className={cn("h-5 w-5", liked && "fill-current")} />
          <span className="text-xs font-medium">0</span>
        </button>
        <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
          <MessageCircle className="h-5 w-5" />
          <span className="text-xs font-medium">0</span>
        </button>
        <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
          <Share2 className="h-5 w-5" />
        </button>
      </CardFooter>
    </Card>
  )
}
