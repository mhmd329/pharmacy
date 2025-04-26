"use client";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useCreateOffer } from "@/hooks/useAuth";

const AddAdvertisement = () => {
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    product_id: "",
    discount: "",
  });

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
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const form = new FormData();
    form.append("name", formData.name);
    form.append("description", formData.description);
    form.append("product_id", formData.product_id);
    form.append("discount", formData.discount);
    form.append("image", imageFile);
 
    try {
      await mutateAsync({  formData: form });
      alert("تم رفع العرض بنجاح");
    } catch (error) {
      console.error("Error submitting ad:", error.message || error);
      alert("حدث خطأ أثناء رفع العرض: " + (error.message || "غير معروف"));
    }
  };
  


  return (
    <div className="flex flex-col items-center p-6 border border-gray-300 rounded-lg w-full bg-white shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-right w-full">صور العرض</h2>

      {/* حقل رفع الصورة */}
      <div
        {...getRootProps()}
        className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg p-6 cursor-pointer transition-all duration-200 ease-in-out ${isDragActive
            ? "border-red-500 bg-red-100"
            : "border-gray-300 bg-red-50"
          }`}
      >
        <input {...getInputProps()} />
        {imageFile ? (
          <img
            src={URL.createObjectURL(imageFile)}
            alt="Uploaded"
            className="h-full max-h-32 object-contain"
          />
        ) : (
          <>
            <span className="text-3xl">📷</span>
            <p className="text-sm mt-2">ارفع صورة العرض هنا</p>
          </>
        )}
      </div>

      {/* حقول الإدخال */}
      <div className="w-full flex gap-6 mt-6">
        <div className="flex flex-col">
          <label className="text-right mb-2 font-medium">اسم العرض</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE446E] text-right"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-right mb-2 font-medium">الوصف</label>
          <input
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE446E] text-right"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-right mb-2 font-medium">المنتج (Product ID)</label>
          <input
            type="text"
            name="product_id"
            value={formData.product_id}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE446E] text-right"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-right mb-2 font-medium">الخصم (%)</label>
          <input
            type="number"
            name="discount"
            value={formData.discount}
            onChange={handleInputChange}
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EE446E] text-right"
            required
          />
        </div>
      </div>
      <div className="flex ml-auto">
        <button
          onClick={handleSubmit}
          className="mt-6 bg-[#EE446E] text-white px-6 py-3 rounded-lg hover:bg-[#d13558] transition duration-200 ease-in-out"
        >
          رفع العرض
        </button>
      </div>

    </div>
  );
};

export default AddAdvertisement;
