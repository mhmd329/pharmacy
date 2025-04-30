'use client'
import { useState } from "react";
import Image from "next/image";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import Link from "next/link";
import { useOffers, useDeleteOffer } from "@/hooks/useAuth";
import EditOffer from './EditOffer';
import OfferDetails from './OfferDetails';
import { toast } from 'react-hot-toast';

const OffersTable = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewingProduct, setViewingProduct] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({
    name: "",
    description: "",
    image: "",
    category_id: "",
    discount_id: "",
    price_before_discount: "",
    price_after_discount: "",
    image_gallery: [],
  });

  const { data: offers, isLoading, isError } = useOffers();
  const { mutate: deleteOffer, isLoading: isDeleting } = useDeleteOffer();

  const handleDelete = (offerId) => {
    if (window.confirm("هل أنت متأكد من أنك تريد حذف هذا العرض؟")) {
      deleteOffer(offerId, {
        onSuccess: () => toast.success("تم حذف العرض بنجاح!"),
        onError: () => toast.error("حدث خطأ أثناء حذف العرض!"),
      });
    }
  };

  const getValidImageUrl = (url) => {
    if (!url) {
      return "/imgs/admin/best-selling-product.png";
    }
    return `https://clinics.soulnbody.net/pharmacy/storage/app/public/${url}`;
  };

  const handleEdit = (offer) => {
    setEditingProduct(offer);
    setUpdatedProduct({
      ...offer,
      price_after_discount: offer.price_after_discount || "",
      size: offer.size || "",
      name: offer.name || "",
      description: offer.description || "",
      image: offer.image || "",
      category_id: offer.category_id || "",
      discount_id: offer.discount_id || "",
      price_before_discount: offer.price_before_discount || "",
      image_gallery: offer.image_gallery || [],
    });
  };

  if (isLoading) return <div>جاري تحميل المنتجات...</div>;
  if (isError) return <div>حدث خطأ أثناء تحميل البيانات. حاول لاحقًا.</div>;

  const filteredOffers = offers?.data?.filter((offer) =>
    offer.name?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

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
          <Link href="/PharmaAdmin/product-management/add-advertisement">
            <button className="btn border border-[#EE446E] text-[#EE446E] px-4 py-2 rounded-lg flex items-center gap-2">
              <GoPlus size={20} />
              إضافة عرض
            </button>
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto max-w-full border border-[#D1D1D1] rounded-2xl mt-8">
        <table className="min-w-[800px] w-full border-collapse rounded-lg overflow-hidden">
          <thead>
            <tr className="text-gray-600 border-b border-[#D1D1D1]">
              <th className="p-3 text-right">المنتج</th>
              <th className="p-3 text-right">الخصم</th>
              <th className="p-3 text-right">تاريخ</th>
              <th className="p-3 text-right">رقم المنتج</th>
              <th className="p-3 text-right">الحالة</th>
              <th className="p-3 text-right">خيارات</th>
            </tr>
          </thead>
          <tbody>
            {filteredOffers.length > 0 ? (
              filteredOffers.map((offer) => (
                <tr key={offer.id} className="border-b border-[#DFE1E3]">
                  <td className="p-3 flex items-center gap-3">
                    <Image
                      src={getValidImageUrl(offer.image)}
                      alt={offer.name}
                      width={41}
                      height={28}
                      className="rounded-lg"
                    />
                    <div>
                      <p className="text-[#323130] text-sm">{offer.name}</p>
                    </div>
                  </td>
                  <td className="p-3 text-[#323130]">'%'{offer.discount || "غير محدد"}</td>
                  <td className="p-3 text-[#323130]">
                    {offer.created_at && (
                      <p className="line-through text-sm text-gray-400">
                        {offer.updated_at}
                      </p>
                    )}
                    <p>{offer.updated_at}</p>
                  </td>
                  <td className="p-3">{offer.product_id ?? "غير متوفر"}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-md ${
                        offer.qty > 0
                          ? "bg-[#B2FFB4] text-[#04910C]"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {offer.qty > 0 ? "متوفر" : "غير متوفر"}
                    </span>
                  </td>
                  <td className="p-3 flex gap-3">
                    <button
                      className="text-gray-500"
                      onClick={() => handleEdit(offer)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-gray-500"
                      onClick={() => setViewingProduct(offer)}
                    >
                      <FaEye />
                    </button>
                    <button
                      className="text-gray-500"
                      onClick={() => handleDelete(offer.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  لا توجد نتائج مطابقة.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal للتعديل */}
      {editingProduct && (
        <EditOffer
          product={editingProduct}
          updatedProduct={updatedProduct}
          setUpdatedProduct={setUpdatedProduct}
          onClose={() => setEditingProduct(null)}
        />
      )}

      {/* Modal لعرض المنتج */}
      {viewingProduct && (
        <OfferDetails
          product={viewingProduct}
          setViewingProduct={setViewingProduct}
        />
      )}
    </>
  );
};

export default OffersTable;
