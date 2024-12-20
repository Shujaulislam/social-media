'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Heart, Share } from 'lucide-react'
import { cn } from "@/lib/utils"

interface FeedPosts {
  id: string
  author: {
    name: string
    avatar: string
    username: string
  }
  content: string
  timestamp: string
  media: {
    type: 'image' | 'video'
    url: string
    alt: string
  }[]
  likes: number
  hashtags: string[]
  // profile:string[]
}

export function FeedPosts({ post }: { post: FeedPosts }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [liked, setLiked] = useState(false)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % post.media.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + post.media.length) % post.media.length)
  }

  return (
    <Card className="w-full rounded-[63px] max-w-xl mx-auto bg-gradient-to-br from-purple-50 to-pink-50">
      <CardHeader className="flex flex-row items-center gap-3 p-4">
        <Avatar className="w-12 h-12">
          <AvatarImage src={post.author.avatar} alt={post.author.name} />
          <AvatarFallback>{post.author.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-semibold">{post.author.name}</span>
          <span className="text-sm text-muted-foreground">{post.timestamp}</span>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-4">
        <p className="text-sm mb-0">{post.content}</p>
        <div className="flex flex-wrap gap-2">
          {post.hashtags.map((tag) => (
            <span key={tag} className="text-blue-500 hover:underline cursor-pointer">
              #{tag}
            </span>
          ))}
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
          {post.media.map((media, index) => (
            <div
              key={index}
              className={cn(
                "absolute w-full h-full transition-transform duration-300 ease-in-out",
                index === currentSlide ? "translate-x-0" : "translate-x-full"
              )}
            >
              {media.type === 'image' ? (
                <Image
                  src={media.url}
                  alt={media.alt}
                  fill
                  className="object-cover"
                />
              ) : (
                <video
                  src={media.url}
                  className="w-full h-full object-cover"
                  controls
                />
              )}
            </div>
          ))}
          {post.media.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full"
                onClick={prevSlide}
              >
                ←
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full"
                onClick={nextSlide}
              >
                →
              </Button>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {post.media.map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      "w-2 h-2 rounded-full",
                      index === currentSlide ? "bg-white" : "bg-white/50"
                    )}
                  />
                ))}
              </div>
            </>
          )}
        </div>
       
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2"
          onClick={() => setLiked(!liked)}
        >
          <Heart className={cn("w-5 h-5", liked && "fill-red-500 text-red-500")} />
          <span>{liked ? post.likes + 1 : post.likes}</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <Share className="w-5 h-5" />
          Share
        </Button>
      </CardFooter>
    </Card>
  )
}

