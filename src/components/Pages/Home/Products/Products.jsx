"use client";
import React, { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Product from "./Product";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import {
  useMostSoldProducts,
  useProducts,
  useRecentProducts,
} from "@/hooks/useAuth";

const Products = ({ title, relatedProducts }) => {
  const { data: products } = useProducts();
  const { data: recentProducts } = useRecentProducts();
  const { data: mostSoldProducts } = useMostSoldProducts();

  const data = useMemo(() => {
    // إذا كانت البيانات الخاصة بالمنتجات المرتبطة موجودة، سيتم استخدامها.
    if (relatedProducts) {
      return relatedProducts;
    }

    // بناءً على العنوان، سيتم تحديد نوع البيانات المطلوبة.
    switch (title) {
      case "المنتجات":
        return products ?? []; // إذا كان العنوان "المنتجات" سيتم إظهار المنتجات الافتراضية.
      case "أضيف حديثا":
        return recentProducts?.data ?? []; // إذا كان العنوان "أضيف حديثا"، سيتم إظهار المنتجات الجديدة.
      case "الأكثر مبيعا":
        return mostSoldProducts?.data ?? []; // إذا كان العنوان "الأكثر مبيعا"، سيتم إظهار المنتجات الأكثر مبيعًا.
      default:
        return []; // في حالة لم يكن العنوان أي من الخيارات السابقة، سيتم إظهار مصفوفة فارغة.
    }
  }, [title, products, recentProducts, mostSoldProducts, relatedProducts]);

  return (
    <div className="container mx-auto py-16 relative">
      <h3 className="text-center text-[40px] font-medium">{title}</h3>
      <div dir="rtl" className="flex py-5">

      </div>

      <div className="pt-8 relative">
        {data.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 text-lg">لا توجد منتجات متاحة حاليا</p>
          </div>
        ) : data.length > 3 ? (
          <div className="relative px-12">
            <Swiper
              modules={[Navigation]}
              navigation={{
                nextEl: ".products-swiper-button-next",
                prevEl: ".products-swiper-button-prev",
              }}
              spaceBetween={20}
              slidesPerView={1}
              loop={true}
              breakpoints={{
                1024: { slidesPerView: 5 },
                768: { slidesPerView: 3 },
                320: { slidesPerView: 1 },
              }}
              className="custom-swiper !h-[450px]"
            >

              {data.map((product) => (
                <SwiperSlide key={product.id} className="!h-[420px]">
                  <div className="h-full">
                    <Product
                      id={product.id}
                      cardImgPath={product?.image}
                      title={product.name || "عطر"}
                      desc={product.name_2 || product.name}
                      oldPrice={product.price_before_discount}
                      newPrice={product.price_after_discount}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <button className="products-swiper-button-prev absolute top-1/2 left-5 sm:-left-10 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-md hover:bg-gray-100 transition-all duration-300">
              <LuChevronLeft className="text-3xl text-[#EE446E]" />
            </button>
            <button className="products-swiper-button-next absolute top-1/2 right-5 sm:-right-10 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-md hover:bg-gray-100 transition-all duration-300">
              <LuChevronRight className="text-3xl text-[#EE446E]" />
            </button>

          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {data.map((product) => (
              <div key={product.id} className="h-[420px]">
                <Product
                  id={product.id}
                  cardImgPath={product?.image}
                  title={product.name || "عطر"}
                  desc={product.name_2 || product.name}
                  oldPrice={product.price_before_discount}
                  newPrice={product.price_after_discount}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
