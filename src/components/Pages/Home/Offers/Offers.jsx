'use client';

import Image from "next/image";
import Link from "next/link";
import { useOffers } from "@/hooks/useAuth";

const Offers = () => {
  const { data, isLoading, isError } = useOffers();

  if (isLoading) {
    return <p>جاري التحميل...</p>;
  }

  if (isError) {
    return <p>حدث خطأ أثناء تحميل العروض</p>;
  }

  const offer = data?.data?.[data.data.length - 1];

  if (!offer) {
    return <p>لا توجد عروض متاحة حالياً</p>;
  }
 const mainImage = offer?.image
  ? `https://clinics.soulnbody.net/pharmacy/storage/app/public/${offer.image}`
  : "/imgs/products/no-image-available.jpg";

// const galleryImages =
//   productDetails?.gallery_images?.map(
//     (img) =>
//       `https://clinics.soulnbody.net/pharmacy/storage/app/public/${img}`
//   ) || [];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-center">
      <div className="image-wrapper md:order-none order-2">
        <div className="relative w-full h-[300px] md:h-[500px]">
          <Image
            src={mainImage}
            alt={offer.name || "Offer"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain"
          />
        </div>
      </div>

      <div dir="rtl" className="md:order-none order-1 offer bg-[url(/imgs/offers-bg.jpg)] flex flex-col gap-2 lg:py-20 lg:ps-20 lg:pe-36 py-12 ps-10 pe-10">
        <p className="lg:text-[40px] text-[30px] text-[#382527] font-bold">عرض اليوم</p>
        <h3 className="xl:text-[100px] lg:text-[65px] text-[60px] text-[#1C070A] font-bold leading-tight">
          خصم {offer.discount}%
        </h3>
        <p className="lg:text-[30px] md:text-[20px] text-[18px] text-[#382527] font-light">
          {offer.description}
        </p>
        <Link href={`/our-products/${offer.product_id}`}>
          <button className="md:self-center self-start rounded-xl px-10 py-3 md:mt-9 bg-[#EE446E] text-white">
            أحصل على العرض
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Offers;
