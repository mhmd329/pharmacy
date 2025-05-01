"use client";
import React, { useState, useMemo } from "react";
import { useOrdersData } from "@/hooks/useAuth";
import OrderStatusTabs from "./components/tabs";
import SearchBar from "./components/searchbar";
import OrderTableHeader from "./components/order-table-header";
import OrderRow from "./components/order-table-row";
import OrderDetailsRow from "./components/order-details-row";
import Pagination from "./components/pagination";
import { useUpdateStatus } from "@/hooks/useAuth";
import { toast } from "react-hot-toast"; // لو مش مستوردها فوق
const ITEMS_PER_PAGE = 5;

const OrdersTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("قيد الانتظار");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const { mutate: updateStatus } = useUpdateStatus();
  const [sortOrder, setSortOrder] = useState("تصفية بالتاريخ");

  const { data, isLoading, isError } = useOrdersData();
  const orders = data || [];

  const filteredOrders = useMemo(() => {
    return orders
      .filter((order) => {
        if (activeTab === "قيد الانتظار") return order.status === "pending";
        if (activeTab === "يتم المعالجة") return order.status === "processing";
        if (activeTab === "تم الشحن") return order.status === "shipped";
        if (activeTab === "تم التوصيل") return order.status === "delivered";
        if (activeTab === "ملغي") return order.status === "cancelled";
        return true;
      })
      .filter((order) =>
        Object.values(order).some((value) =>
          value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
      .sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        if (sortOrder === "newest") {
          return dateB - dateA; // من الأحدث للأقدم
        } else {
          return dateA - dateB; // من الأقدم للأحدث
        }
      });
  }, [orders, activeTab, searchTerm, sortOrder]);

  const allStatusOptions = [
    "pending",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ];
  const handleStatusChange = (orderId, newStatus) => {
    const formData = new FormData();
    formData.append("status", newStatus);
  
    updateStatus(
      { orderId, formData },
      {
        onSuccess: () => {
          toast.success("تم تغيير الحالة بنجاح ✅");
        },
        onError: (error) => {
          toast.error(`فشل في تغيير الحالة ❌: ${error?.message || "حدث خطأ ما"}`);
        },
      }
    );
  };

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredOrders.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredOrders, currentPage]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
    setExpandedOrderId(null);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
    setExpandedOrderId(null);
  };

  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  if (isLoading) return <p className="text-center p-6">جاري تحميل الطلبات...</p>;
  if (isError) return <p className="text-center p-6 text-red-500">حدث خطأ أثناء تحميل الطلبات</p>;

  return (
    <div className="bg-white md:p-6 p-4 rounded-xl border-b border-[#DFE1E3]">
      <OrderStatusTabs activeTab={activeTab} onTabChange={handleTabChange} />

      <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-4">
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border w-full md:w-1/4 h-12 border-[#EE446E] rounded-md text-sm"
        >
          <option disabled> تصفية بالتاريخ</option>
          <option value="newest">من الأحدث إلى الأقدم</option>
          <option value="oldest">من الأقدم إلى الأحدث</option>
        </select>

        <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
      </div>

      <div className="overflow-x-auto mt-6">
        <table className="w-full min-w-[850px] border-collapse rounded-lg ">
          <OrderTableHeader />
          <tbody>
            {paginatedOrders.length > 0 ? (
              paginatedOrders.map((order) => (
                <React.Fragment key={order.order_id}>
                  
                  <OrderRow
                    order={order}
                    expandedOrderId={expandedOrderId}
                    onToggleDetails={toggleOrderDetails}
                    onStatusChange={handleStatusChange}
                    statusOptions={allStatusOptions}
                  />
                  {expandedOrderId === order.order_id && (
                    <OrderDetailsRow order={order} discount={order.discount_code}/>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="p-4 text-center text-gray-500">
                  لا توجد بيانات متاحة
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        filteredOrdersCount={filteredOrders.length}
        paginatedOrdersCount={paginatedOrders.length}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default OrdersTable;
