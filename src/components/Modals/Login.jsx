"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeModal, openModal } from "@/store/slices/modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IoClose } from "react-icons/io5";
import { useLoginUser } from "@/hooks/useProducts";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

const Login = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const login = useLoginUser();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("البريد الإلكتروني غير صالح")
        .required("البريد الإلكتروني مطلوب"),
      password: Yup.string()
        .min(6, "كلمة المرور يجب أن تكون على الأقل 6 أحرف")
        .required("كلمة المرور مطلوبة"),
    }),
    onSubmit: (values) => {
      console.log('Form submitted with values:', values);
      login.mutate(values);
    },
  });

  useEffect(() => {
    console.log('Login effect triggered', {
      isSuccess: login.isSuccess,
      isError: login.isError,
      data: login.data,
      error: login.error
    });

    if (login.isSuccess) {
      if (login.data?.token) {
        localStorage.setItem("token", login.data.token);
        console.log('Token stored:', login.data.token);
        
        // تخزين بيانات المستخدم إذا كانت متوفرة في الاستجابة
        if (login.data.user) {
          localStorage.setItem("user", JSON.stringify(login.data.user));
        }
        
        toast.success("تم تسجيل الدخول بنجاح");
        queryClient.invalidateQueries();
        formik.resetForm();
        dispatch(closeModal());
      } else {
        console.warn('Login successful but no token received');
        toast.error("حدث خطأ أثناء تسجيل الدخول - لا يوجد token");
      }
    }

    if (login.isError) {
      console.error('Login error:', login.error);
      toast.error(login.error?.message || "فشل تسجيل الدخول. تأكد من البيانات وحاول مرة أخرى.");
    }
  }, [login.isSuccess, login.isError, login.data, login.error, dispatch, formik, queryClient]);

  return (
    <div
      dir="rtl"
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
    >
      <div className="bg-white p-6 rounded-md w-[90%] max-w-xl relative">
        {/* Close Button */}
        <button
          className="absolute left-4 top-4 text-gray-500 hover:text-gray-700"
          onClick={() => dispatch(closeModal())}
        >
          <IoClose size={25} />
        </button>

        {/* Form Content */}
        <div className="flex flex-col gap-5 w-full md:w-[70%] mx-auto font-normal text-[16px]">
          <h2 className="text-center text-2xl font-bold text-[#333]">تسجيل الدخول</h2>

          <form onSubmit={formik.handleSubmit} noValidate>
            <div className="flex flex-col gap-5">
              {/* Email */}
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="البريد الالكتروني"
                  className={`w-full bg-white outline-none border ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-[#BFB9CF]'} p-2.5 rounded-lg`}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="كلمة المرور"
                    className={`w-full bg-white outline-none border ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-[#BFB9CF]'} p-2.5 rounded-lg pr-10`}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <button
                    type="button"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? 'إخفاء' : 'إظهار'}
                  </button>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`rounded-xl px-2.5 py-3 bg-[#EE446E] text-white cursor-pointer hover:bg-[#d13d63] transition-colors ${login.isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                disabled={login.isLoading}
              >
                {login.isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    جارٍ تسجيل الدخول...
                  </span>
                ) : 'تسجيل الدخول'}
              </button>
            </div>
          </form>

          {/* Link to Signup */}
          <p className="text-[#697586] text-center">
            ليس لديك حساب؟{' '}
            <button
              className="text-[#EE446E] font-medium hover:underline focus:outline-none"
              onClick={() => dispatch(openModal("signup"))}
            >
              إنشاء حساب جديد
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;