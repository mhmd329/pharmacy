import { useState, useRef, useEffect } from "react";

import { useUpdatePro } from '@/hooks/useAuth'; // استيراد الـ hook المناسب

const ProductModal = ({ 
  product, 
  updatedProduct, 
  setUpdatedProduct, 
  onClose 
}) => {
    const [galleryFiles, setGalleryFiles] = useState([]);
    const mainImageInputRef = useRef(null);
    const galleryInputRef = useRef(null);
    const modalRef = useRef(null);
    
    // استيراد mutate من الـ hook
    const { mutate } = useUpdatePro(); 

    const handleSave = async () => {
        if (!updatedProduct.name || !updatedProduct.price_after_discount) {
            alert("يرجى ملء جميع الحقول المطلوبة");
            return;
        }
    
        try {
            // إعداد FormData
            const formData = new FormData();
            formData.append("name", updatedProduct.name);
            formData.append("description", updatedProduct.description);
            formData.append("price_before_discount", updatedProduct.price_before_discount);
            formData.append("price_after_discount", updatedProduct.price_after_discount);
    
            // إضافة الصورة الرئيسية إذا كانت موجودة
            if (updatedProduct.imageFile) {
                formData.append("image", updatedProduct.imageFile);
            } else if (updatedProduct.image) {
                formData.append("image", updatedProduct.image);
            }
    
            // إضافة الصور في المعرض إذا كانت موجودة
            updatedProduct.image_gallery.forEach((imageUrl, index) => {
                if (galleryFiles[index]) {
                    formData.append(`image_gallery[${index}]`, galleryFiles[index]);
                }
            });
    
            // إرسال الـ FormData
            await mutate({
                productId: product.id, // تأكد من أنك تستخدم الـ ID الصحيح
                formData: formData
            });
            
            setUpdatedProduct(null);
            onClose(); // اغلاق المودال بعد الحفظ
        } catch (error) {
            console.error("فشل في تحديث المنتج:", error);
        }
    };
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setUpdatedProduct({
              ...updatedProduct,
              image: reader.result, // base64
              imageFile: file // حفظ الملف نفسه أيضاً قد تحتاجه
            });
          };
          reader.readAsDataURL(file);
        }
      };
      

    const handleGalleryUpload = (e) => {
        const files = Array.from(e.target.files);
        console.log("Gallery files selected:", files); // تتبع الملفات المحددة
        if (files.length > 0) {
            const newGalleryFiles = [...galleryFiles, ...files];
            setGalleryFiles(newGalleryFiles);

            const newGalleryUrls = newGalleryFiles.map(file => URL.createObjectURL(file));
            console.log("Generated gallery URLs:", newGalleryUrls); // تتبع روابط الصور
            setUpdatedProduct({ 
                ...updatedProduct, 
                image_gallery: [...updatedProduct.image_gallery, ...newGalleryUrls] 
            });
        }
    };

    const removeGalleryImage = (index) => {
        console.log("Removing gallery image at index:", index); // تتبع الصورة المراد إزالتها
        const newGalleryFiles = galleryFiles.filter((_, i) => i !== index);
        setGalleryFiles(newGalleryFiles);
        
        const newGalleryUrls = updatedProduct.image_gallery.filter((_, i) => i !== index);
        setUpdatedProduct({ ...updatedProduct, image_gallery: newGalleryUrls });
    };

    const triggerMainImageInput = () => {
        mainImageInputRef.current.click();
    };

    const triggerGalleryInput = () => {
        galleryInputRef.current.click();
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                console.log("Click outside modal, closing...");
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div 
                ref={modalRef}
                className="bg-white p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto"
            >
                <h3 className="text-xl font-bold mb-4">تعديل المنتج</h3>
    
                <div className="space-y-4">
                    {/* اسم المنتج */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">اسم المنتج</label>
                        <input
                            type="text"
                            className="w-full p-2 mt-1 border border-[#DFE1E3] rounded-lg"
                            value={updatedProduct.name || ""}
                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                        />
                    </div>
    
                    {/* الوصف */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">الوصف</label>
                        <textarea
                            className="w-full p-2 mt-1 border border-[#DFE1E3] rounded-lg"
                            value={updatedProduct.description || ""}
                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, description: e.target.value })}
                            rows={3}
                        />
                    </div>
    
                    {/* السعر */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">السعر قبل الخصم</label>
                            <input
                                type="number"
                                className="w-full p-2 mt-1 border border-[#DFE1E3] rounded-lg"
                                value={updatedProduct.price_before_discount || ""}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, price_before_discount: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">السعر بعد الخصم</label>
                            <input
                                type="number"
                                className="w-full p-2 mt-1 border border-[#DFE1E3] rounded-lg"
                                value={updatedProduct.price_after_discount || ""}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, price_after_discount: e.target.value })}
                            />
                        </div>
                    </div>
    
                    {/* الصورة الرئيسية */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">الصورة الرئيسية</label>
                        <input
                            type="file"
                            ref={mainImageInputRef}
                            onChange={handleImageChange}
                            accept="image/*"
                            className="hidden"
                        />
                        <div 
                            className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer h-32"
                            onClick={triggerMainImageInput}
                        >
                            {updatedProduct.image ? (
                                <img
                                    src={updatedProduct.image}
                                    alt="صورة المنتج الرئيسية"
                                    className="h-full max-h-28 object-contain"
                                />
                            ) : (
                                <>
                                    <span className="text-3xl">📷</span>
                                    <p className="text-sm mt-2">ارفع الصورة الرئيسية هنا</p>
                                </>
                            )}
                        </div>
                    </div>
    
                    {/* معارض الصور */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">معرض الصور</label>
                        <input
                            type="file"
                            ref={galleryInputRef}
                            onChange={handleGalleryUpload}
                            accept="image/*"
                            multiple
                            className="hidden"
                        />
                        <button
                            type="button"
                            className="mt-2 bg-[#EE446E] text-white px-4 py-2 rounded-md"
                            onClick={triggerGalleryInput}
                        >
                            أضف صور للمعرض
                        </button>
                        
                        <div className="grid grid-cols-3 gap-2 mt-3">
                        {(updatedProduct.image_gallery || []).map((image, index) => (
                                <div key={index} className="relative">
                                    <img
                                        src={image}
                                        alt={`صورة المعرض ${index}`}
                                        className="w-full h-24 object-cover rounded-lg"
                                    />
                                    <button
                                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                                        onClick={() => removeGalleryImage(index)}
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
    
                {/* أزرار حفظ وإغلاق */}
                <div className="flex justify-end gap-4 mt-6">
                    <button
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                        onClick={onClose}
                    >
                        إغلاق
                    </button>
                    <button
                        className="bg-[#EE446E] text-white px-4 py-2 rounded-md"
                        onClick={handleSave}
                    >
                        حفظ التغييرات
                    </button>
                </div>
            </div>
        </div>
    );
    
};

export default ProductModal;
