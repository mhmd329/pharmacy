import { closeModal } from "@/store/slices/modal";
import React, { useEffect, useState } from "react";
import Image from 'next/image';
import infoimg from './Info.png';
import { useDispatch } from "react-redux";
import Link from "next/link";
import { useUpdateStatus, useOrdersData } from "@/hooks/useAuth";

const Notifications = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  const { data: orders, isLoading, isError } = useOrdersData();
  const pendingOrders = orders?.filter(order => order.status === "pending") || [];
  const { mutate: updateStatus } = useUpdateStatus();

  const handleReject = (orderId) => {
    const formData = new FormData();
    formData.append("status", "cancelled");
    updateStatus({ orderId, formData });
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black/50 z-50"
      onClick={() => dispatch(closeModal("Notifications"))}
    >
      <div
        className={`fixed left-0 top-0 h-full w-full sm:w-[400px] bg-white shadow-lg z-50 p-4 overflow-y-auto transition-all duration-300 ${show ? "translate-x-0" : "-translate-x-full"
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 left-2 bg-[#EE446E] text-white rounded-full w-8 h-8 text-xl flex items-center justify-center"
          onClick={() => dispatch(closeModal("Notifications"))}
        >
          ×
        </button>

        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-500">جاري تحميل البيانات...</p>
          </div>
        ) : isError ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-500">حدث خطأ أثناء تحميل البيانات</p>
          </div>
        ) : pendingOrders.length > 0 ? (
          <div className="flex flex-col gap-4 mt-10">
            {pendingOrders.map((order) => (
              <div key={order.order_id} className="flex flex-col border-b pb-4">
                <div className="flex items-center gap-2">
                  <Image src={infoimg} alt="info" width={32} height={32} />
                  <h2 className="font-bold text-sm sm:text-base">
                    {`طلب جديد - #${order.order_id}`}
                  </h2>
                </div>

                <div className="flex flex-col gap-1 mt-2 text-sm sm:text-base">
                  <p>{`طلب مكون من ${order.order_items.length} منتج`}</p>
                  <p>{`الكود الترويجي: ${order.discount_code || "لا يوجد"}`}</p>
                  <p>{`التخفيض: ${order.discount || "لا يوجد"}`}</p>
                  <p>{`السعر الإجمالي: ${order.total_price} د.ا`}</p>
                </div>

                <div className="flex flex-col gap-2 mt-4">
                  {order.order_items.map((item) => (
                    <div
                      key={item.product_id}
                      className="flex flex-col border rounded p-2 bg-gray-50 text-sm"
                    >
                      <p className="font-medium">{item.product_name}</p>
                      <p className="text-gray-600">{`السعر: ${item.product_price} د.ا`}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-2 mt-4">
                  <Link href="/admin/orders" className="w-full sm:w-auto">
                    <button className="w-full sm:w-auto bg-[#EE446E] text-white px-4 py-2 rounded-lg" onClick={() => dispatch(closeModal("Notifications"))}>
                      تجهيز
                    </button>
                  </Link>

                  <button
                    className="w-full sm:w-auto border border-[#EE446E] text-[#EE446E] px-4 py-2 rounded-lg"
                    onClick={() => handleReject(order.order_id)}
                  >
                    رفض
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-500">لا يوجد إشعارات</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
