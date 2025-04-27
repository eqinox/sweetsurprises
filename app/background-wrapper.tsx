"use client";

import { usePathname } from "next/navigation";

const BackgroundWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  let backgroundImage = "";

  if (pathname === "/sign-in") {
    backgroundImage = "bg-[url('/studio4.jpeg')]";
  } else if (pathname === "/sign-up") {
    backgroundImage = "bg-[url('/studio4.jpeg')]";
  } else if (pathname === "/contacts") {
    backgroundImage = "bg-[url('/vhod.jpg')]";
  }

  return (
    <div
      className={`relative w-full h-dvh bg-cover bg-center ${backgroundImage}`}
    >
      {/* Optional dark overlay */}
      <div className="absolute inset-0 bg-black/50 z-0" />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default BackgroundWrapper;
