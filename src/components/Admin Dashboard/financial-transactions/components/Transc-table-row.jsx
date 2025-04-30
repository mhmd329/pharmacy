import React from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { statusColors } from "@/lib/constants";

const FinancialRow = ({ order, expandedOrderId, onToggleDetails }) => {
  const isExpanded = expandedOrderId === order.order_code;

  return (
    <tr
      className={`border-b ${isExpanded ? "border-0" : "border-gray-300"
        } last:border-0 text-gray-700 hover:bg-gray-50 cursor-pointer`}
      onClick={() => onToggleDetails(order.order_code)}
    >
      <td className="p-3 text-center">
        {isExpanded ? (
          <FaChevronUp className="text-gray-500" />
        ) : (
          <FaChevronDown className="text-gray-500" />
        )}
      </td>
      <td className="p-3">{order.order_code}</td>
      <td className="p-3">{new Date(order.created_at).toLocaleDateString()}</td>
      <td className="p-3">{order.username}</td>
      <td className="p-3">{order.total_price_with_delivery} د.أ</td>
      <td className="p-3">
        <div
          className={`flex items-center gap-2 w-fit px-3 py-1 text-sm font-medium rounded-lg ${statusColors[order.status] || "bg-gray-100 text-gray-600"
            }`}
        >
          {order.status}
        </div>
      </td>
    </tr>
  );
};

export default FinancialRow;
