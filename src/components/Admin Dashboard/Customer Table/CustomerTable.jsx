"use client";

import { useState, useEffect, useMemo } from "react";
import { FiSearch } from "react-icons/fi";
import { FaTrash, FaEdit } from "react-icons/fa";
import Pagination from "../../Pagination";
import CustomerForm from "./customerForm";
import { useCustomers } from "@/hooks/useAuth";

const CustomersTable = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [customers, setCustomers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const itemsPerPage = 5;

  const { data, isLoading, isError } = useCustomers();

  useEffect(() => {
    if (data && data.clients) {
      const mappedCustomers = data.clients.map((item, index) => ({
        id: index + 1,
        name: item.client_name,
        email: null,
        phone: item.phone,
        address: item.address,
        orders: item.no_of_orders,
        totalSpent: item.total_sum_of_orders,
      }));
      setCustomers(mappedCustomers);
    }
  }, [data]);

  // حفظ البيانات المفلترة باستخدام useMemo
  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) =>
      Object.values(customer).some((value) =>
        (value ?? "").toString().toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [customers, search]);

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const displayedCustomers = filteredCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSaveCustomer = (customer) => {
    if (selectedCustomer) {
      setCustomers(
        customers.map((c) => (c.id === selectedCustomer.id ? customer : c))
      );
    } else {
      setCustomers([...customers, { ...customer, id: Date.now() }]);
    }
    setShowForm(false);
  };

  if (isLoading) return <div>جاري التحميل...</div>;
  if (isError) return <div>حدث خطأ أثناء تحميل العملاء.</div>;

  return (
    <>
      {!showForm ? (
        <div className="bg-white p-6 rounded-xl border border-gray-200">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="إبحث عن عميل"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1); // إعادة التعيين إلى الصفحة 1 عند البحث
                }}
                className="border-1 border-[#DFE1E3] rounded-full px-2 md:pl-10 md:pr-4 md:py-2 md:w-64 outline-none placeholder:text-[12px] md:placeholder:text-[16px]"
              />
              <FiSearch className="absolute left-3 top-1 md:top-3 text-gray-500" />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] border-collapse rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-100 text-gray-600">
                  <th className="p-3 text-right">الاسم</th>
                  <th className="p-3 text-right">رقم الهاتف</th>
                  <th className="p-3 text-right">عدد الطلبات</th>
                  <th className="p-3 text-right">إجمالي سعر الطلبات</th>
                  <th className="p-3 text-right">العنوان</th>
                  {/* <th className="p-3 text-right">خيارات</th> */}
                </tr>
              </thead>
              <tbody>
                {displayedCustomers.length > 0 ? (
                  displayedCustomers.map((customer, index) => (
                    <tr key={index} className="border-b text-gray-700">
                      <td className="p-3 flex items-center gap-2">
                        <span className="bg-red-200 w-6 h-6 rounded-full"></span>
                        <div>
                          <p className="font-bold">{customer.name}</p>
                          <p className="text-gray-500 text-sm">{customer.email}</p>
                        </div>
                      </td>
                      <td className="p-3">{customer.phone}</td>
                      <td className="p-3">{customer.orders}</td>
                      <td className="p-3">{customer.totalSpent}</td>
                      <td className="p-3">{customer.address}</td>
                      {/* <td className="p-3 flex gap-2">
                        <button
                          className="text-gray-500 hover:text-blue-600"
                          onClick={() => handleEditCustomer(customer.id)}
                        >
                          <FaEdit />
                        </button>
                        <button className="text-gray-500 hover:text-red-600">
                          <FaTrash />
                        </button>
                      </td> */}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="p-3 text-center text-gray-500">
                      لا توجد نتائج للبحث
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Component */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            totalItems={filteredCustomers.length}
            visibleItems={displayedCustomers.length}
          />
        </div>
      ) : (
        <>
          <div className="flex justify-end">
            <button
              onClick={() => setShowForm(false)}
              className="bg-[#EE446E] text-white px-4 py-2 rounded-lg cursor-pointer"
            >
              الرجوع إلى العملاء
            </button>
          </div>
          <CustomerForm
            customerId={selectedCustomer}
            customers={displayedCustomers}
            editCustomer={handleSaveCustomer}
          />
        </>
      )}
    </>
  );
};

export default CustomersTable;
