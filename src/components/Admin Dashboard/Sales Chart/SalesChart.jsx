// "use client";

// import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// const data = [
//   { month: "يناير", sales: 200000000, productsPerOrder: 150000000 },
//   { month: "فبراير", sales: 210000000, productsPerOrder: 140000000 },
//   { month: "مارس", sales: 250000000, productsPerOrder: 180000000 },
//   { month: "ابريل", sales: 230000000, productsPerOrder: 170000000 },
//   { month: "مايو", sales: 270000000, productsPerOrder: 190000000 },
//   { month: "يونية", sales: 280000000, productsPerOrder: 200000000 },
//   { month: "يوليو", sales: 339091888, productsPerOrder: 211411223 },
//   { month: "اغسطس", sales: 300000000, productsPerOrder: 220000000 },
//   { month: "سبتمبر", sales: 310000000, productsPerOrder: 230000000 },
//   { month: "اكتوبر", sales: 330000000, productsPerOrder: 250000000 },
//   { month: "نوفمبر", sales: 350000000, productsPerOrder: 270000000 },
//   { month: "ديسمبر", sales: 360000000, productsPerOrder: 280000000 },
// ];

// // Custom Tooltip
// const CustomTooltip = ({ active, payload }) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="bg-white shadow-md p-3 rounded-lg border border-gray-200">
//         <p className="text-gray-700 font-semibold">{`الشهر: ${payload[0].payload.month}`}</p>
//         <p className="text-yellow-500 font-bold">{`متوسط المبيعات: $${payload[0].value.toLocaleString()}`}</p>
//         <p className="text-red-500 font-bold">{`متوسط المنتجات للطلب: $${payload[1].value.toLocaleString()}`}</p>
//       </div>
//     );
//   }
//   return null;
// };

// const SalesChart = () => {
//   return (
//     <div className="bg-white p-6 rounded-xl border-1 border-[#DFE1E3]">
//       <h2 className="text-right font-semibold text-lg mb-2">المبيعات هذا العام</h2>
//       <div className="flex justify-end space-x-4 mb-4">
//         <div className="flex items-center space-x-2">
//           <span className="w-4 h-4 bg-pink-500 inline-block rounded-full"></span>
//           <span className="text-gray-600">متوسط عدد المنتجات للطلب</span>
//         </div>
//         <div className="flex items-center space-x-2">
//           <span className="w-4 h-4 bg-yellow-400 inline-block rounded-full"></span>
//           <span className="text-gray-600">متوسط المبيعات</span>
//         </div>
//       </div>

//       <ResponsiveContainer width="100%" height={300}>
//         <LineChart data={data}>
//           <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#7E7D7D" }} />
//           <YAxis hide />
//           <Tooltip content={<CustomTooltip />} />
//           <Line type="monotone" dataKey="sales" stroke="#FFD700" strokeWidth={3} dot={false} />
//           <Line type="monotone" dataKey="productsPerOrder" stroke="#FF4081" strokeWidth={3} dot={false} strokeDasharray="5 5" />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default SalesChart;
// "use client";

// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// const data = [
//   { month: "يناير", sales: 200000000, productsPerOrder: 150000000 },
//   { month: "فبراير", sales: 210000000, productsPerOrder: 140000000 },
//   { month: "مارس", sales: 250000000, productsPerOrder: 180000000 },
//   { month: "ابريل", sales: 230000000, productsPerOrder: 170000000 },
//   { month: "مايو", sales: 270000000, productsPerOrder: 190000000 },
//   { month: "يونية", sales: 280000000, productsPerOrder: 200000000 },
//   { month: "يوليو", sales: 339091888, productsPerOrder: 211411223 },
//   { month: "اغسطس", sales: 300000000, productsPerOrder: 220000000 },
//   { month: "سبتمبر", sales: 310000000, productsPerOrder: 230000000 },
//   { month: "اكتوبر", sales: 330000000, productsPerOrder: 250000000 },
//   { month: "نوفمبر", sales: 350000000, productsPerOrder: 270000000 },
//   { month: "ديسمبر", sales: 360000000, productsPerOrder: 280000000 },
// ];

