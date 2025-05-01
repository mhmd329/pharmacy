'use client'
import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const ProductGallery = ({ mainImage, galleryImages = [] }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div>
      {/* الصورة الرئيسية الثابتة */}
      <div className="relative w-full h-[400px] mb-4">
        <Image
          src={mainImage}
          alt="Main product"
          fill
          className="object-contain rounded-lg"
          priority
        />
      </div>
      <div className="text-center mb-4">
        <h2 className="text-[#EE446E]">صور تفصيلية</h2>

      </div>
      {/* سلايدر الصور الفرعية */}
      {galleryImages.length > 0 && (
        <div className="relative">
          {/* أزرار التنقل المخصصة */}
          <button className="products-swiper-button-next absolute top-1/2 left-5 sm:-left-10 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-md hover:bg-gray-100 transition-all duration-300">
            <LuChevronLeft className="text-3xl text-[#EE446E]" />
          </button>
          <button className="products-swiper-button-prev absolute top-1/2 right-5 sm:-right-10 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-md hover:bg-gray-100 transition-all duration-300">
            <LuChevronRight className="text-3xl text-[#EE446E]" />
          </button>

          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            navigation={{
              nextEl: ".products-swiper-button-next",
              prevEl: ".products-swiper-button-prev",
            }}
            slidesPerView={1}
            modules={[Navigation, Thumbs]}
            className="thumbs-swiper"
          >
            {galleryImages.map((image, index) => (
              <SwiperSlide key={index} className="swiper-slide">
                <div className="relative w-full h-[100px] cursor-pointer">
                  <Image
                    src={image}
                    alt={`Product thumbnail ${index + 1}`}
                    fill
                    loading="lazy"
                    className="object-contain rounded-lg"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
