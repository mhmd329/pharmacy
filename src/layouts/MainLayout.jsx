import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { Suspense } from "react";
const MainLayout = ({children}) => {
    return (<>
        <Navbar />
          {children}

       <Suspense fallback={<div>جاري التحميل...</div>}>
        <Footer />
      </Suspense>
    </>);
}

export default MainLayout;