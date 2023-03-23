import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import img from "../public/solarium-4.jpg";

type Props = {};

const About = ({}: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="flex flex-col relative h-screen text-center md:text-left md:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center"
    >
      <h3 className="absolute top-24 uppercase tracking-[20px] text-yellow-500 text-2xl">
        За Нас
      </h3>
      <motion.div
        initial={{
          x: -200,
        }}
        transition={{
          duration: 1.2,
        }}
        whileInView={{ x: 0 }}
        viewport={{ once: true }}
      >
        <Image
          src={img}
          alt="за нас"
          className="-mb-20 md:mb-0 flex-shrink-0 w-56 h-56 rounded-full object-cover md:rounded-lg md:w-64 md:h-95 xl:w-[500px] xl:h-[600px]"
        />
      </motion.div>

      <div className="space-y-10 px-0 md:px-10">
        <h4 className="text-4xl font-semibold">
          Ето още {" "}
          <span className="underline decoration-[#F7A88A]/50">Малко</span>{" "}
          Инфо за нас
        </h4>
        <p className="text-sm">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
      </div>
    </motion.div>
  );
};

export default About;
