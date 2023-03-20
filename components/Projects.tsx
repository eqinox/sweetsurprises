import { motion } from "framer-motion";

const Projects = () => {
  const projects = [1, 2, 3, 4, 5];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="h-screen relative flex overflow-hidden flex-col text-left md:flex-row max-w-full
  justify-evenly mx-auto items-center z-0"
    >
      <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl">
        Projects
      </h3>

      <div className="relative w-full flex overflow-x-scroll overflow-y-hidden snap-x snap-mandatory z-20  scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]/80">
        {projects.map((item, i) => (
          <div key={i} className="w-screen flex-shrink-0 snap-center flex flex-col space-y-5 items-center justify-center p-20 md:p-44 h-screen">
            <motion.img
              initial={{ y: -300, opacity: 0 }}
              transition={{ duration: 1.2 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              src="https://cdn.shopify.com/s/files/1/2467/9369/products/MG_7467_small.jpg?v=1582032689"
              alt="flower image"
              className="w-64 h-64"
            />
            <div>
              <h4 className="text-4xl font-semibold text-center">
                <span className="underline decoration-[#F7AB0A]/50">
                  case study {i + 1} of {projects.length}:
                </span>
                UPS clone
              </h4>
              <p className="text-lg text-center md:text-left">
                Netflix 2.0 app that has a log In and Log Out Authentication
                with Google. It has a beaautiful Home Screen with all the movies
                looking just like Netflix. There is also a subscriotion page
                where you see your active monthly subscription. We also use
                Stripe Payments for the monthly netflix Subscriptions!
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full absolute top-[30%] bg-[#F7AB0A]/10 left-0 h-[500px] -skew-y-12"></div>
    </motion.div>
  );
};

export default Projects;
