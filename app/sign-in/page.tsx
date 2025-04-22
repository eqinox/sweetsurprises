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
    <div className="flex items-center justify-center w-full h-[calc(100vh-64px)] pt-16">
      <Card className="bg-pink-200/80 w-92">
        <CardHeader className="space-y-4">
          <Link href="/" className="flex justify-center">
            <Image
              src="/logo.png"
              width={200}
              height={100}
              alt={`${APP_NAME} logo`}
              priority
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
  );
};

export default SignInPage;
