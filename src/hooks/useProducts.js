import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";


const getAuthHeader = () => {
  const token = getCookie('token');
  return { Authorization: `Bearer ${token}` };
};

// دالة مشتركة لجلب البيانات
const fetchData = async (url, headers = {}) => {
  try {
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

// استخدامات الـ query

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => fetchData("https://clinics.soulnbody.net/pharmacy/public/api/pro"),
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,
  });
};

export const useSearchProducts = (searchTerm) => {
  return useQuery({
    queryKey: ["search-products", searchTerm],
    queryFn: async () => {
      if (!searchTerm) return [];
      const allProducts = await fetchData("https://clinics.soulnbody.net/pharmacy/public/api/all_products", getAuthHeader());
      return allProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    },
    enabled: !!searchTerm,
    staleTime: 1000 * 60 * 5,
  });
};

export const useProductDetails = (id) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      if (!id) return null;
      return await fetchData(`https://clinics.soulnbody.net/pharmacy/public/api/pro/${id}`);
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};

export const useRecentProducts = () => {
  return useQuery({
    queryKey: ["recent-products"],
    queryFn: () => fetchData("https://clinics.soulnbody.net/pharmacy/public/api/recently-added"),
    staleTime: 1000 * 60 * 5,
  });
};

export const useMostSoldProducts = () => {
  return useQuery({
    queryKey: ["most-sold-products"],
    queryFn: () => fetchData("https://clinics.soulnbody.net/pharmacy/public/api/most-sold"),
    staleTime: 1000 * 60 * 5,
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchData("https://clinics.soulnbody.net/pharmacy/public/api/cats"),
    staleTime: 1000 * 60 * 5,
  });
};

export const useCategoriesProducts = (id) => {
  return useQuery({
    queryKey: ["categories-products", id],
    queryFn: async () => {
      if (!id) return null;
      return await fetchData(`https://clinics.soulnbody.net/pharmacy/public/api/cats/${id}/products`);
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};
