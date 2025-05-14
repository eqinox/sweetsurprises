import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/navbar";
import { AuthProvider } from "@/context/auth";
import { Toaster } from "@/components/ui/sonner";
import { ServiceProvider } from "@/context/service";
import BackgroundWrapper from "./background-wrapper"; // <-- import it
import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased overflow-x-hidden">
        <ServiceProvider>
          <AuthProvider>
            <Navbar />
            <BackgroundWrapper>
              {" "}
              {/* <-- wrap your children */}
              {children}
            </BackgroundWrapper>
            <Toaster richColors />
          </AuthProvider>
        </ServiceProvider>
      </body>
    </html>
  );
}
