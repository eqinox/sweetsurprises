import Header from "../components/Header";
import Head from "next/head";
import Hero from "@/components/Hero";
import About from "@/components/About";
import WorkExperience from "@/components/WorkExperience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import ContactMe from "@/components/ContactMe";
import Link from "next/link";
import Image from "next/image";
import Slider from "../components/Slider";
import img from "../public/solarium.jpg";
import Map from "@/components/Map";

export default function Home() {
  return (
    <div
      className="bg-gradientCustom text-yellow h-screen snap-y snap-mandatory overflow-y-scroll 
    overflow-x-hidden z-0 scrollbar scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]/80 "
    >
      <Head>
        <title>Sweet Surprises</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </Head>

      <Header />
      {/* Slider */}
      <section id="slider" className="snap-center">
        <Slider />
      </section>

      {/* Hero */}
      {/* <section id="hero" className="snap-center">
        <Hero />
      </section> */}

      {/* About */}
      {/* <section id="about" className="snap-center">
        <About />
      </section> */}

      {/* Experience */}
      {/* <section id="experience" className="snap-center">
        <WorkExperience />
      </section> */}

      {/* Skills */}
      {/* <section id="skills" className="snap-start">
        <Skills />
      </section> */}

      {/* Projects */}
      {/* <section id="projects" className="snap-start">
        <Projects />
      </section> */}

      {/* Contact Me */}
      <section id="contacts" className="snap-start">
        <ContactMe />
      </section>

      <section id="map" className="snap-start">
        <Map />
      </section>

      {/* <Link href="#hero">
        <footer className="sticky bottom-5 w-full cursor-pointer">
          <div className="flex items-center justify-center ">
            <Image
              src={img}
              alt="neshto"
              width={40}
              height={40}
              className="rounded-full filter grayscale hover:grayscale-0 cursor-pointer"
            />
          </div>
        </footer>
      </Link> */}
    </div>
  );
}
