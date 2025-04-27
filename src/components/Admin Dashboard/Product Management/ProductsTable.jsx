"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import Link from "next/link";

const ProductsTable = () => {
  const [activeTab, setActiveTab] = useState("عناية بالبشرة");
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const tabs = ["عناية بالبشرة", "عناية بالشعر", "عطور", "علاجية"];

  const categoryMap = {
    "عناية بالبشرة": 18,
    "عناية بالشعر": 20,
    "عطور": 12,
    "علاجية": 21,
  };

  useEffect(() => {
    fetch('https://clinics.soulnbody.net/pharmacy/public/api/all_products', {
      headers: {
        Authorization: 'Bearer 38|xCWVlQogvWa6RPolf2Bz1szXa1K1i6MXCQIAfsQf6e9e66f6',
      },
    })
      .then(res => res.json())
      .then(data => {
        setProducts(data);
      })
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.category_id === categoryMap[activeTab] &&
      product.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getValidImageUrl = (url) => {
    if (!url) {
      return "/imgs/admin/best-selling-product.png";
    }
    return `https://clinics.soulnbody.net/pharmacy/storage/app/public/${url}`;
  };

  return (
    <>
      {/* Header */}
      <div className="header flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div className="relative w-full md:w-auto">
          <input
            type="text"
            placeholder="بحث في جميع الأعمدة"
            className="w-full md:w-64 px-4 py-2 border border-[#DFE1E3] rounded-lg pl-10 text-gray-700 outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <div className="btns-wrapper flex items-center gap-3 mt-4 md:mt-0">
          <Link href="/admin/product-management/add-new-product">
            <button className="btn bg-[#EE446E] text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <GoPlus size={20} />
              إضافة منتج
            </button>
          </Link>
          <Link href="/admin/product-management/add-advertisement">
            <button className="btn border border-[#EE446E] text-[#EE446E] px-4 py-2 rounded-lg flex items-center gap-2">
              <GoPlus size={20} />
              إضافة عرض
            </button>
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-col mt-8">
        <div className="border border-[#D1D1D1] rounded-2xl p-2 flex flex-wrap items-center">
          {tabs.map((name, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(name)}
              className={`w-full sm:w-auto font-bold ${activeTab === name
                ? "bg-[#FFE7ED] text-[#EE446E]"
                : "bg-white text-[#737373]"
                } px-4 py-2 rounded-lg mr-2 mb-2 sm:mb-0`}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto max-w-full border border-[#D1D1D1] rounded-2xl mt-8">
        <table className="min-w-[800px] w-full border-collapse rounded-lg overflow-hidden">
          <thead>
            <tr className="text-gray-600 border-b border-[#D1D1D1]">
              <th className="p-3 text-right">المنتج</th>
              <th className="p-3 text-right">الحجم</th>
              <th className="p-3 text-right">السعر</th>
              <th className="p-3 text-right">الكمية</th>
              <th className="p-3 text-right">الحالة</th>
              <th className="p-3 text-right">خيارات</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <tr key={product.id} className="border-b border-[#DFE1E3]">
                  <td className="p-3 flex items-center gap-3">
                    <Image
                      src={getValidImageUrl(product.image)}
                      alt={product.name}
                      width={41}
                      height={28}
                      className="rounded-lg"
                    />
                    <div>
                      <p className="text-[#323130] text-sm">{product.name}</p>
                    </div>
                  </td>
                  <td className="p-3 text-[#323130]">{product.size || "غير محدد"}</td>
                  <td className="p-3 text-[#323130]">
                    <p>{product.price_after_discount} EGP</p>
                  </td>
                  <td className="p-3">{product.qty ?? "غير متوفر"}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-md ${product.qty > 0
                        ? "bg-[#B2FFB4] text-[#04910C]"
                        : "bg-red-100 text-red-600"
                        }`}
                    >
                      {product.qty > 0 ? "متوفر" : "غير متوفر"}
                    </span>
                  </td>
                  <td className="p-3 flex gap-3">
                    <button className="text-gray-500">
                      <FaEdit />
                    </button>
                    <button className="text-gray-500">
                      <FaTrash />
                    </button>
                    <button className="text-gray-500">
                      <FaEye />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  لا يوجد منتجات في هذا التصنيف.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductsTable;
