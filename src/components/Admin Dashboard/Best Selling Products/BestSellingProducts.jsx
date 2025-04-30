'use client';

import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { useMostSold } from '@/hooks/useAuth';

const BestSellingProducts = () => {
  const { data, isLoading, isError } = useMostSold();
  const products = data?.data || [];

  return (
    <div className="bg-white p-6 rounded-xl border border-[#DFE1E3]">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-right font-semibold text-lg">المنتجات الأكثر مبيعًا</h2>
        <Link href="/PharmaAdmin/orders" className="flex items-center gap-2 text-gray-500 hover:text-black transition">
          <span>عرض الكل</span> <FiArrowLeft size={18} />
        </Link>
      </div>

      {/* الحالة أثناء التحميل */}
      {isLoading ? (
        <p className="text-center">جاري تحميل المنتجات...</p>
      ) : isError ? (
        <p className="text-center text-red-500">حدث خطأ أثناء جلب البيانات</p>
      ) : (
        <div className="overflow-x-auto max-w-full">
          <table className="min-w-[600px] w-full border-collapse rounded-lg overflow-hidden">
            <thead>
              <tr className="text-gray-600 bg-gray-100">
                <th className="p-3 text-right">المنتج</th>
                <th className="p-3 text-right">السعر</th>
                <th className="p-3 text-right">المبيعات</th>
                <th className="p-3 text-right">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const imageUrl = product.image
                  ? `http://clinics.soulnbody.net/pharmacy/storage/app/public/${product.image}`
                  : "/imgs/products/no-image-available.jpg";

                return (
                  <tr key={product.id} className="border-b border-[#DFE1E3] last:border-0">
                    <td className="p-3 flex items-center gap-3">
                      <Image
                        src={imageUrl}
                        alt={product.name}
                        width={41}
                        height={28}
                        className="rounded-lg"
                      />
                      <div>
                        <p className="text-[#323130] text-sm">{product.name}</p>
                      </div>
                    </td>
                    <td className="p-3 text-[#323130]">{product.price_after_discount} د.أ</td>
                    <td className="p-3 text-[#323130]">{product.sales_count}</td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 text-sm font-medium rounded-lg ${product.availability_status === "Available in store"
                            ? "bg-[#B2FFB4] text-[#04910C]"
                            : "bg-[#FFDCDC] text-[#FF0000]"
                          }`}
                      >
                        {product.availability_status === "Available in store"
                          ? "متوفر في المخزون"
                          : "نفذ من المخزون"}
                      </span>
                    </td>
                  </tr>
                );
              })}

            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BestSellingProducts;
