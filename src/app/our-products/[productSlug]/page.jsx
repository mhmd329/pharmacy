"use client";
import ProductDetails from '@/components/Pages/Product Details/ProductDetails';
import { useProductDetails } from '@/hooks/useAuth';
import { useParams } from 'next/navigation';

const Product = () => {
    const params = useParams();
    const { productSlug } = params;

    const { data: product } = useProductDetails(productSlug);
    console.log(product);

    return (
        <ProductDetails product={product} />
  );
};

export default Product;