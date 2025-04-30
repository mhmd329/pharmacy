'use client';

import Image from "next/image";
import Link from "next/link";
import { useOffers } from "@/hooks/useAuth";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Offers = () => {
  const { data, isLoading, isError } = useOffers();

  if (isLoading) return <p>جاري التحميل...</p>;
  if (isError) return <p>حدث خطأ أثناء تحميل العروض</p>;

  const offers = data?.data;

  if (!offers || offers.length === 0) return <p>لا توجد عروض متاحة حالياً</p>;

  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      className="w-full"
    >
      {offers.map((offer) => {
        const mainImage = offer?.image
         ? `https://clinics.soulnbody.net/pharmacy/storage/app/public/${offer.image}`
          : "/imgs/products/no-image-available.jpg";

        return (
          <SwiperSlide key={offer.id}>
            <div className="flex flex-col md:flex-row items-center">
              {/* صورة العرض */}
              <div className="w-full md:w-1/2 p-4">
                <div className="relative w-full h-[250px] md:h-[500px]">
                  <Image
                    src={mainImage}
                    alt={offer.name || "Offer"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain"
                  />
                </div>
              </div>

              {/* تفاصيل العرض */}
              <div
                dir="rtl"
                className="w-full md:w-1/2 offer bg-[url(/imgs/offers-bg.jpg)] bg-cover flex flex-col gap-3 md:gap-6 py-8 px-5 md:py-16 md:px-20"
              >
                <p className="text-[24px] md:text-[30px] text-[#382527] font-bold">عرض اليوم</p>
                <h3 className="text-[40px] md:text-[60px] text-[#1C070A] font-bold leading-tight">
                  خصم {offer.discount}%
                </h3>
                <p className="text-[16px] md:text-[20px] text-[#382527] font-light">{offer.description}</p>
                <Link href={`/our-products/${offer.product_id}`}>
                  <button className="w-full md:w-auto self-start md:self-center rounded-xl px-6 py-3 mt-4 bg-[#EE446E] text-white text-sm md:text-base">
                    أحصل على العرض
                  </button>
                </Link>
              </div>
            </div>

          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Offers;
