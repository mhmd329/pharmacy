import { openModal } from '@/store/slices/modal';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getCookie, setCookie } from 'cookies-next';
import { toast } from "react-hot-toast"; // تأكد إنه متركب
import { useDispatch } from "react-redux";

const baseUrl = "https://clinics.soulnbody.net/pharmacy/public/api";

export const getAuthHeaderAdmin = () => {
  const token = getCookie('tokenAdmin');
  return { Authorization: `Bearer ${token}` };
};

const fetcher = async (endpoint, { method = "GET", headers = {}, body } = {}) => {
  const response = await fetch(`${baseUrl}/${endpoint}`, {
    method,
    headers: { ...headers },
    body,
  });

  const data = await response.json();

  if (!response.ok) {
    const errorMessage = data?.message || "Unknown error";

    // نفتح مودال تسجيل الدخول لأي خطأ
    store.useDispatch(openModal("login"));

    // لو حابب تظهر رسالة Toast
    toast.error(errorMessage);

    throw new Error(errorMessage);
  }

  return data;
};
// Mutations
export const useLoginAdmin = () => {
  return useMutation({
    mutationFn: async (loginData) => {
      const data = await fetcher('admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      if (data.token) {
        setCookie('tokenAdmin', data.token, {
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



export const useCreateProduct = () => {
  return useMutation({
    mutationFn: async (formData) => {
      return fetcher('products', {
        method: "POST",
        headers: { ...getAuthHeaderAdmin() },
        body: formData,
      });
    },
  });
};
export const useCreateOffer = () => {
  return useMutation({
    mutationFn: async (formData) => {
      console.log("📤 formData:", formData);

      try {
        const response = await fetcher("offers", {
          method: "POST",
          headers: {
            ...getAuthHeaderAdmin(), // تأكد إنه بيرجع Authorization فقط بدون Content-Type
          },
          body: formData,
        });

        console.log("✅ API Response:", response);
        return response;
      } catch (error) {
        console.error("❌ API Error:", error);
      }
    },
  });
};

export const useUpdatePro = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ formData, productId }) => {
      return fetcher(`products/${productId}/update`, {
        method: "POST",
        headers: {
          ...getAuthHeaderAdmin(),
        },
        body: formData, // أرسل formData مباشرة هنا بدون JSON.stringify
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
    },
    onError: (error) => {
      console.error("Error updating product:", error);
      alert("حدث خطأ أثناء تحديث المنتج. يرجى المحاولة مرة أخرى.");
    },
  });
};



export const useRegisterUser = () => {
  return useMutation({
    mutationFn: async (formData) => {
      return fetcher('register', {
        method: "POST",
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formData),
      });
    },
  });
};

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: async (formData) => {
      return fetcher('admin/profile', {
        method: "POST",
        headers: { ...getAuthHeaderAdmin() },
        body: formData,
      });
    },
  });
};


export const useUpdateStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ orderId, formData }) => {
      return fetcher(`orders/${orderId}/update_status`, {
        method: "POST",
        headers: { ...getAuthHeaderAdmin() },
        body: formData,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['orders_data']);
    },
  });
};



export const useOffers = () => {
  return useQuery({
    queryKey: ["offers"],
    queryFn: async () => {
      return fetcher('all_offers');
    },
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,
  });
};

export const useCustomers = () => {
  return useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      return fetcher('admin/clients/order-details', {
        headers: getAuthHeaderAdmin(),
      });
    },
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,
  });
};

export const useOrdersData = () => {
  return useQuery({
    queryKey: ["orders_data"],
    queryFn: async () => {
      const data = await fetcher('orders_data', {
        headers: getAuthHeaderAdmin(),
      });
      return data.orders || [];
    },
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,
  });
};
export const useGetMonthlyAverages = () => {
  return useQuery({
    queryKey: ["getMonthlyAverages"],
    queryFn: async () => {
      const data = await fetcher('admin/getMonthlyAverages', {
        headers: getAuthHeaderAdmin(),
      });
      return data.monthly_averages || {}; // إرجاع كائن فارغ بدلاً من مصفوفة
    },
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,
  });
};

export const useFinancial = () => {
  return useQuery({
    queryKey: ["money_transfers"],
    queryFn: async () => {
      return fetcher('money-transfers', {
        headers: getAuthHeaderAdmin(),
      });
    },
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,
  });
};

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      return fetcher('admin/getDashboardStats', {
        headers: getAuthHeaderAdmin(),
      });
    },
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,
  });
};

export const useMostSold = () => {
  return useQuery({
    queryKey: ["products/most-sold"],
    queryFn: async () => {
      return fetcher('products/most-sold', {
        headers: getAuthHeaderAdmin(),
      });
    },
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,
  });
};




//for token user

const getAuthHeaderUser = () => {
  const token = getCookie("tokenUser");
  return { Authorization: `Bearer ${token}` };
};

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

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: async (orderData) => {
      return fetcher('order', {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaderUser() },
        body: JSON.stringify(orderData),
      });
    },
  });
};

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => fetcher("pro"),
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,
  });
};

export const useSearchProducts = (searchTerm) => {
  return useQuery({
    queryKey: ["search-products", searchTerm],
    queryFn: async () => {
      if (!searchTerm) return [];
      const allProducts = await fetcher("all_products", getAuthHeaderUser());
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
      return await fetcher(`pro/${id}`);
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};

export const useRecentProducts = () => {
  return useQuery({
    queryKey: ["recent-products"],
    queryFn: () => fetcher("recently-added"),
    staleTime: 1000 * 60 * 5,
  });
};

export const useMostSoldProducts = () => {
  return useQuery({
    queryKey: ["most-sold-products"],
    queryFn: () => fetcher("most-sold"),
    staleTime: 1000 * 60 * 5,
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => fetcher("cats"),
    staleTime: 1000 * 60 * 5,
  });
};

export const useCategoriesProducts = (id) => {
  return useQuery({
    queryKey: ["categories-products", id],
    queryFn: async () => {
      if (!id) return null;
      return await fetcher(`cats/${id}/products`);
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
};

export const useUserOrders = () => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["useUserOrders"],
    queryFn: async () => {
      const headers = getAuthHeaderUser();  // تأكد من أن التوكن في الـ headers

      const data = await fetcher("userOrders", {headers});

      if (!data || !data.orders) {
        console.error("No pending_orders in the response");
        return [];
      }

      return data.orders;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['useUserOrders']);
    },
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,
    onError: (error) => {
      console.error("Error fetching user pending orders:", error);
    },
  });
};export const useCancelOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ orderId }) => {
      const data = await fetcher(`cancel_order/${orderId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaderUser(),
        },
      });

      // إذا كان الخادم يُرجع رسالة خطأ في البيانات
      if (data?.error) {
        console.error("API Error:", data.error);
      }

      return data; // إرجاع البيانات إذا نجح الطلب
    },
    onSuccess: () => {
      toast.success("تم إلغاء الطلب بنجاح");
      queryClient.invalidateQueries(["userPendingOrders"]); // إعادة جلب البيانات بعد الإلغاء
    },
    onError: (error) => {
      toast.error(error.message || "حدث خطأ أثناء إلغاء الطلب");
    },
  });
};