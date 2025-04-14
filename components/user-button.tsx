"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/auth";
import { UserIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const UserButton = () => {
  const auth = useAuth();
  const router = useRouter();

  if (!auth?.currentUser) {
    return (
      <Button variant="pink" asChild>
        <Link href="/sign-in">
          <UserIcon /> Вход
        </Link>
      </Button>
    );
  }

  const firstInitial = auth?.currentUser?.email?.charAt(0).toUpperCase() ?? "";

  return (
    <div className="flex gap-2 items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center">
            <Button
              variant="ghost"
              className="relative w-8 h-8 rounded-full ml-2 flex items-center justify-center bg-gray-200 text-blue-950 cursor-pointer"
            >
              {firstInitial}
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-small">
            <div className="flex flex-col space-y-1">
              <div className="text-sm font-medium leading-none">
                {auth?.currentUser?.displayName}
              </div>
              <div className="text-sm text-muted-foreground leading-none">
                {auth?.currentUser?.email}
              </div>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuItem>
            <Link href="/profile" className="w-full">
              Профил
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="p-0 mb-1"
            onClick={async () => {
              await auth?.logout();
              router.replace("/");
            }}
          >
            <Button
              className="w-full py-4 px-2 h-4 justify-start"
              variant="ghost"
            >
              Изход
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserButton;
