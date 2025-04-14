"use client";

import { useService } from "@/context/service";

export default function Background({
  children,
}: {
  children: React.ReactNode;
}) {
  const { service } = useService();

  const serviceImages: Record<string, string> = {
    Маникюр: "/pedikur.jpg",
    Солариум: "/solarium.jpeg",
    Масаж: "/masaj.jpg",
  };

  const backgroundImage = serviceImages[service] || "/aparat.jpeg";

  return (
    <div className="relative w-full">
      <div
        className="w-full min-h-screen bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 flex items-center justify-center min-h-screen overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
