"use client"

import { ArrowLeft, Pencil } from 'lucide-react'
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function EditProfilePage() {
  const router = useRouter()
  
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    // Add your save logic here
    router.push('/profile')
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="relative">
        {/* Cover Image */}
        <div className="relative h-48 w-full">
          <Image
            src="/placeholder.svg?height=300&width=800"
            alt="Cover"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute right-4 top-4">
            <Button
              size="icon"
              variant="secondary"
              className="h-7 w-7 rounded-full bg-[#F4F4F4] opacity-60"
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
          <div className="absolute left-4 top-6 flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="text-white"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-xl font-extrabold text-white">Edit Profile</h1>
          </div>
        </div>

        {/* Profile Image */}
        <div className="absolute -bottom-14 left-4">
          <div className="relative">
            <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-white">
              <Image
                src="/placeholder.svg?height=112&width=112"
                alt="Profile"
                width={112}
                height={112}
                className="h-full w-full object-cover"
              />
            </div>
            <Button
              size="icon"
              variant="secondary"
              className="absolute -right-2 -top-2 h-8 w-8 rounded-full bg-[#F4F4F4] opacity-60"
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <form onSubmit={handleSave} className="mt-20 px-4">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm">Name</label>
            <Input
              defaultValue="Sakshi Agarwal"
              className="border-0 border-b border-black/50 rounded-none px-0 h-10"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm">Bio</label>
            <Textarea
              defaultValue="Just someone who loves designing, sketching, and finding beauty in the little things 💕"
              className="border-0 border-b border-black/50 rounded-none px-0 min-h-[68px] resize-none"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="fixed bottom-8 left-4 right-4">
          <Button
            type="submit"
            className="w-full rounded-full bg-black text-white h-12 font-bold hover:bg-black/90"
          >
            SAVE
          </Button>
        </div>
      </form>
    </div>
  )
}

