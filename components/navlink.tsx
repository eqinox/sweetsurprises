"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  url: string;
  label: string;
}

const Navlink: React.FC<Props> = ({ label, url }) => {
  const pathname = usePathname();
  const isActive = pathname === url;

  return (
    <Link
      className={`relative cursor-pointer px-2 after:absolute after:-bottom-1 after:h-0.5 after:bg-pink-300 after:transition-all after:duration-300 after:ease-in-out
        ${
          isActive
            ? "after:w-full after:left-0"
            : "after:w-0 after:left-1/2 hover:after:w-full hover:after:left-0"
        }`}
      href={url}
    >
      {label}
    </Link>
  );
};

export default Navlink;
