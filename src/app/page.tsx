"use client";

import LoginButton from "@/components/LoginButton";
import AuthContextProvider from "@/lib/context/authContext/auth";
import Image from "next/image";

export default function Home() {
  const Data = [
    { id: 1, imagePath: "/img/1.png" , alt:"pngs" },
    { id: 2, imagePath: "/img/2.png" , alt:"pngs" },
    { id: 3, imagePath: "/img/3.png" , alt:"pngs" },
    { id: 4, imagePath: "/img/4.png" , alt:"pngs" },
    { id: 5, imagePath: "/img/5.png" , alt:"pngs" },
    { id: 6, imagePath: "/img/6.png" , alt:"pngs" },
    { id: 7, imagePath: "/img/7.png" , alt:"pngs" },
  ];

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-white">
      {/* Photo Grid */}
      <div className="absolute left-0 right-0 top-0 grid grid-cols-3 gap-2 p-4">
        {Data.map((item) => (
          <div
            key={item.id}
            className="relative aspect-[125/207] w-full overflow-hidden"
          >
            <Image
              src={item.imagePath}
              alt={`Gallery image ${item.id}`}
            
             width={500}
             height={320}
             priority
            />
          </div>
        ))}
      </div>

      {/* Login Card */}
      <div className="absolute bottom-0 left-0 right-0 rounded-t-[63px] bg-white px-8 pb-16 pt-12">
        <div className="mx-auto max-w-sm space-y-8">
          {/* Logo and Title */}
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center gap-2">
              <Image
                src="/img/logo.svg"
                alt="Vibesnap Logo"
                width={46}
                height={34}
                className="h-[34px] w-[46px]"
              />
              <h1 className="font-karla text-2xl font-semibold">Vibesnap</h1>
            </div>
            <p className="font-kumbh-sans text-center text-base">
              Moments That Matter, Shared Forever.
            </p>
            <AuthContextProvider>
            <LoginButton />
          </AuthContextProvider>
          </div>

          {/* Auth Section */}
      
        </div>
      </div>
    </main>
  );
}
