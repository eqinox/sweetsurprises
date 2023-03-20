import React from "react";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import BackgroundCircles from "./BackgroundCircles";
import Image from "next/image";
import img from "../public/cat.jpg";
import Link from "next/link";

type Props = {};

const Hero = ({}: Props) => {
  const [text, count] = useTypewriter({
    words: [
      "Hi, The name's Vasko",
      "Lorem Ipsum is simply dummy text",
      "Lorem Ipsum has been the industry's",
    ],
    loop: true,
    delaySpeed: 2000,
  });
  return (
    <div
      className="h-screen flex flex-col space-y-8 overflow-hidden text-center 
    justify-center items-center"
    >
      <BackgroundCircles />
      <Image
        className="relative rounded-full h-32 w-32 mx-auto"
        src={img}
        alt="My Image"
      />
      <div className="z-20">
        <h2 className="text-sm uppercase text-gray-500 pb-2 tracking-[15px]">
          Software Engineer
        </h2>
        <h1 className="text-5xl lg:text-6xl font-semibold px-10">
          <span>{text}</span>
          <Cursor cursorColor="#F7ABBA" />
        </h1>

        <div className="pt-5">
          <Link href="#about">
            <button className="heroButton">About</button>
          </Link>

          <Link href="#experience">
            <button className="heroButton">Experience</button>
          </Link>

          <Link href="#skills">
            <button className="heroButton">Skills</button>
          </Link>

          <Link href="#projects">
            <button className="heroButton">Projects</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
