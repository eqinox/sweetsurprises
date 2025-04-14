import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { APP_NAME } from "@/lib/constants";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CredentialsSignInForm from "./credentials-signin-form";

export const metadata: Metadata = {
  title: "Вход",
};

const SignInPage = () => {
  return (
    <div className="relative w-full">
      {/* Background Section with Fixed Background */}
      <div className="w-full h-screen bg-[url('/studio4.jpeg')] bg-cover bg-center bg-fixed">
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
        <Card className="relative bg-pink-200/80 w-92 m-auto top-24">
          <CardHeader className="space-y-4">
            <Link href="/" className="flex justify-center">
              <Image
                src="/logo.png"
                width={200}
                height={100}
                alt={`${APP_NAME} logo`}
                priority={true}
              />
            </Link>
            <CardTitle className="text-center">Вход</CardTitle>
            <CardDescription className="text-center">
              Влез в своя профил
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <CredentialsSignInForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignInPage;
