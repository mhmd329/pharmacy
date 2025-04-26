const OrderTableHeader = () => {
  return (
    <thead>
      <tr className="text-gray-600 bg-gray-100">
        <th className="p-3 text-right"></th>
        <th className="p-3 text-right">كود الطلب</th>
        <th className="p-3 text-right">إنشأت</th>
        <th className="p-3 text-right">العميل</th>
        <th className="p-3 text-right">المجموع</th>
        <th className="p-3 text-right">الربح</th>
        <th className="p-3 text-right">الحالة</th>
      </tr>
    </thead>
  );
};

export default OrderTableHeader;