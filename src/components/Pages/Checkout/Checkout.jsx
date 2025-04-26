"use client";
import { useState } from "react";
import { LuMoveRight } from "react-icons/lu";
import { useSelector } from "react-redux";
import { useCreateOrder } from "@/hooks/useAuth";
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
    const cartItems = useSelector(state => state.cart.cart);

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
                alert("Order created successfully!");
                console.log(data);
            },
            onError: (err) => {
                alert("Error creating order");
                console.error(err);
            },
        });
    };

    return (
        <div className="pt-40">
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

{/*                        
                            <div dir="rtl" className="payment-method flex flex-col gap-5 mt-5">
                                <h3 className="text-[20px] text-[#383838] font-medium">نوع الدفع</h3>
                                <div>
                                    <div className="input-wrapper flex items-center gap-2.5 mb-2">
                                        <input type="radio" name="paymentMethod" id="homeDlivery" />
                                        <label htmlFor="homeDelivery flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="38" height="12" viewBox="0 0 38 12" fill="none">
                                                <path d="M16.4669 11.5354H13.3887L15.314 0.499878H18.3921L16.4669 11.5354Z" fill="#00579F" />
                                                <path d="M27.626 0.769813C27.0189 0.546525 26.0559 0.299988 24.8651 0.299988C21.8252 0.299988 19.6845 1.80262 19.6714 3.95092C19.6462 5.53594 21.2041 6.41629 22.3692 6.94479C23.5602 7.48483 23.965 7.83731 23.965 8.31868C23.9529 9.05798 23.0027 9.39877 22.1164 9.39877C20.8874 9.39877 20.2289 9.22307 19.2282 8.81176L18.8228 8.63544L18.3921 11.1127C19.1141 11.4176 20.4442 11.6881 21.8252 11.7C25.0551 11.7 27.1579 10.2206 27.1828 7.93125C27.1951 6.675 26.3725 5.71241 24.5989 4.92583C23.5223 4.4209 22.863 4.08043 22.863 3.5638C22.8756 3.09413 23.4206 2.61307 24.636 2.61307C25.6367 2.58951 26.372 2.81248 26.929 3.03561L27.2074 3.1528L27.626 0.769813Z" fill="#00579F" />
                                                <path d="M31.7172 7.62589C31.9707 6.99192 32.9462 4.53825 32.9462 4.53825C32.9334 4.56181 33.1992 3.89257 33.3512 3.48173L33.5663 4.43261C33.5663 4.43261 34.1492 7.07415 34.2758 7.62589C33.7947 7.62589 32.3252 7.62589 31.7172 7.62589ZM35.5169 0.499878H33.1359C32.4016 0.499878 31.8438 0.699292 31.527 1.4155L26.9546 11.5352H30.1845C30.1845 11.5352 30.7163 10.1732 30.8306 9.87983C31.1849 9.87983 34.327 9.87983 34.7828 9.87983C34.8712 10.2673 35.1501 11.5352 35.1501 11.5352H38.0003L35.5169 0.499878Z" fill="#00579F" />
                                                <path d="M10.8177 0.499878L7.8031 8.02503L7.47368 6.49884C6.91634 4.73782 5.16839 2.8245 3.21777 1.87315L5.97907 11.5237H9.23425L14.0728 0.499878H10.8177Z" fill="#00579F" />
                                                <path d="M5.00378 0.499878H0.0511556L0.000488281 0.722853C3.86385 1.63863 6.42248 3.84607 7.4737 6.49931L6.39706 1.42751C6.21981 0.722697 5.67509 0.523127 5.00378 0.499878Z" fill="#FAA61A" />
                                            </svg>

                                            <svg xmlns="http://www.w3.org/2000/svg" width="33" height="20" viewBox="0 0 33 20" fill="none">
                                                <path d="M21.2004 17.8632H12.4512V2.13934H21.2004V17.8632Z" fill="#FF5F00" />
                                                <path d="M13.0117 10C13.0117 6.81035 14.5051 3.9691 16.8307 2.13809C15.1301 0.799161 12.9837 5.33497e-07 10.6511 5.33497e-07C5.12879 5.33497e-07 0.652344 4.47708 0.652344 10C0.652344 15.5229 5.12879 20 10.6511 20C12.9837 20 15.1301 19.2008 16.8307 17.8619C14.5051 16.0309 13.0117 13.1896 13.0117 10Z" fill="#EB001B" />
                                                <path d="M33.0003 10C33.0003 15.5229 28.5239 20 23.0016 20C20.669 20 18.5226 19.2008 16.8213 17.8619C19.1476 16.0309 20.641 13.1896 20.641 10C20.641 6.81035 19.1476 3.9691 16.8213 2.13809C18.5226 0.799161 20.669 5.33497e-07 23.0016 5.33497e-07C28.5239 5.33497e-07 33.0003 4.47708 33.0003 10Z" fill="#F79E1B" />
                                                <path d="M8.17625 10.0633C8.17625 9.62645 8.46248 9.26761 8.93022 9.26761C9.37714 9.26761 9.67885 9.61098 9.67885 10.0633C9.67885 10.5155 9.37714 10.8589 8.93022 10.8589C8.46248 10.8589 8.17625 10.5 8.17625 10.0633ZM10.1882 10.0633V8.8207H9.64791V9.12241C9.47652 8.89866 9.21646 8.75821 8.86298 8.75821C8.16613 8.75821 7.61983 9.30451 7.61983 10.0633C7.61983 10.8226 8.16613 11.3683 8.86298 11.3683C9.21646 11.3683 9.47652 11.2278 9.64791 11.0041V11.3058H10.1882V10.0633ZM28.448 10.0633C28.448 9.62645 28.7343 9.26761 29.202 9.26761C29.6495 9.26761 29.9506 9.61098 29.9506 10.0633C29.9506 10.5155 29.6495 10.8589 29.202 10.8589C28.7343 10.8589 28.448 10.5 28.448 10.0633ZM30.4606 10.0633V7.82273H29.9197V9.12241C29.7483 8.89866 29.4883 8.75821 29.1348 8.75821C28.4379 8.75821 27.8916 9.30451 27.8916 10.0633C27.8916 10.8226 28.4379 11.3683 29.1348 11.3683C29.4883 11.3683 29.7483 11.2278 29.9197 11.0041V11.3058H30.4606V10.0633ZM16.8955 9.24202C17.2437 9.24202 17.4674 9.46042 17.5245 9.84485H16.235C16.2927 9.48601 16.5105 9.24202 16.8955 9.24202ZM16.9062 8.75821C16.1778 8.75821 15.6684 9.28844 15.6684 10.0633C15.6684 10.8535 16.1987 11.3683 16.9425 11.3683C17.3169 11.3683 17.6596 11.2749 17.9613 11.0202L17.6965 10.6197C17.4882 10.7857 17.2228 10.8797 16.9735 10.8797C16.6254 10.8797 16.3082 10.7184 16.2302 10.2709H18.0756C18.0809 10.2037 18.0863 10.1359 18.0863 10.0633C18.0809 9.28844 17.6025 8.75821 16.9062 8.75821ZM23.4308 10.0633C23.4308 9.62645 23.7171 9.26761 24.1848 9.26761C24.6317 9.26761 24.9334 9.61098 24.9334 10.0633C24.9334 10.5155 24.6317 10.8589 24.1848 10.8589C23.7171 10.8589 23.4308 10.5 23.4308 10.0633ZM25.4428 10.0633V8.8207H24.9025V9.12241C24.7305 8.89866 24.471 8.75821 24.1176 8.75821C23.4207 8.75821 22.8744 9.30451 22.8744 10.0633C22.8744 10.8226 23.4207 11.3683 24.1176 11.3683C24.471 11.3683 24.7305 11.2278 24.9025 11.0041V11.3058H25.4428V10.0633ZM20.3792 10.0633C20.3792 10.8172 20.9041 11.3683 21.7051 11.3683C22.0794 11.3683 22.3287 11.285 22.5989 11.0719L22.3394 10.6351C22.1365 10.7809 21.9235 10.8589 21.689 10.8589C21.2575 10.8535 20.9404 10.5417 20.9404 10.0633C20.9404 9.5848 21.2575 9.27297 21.689 9.26761C21.9235 9.26761 22.1365 9.34557 22.3394 9.49137L22.5989 9.05457C22.3287 8.84153 22.0794 8.75821 21.7051 8.75821C20.9041 8.75821 20.3792 9.30927 20.3792 10.0633ZM27.3459 8.75821C27.0341 8.75821 26.8312 8.90401 26.6907 9.12241V8.8207H26.1552V11.3058H26.6961V9.91269C26.6961 9.50148 26.8728 9.27297 27.2263 9.27297C27.3358 9.27297 27.4501 9.28844 27.5643 9.33545L27.731 8.82605C27.6113 8.77904 27.4554 8.75821 27.3459 8.75821ZM12.8608 9.01827C12.6008 8.84688 12.2425 8.75821 11.8474 8.75821C11.2178 8.75821 10.8125 9.05993 10.8125 9.55385C10.8125 9.95911 11.1142 10.209 11.67 10.287L11.9253 10.3233C12.2217 10.365 12.3615 10.4429 12.3615 10.5834C12.3615 10.7756 12.164 10.8851 11.795 10.8851C11.4207 10.8851 11.1505 10.7655 10.9684 10.625L10.7137 11.0457C11.0101 11.2641 11.3844 11.3683 11.7896 11.3683C12.5073 11.3683 12.9233 11.0303 12.9233 10.5572C12.9233 10.1204 12.596 9.89186 12.0551 9.81391L11.8004 9.77701C11.5665 9.74607 11.379 9.69965 11.379 9.53302C11.379 9.35093 11.5558 9.24202 11.8521 9.24202C12.1693 9.24202 12.4764 9.36164 12.6269 9.45507L12.8608 9.01827ZM19.8329 8.75821C19.5211 8.75821 19.3181 8.90401 19.1783 9.12241V8.8207H18.6427V11.3058H19.1831V9.91269C19.1831 9.50148 19.3598 9.27297 19.7133 9.27297C19.8228 9.27297 19.937 9.28844 20.0513 9.33545L20.2179 8.82605C20.0983 8.77904 19.9424 8.75821 19.8329 8.75821ZM15.2215 8.8207H14.3378V8.06672H13.7915V8.8207H13.2875V9.31463H13.7915V10.4483C13.7915 11.0249 14.0153 11.3683 14.6544 11.3683C14.8889 11.3683 15.159 11.2957 15.3304 11.1761L15.1745 10.7131C15.0133 10.8065 14.8365 10.8535 14.6961 10.8535C14.4259 10.8535 14.3378 10.6869 14.3378 10.4376V9.31463H15.2215V8.8207ZM7.14198 11.3058V9.74607C7.14198 9.15871 6.76766 8.76357 6.16424 8.75821C5.84706 8.75286 5.51976 8.85164 5.29065 9.20037C5.11926 8.92484 4.84909 8.75821 4.46942 8.75821C4.20401 8.75821 3.94455 8.83617 3.74162 9.12717V8.8207H3.20068V11.3058H3.74638V9.92816C3.74638 9.49672 3.98561 9.26761 4.35516 9.26761C4.714 9.26761 4.8955 9.50148 4.8955 9.92281V11.3058H5.4418V9.92816C5.4418 9.49672 5.69114 9.26761 6.04998 9.26761C6.41894 9.26761 6.59568 9.50148 6.59568 9.92281V11.3058H7.14198Z" fill="white" />
                                            </svg>

                                            Credit card</label>
                                    </div>
                                    <div className="input-wrapper flex items-center gap-2.5">
                                        <input type="radio" name="paymentMethod" id="reserveProduct" />
                                        <label htmlFor="reserveProduct">Cash</label>
                                    </div>
                                </div>
                            </div> */}

                            {/* Payment Details */}
                            {/* <div dir="rtl" className="shipping-method flex flex-col gap-5 my-5">
                                <h3 className="text-[20px] text-[#383838] font-medium">تفاصيل التوصيل</h3>
                                <div className="grid grid-cols-2 gap-5">
                                    <input type="text" name="creditNum" placeholder="رقم الفيزا" className="col-span-2 !bg-white outline-none border border-[#BFB9CF] focus:border-[#EE446E] p-2.5 rounded-lg" />
                                    <input type="text" name="creditName" placeholder="اسم المدون علي الفيزا" className="col-span-2 !bg-white outline-none border border-[#BFB9CF] focus:border-[#EE446E] p-2.5 rounded-lg" />
                                    <input type="text" name="creditCode" placeholder="الكود السري" className="!bg-white outline-none border border-[#BFB9CF] focus:border-[#EE446E] p-2.5 rounded-lg" />
                                    <input type="text" name="expDate" placeholder="تاريخ الانتهاء" className="!bg-white outline-none border border-[#BFB9CF] focus:border-[#EE446E] p-2.5 rounded-lg" />
                                </div>
                            </div> */}

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
        </div>);
}

