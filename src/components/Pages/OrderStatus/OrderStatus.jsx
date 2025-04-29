"use client";
import Image from "next/image";
import { useCancelOrder } from "@/hooks/useProducts";
import { userPendingOrders } from "@/hooks/useProducts";

const OrderStatus = () => {
  const { data: orders, isLoading, isError } = userPendingOrders();

  const handleReject = (orderId) => {
    const formData = new FormData();
    formData.append("status", "cancelled");
    updateStatus({ orderId, formData });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading orders</div>;

  return (
    <div className="pt-20 px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
      {/* الجزء العلوي - بيانات الطلب والمستخدم */}
      {orders?.pending_orders.map((order) => (
        <div key={order.order_id} className="lg:col-span-2 bg-white shadow-lg rounded-lg p-6">
          <div dir="rtl" className="flex justify-between items-center mb-6">
            <h2 className="text-end text-2xl font-bold pb-3 border-b border-[#DFE1E3]">رقم الطلب</h2>
            <h2>#{order.order_id} - {order.status === "pending" ? "قيد الانتظار" : "تم الشحن"}</h2>
          </div>

          {/* بيانات المستخدم */}
          <div dir="rtl" className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-5 p-3 bg-[#FCFCFF] rounded-md shadow-sm">
              <p className="text-[#B0A6BD]">التواصل</p>
              <p className="text-[#383838]">{order.user_name}</p>
            </div>
            <div className="flex items-center justify-between gap-5 p-3 bg-[#FCFCFF] rounded-md shadow-sm">
              <p className="text-[#B0A6BD]">العنوان</p>
              <p className="text-[#383838]">{'جيزة'}</p>
            </div>
            <div className="flex items-center justify-between gap-5 p-3 bg-[#FCFCFF] rounded-md shadow-sm">
              <p className="text-[#B0A6BD]">نوع التوصيل</p>
              <p className="text-[#383838]">شحن للبيت</p>
            </div>
          </div>

          {/* أزرار */}
          <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
            <button
              onClick={() => handleReject(order.order_id)}
              className="btn border border-[#EE446E] text-[#EE446E] px-8 py-2 rounded-lg flex items-center gap-2"
            >
              الغاء الطلب <span className="text-2xl">{" .      "}x</span>
            </button>
            <button className="btn bg-[#EE446E] text-white px-12 py-2 rounded-lg flex items-center gap-2">
              اتصل بنا
            </button>
          </div>

          {/* الجزء الثاني - المنتجات */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-[20px] text-[#383838] text-end font-medium mb-4">المنتجات</h3>
            <ul className="space-y-4">
              {order.order_items.map((item) => (
                <li key={item.product_id} className="flex items-center gap-4 border-b border-[#DFE1E3] pb-4">
                  <Image
                    src={item?.image || "/imgs/products/no-image-available.jpg"}
                    alt={item?.product_name || "منتج"}
                    width={80}
                    height={80}
                    className="rounded-lg "
                  />
                  <div className="flex flex-col justify-between flex-1 text-[#383838]">
                    <h4 className="text-[16px] font-medium leading-snug">
                      {item?.product_name || "اسم المنتج غير موجود"}
                    </h4>
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-[#697586] text-sm">الكمية: {item.qty || "غير محددة"}</p>
                      <p className="text-[#383838] text-[18px] font-semibold">
                        {item?.product_price ? `ر.س ${item.product_price}` : "السعر غير متوفر"}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderStatus;
