import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCookie, setCookie } from "cookies-next";


const getAuthHeader = () => {
  const tokenUser = getCookie('tokenUserser');
  return { Authorization: `Bearer ${tokenUser}` };
};

// دالة مشتركة لجلب البيانات
const fetchData = async (url, headers = {}) => {
  try {
    const response = await fetch(url, { headers });
    if (!response.ok) {
     console.log("Network response was not ok",response);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

// استخدامات الـ query
export const useLoginUser = () => {
  return useMutation({
    mutationFn: async (formData) => {
      const data = await fetcher('login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (data.token) {
        setCookie('tokenUser', data.token, {
          maxAge: 60 * 60 * 24 * 7,
          path: '/',
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax'
        });
      }

      return data;
    }
  });
};

export const useCancelOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ orderId }) => {
      return fetcher(`cancel_order/${orderId}`, {
        method: "POST",
        headers: { ...getAuthHeader() },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['cancel_order']);
    },
  });
};


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
export const userPendingOrders = () => {
  return useQuery({
    queryKey: ["userPendingOrders"],
    queryFn: async () => {
      return fetchData('https://clinics.soulnbody.net/pharmacy/public/api/userPendingOrders', {
        headers: getAuthHeader(),
      });
    },
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,
    onError: (error) => {
      console.error("Error fetching user pending orders:", error);  // طباعة الخطأ في الكونسول
    },
  });
};
