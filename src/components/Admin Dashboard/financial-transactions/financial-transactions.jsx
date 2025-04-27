'use client'
import React, { useState, useMemo } from "react";
import { useFinancial } from "@/hooks/useAuth"; 
import SearchBarTransc from "./components/searchbarTransc";
import TranscTableHeader from "./components/Transc-table-header";
import FinancialRow from "./components/Transc-table-row";
import OrderDetailsRow from "./components/Transc-details-row";
import PaginationTransc from "./components/paginationTransc";

const ITEMS_PER_PAGE = 5;

const FinancialTransactions = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("قيد الانتظار");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const { data: orders = [], isLoading, isError } = useFinancial();
  const filteredOrders = useMemo(() => {
    return orders
      .filter((order) => {
        if (activeTab === "قيد الانتظار") return order.status === "pending";
        if (activeTab === "تم الشحن") return order.status === "shipped";
        if (activeTab === "تم التوصيل") return order.status === "delivered";
        if (activeTab === "مؤكدة") return order.status === "confirmed";
        if (activeTab === "يتم المعالجة") return order.status === "in progress";
        if (activeTab === "ملغي") return order.status === "cancelled";
        return true;
      })
      .filter((order) =>
        Object.values(order).some((value) =>
          value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
  }, [orders, activeTab, searchTerm]);

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredOrders.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredOrders, currentPage]);



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
    <div className="bg-white md:p-6 rounded-xl border-b border-[#DFE1E3]">
      <div className="flex justify-between items-center">



        <SearchBarTransc searchTerm={searchTerm} onSearch={handleSearch} />
      </div>


      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] border-collapse rounded-lg overflow-hidden">
          <TranscTableHeader />
          <tbody>
            {paginatedOrders.length > 0 ? (
              paginatedOrders.map((order) => (
                <React.Fragment key={order.order_code}>
                  <FinancialRow
                    order={order}
                    expandedOrderId={expandedOrderId}
                    onToggleDetails={toggleOrderDetails}
                  />
                  {expandedOrderId === order.order_code && (
                    <OrderDetailsRow order={order} />
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

      <PaginationTransc
        currentPage={currentPage}
        totalPages={totalPages}
        filteredOrdersCount={filteredOrders.length}
        paginatedOrdersCount={paginatedOrders.length}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default FinancialTransactions;
