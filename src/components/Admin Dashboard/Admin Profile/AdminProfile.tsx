"use client";

import { useState, useEffect } from "react";
import AdminProfileForm from "./sections/AdminProfileForm";
import LoginAdmin from "../Admin Profile/AdminLogin/LoginAdmin"; // تأكد إن الباث صح

export default function ProfileSettings() {
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

  return <AdminProfileForm />;
}
