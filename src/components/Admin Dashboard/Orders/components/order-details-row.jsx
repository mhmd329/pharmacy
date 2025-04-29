import { IoPrintSharp } from "react-icons/io5";

const OrderDetailsRow = ({ order ,discount}) => {
  const details = order.order_items || [];

  const mappedDetails = details.map((item) => ({
    id: item.product_id,
    name: item.product_name,
    price: item.product_price,
    quantity: item.qty,
    discount: discount,
    total: item.total,
  }));

  return (
    <tr>
      <td colSpan="7" className="p-0">
        <div className="bg-[#FBFBFB] p-4 rounded-lg mb-4">
          <table className="w-full mb-4 text-[#8B909A]">
            <thead>
              <tr className="text-gray-600 bg-[#FBFBFB]">
                <th className="p-2 text-right">#</th>
                <th className="p-2 text-right">اسم المنتج</th>
                <th className="p-2 text-right">السعر</th>
                <th className="p-2 text-right">الكمية</th>
                <th className="p-2 text-right">الخصم</th>
                <th className="p-2 text-right">الإجمالي</th>
                <th className="flex items-center gap-2 p-2 cursor-pointer">
                  طباعة
                  <IoPrintSharp />
                </th>
              </tr>
            </thead>
            <tbody>
              {mappedDetails.length > 0 ? (
                mappedDetails.map((item, idx) => (
                  <tr
                    key={idx}
                    className="border-b-1 border-b-[#DBDADE] last:border-0"
                  >
                    <td className="p-2">{item.id}</td>
                    <td className="p-2 font-medium">{item.name}</td>
                    <td className="p-2">{item.price}</td>
                    <td className="p-2">x{item.quantity}</td>
                    <td className="p-2 text-pink-500">{item.discount}</td>
                    <td className="p-2">{item.total}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center p-4 text-gray-400">
                    لا توجد تفاصيل لهذا الطلب
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="flex justify-between items-start mt-4">
            <div>
              <ul className="text-gray-500 space-y-1">
                <li className="flex gap-5">
                  <span>المجموع:</span> <span>{order.total_price}</span>
                </li>
                <li className="flex gap-5">
                  <span>التوصيل:</span> <span>{order.shipping}</span>
                </li>
                <li className="flex gap-5">
                  <span>الخصم:</span>{" "}
                  <span className="text-[#EA5455]">{order.discount_code}</span>
                </li>
                <li className="flex gap-5">
                  <span>الإجمالي:</span> <span>{order.total_price}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default OrderDetailsRow;
