import Categories from "./Categories/Categories";
import CliniqueProduct from "./CliniqueProduct/CliniqueProduct";
import HeroSection from "./HeroSection/HeroSection";
import Logos from "./Logos/Logos";
import Offers from "./Offers/Offers";
import Products from "./Products/Products";
//as
const HomePage = () => {
    return (<div>
        <HeroSection />
        <Categories />
        <Products title="المنتجات"/>
        <Logos />
        <Offers />
        <Products title="الأكثر مبيعا"/>
        <CliniqueProduct/>
    </div>);
}

export default HomePage;