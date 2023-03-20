import { motion } from "framer-motion";

type Props = {
  directionLeft?: boolean;
};

const Skill = ({ directionLeft }: Props) => {
  return (
    <div className="group relative flex cursor-pointer">
      <motion.img
        initial={{
          x: directionLeft ? -200 : 200,
          opacity: 0,
        }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, x: 0 }}
        src="data:image/png;base64,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"
        className="rounded-full border border-gray-500 object-cover filter group-hover:grayscale transition duration-300 ease-in-out"
      />

      <div className="absolute opacity-0 group-hover:opacity-80 transition duration-300
      ease-in-out group-hover:bg-white">
        <div className="flex items-center justify-center h-full">
          <p>100%</p>
        </div>
      </div>
    </div>
  );
};

export default Skill;
