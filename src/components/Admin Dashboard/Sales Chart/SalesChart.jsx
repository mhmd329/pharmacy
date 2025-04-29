"use client";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useGetMonthlyAverages } from '@/hooks/useAuth';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-md p-3 rounded-lg border border-gray-200">
        <p className="text-gray-700 font-semibold">{`الشهر: ${payload[0].payload.month}`}</p>
        <p className="text-yellow-500 font-bold">{`متوسط المبيعات: ${payload[0].value.toLocaleString()}`}</p>
        <p className="text-red-500 font-bold">{`متوسط المنتجات للطلب: ${payload[1].value.toLocaleString()}`}</p>
      </div>
    );
  }
  return null;
};

const SalesChart = () => {
  const { data, isLoading, isError } = useGetMonthlyAverages();  // استخدام الـ hook

  if (isLoading) {
    return <div>جاري التحميل...</div>;
  }

  if (isError) {
    return <div>حدث خطأ في تحميل البيانات.</div>;
  }

  // إذا كانت البيانات غير موجودة أو فارغة، اعرض رسمًا بيانيًا فارغًا
  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl border border-[#DFE1E3] h-full flex flex-col">
        <h2 className="text-right font-semibold text-lg mb-2">المبيعات هذا العام</h2>
        <div className="flex justify-end space-x-4 mb-4">
          <div className="flex items-center space-x-2">
            <span className="w-4 h-4 bg-pink-500 inline-block rounded-full"></span>
            <span className="text-gray-600">متوسط عدد المنتجات للطلب</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-4 h-4 bg-yellow-400 inline-block rounded-full"></span>
            <span className="text-gray-600">متوسط المبيعات</span>
          </div>
        </div>
        {/* عرض رسم بياني فارغ */}
        <div className="flex-1 min-h-[200px] flex items-center justify-center">
          <p className="text-gray-600">لا توجد بيانات لعرضها</p>
        </div>
      </div>
    );
  }

  // تحويل البيانات لتناسب الشكل المطلوب
  const formattedData = Object.entries(data).map(([month, averages]) => {
    const monthNames = [
      "يناير", "فبراير", "مارس", "ابريل", "مايو", "يونية",
      "يوليو", "اغسطس", "سبتمبر", "اكتوبر", "نوفمبر", "ديسمبر"
    ];
    return {
      month: monthNames[parseInt(month) - 1], // تحويل الشهر الرقمي إلى اسم الشهر
      sales: averages.average_sales_per_order,  // المتوسط الخاص بالمبيعات
      productsPerOrder: averages.average_products_per_order, // المتوسط الخاص بالمنتجات لكل طلب
    };
  });

  return (
    <div className="bg-white p-6 rounded-xl border border-[#DFE1E3] h-full flex flex-col">
      <h2 className="text-right font-semibold text-lg mb-2">المبيعات هذا العام</h2>
      <div className="flex justify-end space-x-4 mb-4">
        <div className="flex items-center space-x-2">
          <span className="w-4 h-4 bg-pink-500 inline-block rounded-full"></span>
          <span className="text-gray-600">متوسط عدد المنتجات للطلب</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-4 h-4 bg-yellow-400 inline-block rounded-full"></span>
          <span className="text-gray-600">متوسط المبيعات</span>
        </div>
      </div>

      <div className="flex-1 min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={formattedData}>
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#7E7D7D" }} />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#FFD700"
              strokeWidth={3}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="productsPerOrder"
              stroke="#FF4081"
              strokeWidth={3}
              dot={false}
              strokeDasharray="5 5"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesChart;
