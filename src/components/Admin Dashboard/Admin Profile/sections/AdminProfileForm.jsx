'use client';
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { FaRegEdit } from "react-icons/fa";
import dynamic from "next/dynamic";
import { Country } from "country-state-city";
import { useUpdateProfile } from "@/hooks/useAuth";

const Select = dynamic(() => import("react-select"), { ssr: false });

const AdminProfileForm = () => {
  const fileInputRef = useRef(null);
  const [isClient, setIsClient] = useState(false);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
    gender: "",
    phone: "",
    country: "",
    profileImage: "/imgs/admin/admin-avatar.png",
    profileImageFile: null,
  });

  const { mutate, isPending } = useUpdateProfile();

  useEffect(() => {
    setIsClient(true);
    const allCountries = Country.getAllCountries();
    const formattedCountries = allCountries.map((country) => ({
      value: country.isoCode,
      label: country.name,
    }));
    setCountries(formattedCountries);

    const defaultCountry = formattedCountries.find(
      (country) => country.value === formData.country
    );
    setSelectedCountry(defaultCountry || null);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    setFormData((prevData) => ({
      ...prevData,
      country: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prevData) => ({
        ...prevData,
        profileImage: imageUrl,
        profileImageFile: file,
      }));
    }
  };

  const handleSave = () => {
    const form = new FormData();
    form.append("first_name", formData.firstName);
    form.append("last_name", formData.lastName);
    form.append("email", formData.email);
    form.append("birth_date", formData.birthDate);
    form.append("gender", formData.gender);
    form.append("phone", formData.phone);
    form.append("country", formData.country);

    if (formData.profileImageFile) {
      form.append("profile_image", formData.profileImageFile);
    }

    mutate(form, {
      onSuccess: (data) => {
        alert("تم حفظ البيانات بنجاح!");
        console.log("response", data);
      },
      onError: (error) => {
        console.error("Error updating profile:", error);
        alert("حدث خطأ أثناء حفظ البيانات!");
      },
    });
  };



  return (
    <div className="space-y-6 mt-6">
      <div className="bg-white p-6 shadow rounded-lg">
        <div className="flex flex-col gap-3 items-start">
          <h2 className="text-lg font-semibold">معلومات الحساب</h2>
          <div className="flex items-center space-x-2">
            <div className="img-wrapper relative w-[73px] h-[68px]">
              <Image
                src={formData.profileImage}
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="px-3 py-2 border-1 border-[#D1D1D1] rounded-lg text-sm flex items-center gap-1 text-[#454545]"
            >
              <FaRegEdit />
              تغيير الصورة
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          <div className="input-wrapper flex flex-col gap-2 text-[#323130]">
            <label className="block text-gray-600 mb-1">الاسم الأول</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-2 border-1 border-[#D1D1D1] rounded-lg outline-none"
            />
          </div>
          <div className="input-wrapper flex flex-col gap-2 text-[#323130]">
            <label className="block text-gray-600 mb-1">الاسم الأخير</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-2 border-1 border-[#D1D1D1] rounded-lg outline-none"
            />
          </div>
          <div className="input-wrapper flex flex-col gap-2 text-[#323130]">
            <label className="block text-gray-600 mb-1">البريد الإلكتروني</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border-1 border-[#D1D1D1] rounded-lg outline-none"
            />
          </div>
          <div className="input-wrapper flex flex-col gap-2 text-[#323130]">
            <label className="block text-gray-600 mb-1">تاريخ الميلاد</label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              className="w-full p-2 border-1 border-[#D1D1D1] rounded-lg outline-none"
            />
          </div>
          <div className="input-wrapper flex flex-col gap-2 text-[#323130]">
            <label className="block text-gray-600 mb-1">الجنس</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-2 border-1 border-[#D1D1D1] rounded-lg outline-none"
            >
              <option value="Male">ذكر</option>
              <option value="Female">أنثى</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end mt-4 space-x-2">
          <button
            onClick={handleSave}
            disabled={isPending}
            className="px-8 py-3 bg-[#EE446E] text-white rounded-2xl cursor-pointer disabled:opacity-50"
          >
            {isPending ? "جارٍ الحفظ..." : "حفظ"}
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          <div className="input-wrapper flex flex-col gap-2 text-[#323130]">
            <label className="block text-gray-600 mb-1">رقم التواصل</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border-1 border-[#D1D1D1] rounded-lg outline-none"
            />
          </div>

          <div className="input-wrapper flex flex-col gap-2 text-[#323130]">
            <label className="block text-gray-600 mb-1">الدولة</label>
            {isClient && (
              <Select
                value={selectedCountry}
                onChange={handleCountryChange}
                options={countries}
                placeholder="اختر الدولة"
                noOptionsMessage={() => "لا توجد دول"}
                styles={{
                  control: (provided) => ({
                    ...provided,
                    border: "1px solid #D1D1D1",
                    borderRadius: "0.5rem",
                    padding: "2px",
                  }),
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfileForm;
// 'use client';
// import Image from "next/image";
// import { useState, useEffect, useRef } from "react";
// import { FaRegEdit } from "react-icons/fa";
// import dynamic from "next/dynamic";
// import { Country } from "country-state-city";
// import { useUpdateProfile } from "@/hooks/useAuth";

// const Select = dynamic(() => import("react-select"), { ssr: false });

// const AdminProfileForm = () => {
//   const fileInputRef = useRef(null);
//   const [isClient, setIsClient] = useState(false);
//   const [countries, setCountries] = useState([]);
//   const [selectedCountry, setSelectedCountry] = useState(null);
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     birthDate: "",
//     gender: "",
//     phone: "",
//     country: "",
//     profileImage: "/imgs/admin/admin-avatar.png",
//     profileImageFile: null,
//   });

//   const { mutate, isPending } = useUpdateProfile();

//   useEffect(() => {
//     setIsClient(true);
//     const allCountries = Country.getAllCountries();
//     const formattedCountries = allCountries.map((country) => ({
//       value: country.isoCode,
//       label: country.name,
//     }));
//     setCountries(formattedCountries);

//     const defaultCountry = formattedCountries.find(
//       (country) => country.value === formData.country
//     );
//     setSelectedCountry(defaultCountry || null);
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleCountryChange = (selectedOption) => {
//     setSelectedCountry(selectedOption);
//     setFormData((prevData) => ({
//       ...prevData,
//       country: selectedOption ? selectedOption.value : "",
//     }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       setFormData((prevData) => ({
//         ...prevData,
//         profileImage: imageUrl,
//         profileImageFile: file,
//       }));
//     }
//   };

//   const handleSave = () => {
//     const {
//       firstName,
//       lastName,
//       email,
//       birthDate,
//       gender,
//       phone,
//       country,
//     } = formData;

//     mutate(
//       {
//         firstName,
//         lastName,
//         email,
//         birthDate,
//         gender,
//         phone,
//         country,
//       },
//       {
//         onSuccess: (data) => {
//           alert("تم حفظ البيانات بنجاح!");
//           console.log("response", data);
//         },
//         onError: (error) => {
//           console.error("Error updating profile:", error);
//           alert("حدث خطأ أثناء حفظ البيانات!");
//         },
//       }
//     );
//   };