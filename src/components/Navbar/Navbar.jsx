"use client";
import Link from "next/link";
import Image from "next/image";
import { IoIosSearch } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import styles from "./Navbar.module.css";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CiLogin } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "@/store/slices/modal";
import Login from "../Modals/Login";
import SignUp from "../Modals/Signup";
import Cart from "../Modals/Cart";
import Search from "../Modals/Search";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { modalName } = useSelector((state) => state.modal);

  const navItems = [
    { text: "الرئيسية", path: "/" },
    { text: "من نحن", path: "#footer" },
    { text: "منتجاتنا", path: "/our-products" },
    { text: "تواصل معنا", path: "#footer" },
    { text: "لوحة التحكم", path: "/admin" },
  ];

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="nav-bar bg-[#FDFDFD] py-4 fixed z-50 top-0 left-0 w-full">
      <div className="container md:mx-auto flex justify-between items-center gap-3">
        <div className="logo-wrapper">
          <Image
            src="/imgs/beauty-cosmatics-logo.png"
            alt="logo"
            width={240}
            height={58}
          />
        </div>

        <ul dir="rtl" className="nav hidden md:flex items-center gap-8">
          {navItems.map((item, index) => (
            <li key={index} className={styles["nav-item"]}>
              <Link href={item.path}>{item.text}</Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 md:gap-7 ms-auto md:ms-0">
          <IoIosSearch
            size={25}
            className="cursor-pointer"
            onClick={() => dispatch(openModal("search"))}
          />
          <div className="relative">
            <IoCartOutline
              size={25}
              onClick={() => dispatch(openModal("cart"))}
              className="cursor-pointer"
            />
            {/* البادج بعدد العناصر */}
            <span className="absolute -top-2 -right-2 bg-[#EE446E] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {useSelector((state) =>
                state.cart.cart.reduce((acc, item) => acc + item.quantity, 0)
              )}
            </span>
          </div>

          <CiLogin
            size={25}
            className="cursor-pointer"
            onClick={() => dispatch(openModal("login"))}
          />

          {/* Render Modals */}
          {modalName === "search" && <Search />}
          {modalName === "cart" && <Cart />}
          {modalName === "login" && <Login />}
          {modalName === "signup" && <SignUp />}
        </div>

        <div className="block md:hidden">
          <AiOutlineMenu
            size={25}
            className="cursor-pointer"
            onClick={handleNav}
          />
        </div>

        <ul
          className={
            nav
              ? "fixed md:hidden right-0 top-0 w-[60%] h-full border-r border-r-gray-900 shadow-2xl bg-white  ease-in-out duration-500"
              : "ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 right-[-100%]"
          }
        >
          <div onClick={handleNav} className="flex justify-end py-5 me-5">
            <AiOutlineClose size={25} className="cursor-pointer" />
          </div>

          {navItems.map((item, index) => (
            <li
              key={index}
              className={`px-4 py-2 rounded-xl cursor-pointer duration-300 mb-2
                ${pathname === item.path
                  ? "bg-[#EE446E] text-white font-semibold"
                  : "hover:bg-[#EE446E] hover:text-white"
                }`}
            >
              <Link href={item.path}>{item.text}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
