'use client';
import Link from "next/link";

const Category = ({ title, qty, id, cardImg = "categories/make-up.jpg" }) => {
  const getImageUrl = (path) => {
    if (!path) return "/imgs/products/no-image-available.jpg";
    if (path.startsWith("http")) return path;
    if (path.startsWith("/")) return path;
    return `https://clinics.soulnbody.net/pharmacy/storage/app/public/${path}`;
  };

  const imageUrl = getImageUrl(cardImg);

  return (
    <Link href={`/our-products?category=${id}`} className="w-full h-full">
      <div className="flex flex-col h-full bg-white rounded-xl shadow-sm overflow-hidden">
        <div
          className="relative w-full h-[220px] bg-cover bg-center rounded-t-xl"
          style={{ backgroundImage: `url('${imageUrl}')` }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30 rounded-t-xl" />

          {/* Centered Text */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center p-4">
            <h3 className="text-[18px] font-bold text-white drop-shadow-md">
              {title}
            </h3>
            <p className="text-[16px] text-white drop-shadow-md">
              {qty} منتجات
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Category;
