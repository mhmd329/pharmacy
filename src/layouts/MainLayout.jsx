import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";

const MainLayout = ({children}) => {
    return (<>
        <Navbar />
           {children}
         <Footer />
    </>);
}

export default MainLayout;