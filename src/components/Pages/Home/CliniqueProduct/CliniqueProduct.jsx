import Image from "next/image";
import Link from "next/link";

const CliniqueProduct = () => {
    return (<div className="grid grid-cols-1 md:grid-cols-2 items-center bg-[#FDF4F5]">
        <div className="image-wrapper md:order-none order-2">
            <div className="relative w-full h-[300px] md:h-[500px]">
                <Image
                    src="/imgs/products/clinique-product.png"
                    alt="product"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain"
                />

            </div>
        </div>

        <div dir="rtl" className="md:order-none order-1 flex flex-col gap-2 items-center py-10">
            <h3 className="text-[48px]  text-[##3D3D3D] font-bold leading-tight">منتجات clinique</h3>
            <p className="text-[32px] text-[#D4AF37] font-light">متخصص في صحة الجلد</p>
            <Link href='/our-products?category=12' className="cursor-pointer">
                <button className="rounded-xl cursor-pointer px-10 py-3 md:mt-9 bg-[#EE446E] text-white">مشاهدة المزيد</button>

            </Link>

        </div>
    </div>);
}

export default CliniqueProduct;