export default CheckoutPage;
//  "use client";
//  import { useState } from "react";
//  import { useSelector } from "react-redux";
//  import { useCreateOrder } from "@/hooks/useProducts";
// const CheckoutPage = () => {
//     const [formData, setFormData] = useState({
//         fName: '',
//         lName: '',
//         country: '',
//         address: '',
//         phone: '',
//         shippingMethod: '',
//     });
//     const cartItems = useSelector(state => state.cart.cart);

//     const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
//     const shippingCost = 4.00;
//     const totalAmount = totalPrice + shippingCost;

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const handleRadioChange = (e) => {
//         setFormData({
//             ...formData,
//             shippingMethod: e.target.id,
//         });
//     };

//     const { mutate: createOrder, isLoading, isSuccess, error } = useCreateOrder();

//     const handleSubmitOrder = () => {
//         const product_ids = cartItems.map(item => item.id);
//         const qty = cartItems.map(item => item.quantity);

//         const orderPayload = {
//             product_ids,
//             qty,
//             status: "pending",
//             address: formData.address,
//             firstname: formData.fName,
//             lastname: formData.lName,
//             country: formData.country,
//             delivery_price: 5.2,
//             payment_method: "cash" // الدفع نقدًا فقط
//         };

//         createOrder(orderPayload, {
//             onSuccess: (data) => {
//                 alert("Order created successfully!");
//                 console.log(data);
//             },
//             onError: (err) => {
//                 alert("Error creating order");
//                 console.error(err);
//             },
//         });
//     };

//     return (
//         <div className="pt-40">
//             <div className="container mx-auto">
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
//                     <div className="lg:col-span-2 bg-[#f8f8f8b3] p-8 rounded-2xl">
//                         <h2 className="text-end text-2xl font-bold pb-5 border-b-1 border-[#DFE1E3]">معلومات التواصل</h2>
//                         {/* <div dir="rtl" className="shipping-method flex flex-col gap-5 mt-5">
//                             <h3 className="text-[20px] text-[#383838] font-medium">طريقة التوصيل</h3>
//                             <div>
//                                 <div className="input-wrapper flex items-center gap-2.5 mb-2">
//                                     <label htmlFor="homeDelivery">شحن للبيت</label>
//                                     <input
//                                         type="radio"
//                                         name="shippingMethod"
//                                         id="homeDelivery"
//                                         checked={formData.shippingMethod === "homeDelivery"}
//                                         onChange={handleRadioChange}
//                                     />
//                                 </div>
//                                 <div className="input-wrapper flex items-center gap-2.5">
//                                     <label htmlFor="reserveProduct">حجز المنتج</label>
//                                     <input
//                                         type="radio"
//                                         name="shippingMethod"
//                                         id="reserveProduct"
//                                         checked={formData.shippingMethod === "reserveProduct"}
//                                         onChange={handleRadioChange}
//                                     />
//                                 </div>
//                             </div>
//                         </div> */}
//                         <div dir="rtl" className="shipping-method flex flex-col gap-5 my-5">
//                             <h3 className="text-[20px] text-[#383838] font-medium">تفاصيل التوصيل</h3>
//                             <div className="grid grid-cols-2 gap-5">
//                                 <input
//                                     type="text"
//                                     name="fName"
//                                     placeholder="الأسم الاول"
//                                     value={formData.fName}
//                                     onChange={handleChange}
//                                     className="!bg-white outline-none border border-[#BFB9CF] focus:border-[#EE446E] p-2.5 rounded-lg"
//                                 />
//                                 <input
//                                     type="text"
//                                     name="lName"
//                                     placeholder="الأسم الأخير"
//                                     value={formData.lName}
//                                     onChange={handleChange}
//                                     className="!bg-white outline-none border border-[#BFB9CF] focus:border-[#EE446E] p-2.5 rounded-lg"
//                                 />
//                                 <input
//                                     type="text"
//                                     name="country"
//                                     placeholder="البلد"
//                                     value={formData.country}
//                                     onChange={handleChange}
//                                     className="col-span-2 !bg-white outline-none border border-[#BFB9CF] focus:border-[#EE446E] p-2.5 rounded-lg"
//                                 />
//                                 <input
//                                     type="text"
//                                     name="address"
//                                     placeholder="العنوان"
//                                     value={formData.address}
//                                     onChange={handleChange}
//                                     className="col-span-2 !bg-white outline-none border border-[#BFB9CF] focus:border-[#EE446E] p-2.5 rounded-lg"
//                                 />
//                                 <input
//                                     type="tel"
//                                     name="phone"
//                                     placeholder="رقم الهاتف"
//                                     value={formData.phone}
//                                     onChange={handleChange}
//                                     className="placeholder:text-end col-span-2 !bg-white outline-none border border-[#BFB9CF] focus:border-[#EE446E] p-2.5 rounded-lg"
//                                 />
//                             </div>
//                         </div>
//                         <div>
//                             <div className="flex justify-between items-center text-[20px]">
//                                 <p className="text-[#B0A6BD]">د.ا{totalPrice.toFixed(2)}</p>
//                                 <p className="text-[#B0A6BD]">السعر</p>
//                             </div>
//                             <div className="flex justify-between items-center text-[20px]">
//                                 <p className="text-[#B0A6BD]">د.ا{shippingCost.toFixed(2)}</p>
//                                 <p className="text-[#B0A6BD]">التوصيل</p>
//                             </div>
//                             <div className="flex justify-between items-center text-[20px]">
//                                 <p className="text-[#383838]">د.ا{totalAmount.toFixed(2)}</p>
//                                 <p className="text-[#383838]">الأجمالي</p>
//                             </div>
//                         </div>
//                         <div className="w-[90%] md:w-[50%] mx-auto mt-5">
//                             <button className="w-full rounded-md py-2 bg-[#EE446E] font-bold text-white cursor-pointer" onClick={handleSubmitOrder}>استمرار</button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };
// export default CheckoutPage;
