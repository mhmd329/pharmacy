import { useQuery } from "@tanstack/react-query"
import { getCookie } from "cookies-next";

const getAuthHeader = () => {
  const token = getCookie('token');
  return { Authorization: `Bearer ${token}` };
};
export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const response = await fetch("https://clinics.soulnbody.net/pharmacy/public/api/pro");
        if (!response.ok) {
          console.error("Network response was not ok", response);
          return null;
        }
        return response.json();
      } catch (error) {
        console.error("Error fetching products:", error);
        return null;
      }
    },
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,

  });
}
export const useSearchProducts = (searchTerm) => {
  return useQuery({
    queryKey: ["search-products", searchTerm],
    queryFn: async () => {


      try {
        const response = await fetch('https://clinics.soulnbody.net/pharmacy/public/api/all_products', {
          headers: {
            ...getAuthHeader()

          },
        });
        if (!response.ok) {
          console.error("Network response was not ok", response);
          return [];
        }
        const allProducts = await response.json();

        if (!searchTerm) return [];

        return allProducts.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      } catch (error) {
        console.error("Error fetching search products:", error);
        return [];
      }
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
      try {
        const response = await fetch(
          `https://clinics.soulnbody.net/pharmacy/public/api/pro/${id}`
        );
        if (!response.ok) {
          console.error("Network response was not ok", response);
          return null;
        }
        return response.json();
      } catch (error) {
        console.error("Error fetching product details:", error);
        return null;
      }
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};

export const useRecentProducts = () => {
  return useQuery({
    queryKey: ["recent-products"],
    queryFn: async () => {
      try {
        const response = await fetch(
          "https://clinics.soulnbody.net/pharmacy/public/api/recently-added"
        );
        if (!response.ok) {
          console.error("Network response was not ok", response);
          return [];
        }
        return response.json();
      } catch (error) {
        console.error("Error fetching recent products:", error);
        return [];
      }
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useMostSoldProducts = () => {
  return useQuery({
    queryKey: ["most-sold-products"],
    queryFn: async () => {
      try {
        const response = await fetch(
          "https://clinics.soulnbody.net/pharmacy/public/api/most-sold"
        );
        if (!response.ok) {
          console.error("Network response was not ok", response);
          return [];
        }
        return response.json();
      } catch (error) {
        console.error("Error fetching most sold products:", error);
        return [];
      }
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      try {
        const response = await fetch(
          "https://clinics.soulnbody.net/pharmacy/public/api/cats"
        );
        if (!response.ok) {
          console.error("Network response was not ok", response);
          return [];
        }
        return response.json();
      } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
      }
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useCategoriesProducts = (id) => {
  return useQuery({
    queryKey: ["categories-products", id],
    queryFn: async () => {
      if (!id) return null;
      try {
        const response = await fetch(
          `https://clinics.soulnbody.net/pharmacy/public/api/cats/${id}/products`
        );
        if (!response.ok) {
          console.error("Network response was not ok", response);
          return null;
        }
        return response.json();
      } catch (error) {
        console.error("Error fetching category products:", error);
        return null;
      }
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};
