"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import AuthContextProvider from "@/lib/context/authContext/auth"
import LoginButton from "@/components/LoginButton"

const images = [
  {
    src: "/white-dress.png",
    alt: "Woman in white dress",
    className: "col-span-1 row-span-2",
  },
  {
    src: "/beach-waves.png",
    alt: "Beach waves",
    className: "col-span-1 row-span-1",
  },
  {
    src: "/woman-with-daisies.png",
    alt: "Woman with daisies",
    className: "col-span-1 row-span-2",
  },
  {
    src: "/purple-flower.png",
    alt: "Purple flowers",
    className: "col-span-1 row-span-2",
  },
  {
    src: "/cosmos-flowers.png",
    alt: "Cosmos flowers",
    className: "col-span-1 row-span-3",
  },
  {
    src: "/white-tulips.png",
    alt: "White tulips",
    className: "col-span-1 row-span-1",
  },
  {
    src: "/hand-with-flower.png",
    alt: "Hand with flower",
    className: "col-span-1 row-span-1",
  },
  {
    src: "/woman-with-orange.png",
    alt: "Woman with orange",
    className: "col-span-1 row-span-2",
  },
  {
    src: "/strawberries.png",
    alt: "Strawberries",
    className: "col-span-1 row-span-1",
  },
]

export default function HomePage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white">
      {/* Bento Grid */}
      <div className="grid grid-cols-3 gap-1 auto-rows-[200px]">
        {images.map((image, i) => (
          <div
            key={i}
            className={`relative overflow-hidden ${image.className}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 33vw, 25vw"
            />
          </div>
        ))}
      </div>

      {/* Login Card */}
      <div className="absolute bottom-0 left-0 right-0 rounded-t-[63px] bg-white px-8 pb-12 pt-8">
        <div className="mx-auto max-w-sm space-y-6">
          {/* Logo Section */}
          <div className="text-center">
            <div className="mb-2 flex items-center justify-center gap-2">
              <div className="relative h-[34px] w-[46px]">
                <Image
                  src="/logo.svg"
                  alt="Vibesnap Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <h1 className="text-2xl font-semibold">Vibesnap</h1>
            </div>
            <p className="text-base text-gray-800">
              Moments That Matter, Shared Forever.
            </p>
          </div>

          {/* Login Buttons */}
          <div className="flex  justify-center">
              <LoginButton />
{/* 
            <Link href="/auth" className="w-full">
              <Button
                variant="outline"
                className="h-[50px] w-full rounded-full border-2 hover:bg-gray-100"
              >
                Visit Auth Page
              </Button>
            </Link> */}

            {/* <div className="w-full">
              <AuthContextProvider>
                <LoginButton />
              </AuthContextProvider>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

