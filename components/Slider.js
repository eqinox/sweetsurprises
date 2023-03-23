import img1 from "../public/solarium.jpg";
import img2 from "../public/solarium-2.jpg";
import img3 from "../public/solarium-3.jpg";
import img4 from "../public/solarno-studio.jpg";
import Image from "next/image";
import { RxDotFilled, RxDot } from "react-icons/rx";
import { useEffect, useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { motion, useAnimation } from "framer-motion";


const ImageSlider = ({ images, imageCounter, increment }) => {
  const controls = useAnimation();

  useEffect(() => {
    let animateImage;
    if (increment) {
      animateImage = async () => {
        controls.set({ y: 0, x: 250, opacity: 0 });
        await controls.start({
          y: 0,
          x: 0,
          opacity: 1,
          transition: { duration: 1.5 },
        });
      };
    } else {
      animateImage = async () => {
        controls.set({ y: 0, x: -250, opacity: 0 });
        await controls.start({
          y: 0,
          x: 0,
          opacity: 1,
          transition: { duration: 1.5 },
        });
      };
    }
    

    animateImage();
  }, [imageCounter, controls]);

  return (
    <motion.div
    
      animate={controls}
      
    >
      <Image
        src={images[imageCounter].url}
        alt="slider"
        className="w-full h-full rounded-3xl opacity-50"
      />
    </motion.div>
  );
};


const Slider = () => {
  const [imageCounter, setimageCounter] = useState(0);
  const [increment, setIncrement] = useState(false);
  const [hideForSec, setHideForSec] = useState(true);
  const images = [{ url: img1 }, { url: img2 }, { url: img3 }, { url: img4 }];

  useEffect(() => {
    const identifier = setTimeout(() => {
      if (imageCounter === images.length - 1) {
        setimageCounter(0);
      } else {
        setimageCounter(imageCounter + 1);
      }
    }, 8000);
    return () => {
      clearTimeout(identifier);
    };
  }, [imageCounter]);

  const slideRight = () => {
    setIncrement(true);
    if (imageCounter === images.length - 1) {
      setimageCounter(0);
    } else {
      setimageCounter(imageCounter + 1);
    }
  };

  const slideLeft = () => {
    setIncrement(false);
    if (imageCounter === 0) {
      setimageCounter(images.length - 1);
    } else {
      setimageCounter(imageCounter - 1);
    }
  };

  const gotoSlide = (index) => {
    setimageCounter(index);
  };

  return (
    <>
      <div
        className="h-[780px] flex flex-col space-y-8 overflow-hidden text-center justify-center 
      items-center max-w-[1400px] w-full m-auto px-4 relative group"
      > 

      <ImageSlider images={images} imageCounter={imageCounter} increment={increment}/> 
        
        <div className="absolute top-10 tracking-[20px] text-4xl text-yellow-500 z-30">
          Соларно Студио
        </div>
        <div className="absolute top-48 tracking-[40px] text-5xl text-yellow-500 z-30">
          Sweet Surprises
        </div>

        <div
          className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5  
        text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
          onClick={() => slideLeft()}
        >
          <BsChevronCompactLeft />
        </div>

        <div
          className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 
      text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
          onClick={() => slideRight()}
        >
          <BsChevronCompactRight />
        </div>

        <div className="absolute flex bottom-12 justify-center py-2">
          {images.map((item, index) => {
            if (index === imageCounter) {
              return (
                <div
                  onClick={() => gotoSlide(index)}
                  key={index}
                  className="text-2xl cursor-pointer"
                >
                  <RxDotFilled />
                </div>
              );
            } else {
              return (
                <div
                  onClick={() => gotoSlide(index)}
                  key={index}
                  className="text-2xl cursor-pointer"
                >
                  <RxDot />
                </div>
              );
            }
          })}
        </div>
      </div>
    </>
  );
};

export default Slider;
