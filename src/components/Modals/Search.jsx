'use client';
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchProducts } from "@/hooks/useAuth";
import Image from "next/image";
import { closeModal } from "@/store/slices/modal";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/slices/Caart";
import { openModal } from "@/store/slices/modal";
import { getCookie } from "cookies-next";

const Search = () => {
    const [input, setInput] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const dispatch = useDispatch();

    const { data: products, isLoading } = useSearchProducts(searchTerm);

    const handleSearch = () => {
        setSearchTerm(input);
        if (input.trim() !== "") {
            setShowDropdown(true);
        }
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowDropdown(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const matchedProducts = !isLoading && products?.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getImageUrl = (path) => {
        if (!path) return "/imgs/products/no-image-available.jpg";
        if (path.startsWith("http")) return path;
       if (path.startsWith("/")) return path;
        return `https://clinics.soulnbody.net/pharmacy/storage/app/public/${path}`;
    };

    const handleAddToCart = (product) => {
        const token = getCookie('tokenUser');
        if (!token) {
            dispatch(openModal("login"));
            return;
        }

        const itemToAdd = {
            id: product.id,
            name: product.name,
            price: product.price_after_discount,
            image: getImageUrl(product.image),
            quantity: 1,
        };

        dispatch(addToCart(itemToAdd));
        dispatch(openModal("cart"));
    };

    return (
        <>
            <div className="fixed inset-0 min-h-[900px] bg-black/40 z-50 flex justify-center items-start">
                <div
                    ref={dropdownRef}
                    className="bg-white w-[96%] max-w-4xl rounded-xl p-6 shadow-lg"
                    dir="rtl"
                >

                    <div className="grid grid-cols-1 md:flex gap-4 mb-6">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="ابحث عن منتج"
                            className="flex-grow px-4 py-2 border-2 border-[#EE446E] rounded-md"
                        />
                        <button
                            onClick={handleSearch}
                            className="bg-[#EE446E] text-white px-6 py-2 rounded-md hover:bg-[#d93961]"
                        >
                            بحث
                        </button>
                        <button
                            onClick={() => dispatch(closeModal())}
                            className="text-[#EE446E] font-bold px-4"
                        >
                            إغلاق
                        </button>
                    </div>

                    <div
                        className="flex gap-4 overflow-x-auto whitespace-nowrap"
                        style={{ direction: "ltr" }}
                    >
                        {isLoading ? (
                            <p className="text-center w-full">جارٍ البحث...</p>
                        ) : matchedProducts?.length > 0 ? (
                            matchedProducts.map((product) => {
                                const imageUrl = getImageUrl(product.image);
                                return (
                                    <div
                                        key={product.id}
                                        className="min-w-[250px] max-w-[250px] bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200 flex-shrink-0 flex flex-col"
                                    >
                                        <Link
                                            href={`/our-products/${product.id}`}
                                            onClick={() => dispatch(closeModal())}
                                            className="relative h-[200px] w-full block"
                                        >
                                            <Image
                                                src={imageUrl}
                                                alt={product.name || "product"}
                                                fill
                                                className="object-contain rounded-t-lg"
                                                loading="lazy"
                                                sizes="100vw"
                                            />
                                        </Link>

                                        <div className="p-3 flex flex-col gap-2 flex-grow">
                                            <h3 className="text-[14px] font-semibold text-[#3D3D3D] line-clamp-1">
                                                {product.name}
                                            </h3>
                                            <p className="text-[13px] text-[#3D3D3D] line-clamp-2">
                                                {product.description}
                                            </p>
                                            <div className="mt-auto">
                                                <p className="text-[13px] text-[#EE446E] mb-2">
                                                    {product.price_after_discount} د.أ
                                                </p>
                                                <div className="flex justify-end">
                                                    <button
                                                        onClick={() => handleAddToCart(product)}
                                                        className="cursor-pointer flex rounded-xl w-full px-2 py-1.5 bg-[#EE446E] text-white hover:bg-[#d93961] transition-colors"
                                                    >
                                                        اضف الى عربة التسوق
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <p className="text-center w-full">لم يتم العثور على منتج بهذا الاسم</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Search;