// // Custom Tooltip
// const CustomTooltip = ({ active, payload }) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="bg-white shadow-md p-3 rounded-lg border border-gray-200">
//         <p className="text-gray-700 font-semibold">{`الشهر: ${payload[0].payload.month}`}</p>
//         <p className="text-yellow-500 font-bold">{`متوسط المبيعات: $${payload[0].value.toLocaleString()}`}</p>
//         <p className="text-red-500 font-bold">{`متوسط المنتجات للطلب: $${payload[1].value.toLocaleString()}`}</p>
//       </div>
//     );
//   }
//   return null;
// };

// const SalesChart = () => {
//   return (
//     <div className="bg-white p-6 rounded-xl border-1 border-[#DFE1E3] h-[400px]">
//       <h2 className="text-right font-semibold text-lg mb-2">
//         المبيعات هذا العام
//       </h2>
//       <div className="flex justify-end space-x-4 mb-4">
//         <div className="flex items-center space-x-2">
//           <span className="w-4 h-4 bg-pink-500 inline-block rounded-full"></span>
//           <span className="text-gray-600">متوسط عدد المنتجات للطلب</span>
//         </div>
//         <div className="flex items-center space-x-2">
//           <span className="w-4 h-4 bg-yellow-400 inline-block rounded-full"></span>
//           <span className="text-gray-600">متوسط المبيعات</span>
//         </div>
//       </div>

//       <div className="h-full">
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart data={data}>
//             <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#7E7D7D" }} />
//             <YAxis hide />
//             <Tooltip content={<CustomTooltip />} />
//             <Line
//               type="monotone"
//               dataKey="sales"
//               stroke="#FFD700"
//               strokeWidth={3}
//               dot={false}
//             />
//             <Line
//               type="monotone"
//               dataKey="productsPerOrder"
//               stroke="#FF4081"
//               strokeWidth={3}
//               dot={false}
//               strokeDasharray="5 5"
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default SalesChart;

"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "يناير", sales: 200000000, productsPerOrder: 150000000 },
  { month: "فبراير", sales: 210000000, productsPerOrder: 140000000 },
  { month: "مارس", sales: 250000000, productsPerOrder: 180000000 },
  { month: "ابريل", sales: 230000000, productsPerOrder: 170000000 },
  { month: "مايو", sales: 270000000, productsPerOrder: 190000000 },
  { month: "يونية", sales: 280000000, productsPerOrder: 200000000 },
  { month: "يوليو", sales: 339091888, productsPerOrder: 211411223 },
  { month: "اغسطس", sales: 300000000, productsPerOrder: 220000000 },
  { month: "سبتمبر", sales: 310000000, productsPerOrder: 230000000 },
  { month: "اكتوبر", sales: 330000000, productsPerOrder: 250000000 },
  { month: "نوفمبر", sales: 350000000, productsPerOrder: 270000000 },
  { month: "ديسمبر", sales: 360000000, productsPerOrder: 280000000 },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-md p-3 rounded-lg border border-gray-200">
        <p className="text-gray-700 font-semibold">{`الشهر: ${payload[0].payload.month}`}</p>
        <p className="text-yellow-500 font-bold">{`متوسط المبيعات: $${payload[0].value.toLocaleString()}`}</p>
        <p className="text-red-500 font-bold">{`متوسط المنتجات للطلب: $${payload[1].value.toLocaleString()}`}</p>
      </div>
    );
  }
  return null;
};

const SalesChart = () => {
  return (
    <div className="bg-white p-6 rounded-xl border border-[#DFE1E3] h-full flex flex-col">
      <h2 className="text-right font-semibold text-lg mb-2">
        المبيعات هذا العام
      </h2>
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

      {/* Make the chart take full height */}
      <div className="flex-1 min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
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
