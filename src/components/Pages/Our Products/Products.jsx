'use client'
import { useEffect, useState } from "react";
import Products from "../Home/Products/Products";
import styles from "./Products.module.css";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Product from "../Home/Products/Product";
import { useCategories, useCategoriesProducts } from "@/hooks/useAuth";
import { useRouter, useSearchParams } from "next/navigation";

const OurProductsPage = () => {
  const priceRanges = [
    { label: "20 - 50", value: "20 - 50" },
    { label: "60 - 100", value: "60 - 100" },
    { label: "100 - >>>", value: "+100" },
  ];

  const priceSortOptions = [
    { label: "من الأقل للأعلى", value: "asc" },
    { label: "من الأعلى للأقل", value: "desc" },
  ];

  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const [selectedPrices, setSelectedPrices] = useState([]);
  const [tempSelectedPrices, setTempSelectedPrices] = useState([]);

  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryFromURL = searchParams.get("category");

  const { data: categories = [] } = useCategories();
  const { data: categoryProducts, isLoading } = useCategoriesProducts(activeCategory);

  useEffect(() => {
    if (categories.length > 0 && !categoryFromURL) {
      const defaultCategory = categories[0].id.toString();
      setActiveCategory(defaultCategory);
      router.replace(`/our-products?category=${defaultCategory}`);
    } else if (categoryFromURL) {
      setActiveCategory(categoryFromURL);
    }
  }, [categories, categoryFromURL]);

  useEffect(() => {
    if (categoryProducts?.products) {
      handleFilter();
    }
  }, [categoryProducts, selectedPrices, sortOrder]);

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    router.push(`/our-products?category=${categoryId}`);
    setSelectedPrices([]);
    setTempSelectedPrices([]);
    setSortOrder("");
  };

  const handleTempPriceSelection = (value) => {
    setTempSelectedPrices(prev =>
      prev.includes(value)
        ? prev.filter(v => v !== value)
        : [...prev, value]
    );
  };

  const togglePriceFilter = () => {
    setIsPriceOpen(!isPriceOpen);
  };

  const handleFilter = () => {
    if (!categoryProducts?.products) return;

    setSelectedPrices(tempSelectedPrices);

    let filtered = [...categoryProducts.products];

    if (tempSelectedPrices.length > 0) {
      filtered = filtered.filter((product) => {
        const price = product.price_after_discount;
        return tempSelectedPrices.some((range) => {
          if (range === "+100") return price > 100;
          const [min, max] = range.split(" - ").map(Number);
          return price >= min && price <= max;
        });
      });
    }

    if (sortOrder === "asc") {
      filtered.sort((a, b) => a.price_after_discount - b.price_after_discount);
    } else if (sortOrder === "desc") {
      filtered.sort((a, b) => b.price_after_discount - a.price_after_discount);
    }

    setFilteredProducts(filtered);
  };

  const productsToDisplay = filteredProducts.length > 0
    ? filteredProducts
    : categoryProducts?.products || [];

  return (
    <div className="pt-40 mx-10">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* الفلاتر الجانبية */}
        <div className="lg:w-1/4">
          <div className={`${styles["options-wrapper"]} sticky top-32`}>
            <h4 className={styles["heading"]}>تحديد الخيارات</h4>
            <div className="w-full flex flex-col gap-3 ps-5">
              <div
                className="flex items-center justify-between cursor-pointer text-sm font-medium"
                onClick={togglePriceFilter}
              >
                متوسط الأسعار
                {isPriceOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </div>

              {isPriceOpen && (
                <div className="inputs flex flex-col gap-1">
                  {priceRanges.map(({ label, value }) => (
                    <div className="flex gap-3 items-center" key={value}>
                      <input
                        type="checkbox"
                        id={`price-${value}`}
                        checked={tempSelectedPrices.includes(value)}
                        onChange={() => handleTempPriceSelection(value)}
                        className="cursor-pointer"
                      />
                      <label htmlFor={`price-${value}`} className="text-sm cursor-pointer">
                        {label}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={handleFilter}
              className="text-[#EE446E] text-[14px] border-1 border-[#EE446E] w-full py-2.5 rounded-2xl mt-3 cursor-pointer hover:bg-[#EE446E] hover:text-white transition-colors"
            >
              بحث
            </button>
          </div>
        </div>

        {/* قائمة المنتجات */}
        <div className="lg:w-3/4">
          <div dir="ltr" className="flex justify-start mb-6">
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-lg text-right">ترتيب السعر</p>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="p-2 border rounded-md w-48 text-right cursor-pointer"
              >
                <option value="">اختر ترتيب السعر</option>
                {priceSortOptions.map(({ label, value }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-start sticky top-32 z-20 my-8 overflow-x-auto pb-2 bg-white">
            <div className="flex gap-4">
              {categories.map(({ id, name }) => (
                <button
                  key={id}
                  className={`p-2 transition-all rounded-md cursor-pointer whitespace-nowrap ${activeCategory === id.toString()
                      ? "text-[#EE446E] font-medium"
                      : "text-black hover:text-[#EE446E]"
                    }`}
                  onClick={() => handleCategoryChange(id.toString())}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>


          {isLoading ? (
            <div className="flex justify-center py-20">
              <p>جاري تحميل المنتجات...</p>
            </div>
          ) : productsToDisplay.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {productsToDisplay.map((product) => (
                <Product
                  key={product.id}
                  id={product.id}
                  title={product.name}
                  desc={product.name}
                  newPrice={product.price_after_discount}
                  cardImgPath={`https//clinics.soulnbody.net/pharmacy/storage/app/public/${product.image}`}
                />
              ))}
            </div>
          ) : (
            <div className="flex justify-center py-20">
              <p>لا توجد منتجات متاحة حسب الفلاتر المحددة</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-20">
        <Products title="أضيف حديثا" />
      </div>
    </div>
  );
};

export default OurProductsPage;
