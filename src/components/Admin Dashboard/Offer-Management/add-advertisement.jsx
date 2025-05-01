"use client";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useCreateOffer } from "@/hooks/useAuth";
import Link from "next/link";

const AddAdvertisement = () => {
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    product_id: "",
    discount: "",
  });
  const [successMessage, setSuccessMessage] = useState(""); // رسالة النجاح
  const [errorMessage, setErrorMessage] = useState(""); // رسالة الخطأ

  const { mutateAsync } = useCreateOffer();

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setImageFile(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/png": [], "image/jpeg": [] },
    maxFiles: 1,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    // تحقق من أن جميع الحقول مملوءة
    return formData.name && formData.description && formData.product_id && formData.discount && imageFile;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setErrorMessage("يرجى ملء جميع الحقول!");
      return;
    }

    const form = new FormData();
    form.append("name", formData.name);
    form.append("description", formData.description);
    form.append("product_id", formData.product_id);
    form.append("discount", formData.discount);
    form.append("image", imageFile);

    try {
      await mutateAsync(form);

      setSuccessMessage("تم رفع العرض بنجاح!");
      setErrorMessage(""); // إعادة تعيين رسالة الخطأ إذا كانت هناك
    } catch (error) {
      console.error("Error submitting ad:", error.message || error);
      setSuccessMessage("");
      setErrorMessage("حدث خطأ أثناء رفع العرض: " + (error.message || "غير معروف"));
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6 border border-gray-200 rounded-xl bg-white shadow-lg max-w-5xl mx-auto w-full">
    {/* Header */}
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
      <h2 className="text-2xl font-bold text-right w-full sm:w-auto">إضافة عرض جديد</h2>
      <Link href="/PharmaAdmin/product-management">
        <button className="bg-[#EE446E] text-white px-5 py-2 rounded-lg hover:bg-[#d13558] transition">
          الرجوع إلى المنتجات
        </button>
      </Link>
    </div>
  
    {/* صورة العرض */}
    <div
      {...getRootProps()}
      className={`flex flex-col items-center justify-center h-48 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 ease-in-out ${
        isDragActive ? "border-red-500 bg-red-100" : "border-gray-300 bg-gray-50"
      }`}
    >
      <input {...getInputProps()} />
      {imageFile ? (
        <img
          src={URL.createObjectURL(imageFile)}
          alt="Uploaded"
          className="h-full max-h-40 object-contain"
        />
      ) : (
        <>
          <span className="text-4xl">📷</span>
          <p className="text-sm mt-2">ارفع صورة العرض هنا</p>
        </>
      )}
    </div>
  
    {/* الحقول */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {[
        { label: "اسم العرض", name: "name", type: "text" },
        { label: "الوصف", name: "description", type: "text" },
        { label: "المنتج (Product ID)", name: "product_id", type: "text" },
        { label: "الخصم (%)", name: "discount", type: "number" },
      ].map(({ label, name, type }) => (
        <div key={name} className="flex flex-col">
          <label className="text-right mb-1 font-medium">{label}</label>
          <input
            type={type}
            name={name}
            value={formData[name]}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE446E] text-right"
            required
          />
        </div>
      ))}
    </div>
  
    {/* الرسائل */}
    {(successMessage || errorMessage) && (
      <div
        className={`text-center py-3 px-4 rounded-lg ${
          successMessage
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-600"
        }`}
      >
        {successMessage || errorMessage}
      </div>
    )}
  
    {/* زر الإرسال */}
    <div className="flex justify-end">
      <button
        onClick={handleSubmit}
        className="mt-4 bg-[#EE446E] text-white px-8 py-3 rounded-lg hover:bg-[#d13558] transition"
      >
        رفع العرض
      </button>
    </div>
  </div>
  
  );
};

export default AddAdvertisement
