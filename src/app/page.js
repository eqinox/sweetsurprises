"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import axiosInstance from "@/utils/axios-instance";
import { imageUrlBase } from "@/utils/helper";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import './swiper.css';

export default function Home() {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axiosInstance.get(`/api/sliders/1?populate=*`);
        setImages(response.data.data.attributes.images.data);

      } catch (err) {
        // Handle any errors that occur during the fetch
        setError(() => err);
      } finally {
        // Set loading to false once the fetch is complete
        setLoading(false);
      }
    }
    fetchImages();
  }, [])


  if (loading) {
    // Render loading state
    return <div>Loading...</div>;
  }

  if (error) {
    // Render error state
    return <div>Error: {error.message}</div>;
  }

  return (<div>
    <h1 style={{ textAlign: 'center' }}>Сладки Изненади</h1>
    <Swiper
      modules={[Navigation, Scrollbar, A11y, Autoplay]} // Add Autoplay module here
      spaceBetween={50}
      slidesPerView={3}
      autoplay={{
        delay: 3000, // Delay between slides in milliseconds (3000ms = 3s)
        disableOnInteraction: false, // Continue autoplay even after user interaction
        pauseOnMouseEnter: true, // Pause autoplay on hover
      }}
      centeredSlides={true}
      navigation
      scrollbar={{ draggable: true }}
      breakpoints={{
        // When the screen is less than 1200px
        0: {
          slidesPerView: 1, // Show only one slide
          centeredSlides: true,
        },
        // When the screen is greater than 1200px
        1200: {
          slidesPerView: 3, // Show three slides
          centeredSlides: true,
        }
      }}
      className="mySwiper"
    >
      {images.map((image, index) => (
        <SwiperSlide key={index} className="custom-slide">
          <div className="image-container" >
            <Image
              src={imageUrlBase + image.attributes.url}
              fill={true}
              style={{ objectFit: 'contain' }}
              alt="Displayed Image"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </SwiperSlide>
      ))}
      <div className="swiper-pagination"></div>
    </Swiper>

  </div>
  );
}
