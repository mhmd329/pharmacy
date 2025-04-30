import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/slices/Caart";
import { openModal } from "@/store/slices/modal";
import { getCookie } from 'cookies-next'; // لازم تضيف الاستيراد فوق

const Product = ({
  id,
  discount,
  title,
  desc,
  oldPrice,
  newPrice,
  cardImgPath,
}) => {
  const dispatch = useDispatch();

  const getImageUrl = (path) => {
    if (!path) return "/imgs/products/no-image-available.jpg";
    if (path.startsWith("http")) return path;
    if (path.startsWith("/")) return path;
    return `http://clinics.soulnbody.net/pharmacy/storage/app/public/${path}`;
  };

  const imageUrl = getImageUrl(cardImgPath);

  const handleAddToCart = () => {
    const token = getCookie('tokenUser');
    if (!token) {
      // إذا مفيش توكن، نفتح مودال تسجيل الدخول
      dispatch(openModal("login"));
      return;
    }

    const itemToAdd = {
      id: id,
      name: title,
      price: newPrice,
      image: imageUrl,
      quantity: 1,
    };

    // إضافة المنتج للسلة
    dispatch(addToCart(itemToAdd));

    // فتح مودال السلة بعد إضافة المنتج
    dispatch(openModal("cart"));
  };

  return (
    <div className="product-card w-full h-full flex flex-col bg-white rounded-lg shadow-sm">
      <Link href={`/our-products/${id}`} className="flex flex-col h-full">
        <div className="img-wrapper relative flex justify-center w-full h-[220px] sm:h-[180px] md:h-[220px]">
          <Image
            src={imageUrl}
            alt={title || "product"}
            fill
            className="object-contain rounded-t-lg"
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>
        <div dir="rtl" className="product-info flex flex-col gap-2 p-4 flex-1">
          <p className="text-[12px] text-[#EE446E]">{discount}</p>
          <h3 className="text-[12px] text-[#3D3D3D] line-clamp-1">{title}</h3>
          <p className="text-[14px] text-[#3D3D3D] line-clamp-2">{desc}</p>
          <div className="mt-auto">
            <p className="text-[12px] text-[#3D3D3D] line-through">{oldPrice}</p>
            <p className="text-[17px] text-[#EE446E] mb-2">{newPrice} د.أ</p>
          </div>
        </div>
      </Link>
      <div className="flex justify-end">
        <button
          onClick={handleAddToCart}  // استخدام الدالة هنا
          className="cursor-pointer flex rounded-xl w-40 px-2 py-1.5 bg-[#EE446E] text-white hover:bg-[#d93961] transition-colors"
        >
          اضف الى عربة التسوق
        </button>
      </div>
    </div>
  );
};

export default Product;
