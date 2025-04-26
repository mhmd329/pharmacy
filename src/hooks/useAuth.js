import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';

const getAuthHeader = () => {
  const token = getCookie('token');
  return { Authorization: `Bearer ${token}` };
 
};

export const useLoginAdmin = () => {
  return useMutation({
    mutationFn: async (loginData) => {
      try {
        const response = await fetch("https://clinics.soulnbody.net/pharmacy/public/api/admin/login", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Login failed:", errorData.message || "Unknown error");
          return null;
        }

        const data = await response.json();

        if (data.token) {
          setCookie('token', data.token, {
            maxAge: 60 * 60 * 24 * 7, // أسبوع
            path: '/',
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
          });
        }

        return data;
      } catch (error) {
        console.error("Error during login:", error);
        return null;
      }
    }
  });
};

export const useLoginUser = () => {
  return useMutation({
    mutationFn: async (formData) => {
      try {
        const response = await fetch("https://clinics.soulnbody.net/pharmacy/public/api/login", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "فشل تسجيل الدخول");
        }

        if (!data.token) {
          throw new Error("لا يوجد token في الاستجابة");
        }

        // تخزين التوكن في الكوكيز
        setCookie('token', data.token, {
          maxAge: 60 * 60 * 24 * 7, // أسبوع
          path: '/',
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax'
        });

        return data;
      } catch (error) {
        console.error('Login error:', error);
        throw error;
      }
    }
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      try {
        const response = await fetch("https://clinics.soulnbody.net/pharmacy/public/api/logout", {
          method: 'POST',
          headers: getAuthHeader(),
        });

        // حذف الكوكي بغض النظر عن استجابة الخادم
        deleteCookie('token');

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Logout failed:", errorData.message || "Unknown error");
          return null;
        }

        return response.json();
      } catch (error) {
        console.error("Error during logout:", error);
        throw error;
      }
    }
  });
};

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: async (formData) => {
      try {
        const response = await fetch("https://clinics.soulnbody.net/pharmacy/public/api/products", {
          method: "POST",
          headers: {
            ...getAuthHeader(),
          },
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Product creation failed:", errorData.message || "Unknown error");
          return null;
        }

        return response.json();
      } catch (error) {
        console.error("Error during product creation:", error);
        return null;
      }
    },
  });
};

export const useUpdateStatus = () => {
  const queryClient = useQueryClient(); // استخدم queryClient لتحفيز التحديث

  return useMutation({
    mutationFn: async ({ orderId, formData }) => {
      try {
        const response = await fetch(`https://clinics.soulnbody.net/pharmacy/public/api/orders/${orderId}/update_status`, {
          method: "POST",
          headers: {
            ...getAuthHeader(),
          },
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Status update failed:", errorData.message || "Unknown error");
          return null;
        }

        return response.json();
      } catch (error) {
        console.error("Error during status update:", error);
        return null;
      }
    },
    // بعد إتمام العملية بنجاح، نقوم بتحديث أو إعادة تحميل البيانات
    onSuccess: () => {
      // إلغاء البيانات المخزنة قديمًا
      queryClient.invalidateQueries(['orders_data']); // قم بتحديد اسم الـ query الذي يحتوي على البيانات التي تريد تحديثها
    },
  });
};

export const useCreateOffer = () => {
  const queryClient = useQueryClient(); // استخدم queryClient لتحفيز التحديث

  return useMutation({
    mutationFn: async ({  formData }) => {
      try {
        const response = await fetch(`https://clinics.soulnbody.net/pharmacy/public/api/offers`, {
          method: "POST",
          headers: {
            ...getAuthHeader(),
          },
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Status update failed:", errorData.message || "Unknown error");
          return null;
        }

        return response.json();
      } catch (error) {
        console.error("Error during status update:", error);
        return null;
      }
    },
   
  });
};

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: async (formData) => {
      try {
        const response = await fetch("https://clinics.soulnbody.net/pharmacy/public/api/register", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
          const errorMessage = data.message || "فشل في التسجيل";
          const validationErrors = data.errors ? Object.values(data.errors).flat().join(', ') : '';
          throw new Error(`${errorMessage} ${validationErrors}`);
        }

        return data;
      } catch (error) {
        console.error("Error during registration:", error);
        throw error;
      }
    },
  });
};

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: async (formData) => {
      try {
        const response = await fetch("https://clinics.soulnbody.net/pharmacy/public/api/admin/profile", {
          method: "POST",
          headers: {
            ...getAuthHeader(),
          },
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Profile update failed:", errorData.message || "Unknown error");
          return null;
        }

        return response.json();
      } catch (error) {
        console.error("Error during profile update:", error);
        return null;
      }
    },
  });
};

export const useOffers = () => {
  return useQuery({
    queryKey: ["offers"],
    queryFn: async () => {
      try {
        const response = await fetch("https://clinics.soulnbody.net/pharmacy/public/api/all_offers", {
          headers: {
            ...getAuthHeader(),
          },
        });
                if (!response.ok) {
          console.error("Network response was not ok", response);
          return null;
        }
        return response.json();
      } catch (error) {
        console.error("Error fetching offers:", error);
        return null;
      }
    },
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,

  });
}

export const useOrdersData = () => {
  return useQuery({
    queryKey: ["orders_data"],
    queryFn: async () => {
      try {
        const response = await fetch("https://clinics.soulnbody.net/pharmacy/public/api/orders_data", {
          headers: {
            ...getAuthHeader(),
            

          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Network response was not ok:", errorData);
          throw new Error(errorData.message || "حدث خطأ في تحميل الطلبات");
        }

        const json = await response.json();
        return json.shopping_data || [];
      } catch (error) {
        console.error("Error fetching orders:", error.message);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,
  });
};

export const useFinancial = () => {
  return useQuery({
    queryKey: ["money_transfers"],
    queryFn: async () => {
      try {
        const response = await fetch(
          "https://clinics.soulnbody.net/pharmacy/public/api/money-transfers",
          {
            headers: {
               ...getAuthHeader(),
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Network response was not ok:", errorData);
          throw new Error(errorData.message || "حدث خطأ في تحميل التحويلات المالية");
        }

        const json = await response.json();
        return json;
      } catch (error) {
        console.error("Error fetching money transfers:", error.message);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,
  });
};

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: async (orderData) => {
      try {
        const response = await fetch(
          `https://clinics.soulnbody.net/pharmacy/public/api/order`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              ...getAuthHeader()
            },
            body: JSON.stringify(orderData),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Order creation failed:", errorData);
          throw new Error(errorData.message || "Failed to create order");
        }

        return response.json();
      } catch (error) {
        console.error("Error creating order:", error);
        throw error;
      }
    },
  });
};
// export const useUpdateProfile = () => {
//   return useMutation({
//     mutationFn: async (data) => {
//       const token = localStorage.getItem("token");
//       console.log(token)
//       // تحويل البيانات إلى query params
//       const queryParams = new URLSearchParams({
//         first_name: data.firstName,
//         last_name: data.lastName,
//         email: data.email,
//         birth_date: data.birthDate,
//         gender: data.gender,
//         phone: data.phone,
//         country: data.country,
//       });

//       const url = `https://clinics.soulnbody.net/pharmacy/public/api/admin/profile?${queryParams.toString()}`;

//       try {
//         const response = await fetch(url, {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           const errorData = await response.json();
//           console.error("Profile update failed:", errorData.message || "Unknown error");
//           return null;
//         }

//         return response.json();
//       } catch (error) {
//         console.error("Error during profile update:", error);
//         return null;
//       }
//     },
//   });
// };
