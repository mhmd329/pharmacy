"use client"

import { closeModal } from "@/store/slices/modal";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useRegisterUser } from "@/hooks/useAuth";
import { toast } from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import { openModal } from "@/store/slices/modal";  // إضافة دالة لفتح الـ login

const SignUp = () => {
    const dispatch = useDispatch();
    const { mutate: registerUser, isLoading } = useRegisterUser();

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            repassword: ""
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required("الاسم مطلوب"),
            email: Yup.string()
                .email("البريد الإلكتروني غير صالح")
                .required("البريد الإلكتروني مطلوب"),
            password: Yup.string()
                .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل")
                .required("كلمة المرور مطلوبة"),
            repassword: Yup.string()
                .oneOf([Yup.ref('password')], "كلمات المرور غير متطابقة")
                .required("تأكيد كلمة المرور مطلوب"),
        }),
        onSubmit: (values) => {
            registerUser({
                name: values.name,
                email: values.email,
                password: values.password,
                password_confirmation: values.repassword,
            }, {
                onSuccess: () => {
                    toast.success("تم التسجيل بنجاح!");
                    dispatch(closeModal()); // إغلاق الـ signUp
                    dispatch(openModal("login")); // فتح الـ login مباشرة
                },
                onError: (error) => {
                    toast.error(error.message || "حدث خطأ أثناء التسجيل");
                }
            });
        },
    });

    return (
        <div dir="rtl" className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-md w-[90%] max-w-xl relative">
                <button
                    className="absolute left-4 top-4 text-gray-500 hover:text-gray-700"
                    onClick={() => dispatch(closeModal())}
                >
                    <IoClose size={25} />
                </button>

                <div className="flex flex-col gap-5 w-full md:w-[70%] mx-auto">
                    <h2 className="text-center text-2xl font-bold text-[#333]">إنشاء حساب</h2>

                    <form onSubmit={formik.handleSubmit} dir="rtl" noValidate>
                        <div className="flex flex-col gap-5">
                            {/* Name */}
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="الاسم"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={`w-full bg-white outline-none border ${formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-[#BFB9CF]'} p-2.5 rounded-lg`}
                                />
                                {formik.touched.name && formik.errors.name && (
                                    <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="البريد الإلكتروني"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={`w-full bg-white outline-none border ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-[#BFB9CF]'} p-2.5 rounded-lg`}
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="كلمة المرور"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={`w-full bg-white outline-none border ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-[#BFB9CF]'} p-2.5 rounded-lg`}
                                />
                                {formik.touched.password && formik.errors.password && (
                                    <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <input
                                    type="password"
                                    name="repassword"
                                    placeholder="تأكيد كلمة المرور"
                                    value={formik.values.repassword}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={`w-full bg-white outline-none border ${formik.touched.repassword && formik.errors.repassword ? 'border-red-500' : 'border-[#BFB9CF]'} p-2.5 rounded-lg`}
                                />
                                {formik.touched.repassword && formik.errors.repassword && (
                                    <p className="text-red-500 text-sm mt-1">{formik.errors.repassword}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className={`rounded-xl px-2.5 py-3 bg-[#EE446E] text-white cursor-pointer hover:bg-[#d13d63] transition-colors ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                disabled={isLoading}
                            >
                                {isLoading ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
