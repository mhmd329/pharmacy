import { ordersStatus } from "@/lib/constants";

const OrderStatusTabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex gap-6 text-gray-500 border-b pb-3">
      {Object.keys(ordersStatus).map((tab, index) => (
        <button
          key={index}
          onClick={() => onTabChange(tab)}
          className={`cursor-pointer pb-2 border-b-2 transition ${
            activeTab === tab
              ? "text-pink-500 border-pink-500"
              : "border-transparent"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
  
};

export default OrderStatusTabs;