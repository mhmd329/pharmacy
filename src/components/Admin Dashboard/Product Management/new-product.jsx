"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCreateProduct } from "@/hooks/useAuth";
import { useDropzone } from "react-dropzone";

const AddNewProduct = () => {
  const [images, setImages] = useState(Array(4).fill(null));
  const [isOffer, setIsOffer] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [formData, setFormData] = useState({
    productName: "",
    productCode: "",
    description: "",
    price: "",
    quantity: "",
    size: "",
    discount: "",
    category: "",
    subCategory: "",
    skinType: "",
  });

  const { mutate: createProduct, isPending, isSuccess, isError } = useCreateProduct();

  useEffect(() => {
    if (isSuccess) {
      alert("تم إضافة المنتج بنجاح");
      // Reset form after success
      setFormData({
        productName: "",
        productCode: "",
        description: "",
        price: "",
        quantity: "",
        size: "",
        discount: "",
        category: "",
        subCategory: "",
        skinType: "",
      });
      setImages(Array(4).fill(null));
    }
    if (isError) {
      alert("حدث خطأ أثناء رفع المنتج");
    }
  }, [isSuccess, isError]);

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Validate required fields
    if (!formData.productName.trim()) {
      newErrors.productName = "اسم المنتج مطلوب";
      isValid = false;
    }
    if (!formData.productCode.trim()) {
      newErrors.productCode = "كود المنتج مطلوب";
      isValid = false;
    }
    if (!formData.description.trim()) {
      newErrors.description = "وصف المنتج مطلوب";
      isValid = false;
    }
    if (!formData.price) {
      newErrors.price = "سعر المنتج مطلوب";
      isValid = false;
    }
    if (!formData.quantity) {
      newErrors.quantity = "كمية المنتج مطلوبة";
      isValid = false;
    }
    if (!formData.category) {
      newErrors.category = "القسم مطلوب";
      isValid = false;
    }
    if (!formData.subCategory) {
      newErrors.subCategory = "القسم الفرعي مطلوب";
      isValid = false;
    }
    if (!formData.skinType) {
      newErrors.skinType = "نوع البشرة مطلوب";
      isValid = false;
    }

    // Validate at least one image
    if (!images.some(img => img !== null)) {
      newErrors.images = "يجب رفع صورة واحدة على الأقل";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleBlur = (fieldName) => {
    setTouched({ ...touched, [fieldName]: true });
  };

  const productForm = [
    {
      label: "القسم",
      type: "select",
      name: "category",
      required: true,
      options: [
        { value: "", label: "اختر قسمًا" },
        { value: "18", label: "عناية بالبشرة" },
        { value: "20", label: "عناية بالشعر" },
        { value: "12", label: "عطور" },
        { value: "21", label: "علاجية" },
      ],
    },
    {
      label: "القسم الفرعي",
      type: "select",
      name: "subCategory",
      required: true,
      options: [
        { value: "", label: "اختر قسمًا فرعيًا" },
        { value: "subCategory1", label: "قسم فرعي 1" },
        { value: "subCategory2", label: "قسم فرعي 2" },
        { value: "subCategory3", label: "قسم فرعي 3" },
      ],
    },
    {
      label: "كود المنتج",
      type: "text",
      name: "productCode",
      required: true,
    },
    {
      label: "اسم المنتج",
      type: "text",
      name: "productName",
      required: true,
    },
    {
      label: "وصف المنتج",
      type: "text",
      name: "description",
      required: true,
    },
    {
      label: "مخصص لـ",
      type: "select",
      name: "skinType",
      required: true,
      options: [
        { value: "", label: "اختر نوع البشرة" },
        { value: "normal", label: "عادي" },
        { value: "dry", label: "جاف" },
        { value: "oily", label: "دهني" },
      ],
    },
    {
      label: "الحجم",
      type: "text",
      name: "size",
      required: false,
    },
    {
      label: "كمية المنتج",
      type: "number",
      name: "quantity",
      required: true,
    },
    {
      label: "سعر المنتج",
      type: "number",
      name: "price",
      required: true,
    },
    {
      label: "الخصم",
      type: "text",
      name: "discount",
      required: false,
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const form = new FormData();
    form.append("name", formData.productName);
    form.append("description", formData.description);
    form.append("product_code", formData.productCode);
    form.append("price_before_discount", formData.price);
    form.append("price_after_discount", formData.discount || formData.price);
    form.append("qty", formData.quantity);
    form.append("size", formData.size || "0");
    form.append("category_id", formData.category);
    form.append("discount_id", isOffer ? "2" : "1");
    form.append("is_offer", isOffer ? "true" : "false");

    // Add main image
    if (images[0]) {
      form.append("image", images[0].file);
    }

    // Add gallery images
    images.slice(1).forEach((img, index) => {
      if (img) {
        form.append(`gallery_images[${index}]`, img.file);
      }
    });

    createProduct(form);
  };

  const handleImageDrop = (index) => (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const newImages = [...images];
      newImages[index] = {
        file,
        data_url: URL.createObjectURL(file)
      };
      setImages(newImages);
      
      // Clear image error if any
      if (errors.images) {
        setErrors({ ...errors, images: "" });
      }
    }
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);
  };

  const ImageUploadField = ({ index, label }) => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop: handleImageDrop(index),
      accept: { "image/png": [], "image/jpeg": [] },
      maxFiles: 1,
    });

    return (
      <div className="flex flex-col items-center p-4 w-full">
        <h2 className="text-lg font-semibold mb-4 self-start">{label}</h2>
        <div
          {...getRootProps()}
          className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg p-4 cursor-pointer transition ${
            isDragActive
              ? "border-red-500 bg-red-100"
              : "border-gray-300 bg-red-50"
          }`}
        >
          <input {...getInputProps()} />
          {images[index] ? (
            <div className="relative w-full h-full">
              <img
                src={images[index].data_url}
                alt={`Uploaded ${index}`}
                className="h-full max-h-32 object-contain mx-auto"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage(index);
                }}
                className="absolute top-0 left-0 bg-red-500 text-white p-1 rounded-full text-xs"
              >
                X
              </button>
            </div>
          ) : (
            <>
              <span className="text-lg">📷</span>
              <p className="text-sm mt-2">اضغط لرفع الصورة</p>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="flex justify-end">
        <Link href="/admin/product-management">
          <button className="bg-[#EE446E] text-white px-4 py-2 rounded-lg cursor-pointer">
            الرجوع الي المنتجات
          </button>
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        noValidate
      >
        {/* معلومات المنتج */}
        <div className="bg-white p-6 mt-10 rounded-xl border border-gray-300">
          <h2 className="text-lg font-bold mb-4">معلومات المنتج</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {productForm.map((field, index) => (
              <div key={index} className="mb-4">
                <label className="block text-[#323130] mb-1">
                  {field.label}
                  {field.required && <span className="text-red-500"> *</span>}
                </label>
                {field.type === "select" ? (
                  <>
                    <select
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur(field.name)}
                      className={`w-full p-2 border ${
                        errors[field.name] ? "border-red-500" : "border-[#D1D1D1]"
                      } outline-none rounded-lg`}
                      required={field.required}
                    >
                      {field.options.map((option, idx) => (
                        <option key={idx} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {errors[field.name] && (
                      <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>
                    )}
                  </>
                ) : (
                  <>
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur(field.name)}
                      className={`w-full p-2 border ${
                        errors[field.name] ? "border-red-500" : "border-[#D1D1D1]"
                      } outline-none rounded-lg`}
                      required={field.required}
                    />
                    {errors[field.name] && (
                      <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

      {/* صور المنتج */}
<div>
  <div className="bg-white p-6 mt-10 rounded-xl border border-gray-300">
    <h2 className="text-lg font-bold mb-4">صور المنتج</h2>
    {errors.images && (
      <p className="text-red-500 text-sm mb-4">{errors.images}</p>
    )}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <ImageUploadField index={0} label="صورة رئيسية 1" />
      <ImageUploadField index={1} label="صورة إضافية 2" />
      <ImageUploadField index={2} label="صورة إضافية 3" />
      <ImageUploadField index={3} label="صورة إضافية 4" />
    </div>
  </div>

  {/* زرار رفع */}
  <div className="flex items-center gap-3 mt-5">
    <button
      type="submit"
      disabled={isPending}
      className="bg-[#ee446e] text-white px-4 py-2 rounded-lg disabled:opacity-50"
    >
      {isPending ? "جاري التحميل..." : "رفع المنتج"}
    </button>
  </div>
</div>
      </form>
    </>
  );
};

export default AddNewProduct;