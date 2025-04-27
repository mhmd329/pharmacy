import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';

const baseUrl = "https://clinics.soulnbody.net/pharmacy/public/api";

const getAuthHeader = () => {
  const token = getCookie('token');
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
    const errorMessage = data.message || "Unknown error";
    console.error(`Error in ${endpoint}:`, errorMessage);
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
        setCookie('token', data.token, {
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

export const useLoginUser = () => {
  return useMutation({
    mutationFn: async (formData) => {
      const data = await fetcher('login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (data.token) {
        setCookie('token', data.token, {
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

export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      try {
        await fetcher('logout', {
          method: 'POST',
          headers: getAuthHeader(),
        });
      } finally {
        deleteCookie('token');
      }
    }
  });
};

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: async (formData) => {
      return fetcher('products', {
        method: "POST",
        headers: { ...getAuthHeader() },
        body: formData,
      });
    },
  });
};

export const useCreateOffer = () => {
  return useMutation({
    mutationFn: async ({ formData }) => {
      return fetcher('offers', {
        method: "POST",
        headers: { ...getAuthHeader() },
        body: formData,
      });
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
        headers: { ...getAuthHeader() },
        body: formData,
      });
    },
  });
};

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: async (orderData) => {
      return fetcher('order', {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeader() },
        body: JSON.stringify(orderData),
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
        headers: { ...getAuthHeader() },
        body: formData,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['orders_data']);
    },
  });
};

// Queries
export const useOffers = () => {
  return useQuery({
    queryKey: ["offers"],
    queryFn: async () => {
      return fetcher('all_offers', {
        headers: getAuthHeader(),
      });
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
        headers: getAuthHeader(),
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
        headers: getAuthHeader(),
      });
      return data.shopping_data || [];
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
        headers: getAuthHeader(),
      });
    },
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,
  });
};
