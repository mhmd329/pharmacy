import { IoPrintSharp } from "react-icons/io5";

const TranscDetailsRow = ({ order }) => {
  // فحص إذا كان المنتج موجوداً في الطلب
  const product = order ;
  // إذا كان المنتج غير موجود، يمكن التعامل مع المصفوفة الفارغة
  const mappedDetails = product
    ? [
        {
          id: product.order_code,
          name: product.username,
          code: order.order_code,
          price: product.total_price_with_delivery,
          quantity: product.quantity,
          discount: product.payment_method,
          total: (parseFloat(product.product_price) * parseInt(product.quantity)).toFixed(2),
        },
      ]
    : [];

  return (
    <tr>
      <td colSpan="8" className="p-0">
        <div className="bg-[#FBFBFB] p-4 rounded-lg mb-4">
          <table className="w-full mb-4 text-[#8B909A]">
            <thead>
              <tr className="text-gray-600 bg-[#FBFBFB]">
                <th className="p-2 text-right">#</th>
                <th className="p-2 text-right">اسم المنتج</th>
                <th className="p-2 text-right">كود الصنف</th>
                <th className="p-2 text-right">السعر</th>
                <th className="p-2 text-right">الكمية</th>
                <th className="p-2 text-right">الخصم</th>
                <th className="p-2 text-right">الاجمالي</th>
                <th className="flex items-center gap-2 p-2 cursor-pointer">
                  طباعة
                  <IoPrintSharp />
                </th>
              </tr>
            </thead>
            <tbody>
              {mappedDetails.length > 0 ? (
                mappedDetails.map((item, idx) => (
                  <tr key={idx} className="border-b-1 border-b-[#DBDADE] last:border-0">
                    <td className="p-2">{item.id}</td>
                    <td className="p-2 font-medium">{item.name}</td>
                    <td className="p-2">{item.code}</td>
                    <td className="p-2">{item.price}</td>
                    <td className="p-2">x{item.quantity}</td>
                    <td className="p-2 text-pink-500">{item.discount}</td>
                    <td className="p-2">{item.price}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center p-4 text-gray-400">
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
                  <span>السعر:</span> <span>{order.total_price_with_delivery}</span>
                </li>
                <li className="flex gap-5">
                  <span>طريقة الدفع:</span> <span>{order.payment_method}</span>
                </li>
                <li className="flex gap-5">
                  <span>الحالة:</span> <span>{order.status}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default TranscDetailsRow;
