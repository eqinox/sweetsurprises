"use client";
import { useState } from "react";
import { LocateIcon, CheckCircleIcon } from "lucide-react";
import Map from "./map";

const ContactsPage = () => {
  const [copied, setCopied] = useState(false);
  const address = "София - Овча Купел, Любляна 21а";

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);

    // Hide notification after 2 seconds
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-full">
      {/* Background Section with Fixed Background */}
      <div className="w-full h-screen bg-[url('/vhod.jpg')] bg-cover bg-center bg-fixed">
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative hidden z-10 md:flex items-center justify-center min-h-screen flex-col">
          <div className="text-white text-4xl flex flex-col items-center gap-4">
            <div className="after:w-full after:left-0 relative px-2 after:absolute after:-bottom-1 after:h-0.5 after:bg-pink-300">
              Контакти
            </div>

            {/* Address Section with Copy Functionality */}
            <div className="items-center flex flex-col mb-4 relative">
              <LocateIcon />
              <div className="text-xl cursor-pointer" onClick={handleCopy}>
                {address}
              </div>

              {/* Copy Notification */}
              {copied && (
                <div className="relative bg-pink-300 text-white text-sm px-2 py-1 rounded-md flex items-center gap-1">
                  <CheckCircleIcon size={16} />
                  Копирано!
                </div>
              )}
            </div>
          </div>

          <Map />
        </div>

        <div className="md:hidden flex pt-24 justify-center flex-col">
          <div className="text-white text-4xl flex flex-col items-center gap-4">
            <div className="after:w-full after:left-0 relative px-2 after:absolute after:-bottom-1 after:h-0.5 after:bg-pink-300">
              Контакти
            </div>

            {/* Address Section with Copy Functionality */}
            <div className="items-center flex flex-col mb-4 relative">
              <LocateIcon />
              <div className="text-xl cursor-pointer" onClick={handleCopy}>
                {address}
              </div>

              {/* Copy Notification */}
              {copied && (
                <div className="relative bg-pink-300 text-white text-sm px-2 py-1 rounded-md flex items-center gap-1 ">
                  <CheckCircleIcon size={16} />
                  Копирано!
                </div>
              )}
            </div>
          </div>
          <Map />
        </div>
      </div>
    </div>
  );
};

export default ContactsPage;
