import { orderDetails } from "@/lib/constants";
import { IoPrintSharp } from "react-icons/io5";

const OrderDetailsRow = ({ order }) => {
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
              {orderDetails
                .filter((item) => item.product_id === order.id)
                .map((item, idx) => (
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
                ))}
            </tbody>
          </table>
          <div className="flex justify-between items-start mt-4">
            <div>
              <div className="flex items-center gap-20 py-1 text-gray-500">
                <ul>
                  <li className="flex items-center gap-5">
                    <div>المجموع:</div>
                    <div>{order.subtotal}</div>
                  </li>
                  <li className="flex items-center gap-5">
                    <div>التوصيل:</div>
                    <div>{order.shipping}</div>
                  </li>
                  <li className="flex items-center gap-5">
                    <div>الخصم:</div>
                    <div className="text-[#EA5455]">{order.discount}</div>
                  </li>
                  <li className="flex items-center gap-5">
                    <div>الإجمالي:</div>
                    <div>{order.total}</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default OrderDetailsRow;