'use client'
import Image from "next/image";
import { useCancelOrder, useUserOrders } from "@/hooks/useAuth";
import { useState } from "react";
import { toast } from "react-toastify"; // تأكد أنك مركب react-toastify
import { DotLoader } from "react-spinners";
import { statusColors } from "@/lib/constants";
import Link from "next/link";
import { format } from 'date-fns';

const OrderStatus = () => {
  const {
    data: orders,
    isLoading,
    isError,
    refetch,
  } = useUserOrders();
  const { mutateAsync: cancelOrder } = useCancelOrder();
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleReject = (order_id) => {
    setSelectedOrderId(order_id);
    setShowConfirmDialog(true);
  };

  const confirmCancelOrder = async () => {
    try {
      await cancelOrder({ orderId: selectedOrderId });
      toast.success("تم إلغاء الطلب بنجاح");
      setShowConfirmDialog(false);
      setSelectedOrderId(null);
      await refetch(); // جلب البيانات المحدثة
    } catch (error) {
      toast.error("حدث خطأ أثناء الإلغاء");
      console.error("Error canceling order:", error);
    }
  };

  const cancelOrderDialog = () => {
    setShowConfirmDialog(false);
    setSelectedOrderId(null);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading orders</div>;

  return (
    <div className="pt-40">
      {isLoading && (
        <div className="flex justify-center items-center w-full h-screen fixed inset-0 bg-black/80 z-50">
          <DotLoader color="#EE446E" />
        </div>
      )}

      <div className="pt-20 px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
        {orders && orders.length > 0 ? (
          orders.map((order) => {
            const formattedDate = format(new Date(order.created_at), 'yyyy-MM-dd HH:mm');

            return (
              <div key={order.order_id} className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg p-6 gap-6">
                {/* الجزء الخاص بتفاصيل الطلب */}
                <div className="flex flex-col lg:w-2/3 gap-3">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-end text-2xl font-bold pb-3 border-b border-[#DFE1E3]">رقم الطلب</h2>
                    <h2>
                      #{order.order_id} -{" "}
                      <span className={`font-semibold ${statusColors[order.status]}`}>
                        {order.status === "pending"
                          ? "قيد الانتظار"
                          : order.status === "cancelled"
                            ? "تم الإلغاء"
                            : "تم الشحن"}
                      </span>
                    </h2>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-5 p-3 bg-[#FCFCFF] rounded-md shadow-sm">
                      <p className="text-[#B0A6BD]">التواصل</p>
                      <p className="text-[#383838]">{order.user_name}</p>
                    </div>
                    <div className="flex items-center justify-between gap-5 p-3 bg-[#FCFCFF] rounded-md shadow-sm">
                      <p className="text-[#B0A6BD]">العنوان</p>
                      <p className="text-[#383838]">جيزة</p>
                    </div>
                    <div className="flex items-center justify-between gap-5 p-3 bg-[#FCFCFF] rounded-md shadow-sm">
                      <p className="text-[#B0A6BD]">نوع التوصيل</p>
                      <p className="text-[#383838]">شحن للبيت</p>
                    </div>
                    <div className="flex items-center justify-between gap-5 p-3 bg-[#FCFCFF] rounded-md shadow-sm">
                      <p className="text-[#B0A6BD]"> التاريخ</p>
                      <p className="text-[#383838]">{formattedDate}</p>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
                    {order.status === "pending" && (
                      <button
                        onClick={() => handleReject(order.order_id)}
                        className="btn border cursor-pointer border-[#EE446E] text-[#EE446E] px-8 py-2 rounded-lg flex items-center gap-2"
                      >
                        الغاء الطلب <span className="text-2xl">x</span>
                      </button>
                    )}
                    <Link href="/OrderStatus/#footer">
                      <button className="btn cursor-pointer bg-[#EE446E] text-white px-12 py-2 rounded-lg flex items-center gap-2">
                        اتصل بنا
                      </button>
                    </Link>
                  </div>
                </div>

                {/* الجزء الخاص بالمنتجات على اليمين */}
                <div className="lg:w-1/3 bg-white shadow-lg rounded-lg p-6 mt-6">
                  <h3 className="text-[20px] text-[#383838] text-end font-medium mb-4">المنتجات</h3>
                  <ul className="space-y-4">
                    {order.order_items.map((item) => {
                      const imageUrl = item?.product_image
                        ? `https://clinics.soulnbody.net/pharmacy/storage/app/public/${item.product_image}`
                        : "/imgs/products/no-image-available.jpg";

                      return (
                        <li
                          key={item.product_id}
                          className="flex items-center gap-4 border-b border-[#DFE1E3] pb-4"
                        >
                          <Image
                            src={imageUrl}
                            alt={item?.product_name || "منتج"}
                            width={80}
                            height={80}
                            className="rounded-lg"
                          />

                          <div className="flex flex-col justify-between flex-1 text-[#383838]">
                            <h4 className="text-[16px] font-medium leading-snug">
                              {item?.product_name || "اسم المنتج غير موجود"}
                            </h4>
                            <div className="flex justify-between items-center mt-2">
                              <p className="text-[#697586] text-sm">
                                الكمية: {item.qty || "غير محددة"}
                              </p>
                              <p className="text-[#383838] text-[18px] font-semibold">
                                {item?.product_price
                                  ? `د.أ ${item.product_price}`
                                  : "السعر غير متوفر"}
                              </p>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center text-gray-500">
            لا يوجد طلبات معلقة حالياً.
          </div>
        )}

        {showConfirmDialog && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-lg font-semibold">هل أنت متأكد من إلغاء الطلب؟</h3>
              <div className="mt-4 flex justify-center gap-4">
                <button
                  onClick={confirmCancelOrder}
                  className="btn bg-[#EE446E] text-white px-8 py-2 rounded-lg"
                >
                  نعم
                </button>
                <button
                  onClick={cancelOrderDialog}
                  className="btn border border-[#EE446E] text-[#EE446E] px-8 py-2 rounded-lg"
                >
                  لا
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );


};

export default OrderStatus;
