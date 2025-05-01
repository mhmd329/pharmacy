const OfferDetails = ({ product, setViewingProduct }) => {
    if (!product) {
        return <div>لا توجد معلومات عن المنتج.</div>;
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-96 relative">
                <h3 className="text-xl font-bold">{product.name}</h3>
                <p className="mt-2 text-gray-700">{product.description || "لا يوجد وصف للمنتج."}</p>
                <p className="mt-2 text-gray-700">
                    <strong>الخصم:</strong> %{product.discount  || "غير محدد"}
                </p>
                <p className="mt-2 text-gray-700">
                    <strong>الرقم التعريفي id:</strong> {product.product_id || "غير محدد"}
                </p>
                <p className="mt-2 text-gray-700 break-words">
                    <strong>رابط الصورة:</strong> {product.image || "غير متوفر"}
                </p>


                {/* معرض الصور */}
                {Array.isArray(product.image_gallery) && product.image_gallery.length > 0 ? (
                    <div className="mt-4">
                        <h4 className="font-semibold">معرض الصور</h4>
                        <div className="grid grid-cols-3 gap-2">
                            {product.image_gallery.map((image, index) => (
                                <div key={index} className="relative">
                                    <img
                                        src={getValidImageUrl(image)}
                                        alt={`صورة ${index}`}
                                        className="w-full h-32 object-cover rounded-md"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p className="mt-2 text-gray-500">لا توجد صور في المعرض.</p>
                )}

                {/* زر الإغلاق */}
                <button
                    className="absolute top-2 left-2 bg-[#EE446E] text-white p-2 rounded-full"
                    onClick={() => setViewingProduct(false)} // أغلق النافذة عند النقر
                >
                    X
                </button>
            </div>
        </div>
    );
};

export default OfferDetails;
