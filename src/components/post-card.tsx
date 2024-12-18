import { Heart } from 'lucide-react'
import Image from "next/image"

interface PostCardProps {
  title: string
  likes: number
  imageUrl: string
  index?: number
  total?: number
}

export function PostCard({ title, likes, imageUrl, index, total }: PostCardProps) {
  return (
    <div className="relative overflow-hidden rounded-xl">
      <div className="relative aspect-[3/4]">
        <Image
          src={imageUrl || "/placeholder.svg?height=400&width=300"}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 158px, 200px"
        />
        {index !== undefined && total !== undefined && (
          <div className="absolute right-2 top-2 z-10 rounded-full bg-white px-2 py-1">
            <span className="text-xs font-semibold">{`${index + 1}/${total}`}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
        <div className="absolute bottom-0 left-0 p-3 text-white">
          <h3 className="mb-1 font-semibold">{title}</h3>
          <div className="flex items-center gap-1 opacity-60">
            <Heart className="h-4 w-4 fill-current" />
            <span className="text-xs font-semibold">{likes}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

