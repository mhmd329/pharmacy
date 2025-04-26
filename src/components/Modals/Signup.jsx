'use client'
import { closeModal } from "@/store/slices/modal";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useRegisterUser } from "@/hooks/useAuth";
import { useState } from "react";
import { toast } from "react-hot-toast";

const SignUp = () => {
    const dispatch = useDispatch();
    const { mutate: registerUser, isLoading } = useRegisterUser();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        repassword: ""
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // مسح رسالة الخطأ عند تعديل الحقل
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name) newErrors.name = "الاسم مطلوب";
        if (!formData.email) newErrors.email = "البريد الإلكتروني مطلوب";
        else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "بريد إلكتروني غير صالح";
        if (!formData.password) newErrors.password = "كلمة المرور مطلوبة";
        else if (formData.password.length < 6) newErrors.password = "يجب أن تكون كلمة المرور 6 أحرف على الأقل";
        if (formData.password !== formData.repassword) newErrors.repassword = "كلمات المرور غير متطابقة";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        try {
            await registerUser({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                password_confirmation: formData.repassword
            }, {
                onSuccess: (data) => {
                    toast.success("تم التسجيل بنجاح!");
                    dispatch(closeModal());
                },
                onError: (error) => {
                    toast.error(error.message || "حدث خطأ أثناء التسجيل");
                }
            });
        } catch (error) {
            console.error("Registration error:", error);
            toast.error("حدث خطأ غير متوقع");
        }
    };

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
                    
                    <form onSubmit={handleSubmit} dir="rtl" noValidate>
                        <div className="flex flex-col gap-5">
                            {/* Name Field */}
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="الاسم"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`w-full bg-white outline-none border ${
                                        errors.name ? 'border-red-500' : 'border-[#BFB9CF]'
                                    } p-2.5 rounded-lg`}
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                            </div>
                            
                            {/* Email Field */}
                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="البريد الإلكتروني"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full bg-white outline-none border ${
                                        errors.email ? 'border-red-500' : 'border-[#BFB9CF]'
                                    } p-2.5 rounded-lg`}
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </div>
                            
                            {/* Password Field */}
                            <div>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="كلمة المرور"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`w-full bg-white outline-none border ${
                                        errors.password ? 'border-red-500' : 'border-[#BFB9CF]'
                                    } p-2.5 rounded-lg`}
                                />
                                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                            </div>
                            
                            {/* Confirm Password Field */}
                            <div>
                                <input
                                    type="password"
                                    name="repassword"
                                    placeholder="تأكيد كلمة المرور"
                                    value={formData.repassword}
                                    onChange={handleChange}
                                    className={`w-full bg-white outline-none border ${
                                        errors.repassword ? 'border-red-500' : 'border-[#BFB9CF]'
                                    } p-2.5 rounded-lg`}
                                />
                                {errors.repassword && <p className="text-red-500 text-sm mt-1">{errors.repassword}</p>}
                            </div>
                            
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`rounded-xl px-2.5 py-3 bg-[#EE446E] text-white ${
                                    isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#d13d63]'
                                } transition-colors`}
                            >
                                {isLoading ? 'جاري التسجيل...' : 'إنشاء حساب'}
                            </button>
                        </div>
                    </form>
                    
                    {/* Divider */}
                    <div className="flex items-center justify-between">
                        <div className="flex-1 border-t border-[#B0A6BD]"></div>
                        <span className="px-4 text-[#B0A6BD]">أو</span>
                        <div className="flex-1 border-t border-[#B0A6BD]"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;