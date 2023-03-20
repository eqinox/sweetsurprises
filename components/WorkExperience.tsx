
import { motion } from "framer-motion";
import ExperienceCard from "./ExperienceCard";

const WorkExperience = () => {
  return (
    <motion.div
    initial={{opacity: 0}}
    whileInView={{opacity: 1}}
    transition={{duration: 1.5}}
      className="h-screen flex relative flex-col space-y-8 items-center justify-evenly  md:flex-row max-w-full px-10 overflow-hidden"
    >
      <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl">Experience</h3>

      <div className="w-full flex space-x-5 overflow-x-scroll p-10 snap-x snap-mandatory scrollbar scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]/80 ">
        <ExperienceCard />
        <ExperienceCard />
        <ExperienceCard />
        <ExperienceCard />
      </div>
    </motion.div>
  );
};

export default WorkExperience;
