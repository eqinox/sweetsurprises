import { SocialIcon } from "react-social-icons";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

import {
  PhoneIcon,
  MapPinIcon,
  EnvelopeIcon,
  MapIcon,
} from "@heroicons/react/24/solid";
const Header = () => {
  const router = useRouter();

  const clickSocials = () => {
    router.push('#contacts')
  };
  return (
    <>
      <header className="sticky top-0 p-5 flex items-start justify-between max-w-7xl mx-auto z-10">
        <motion.div
          initial={{
            x: -500,
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            x: 0,
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 1.5,
          }}
          className="flex flex-row items-center"
        >
          <SocialIcon
            url="https://www.instagram.com/sweetsurprises_buketi/"
            fgColor="yellow"
            bgColor="transparent"
          />
          <SocialIcon
            url="https://www.facebook.com/profile.php?id=100063604951401"
            fgColor="yellow"
            bgColor="transparent"
          />
        </motion.div>

        <motion.div
          onClick={() => clickSocials()}
          initial={{
            x: 500,
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            x: 0,
            opacity: 1,
            scale: 1,
          }}
          transition={{ duration: 1 }}
          className="flex flex-row items-center text-gray-300 cursor-pointer"
        >
          
          <SocialIcon
            className="cursor-pointer"
            network="email"
            fgColor="yellow"
            bgColor="transparent"
          />
          <p className="uppercase hidden md:inline-flex text-sm text-yellow-400">
            Връзка с нас
          </p>
        </motion.div>
      </header>
    </>
  );
};

export default Header;
