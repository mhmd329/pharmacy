'use client'
import Sidebar from "@/components/Admin Dashboard/Sidebar/Sidebar";
import AdminNavbar from "@/components/Admin Dashboard/Navbar/Navbar";
import LoginAdmin from "@/components/Admin Dashboard/Admin Profile/AdminLogin/LoginAdmin";
import { useEffect, useState } from "react";

const AdminLayout = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (token) setIsLoggedIn(true);
  }, []);
  

  const handleLoginSuccess = (token) => {
    localStorage.setItem("admin_token", token);
    setIsLoggedIn(true);
  };
  if (!isLoggedIn) {
    return <LoginAdmin onLoginSuccess={handleLoginSuccess} />;
  }
  return (
    <div className="flex h-screen overflow-hidden w-full">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen relative overflow-hidden">
        {/* Navbar */}
        <AdminNavbar />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto scrollbar p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
