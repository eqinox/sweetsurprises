import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

type Props = {};

const About = ({}: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="flex flex-col relative h-screen text-center md:text-left md:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center"
    >
      
      <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl">
        About
      </h3>
      <motion.img
        initial={{
          x: -200,
        }}
        transition={{
          duration: 1.2,
        }}
        whileInView={{ x: 0 }}
        viewport={{ once: true }}
        src="https://files.worldwildlife.org/wwfcmsprod/images/Tiger_Spring2020/magazine_small/2mzdy6l5az_tiger_spring2020.jpg"
        alt="My Image"
        className="-mb-20 md:mb-0 flex-shrink-0 w-56 h-56 rounded-full object-cover md:rounded-lg md:w-64 md:h-95 xl:w-[500px] xl:h-[600px]"
      />
      <div className="space-y-10 px-0 md:px-10">
        <h4 className="text-4xl font-semibold">
          Here is a{" "}
          <span className="underline decoration-[#F7A88A]/50">little</span>{" "}
          background
        </h4>
        <p className="text-sm">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
      </div>
    </motion.div>
  );
};

export default About;
