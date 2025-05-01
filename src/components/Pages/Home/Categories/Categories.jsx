'use client';
import React from "react";
import Category from "./Category";
import { useCategories } from "@/hooks/useAuth"
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

const Categories = () => {
  const { data: categories } = useCategories();
  const allCategories = [...(categories || [])];

  return (
    <div className="py-16 relative container mx-auto">
      <h3 className="text-center text-[40px] font-medium mb-8">الفئات</h3>

      {allCategories.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg">لا توجد فئات متاحة حاليا</p>
        </div>
      ) : (
        <div className="relative px-12">
          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: ".categories-swiper-button-next",
              prevEl: ".categories-swiper-button-prev",
            }}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            breakpoints={{
              1024: { slidesPerView: 5 },
              768: { slidesPerView: 3 },
              480: { slidesPerView: 1 },
            }}
            className="!pb-10 custom-swiper"
          >
            {allCategories.map((category, index) => (
              <SwiperSlide key={category.id}>
                <Category
                  title={category.name || `Category ${index + 1}`}
                  qty={
                    category.products_count 
                  }
                  cardImg={category.image || `categories/make-up.jpg`}
                  id={category.id}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button className="categories-swiper-button-prev absolute top-1/2 left-0 transform -translate-y-1/2 z-10 bg-white rounded-full  shadow-md hover:bg-gray-100 transition-all duration-300">
            <LuChevronLeft className="text-3xl text-[#EE446E]" />
          </button>
          <button className="categories-swiper-button-next absolute top-1/2 right-0 transform -translate-y-1/2 z-10 bg-white rounded-full  shadow-md hover:bg-gray-100 transition-all duration-300">
            <LuChevronRight className="text-3xl text-[#EE446E]" />
          </button>

        </div>
      )}
    </div>
  );
};

export default Categories;
