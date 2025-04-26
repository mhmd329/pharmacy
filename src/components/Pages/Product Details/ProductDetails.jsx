"use client";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/slices/cart";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Products from "../Home/Products/Products";
import ProductGallery from "./ProductGallery";
import { openModal } from "@/store/slices/modal";
import { useSelector } from "react-redux";  // استيراد useSelector للتحقق من التوكن
import { getCookie } from "cookies-next";
const ProductDetails = ({ product }) => {
  const dispatch = useDispatch();

  const [isAboutProductOpen, setIsAboutProductOpen] = useState(true);
  const [isProductIngrediendtsOpen, setIsProductIngrediendtsOpen] = useState(false);
  const [iHowToUseProductOpen, setIHowToUseProductOpen] = useState(false);

  const productDetails = product?.product;
  const mainImage = productDetails?.image
    ? `https://clinics.soulnbody.net/pharmacy/storage/app/public/${productDetails.image}`
    : "/imgs/products/no-image-available.jpg";

  const galleryImages =
    productDetails?.gallery_images?.map(
      (img) =>
        `https://clinics.soulnbody.net/pharmacy/storage/app/public/${img}`
    ) || [];

  const token = getCookie('token'); // تحقق من التوكن

  const handleAddToCart = () => {
    if (!token) {
      // إذا مفيش توكن، نفتح مودال تسجيل الدخول
      dispatch(openModal("login"));
      return;
    }

    const itemToAdd = {
      id: productDetails.id,
      name: productDetails.name,
      price: productDetails.price_after_discount,
      image: mainImage,
      quantity: 1,
    };
    dispatch(addToCart(itemToAdd));

    // فتح مودال السلة بعد إضافة المنتج
    dispatch(openModal("cart"));
  };

  return (
    <div className="min-h-screen pt-40">
      <div dir="rtl" className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="product-content flex flex-col gap-3 order-2 md:order-1">
            <div className="header flex justify-between text-[22px] font-medium text-[#383838]">
              <h2>{productDetails?.name || "product name"}</h2>
              <h3>
                {productDetails?.price_after_discount
                  ? `$${productDetails.price_after_discount}`
                  : "السعر غير متوفر"}
              </h3>
            </div>
            <p className="text-[#697586]">
              {productDetails?.description || "لا يوجد وصف للمنتج"}
            </p>
            <p className="text-[#697586] text-[14px]">
              {productDetails?.size
                ? `الحجم: ${productDetails.size}`
                : "الحجم غير متوفر"}
            </p>
            <p className="text-[#697586] text-[14px]">موصى به</p>

            <button
              onClick={handleAddToCart}  // استخدام الدالة هنا
              className="cursor-pointer w-64 rounded-xl px-2.5 py-3 bg-[#EE446E] text-white hover:bg-[#d93961] transition-colors"
            >
              اضف الى عربة التسوق
            </button>

            {/* about product */}
            <div
              className={`w-full flex flex-col gap-3 ${!isAboutProductOpen && "pb-3 border-b-1 border-[#dfe1e3]"
                }`}
            >
              <p
                className={`flex items-center justify-between cursor-pointer ${isAboutProductOpen && "bg-[#B0A6BD1A]"
                  } py-2.5 ps-5 pe-1`}
                onClick={() => setIsAboutProductOpen(!isAboutProductOpen)}
              >
                ما هو {productDetails?.name}
                {isAboutProductOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </p>
              {isAboutProductOpen && (
                <div className="text-[#697586] flex flex-col gap-3 pt-3">
                  <p>
                    {productDetails?.description || "لا يوجد وصف مفصل للمنتج"}
                  </p>
                  {productDetails?.main_ingredients && (
                    <>
                      <p className="text-[#000]">🌿 المكونات الأساسية:</p>
                      <p>{productDetails.main_ingredients}</p>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* product ingredients */}
            <div
              className={`w-full flex flex-col gap-3 ${!isProductIngrediendtsOpen &&
                " pb-3 border-b-1 border-[#dfe1e3]"
                }`}
            >
              <p
                className={`flex items-center justify-between cursor-pointer ${isProductIngrediendtsOpen && "bg-[#B0A6BD1A]"
                  } py-2.5 ps-5 pe-1`}
                onClick={() =>
                  setIsProductIngrediendtsOpen(!isProductIngrediendtsOpen)
                }
              >
                المكونات
                {isProductIngrediendtsOpen ? (
                  <IoIosArrowUp />
                ) : (
                  <IoIosArrowDown />
                )}
              </p>
              {isProductIngrediendtsOpen && (
                <div className="text-[#697586] flex flex-col gap-3 pt-3">
                  <p>
                    {productDetails?.ingredients ||
                      "لا توجد معلومات عن المكونات"}
                  </p>
                </div>
              )}
            </div>

            {/* how to use */}
            <div
              className={`w-full flex flex-col gap-3 ${!iHowToUseProductOpen && " pb-3 border-b-1 border-[#dfe1e3]"
                }`}
            >
              <p
                className={`flex items-center justify-between cursor-pointer ${iHowToUseProductOpen && "bg-[#B0A6BD1A]"
                  } py-2.5 ps-5 pe-1`}
                onClick={() => setIHowToUseProductOpen(!iHowToUseProductOpen)}
              >
                طريقة الأستخدام
                {iHowToUseProductOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </p>
              {iHowToUseProductOpen && (
                <div className="text-[#697586] flex flex-col gap-3 pt-3">
                  <p>
                    {productDetails?.usage ||
                      "لا توجد معلومات عن طريقة الاستخدام"}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="img-slider order-1 md:order-2">
            <ProductGallery
              mainImage={mainImage}
              galleryImages={galleryImages}
            />
          </div>
        </div>
        <Products
          title="منتجات تمت مشاهدتها حديثا"
          relatedProducts={product?.related_products || []}
        />
      </div>
    </div>
  );
};

export default ProductDetails;
