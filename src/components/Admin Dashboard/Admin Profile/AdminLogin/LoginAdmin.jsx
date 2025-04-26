import React, { useState } from "react";
import Image from "next/image";
import logo from "../../LogoLogin.png";
import { useLoginAdmin} from "@/hooks/useAuth"; 

const LoginAdmin = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const loginMutation = useLoginAdmin();

    const handleLogin = async () => {
        try {
            const res = await loginMutation.mutateAsync({ email, password });

            localStorage.setItem("admin_token", res.token);
            localStorage.setItem("admin_user", JSON.stringify(res.data));

            onLoginSuccess();
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center ml-auto justify-center bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-sm text-center">
                <div className="flex justify-center mb-6">
                    <Image src={logo} alt="Logo" width={80} height={80} />
                </div>
                <h2 className="text-xl font-bold mb-4"> مرحبا بعودتك</h2>
                <h4>قم بتسجيل الدخول للتحكم بصيدليتك بنظام</h4>
                <input
                    type="email"
                    placeholder="الايميل"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 mb-3 w-full rounded"
                />

                <input
                    type="password"
                    placeholder="الباسوورد"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 mb-3 w-full rounded"
                />

                <button
                    onClick={handleLogin}
                    className="bg-[#EE446E] hover:bg-red-600 text-white w-full py-2 rounded transition"
                    disabled={loginMutation.isLoading}
                >
                    {loginMutation.isLoading ? "جاري الدخول..." : "تسجيل الدخول"}
                </button>
            </div>
        </div>
    );
};

export default LoginAdmin;
