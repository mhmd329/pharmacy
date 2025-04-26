import StatisticsCards from "@/components/Admin Dashboard/Statistics Cards/StatisticsCards";
import SalesChart from "@/components/Admin Dashboard/Sales Chart/SalesChart";
import BestSellingProducts from "@/components/Admin Dashboard/Best Selling Products/BestSellingProducts";

export default function AdminMainPage() {
  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <StatisticsCards />
        <SalesChart />
      </div>
      <BestSellingProducts />
    </div>
  );
}
