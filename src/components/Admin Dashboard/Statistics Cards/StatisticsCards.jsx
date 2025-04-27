'use client'
import StatisticsCard from "./StatisticsCard";
import { useDashboardStats } from "@/hooks/useAuth";
const StatisticsCards = () => {
  const { data: Average } = useDashboardStats();

  if (!Average) {
    return <div>Loading...</div>; // عرض رسالة تحميل أو مكون مؤقت
  }

  return (
    <div className="grid grid-cols-2 gap-2 md:gap-6">
      <StatisticsCard
        title={"اجمالي العملاء"}
        precent={"1.5%"}
        number={Average.all_users}
      />
      <StatisticsCard
        title={"عائد الربح"}
        precent={"10.6%"}
        number={Average.net_profit}
        mainTitleColor="text-white"
        mainBg="bg-[#EE446E]"
        precentColor="text-[#00FF0C]"
        strokeColor="#00FF0C"
        numberColor="text-white"
        subTitleColor="text-[#F6F6F6]"
      />
      <StatisticsCard
        title={"عدد المنتجات"}
        precent={"1.5%"}
        number={Average.total_products}
      />
      <StatisticsCard
        title={"اجمالي التحويلات"}
        precent={"3.6%"}
        number={Average.total_orders}
      />
    </div>
  );
};

export default StatisticsCards;
