"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import { useState, useMemo } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import Image from "next/image";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const ProductSlider = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const images = useMemo(() => [
    "/imgs/products/cream.png",
    "/imgs/products/cream.png",
    "/imgs/products/cream.png",
    "/imgs/products/cream.png",
    "/imgs/products/cream.png",
  ], []);

  return (
    <div dir="ltr" className="w-full flex flex-col items-center">
      <Swiper
        spaceBetween={10}
        navigation={{
          prevEl: ".prev-btn",
          nextEl: ".next-btn",
        }}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Navigation, Thumbs]}
        className="w-full max-w-md"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <Image
              src={src}
              alt={`Product ${index + 1}`}
              width={500}
              height={500}
              className="object-contain w-full h-auto"
              loading="lazy"  // Enabling lazy load for images
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex justify-between w-full max-w-md mt-2">
        <button className="prev-btn p-2 hover:bg-gray-200 rounded-full transition-colors duration-200">
          <IoIosArrowBack size={24} />
        </button>
        <button className="next-btn p-2 hover:bg-gray-200 rounded-full transition-colors duration-200">
          <IoIosArrowForward size={24} />
        </button>
      </div>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        watchSlidesProgress
        modules={[Thumbs]}
        className="w-full max-w-md mt-2"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index} className="cursor-pointer hover:opacity-80 transition-opacity duration-200">
            <Image
              src={src}
              alt={`Thumbnail ${index + 1}`}
              width={100}
              height={100}
              className="object-contain"
              loading="lazy"  // Lazy load for thumbnails
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSlider;
