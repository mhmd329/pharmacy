"use client";
import { openSidebar } from "@/store/slices/sidebarSlice";
import Image from "next/image";
import { FaBars } from "react-icons/fa";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { useDispatch } from "react-redux";

const AdminNavbar = () => {
  const dispatch = useDispatch();
  return (
    <div className="stickey top-0 left-0 w-full z-30 bg-white shadow py-4 border-b-1 border-[#E7E7E7]">
      <div className="container mx-auto px-5">
        <div className="flex md:gap-5 justify-between items-center">
          <button
            className="text-2xl md:hidden cursor-pointer"
            onClick={() => dispatch(openSidebar())}
          >
            <FaBars />
          </button>
          <div className="search-input-wrapper md:w-sm hidden md:block">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="ابحث عن منتج"
              className="px-4 py-1 rounded-lg outline-none border-1 border-[#B0B0B0] w-full placeholder:text-[12px] md:placeholder:text-[16px]"
            />
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <div className="admin-info flex items-center gap-2">
              <div className="avatar-wrapper relative w-[40px] h-[36px]">
                <Image
                  src="/imgs/admin/admin-avatar.png"
                  alt="avatar"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="admin-data flex flex-col">
                <h3 className="font-bold text-[#2A2A2A] text-[12px] md:text-[16px]">
                  د/احمد محمود
                </h3>
                <p className="font-normal text-[12px] text-[#727272]">ادمن</p>
              </div>
            </div>
            <div className="notification-wrapper p-1 w-[26px] h-[26px] md:w-[36px] md:h-[36px] bg-[#F6F6F6] flex justify-center items-center rounded-md">
              <MdOutlineNotificationsNone size={30} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
