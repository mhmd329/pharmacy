"use client";

import { closeSidebar } from "@/store/slices/sidebarSlice";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  FaHome,
  FaBox,
  FaMoneyCheckAlt,
  FaClipboardList,
  FaUsers,
  FaCog,
} from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useFinancial,useOrdersData,useCustomers,useOffers,useCategories} from "@/hooks/useAuth";
import { DotLoader } from "react-spinners"; // استيراد الـ DotLoader
const Sidebar = () => {
  const dispatch = useDispatch();
  const { isSidebarOpen } = useSelector((state) => state.sidebar);
  const pathname = usePathname();
  const { data: categories, isLoading: isLoadingCategories } = useCategories(); 
  const { data: financialTransactions = [] } = useFinancial();
  const { data: orders = [] } = useOrdersData();
  const { data: clientsData = [] } = useCustomers();
  const { data: offers = [] } = useOffers();

  // حالة لتخزين الرابط النشط
  const [activeLink, setActiveLink] = useState(pathname);
  const [isLoading, setIsLoading] = useState(false);
  const handleLinkClick = (link) => {

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000);
    setActiveLink(link);
    // إغلاق الشريط الجانبي
    dispatch(closeSidebar());
  };



  return (
    <>
      {/* عرض الـ loading أثناء التوجيه */}
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full bg-opacity-50 bg-gray-900 flex items-center justify-center z-50">
          <DotLoader size={50} color="#EE446E" />
        </div>
      )}
      <div
        onClick={() => dispatch(closeSidebar())}
        className={`cursor-pointer md:hidden fixed top-0 left-0 w-screen h-screen z-40 bg-black/50 ${isSidebarOpen ? "block" : "hidden"
          }`}
      >
      </div>
      <div
        className={`lg:relative md:block ${isSidebarOpen ? "fixed" : "hidden"
          } start-0 top-0 z-50 w-80 bg-white h-screen shadow-lg p-4 flex flex-col`}
      >
        <div
          className="md:hidden font-extrabold text-2xl"
          onClick={() => dispatch(closeSidebar())}
        >
          <IoClose size={25} className="cursor-pointer" />
        </div>
        <div className="self-center logo-wrapper relative w-[130px] h-[66px]">
          <Image
            src="/imgs/logos/beauty-cosmetics-logo.png"
            alt="logo"
            fill
            className="object-cover"
          />
        </div>

        <nav className="mt-5">
          <ul className="space-y-2">
            <Link href="/PharmaAdmin" onClick={() => handleLinkClick("/admin")} className="flex items-center gap-2">
              <li
                className={`flex items-center p-2 text-gray-700 ${activeLink === "/admin" ? "bg-pink-100" : "hover:bg-pink-100"
                  } rounded-lg`}
              >
                <FaHome className="mr-2" /> لوحة التحكم
              </li>
            </Link>
            <Link href="/PharmaAdmin/product-management" onClick={() => handleLinkClick("/PharmaAdmin/product-management")} className="flex items-center gap-2">
              <li
                className={`flex items-center p-2 text-gray-700 ${activeLink === "/PharmaAdmin/product-management" ? "bg-pink-100" : "hover:bg-pink-100"} rounded-lg`}
              >
                <FaMoneyCheckAlt className="mr-2" /> ادارة المنتجات
              </li>
            </Link>
            <Link href="/PharmaAdmin/category-management" onClick={() => handleLinkClick("/PharmaAdmin/category-management")} className="flex items-center gap-2">
              <li
                className={`flex items-center p-2 text-gray-700 ${activeLink === "/PharmaAdmin/category-management" ? "bg-pink-100" : "hover:bg-pink-100"} rounded-lg`}
              >
                <FaMoneyCheckAlt className="mr-2" /> ادارة الفئات ({categories?.length || 0})
             </li>
            </Link>
            <Link href="/PharmaAdmin/offer-management" onClick={() => handleLinkClick("/PharmaAdmin/offer-management")} className="flex items-center gap-2">
              <li
                className={`flex items-center p-2 text-gray-700 ${activeLink === "/PharmaAdmin/offer-management" ? "bg-pink-100" : "hover:bg-pink-100"} rounded-lg`}
              >
                <FaMoneyCheckAlt className="mr-2" /> ادارة العروض  ({offers?.data?.length || 0})
              </li>
            </Link>

            {/* تحويلات مالية */}
            <Link href="/PharmaAdmin/financial-transactions" onClick={() => handleLinkClick("/PharmaAdmin/financial-transactions")} className="flex items-center gap-2">
              <li
                className={`flex items-center p-2 text-gray-700 ${activeLink === "/PharmaAdmin/financial-transactions" ? "bg-pink-100" : "hover:bg-pink-100"} rounded-lg`}
              >
                <FaMoneyCheckAlt className="mr-2" /> تحويلات مالية ({financialTransactions?.length || 0})
              </li>
            </Link>

            {/* الطلبات */}
            <Link href="/PharmaAdmin/orders" onClick={() => handleLinkClick("/PharmaAdmin/orders")} className="flex items-center gap-2">
              <li
                className={`flex items-center p-2 text-gray-700 ${activeLink === "/PharmaAdmin/orders" ? "bg-pink-100" : "hover:bg-pink-100"} rounded-lg`}
              >
                <FaClipboardList className="mr-2" /> الطلبات ({orders?.length || 0})
              </li>
            </Link>

            {/* العملاء */}
            <Link href="/PharmaAdmin/customers" onClick={() => handleLinkClick("/PharmaAdmin/customers")} className="flex items-center gap-2">
              <li
                className={`flex items-center p-2 text-gray-700 ${activeLink === "/PharmaAdmin/customers" ? "bg-pink-100" : "hover:bg-pink-100"} rounded-lg`}
              >
                <FaUsers className="mr-2" /> العملاء ({clientsData?.clients?.length || 0})
              </li>
            </Link>


            <Link href="/PharmaAdmin/profile" onClick={() => handleLinkClick("/PharmaAdmin/profile")} className="flex items-center gap-2">
              <li
                className={`flex items-center p-2 text-gray-700 ${activeLink === "/PharmaAdmin/profile"
                  ? "bg-pink-100"
                  : "hover:bg-pink-100"
                  } rounded-lg`}
              >
                <FaCog className="mr-2" /> الحساب والإعدادات
              </li>
            </Link>

          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
