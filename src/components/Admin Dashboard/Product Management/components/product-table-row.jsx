import React from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { statusColors } from "@/lib/constants";

const OrderRow = ({ order, expandedOrderId, onToggleDetails }) => {
  return (
    <React.Fragment>
      <tr
        className={`border-b ${
          expandedOrderId === order.id ? "border-0" : "border-gray-300"
        } last:border-0 text-gray-700 hover:bg-gray-50 cursor-pointer`}
        onClick={() => onToggleDetails(order.id)}
      >
        <td className="p-3 text-center">
          {expandedOrderId === order.id ? (
            <FaChevronUp className="text-gray-500" />
          ) : (
            <FaChevronDown className="text-gray-500" />
          )}
        </td>
        <td className="p-3">{order.id}</td>
        <td className="p-3">{order.created_at}</td>
        <td className="p-3">{order.user_name}</td>
        <td className="p-3">{order.total_price}</td>
        <td className="p-3">
          {order.profit}
          <span className="bg-green-100 text-green-600 px-2 py-1 rounded-md text-xs ml-2">
            {order.profitPercent}
          </span>
        </td>
        <td className="p-3">
          <div
            className={`flex items-center gap-2 w-fit px-3 py-1 text-sm font-medium rounded-lg ${
              statusColors[order.status] || "bg-gray-100 text-gray-600"
            }`}
          >
            {expandedOrderId === order.id ? <FaChevronUp /> : <FaChevronDown />}
            {order.status}
          </div>
        </td>
      </tr>
    </React.Fragment>
  );
};

export default OrderRow;
