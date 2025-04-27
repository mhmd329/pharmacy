"use client";
import { useState } from "react";
import { LuMoveRight } from "react-icons/lu";
import { useSelector, useDispatch } from "react-redux";
import { useCreateOrder } from "@/hooks/useAuth";
import { clearCart } from "@/store/slices/Caart";  
import { useRouter } from "next/navigation"; 
import Image from "next/image";

const CheckoutPage = () => {
    const [isContinueClicked, setIsContinueClicked] = useState(false);
    const [formData, setFormData] = useState({
        fName: '',
        lName: '',
        country: '',
        address: '',
        phone: '',
        shippingMethod: '',
    });
    const [notification, setNotification] = useState({ message: '', type: '' });
    
    const cartItems = useSelector(state => state.cart.cart);
    const dispatch = useDispatch();
    const router = useRouter();

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const shippingCost = 4.00;
    const totalAmount = totalPrice + shippingCost;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleRadioChange = (e) => {
        setFormData({
            ...formData,
            shippingMethod: e.target.id,
        });
    };

    const { mutate: createOrder, isLoading, isSuccess, error } = useCreateOrder();

    const handleSubmitOrder = () => {
        const product_ids = cartItems.map(item => item.id);
        const qty = cartItems.map(item => item.quantity);

        const orderPayload = {
            product_ids,
            qty,
            status: "pending",
            address: formData.address,
            firstname: formData.fName,
            lastname: formData.lName,
            country: formData.country,
            delivery_price: 5.2,
            payment_method: "cash"
        };

        createOrder(orderPayload, {
            onSuccess: (data) => {
                setNotification({ message: "تم إنشاء الطلب بنجاح ✅", type: "success" });
                console.log(data);
                
                // بعد نجاح الطلب:
                dispatch(clearCart());  // لتفريغ عربة التسوق
                setTimeout(() => {
                    setNotification({ message: '', type: '' });
                    router.push('/');  // التوجه إلى الصفحة الرئيسية بعد 3 ثواني
                }, 0.3); // Hide after 3 seconds
            },
            onError: (err) => {
                setNotification({ message: "حدث خطأ أثناء إنشاء الطلب ❌", type: "error" });
                console.error(err);
                setTimeout(() => setNotification({ message: '', type: '' }), 3000); // Hide after 3 seconds
            },
        });
    };

    return (
        <div className="pt-40">
             {/* Notification Toast */}
             {notification.message && (
                <div className={`fixed top-20 right-5 z-50 p-4 rounded-md shadow-lg text-white transition-all duration-300 ${
                    notification.type === "success" ? "bg-green-500" : "bg-red-500"
                }`}>
                    {notification.message}
                </div>
            )}
           <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {!isContinueClicked ?
                        <div className="lg:col-span-2 bg-[#f8f8f8b3] p-8 rounded-2xl">
                            <h2 className="text-end text-2xl font-bold pb-5 border-b-1 border-[#DFE1E3]">معلومات التواصل</h2>
                            <div dir="rtl" className="shipping-method flex flex-col gap-5 mt-5">
                                <h3 className="text-[20px] text-[#383838] font-medium">طريقة التوصيل</h3>
                                <div>
                                    <div className="input-wrapper flex items-center gap-2.5 mb-2">
                                        <label htmlFor="homeDelivery">شحن للبيت</label>
                                        <input
                                            type="radio"
                                            name="shippingMethod"
                                            id="homeDelivery"
                                            checked={formData.shippingMethod === "homeDelivery"}
                                            onChange={handleRadioChange}
                                        />
                                    </div>
                                    <div className="input-wrapper flex items-center gap-2.5">
                                        <label htmlFor="reserveProduct">حجز المنتج</label>
                                        <input
                                            type="radio"
                                            name="shippingMethod"
                                            id="reserveProduct"
                                            checked={formData.shippingMethod === "reserveProduct"}
                                            onChange={handleRadioChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div dir="rtl" className="shipping-method flex flex-col gap-5 my-5">
                                <h3 className="text-[20px] text-[#383838] font-medium">تفاصيل التوصيل</h3>
                                <div className="grid grid-cols-2 gap-5">
                                    <input
                                        type="text"
                                        name="fName"
                                        placeholder="الأسم الاول"
                                        value={formData.fName}
                                        onChange={handleChange}
                                        className="!bg-white outline-none border border-[#BFB9CF] focus:border-[#EE446E] p-2.5 rounded-lg"
                                    />
                                    <input
                                        type="text"
                                        name="lName"
                                        placeholder="الأسم الأخير"
                                        value={formData.lName}
                                        onChange={handleChange}
                                        className="!bg-white outline-none border border-[#BFB9CF] focus:border-[#EE446E] p-2.5 rounded-lg"
                                    />
                                    <input
                                        type="text"
                                        name="country"
                                        placeholder="البلد"
                                        value={formData.country}
                                        onChange={handleChange}
                                        className="col-span-2 !bg-white outline-none border border-[#BFB9CF] focus:border-[#EE446E] p-2.5 rounded-lg"
                                    />
                                    <input
                                        type="text"
                                        name="address"
                                        placeholder="العنوان"
                                        value={formData.address}
                                        onChange={handleChange}
                                        className="col-span-2 !bg-white outline-none border border-[#BFB9CF] focus:border-[#EE446E] p-2.5 rounded-lg"
                                    />
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="رقم الهاتف"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="placeholder:text-end col-span-2 !bg-white outline-none border border-[#BFB9CF] focus:border-[#EE446E] p-2.5 rounded-lg"
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between items-center text-[20px]">
                                    <p className="text-[#B0A6BD]">${totalPrice.toFixed(2)}</p>
                                    <p className="text-[#B0A6BD]">السعر</p>
                                </div>
                                <div className="flex justify-between items-center text-[20px]">
                                    <p className="text-[#B0A6BD]">${shippingCost.toFixed(2)}</p>
                                    <p className="text-[#B0A6BD]">التوصيل</p>
                                </div>
                                <div className="flex justify-between items-center text-[20px]">
                                    <p className="text-[#383838]">${totalAmount.toFixed(2)}</p>
                                    <p className="text-[#383838]">الأجمالي</p>
                                </div>
                            </div>
                            <div className="w-[90%] md:w-[50%] mx-auto mt-5">
                                <button className="w-full rounded-md py-2 bg-[#EE446E] font-bold text-white cursor-pointer" onClick={() => setIsContinueClicked(true)}>استمرار</button>
                            </div>
                        </div>
                        :
                        <div className="lg:col-span-2 bg-[#f8f8f8b3] p-8 rounded-2xl">
                            <h2 className="text-end text-2xl font-bold pb-5 border-b-1 border-[#DFE1E3]">معلومات الدفع</h2>

                            {/* user details */}
                            <div dir="rtl" className="flex flex-col gap-2.5 w-full mt-5">
                                <div className="flex items-center justify-between gap-5 p-2.5 bg-[#FCFCFF]">
                                    <p className="text-[#B0A6BD]">التواصل</p>
                                    <p className="text-[#383838] flex-grow">{formData.phone}</p>
                                    <button
                                        onClick={() => setIsContinueClicked(false)}
                                        className="text-[#B0A6BD] cursor-pointer hover:underline"
                                    >
                                        تعديل
                                    </button>
                                </div>
                                <div className="flex items-center justify-between gap-5 p-2.5 bg-[#FCFCFF]">
                                    <p className="text-[#B0A6BD]">العنوان</p>
                                    <p className="text-[#383838] flex-grow">{formData.address}</p>
                                    <button
                                        onClick={() => setIsContinueClicked(false)}
                                        className="text-[#B0A6BD] cursor-pointer hover:underline"
                                    >
                                        تعديل
                                    </button>
                                </div>
                                <div className="flex items-center justify-between gap-5 p-2.5 bg-[#FCFCFF]">
                                    <p className="text-[#B0A6BD]">نوع التوصيل</p>
                                    <p className="text-[#383838] flex-grow">{formData.shippingMethod === "homeDelivery" ? "شحن للبيت" : "حجز المنتج"}</p>
                                    <button
                                        onClick={() => setIsContinueClicked(false)}
                                        className="text-[#B0A6BD] cursor-pointer hover:underline"
                                    >
                                        تعديل
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-4 gap-5 mt-10">
                                <button onClick={handleSubmitOrder} className="col-span-2 rounded-md py-2 bg-[#EE446E] hover:bg-[#d93961] text-white font-bold cursor-pointer"> تاكيد الاوردر</button>
                                <p className="cursor-pointer flex items-center gap-2.5 text-[#B0A6BD] hover:text-[#d93961]" onClick={() => setIsContinueClicked(false)}>
                                    العودة الى بياانات الشحن
                                    <LuMoveRight />
                                </p>
                            </div>

                        </div>
                    }

                    {/* Cart Items List */}
                    <div className="mt-5">
                        <h3 className="text-[20px] text-[#383838] font-medium mb-4">المنتجات</h3>
                        <ul className="flex flex-col gap-4">
                            {cartItems.map((item) => (
                                <li
                                    key={item.id}
                                    className="flex gap-4 items-center border-b border-[#DFE1E3] pb-4"
                                >
                                    <Image
                                        src={item?.image || "/imgs/products/no-image-available.jpg"}
                                        alt={item?.name || "منتج"}
                                        width={80}
                                        height={80}
                                        className="rounded-lg border"
                                    />

                                    <div className="flex flex-col justify-between flex-1 text-[#383838]">
                                        <h4 className="text-[16px] font-medium leading-snug">
                                            {item?.name || "اسم المنتج غير موجود"}
                                        </h4>

                                        <div className="flex justify-between items-center mt-2">
                                            <p className="text-[#697586] text-sm">الكمية: {item.quantity}</p>
                                            <p className="text-[#383838] text-[18px] font-semibold">
                                                ${item?.price || "السعر غير متوفر"}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
