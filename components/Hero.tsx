import React from "react";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import BackgroundCircles from "./BackgroundCircles";
import Image from "next/image";
import img from "../public/solarium.jpg";
import Link from "next/link";

type Props = {};

const Hero = ({}: Props) => {
  const [text, count] = useTypewriter({
    words: [
      "Добре дошли в Sweet Surprises",
      "Най-якото соларно студио",
      "Заповядайте в SweetSurprises",
    ],
    loop: true,
    delaySpeed: 2000,
  });
  return (
    <div
      className="h-screen flex flex-col space-y-8 overflow-hidden text-center 
    justify-center items-center text-yellow-500"
    >
      {/* <BackgroundCircles /> */}

      <Image
        className="relative rounded-full h-128 w-128"
        src={img}
        alt="My Image"
      />

      <div className="z-20">
        <h2 className="text-sm uppercase text-gray-500 pb-2 tracking-[15px]">
          Соларно Студио
        </h2>
        <h1 className="text-5xl lg:text-6xl font-semibold px-10">
          <span>{text}</span>
          <Cursor cursorColor="#F7ABBA" />
        </h1>

        <div className="pt-5">
          <Link href="#about">
            <button className="heroButton">За Нас</button>
          </Link>

          <Link href="#projects">
            <button className="heroButton">Снимки</button>
          </Link>
        </div>
      </div>
      
    </div>
  );
};

export default Hero;
