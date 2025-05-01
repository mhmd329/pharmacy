import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { statusColors } from "@/lib/constants";

const OrderRow = ({ order, expandedOrderId, onToggleDetails, onStatusChange, statusOptions }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isExpanded = expandedOrderId === order.order_id; // هنا التعديل

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsDropdownOpen((prev) => !prev);
  };

  const handleSelectStatus = (status) => {
    onStatusChange(order.order_id, status); // هنا التعديل
    setIsDropdownOpen(false);
    
  };

  return (
    <tr
      className={`border-b ${isExpanded ? "border-0" : "border-gray-300"} last:border-0 text-gray-700 hover:bg-gray-50 cursor-pointer`}
      onClick={() => onToggleDetails(order.order_id)} // هنا التعديل
    >
      <td className="p-3 text-center">
        {isExpanded ? (
          <FaChevronUp className="text-gray-500" />
        ) : (
          <FaChevronDown className="text-gray-500" />
        )}
      </td>
      <td className="p-3">{order.order_id}</td>
      <td className="p-3">{new Date(order.created_at).toLocaleDateString()}</td>
      <td className="p-3">{order.user_name}</td>
      <td className="p-3">{order.total_price} د.أ</td>
      <td className="p-3 relative">
        <div
          onClick={toggleDropdown}
          className={`flex justify-between items-center gap-2 w-40 px-3 py-1 text-sm font-medium rounded-lg ${statusColors[order.status] || "bg-gray-100 text-gray-600"} cursor-pointer`}
        >
          <span>{order.status}</span>
          <FaChevronDown className="text-gray-500" />
        </div>

        {isDropdownOpen && (
          <div className="absolute mt-2 w-44 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-60 overflow-y-auto">
            {statusOptions.map((status) => (
              <div
                key={status}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectStatus(status);
                }}
                className="px-4 py-3 hover:bg-blue-50 text-gray-700 hover:text-blue-600 cursor-pointer text-sm transition-colors duration-200"
              >
                {status}
              </div>
            ))}
          </div>
        )}

      </td>
    </tr>
  );
};

export default OrderRow;
