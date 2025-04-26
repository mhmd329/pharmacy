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

const Sidebar = () => {
  const dispatch = useDispatch();
  const { isSidebarOpen } = useSelector((state) => state.sidebar);
  const pathname = usePathname();
  const [openSubMenu, setOpenSubMenu] = useState(
    pathname.startsWith("/admin/product-management")
  );

  return (
    <>
      <div
        onClick={() => dispatch(closeSidebar())}
        className={`cursor-pointer md:hidden fixed top-0 left-0 w-screen h-screen z-40 bg-black/50 ${
          isSidebarOpen ? "block" : "hidden"
        }`}
      ></div>
      <div
        className={`lg:relative md:block ${
          isSidebarOpen ? "fixed" : "hidden"
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
            <li
              className={`flex items-center p-2 text-gray-700 ${
                pathname === "/admin" ? "bg-pink-100" : "hover:bg-pink-100"
              } rounded-lg`}
            >
              <Link href="/admin" className="flex items-center gap-2">
                <FaHome className="mr-2" /> لوحة التحكم
              </Link>
            </li>

            <li className="flex flex-col">
              <div
                className={`flex items-center justify-between p-2 text-gray-700 rounded-lg cursor-pointer ${
                  openSubMenu ? "bg-pink-100" : "hover:bg-pink-100"
                }`}
                onClick={() => setOpenSubMenu(!openSubMenu)}
              >
                <Link
                  href="/admin/product-management"
                  className="flex items-center justify-between gap-2 w-full"
                >
                  <div className="flex items-center gap-2">
                    <FaBox className="mr-2" /> إدارة المنتجات
                  </div>
                 
                </Link>
              </div>
         
            </li>

            <li
              className={`flex items-center p-2 text-gray-700 ${
                pathname === "/admin/financial-transactions"
                  ? "bg-pink-100"
                  : "hover:bg-pink-100"
              } rounded-lg`}
            >
              <Link
                href="/admin/financial-transactions"
                className="flex items-center gap-2"
              >
                <FaMoneyCheckAlt className="mr-2" /> تحويلات مالية (500)
              </Link>
            </li>

            <li
              className={`flex items-center p-2 text-gray-700 ${
                pathname === "/admin/orders"
                  ? "bg-pink-100"
                  : "hover:bg-pink-100"
              } rounded-lg`}
            >
              <Link href="/admin/orders" className="flex items-center gap-2">
                <FaClipboardList className="mr-2" /> الطلبات (151)
              </Link>
            </li>

            <li
              className={`flex items-center p-2 text-gray-700 ${
                pathname === "/admin/customers"
                  ? "bg-pink-100"
                  : "hover:bg-pink-100"
              } rounded-lg`}
            >
              <Link href="/admin/customers" className="flex items-center gap-2">
                <FaUsers className="mr-2" /> العملاء (200)
              </Link>
            </li>

            <li
              className={`flex items-center p-2 text-gray-700 ${
                pathname === "/admin/profile"
                  ? "bg-pink-100"
                  : "hover:bg-pink-100"
              } rounded-lg`}
            >
              <Link href="/admin/profile" className="flex items-center gap-2">
                <FaCog className="mr-2" /> الحساب والإعدادات
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
