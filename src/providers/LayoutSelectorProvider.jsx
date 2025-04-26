"use client";

import MainLayout from "@/layouts/MainLayout";
import AdminLayout from "@/layouts/AdminLayout";
import { usePathname } from "next/navigation";

const LayoutSelectorProvider = ({ children }) => {
    const pathname = usePathname();
    const isAdminRoute = pathname.startsWith("/admin");
    if (isAdminRoute) {
        return <AdminLayout>{children}</AdminLayout>;
    }
    return (
        <MainLayout>{children}</MainLayout>
    );
}

export default LayoutSelectorProvider;