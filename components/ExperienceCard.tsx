import { motion } from "framer-motion";
import Image from "next/image";

import img from "../public/solarium.jpg";
const ExperienceCard = () => {
  return (
    <article
      className="flex flex-col rounded-lg items-center space-y-7 
    flex-shrink-0 w-[500px] md:w-[600px] xl:w-[900px] snap-center cursor-pointer transition-opacity duration-200 overflow-hidden
    bg-[#292929] p-10 hover:opacity-100 opacity-40"
    >
      <motion.div
        initial={{
          y: -100,
          opacity: 0,
        }}
        transition={{ duration: 1.2 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Image
          src={img}
          alt="image"
          className="w-32 h-32 rounded-full xl:w-[200px] object-cover 
        object-center  "
        />
      </motion.div>

      <div className="px-0 md:px-10">
        <h4 className="text-4xl font-light">Продукт</h4>
        <p className="font-bold text-2xl mt-1">Инфо</p>   
        {/* <p className="uppercase py-5 text-gray-300">
          Started work... - Ended...
        </p> */}

        {/* <ul className="list-disc space-y-4 ml-5 text-lg">
          <li>Summary points</li>
          <li>Summary points</li>
          <li>Summary points</li>
          <li>Summary points</li>
          <li>Summary points</li>
        </ul> */}
      </div>
    </article>
  );
};

export default ExperienceCard;
