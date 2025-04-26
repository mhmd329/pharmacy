import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const ProductGallery = ({ mainImage, galleryImages = [] }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div>
      <div className="main-image-slider mb-4">
        <Swiper
          spaceBetween={10}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[Navigation, Thumbs]}
          className="main-swiper"
        >
          <SwiperSlide className="swiper-slide">
            <div className="relative w-full h-[400px]">
              <Image
                src={mainImage}
                alt="Main product"
                fill
                className="object-contain rounded-lg"
                priority
              />
            </div>
          </SwiperSlide>
          {galleryImages.map((image, index) => (
            <SwiperSlide key={index} className="swiper-slide">
              <div className="relative w-full h-[400px]">
                <Image
                  src={image}
                  alt={`Product view ${index + 1}`}
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {galleryImages.length > 0 && (
        <div className="thumbs-slider relative">
          <div className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md cursor-pointer">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 19.92L8.47997 13.4C7.70997 12.63 7.70997 11.37 8.47997 10.6L15 4.08002"
                stroke="#141B34"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            watchSlidesProgress={true}
            modules={[Navigation, Thumbs]}
            className="thumbs-swiper"
          >
            <SwiperSlide className="swiper-slide">
              <div className="relative w-full h-[100px] cursor-pointer">
                <Image
                  src={mainImage}
                  alt="Main product thumbnail"
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
            </SwiperSlide>
            {galleryImages.map((image, index) => (
              <SwiperSlide key={index} className="swiper-slide">
                <div className="relative w-full h-[100px] cursor-pointer">
                  <Image
                    src={image}
                    alt={`Product thumbnail ${index + 1}`}
                    fill
                    className="object-contain rounded-lg"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md cursor-pointer">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M8.91003 19.92L15.43 13.4C16.2 12.63 16.2 11.37 15.43 10.6L8.91003 4.08002"
                stroke="#141B34"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
