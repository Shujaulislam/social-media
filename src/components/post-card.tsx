import { Heart, MessageCircle, Share2 } from 'lucide-react'
import Image from "next/image"
import { formatDistanceToNow } from 'date-fns'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Post } from '@/lib/firebse/posts'

interface PostCardProps {
  post: Post
  index?: number
  total?: number
}

export function PostCard({ post, index, total }: PostCardProps) {
  const formattedDate = post.timestamp 
    ? formatDistanceToNow(post.timestamp.toDate(), { addSuffix: true })
    : ''

  return (
    <div className="relative overflow-hidden rounded-xl bg-white shadow-sm">
      {/* Author Section */}
      <div className="flex items-center gap-2 p-4">
        <Avatar>
          <AvatarImage src={post.author?.photoURL} />
          <AvatarFallback>{post.author?.name?.[0] || 'U'}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">{post.author?.name || 'sabir'}</p>
          <p className="text-sm text-gray-500">{formattedDate}</p>
        </div>
      </div>

      {/* Media Section */}
      <div className="relative aspect-square">
        <Image
          src={post.media || "/placeholder.svg"}
          alt={post.message}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {index !== undefined && total !== undefined && (
          <div className="absolute right-2 top-2 z-10 rounded-full bg-white/80 px-2 py-1 backdrop-blur-sm">
            <span className="text-xs font-semibold">{`${index + 1}/${total}`}</span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        <p className="mb-2 text-sm">{post.message}</p>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
            <Heart className="h-5 w-5" />
            <span className="text-xs">0</span>
          </button>
          <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
            <MessageCircle className="h-5 w-5" />
            <span className="text-xs">0</span>
          </button>
          <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
            <Share2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
