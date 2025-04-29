'use client'
import Image from "next/image";
import { useCategories } from "@/hooks/useAuth";
import Link from "next/link";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from "react";

const Footer = () => {
    const { data, isLoading, isError, error } = useCategories();
    const searchParams = useSearchParams();
    const categoryFromURL = searchParams.get('category');

    const [activeCategory, setActiveCategory] = useState("");

    useEffect(() => {
        if (data && data.length > 0) {
            setActiveCategory(categoryFromURL || data[0].id);
        }
    }, [data, categoryFromURL]);

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-10 py-16" id="footer">
                <p>Loading categories...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-10 py-16" id="footer">
                <p>Error: {error.message}</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-10 py-16" id="footer">
            <div>
                <div className="md:text-[24px] text-[18px] grid grid-cols-2 font-light text-black/60">
                    {data.map((category) => (
                        <p
                            key={category.id}
                            className={`cursor-pointer hover:text-[#d93961] ${
                                activeCategory === category.id.toString()
                                   ? "text-blue-500 font-bold"
                                    : ""
                            }`}
                        >
                            <Link href={`/our-products?category=${category.id}`}>
                                {category.name}
                            </Link>
                        </p>
                    ))}
                </div>
            </div>
            <div dir="rtl" className="flex flex-col gap-6">
                <div className="flex justify-between">
                    <div className="logo-wrapper">
                        <Image src="/imgs/beauty-cosmatics-logo.png" alt="logo" width={240} height={58} />
                    </div>
                </div>
                <p className="md:text-[20px] text-[16px] font-light text-black/60">
                    في Beauty Cosmetic، نوفر لكِ أحدث مستحضرات التجميل والعناية بالبشرة بعناية فائقة. هدفنا هو تقديم منتجات عالية الجودة تمنحكِ الإشراقة والتألق الطبيعي.
                </p>
                <p className="md:text-[20px] text-[16px] font-light text-black">تواصل معانا</p>
                <div className="flex gap-6">
                    <Image src="/imgs/logo_facebook.png" alt="facebook" width={40} height={40} />
                    <Image src="/imgs/logo_twitter.png" alt="instagram" width={40} height={40} />
                    <Image src="/imgs/logo_whatsapp.png" alt="youtube" width={40} height={40} />
                </div>
            </div>
        </div>
    );
};

export default Footer;
