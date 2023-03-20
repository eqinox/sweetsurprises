import React from "react";
import { motion } from "framer-motion";

const BackgroundCircles = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        scale: [1, 2, 2, 3, 1],
        opacity: [0.1, 0.2, 0.4, 0.8, 0.1, 1.0],
        borderRadius: ["20%","20%","50%","80%","20%"]
      }}
      transition={{
        duration: 2.5
      }}
      className="relative flex justify-center items-center"
    >
      
      <div
        className="rounded-full border border-[#F7ABBA] opacity-10 h-[800px] w-[800px] 
      absolute mt-52 animate-pulse"
      />
      
    </motion.div>
  );
};

export default BackgroundCircles;
