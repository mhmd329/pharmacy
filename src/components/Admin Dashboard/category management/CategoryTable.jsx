'use client'
import { useState } from "react";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { useCategories, useCreateCategory,useDeleteCategory } from "@/hooks/useAuth";
import { toast } from "react-hot-toast";
import 'react-toastify/dist/ReactToastify.css';

const CategoryTable = () => {
  const { data: categories, isLoading: isLoadingCategories } = useCategories();
  const createCategory = useCreateCategory();
  const { mutate: deleteOffer, isLoading: isDeleting } = useDeleteCategory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryImageFile, setCategoryImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCategoryImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSaveCategory = async () => {
    if (!categoryName || !categoryImageFile) {
      toast.error("من فضلك أدخل الاسم واختر صورة.");
      return;
    }

    const formData = new FormData();
    formData.append("name", categoryName);
    formData.append("image", categoryImageFile);

    try {
      await createCategory.mutateAsync(formData);
      toast.success("تمت إضافة الفئة بنجاح");
      handleCloseModal();
    } catch (error) {
      toast.error("حدث خطأ أثناء إضافة الفئة: " + (error?.message || "غير معروف"));
      console.error("فشل في إنشاء الفئة:", error);
    }
  };

  const handleDelete = (categoryId) => {
    if (window.confirm("هل أنت متأكد من أنك تريد حذف هذا الفئة؟")) {
      deleteOffer(categoryId, {
        onSuccess: () => toast.success("تم حذف الفئة بنجاح!"),
        onError: () => toast.error("حدث خطأ أثناء حذف الفئة!"),
      });
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCategoryName("");
    setCategoryImageFile(null);
    setPreviewImage(null);
  };

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
        <div className="btns-wrapper flex items-center gap-3 mt-4 md:mt-0">
          <button
            className="btn bg-[#EE446E] text-white px-4 py-2 rounded-lg flex items-center gap-2"
            onClick={handleOpenModal}
          >
            <GoPlus size={20} />
            إضافة فئة
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto max-w-full border border-[#D1D1D1] rounded-2xl mt-8">
        <table className="min-w-full w-full border-collapse rounded-lg overflow-hidden">
          <thead>
            <tr className="text-gray-600 border-b border-[#D1D1D1]">
              <th className="p-3 text-right">الصورة</th>
              <th className="p-3 text-right">الاسم</th>
              <th className="p-3 text-right">عدد المنتجات</th>
              <th className="p-3 text-right">خيارات</th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((category) => (
              <tr key={category.id} className="border-b border-[#DFE1E3]">
                <td className="p-3 text-[#323130]">
                  <Image
                    src={getValidImageUrl(category.image)}
                    alt={category.name}
                    width={50}
                    height={50}
                    loading="lazy"
                    className="rounded-lg"
                  />
                </td>
                <td className="p-3 text-[#323130]">{category.name}</td>
                <td className="p-3 text-[#323130]">{category.products_count}</td>
                <td className="p-3 flex justify-start gap-3">
                  <button
                    className="text-red-500"
                    onClick={() => handleDelete(category.id)}
                  >
                    <FaTrash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-lg font-bold mb-4">إضافة فئة جديدة</h2>

            <div className="mb-4">
              <label htmlFor="category-name" className="block text-sm mb-2">اسم الفئة</label>
              <input
                id="category-name"
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="w-full p-2 border border-[#D1D1D1] rounded-md"
                placeholder="اسم الفئة"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="category-image" className="block text-sm mb-2">صورة الفئة</label>
              <input
                id="category-image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-2 border border-[#D1D1D1] rounded-md"
              />
              {previewImage && (
                <div className="mt-4">
                  <Image
                    src={previewImage}
                    alt="صورة الفئة"
                    width={100}
                    height={100}
                    className="rounded-lg"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-4">
              <button onClick={handleCloseModal} className="btn bg-gray-300 text-black px-4 py-2 rounded-lg">إغلاق</button>
              <button onClick={handleSaveCategory} className="btn bg-[#EE446E] text-white px-4 py-2 rounded-lg">حفظ</button>
            </div>
          </div>
        </div>
      )}
      
    </>
  );
};

export default CategoryTable;
