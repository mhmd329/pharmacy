// import { useState, useEffect } from "react";

// const CustomerForm = ({ customerId, customers }) => {
//   const [formData, setFormData] = useState({
//     client_name: "",
//     phone: "",
//     address: "",
//   });

//   useEffect(() => {
//     if (customerId) {
//       const customerData = customers.find((c) => c.id === customerId);
//       if (customerData) {
//         setFormData(customerData);
//       }
//     }
//   }, [customerId, customers]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.client_name || !formData.phone || !formData.address) {
//       console.error("يرجى ملء جميع الحقول");
//       return;
//     }

//     try {
//       const response = await fetch(
//         "https://clinics.soulnbody.net/pharmacy/public/api/order",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: "Bearer c67ie2XNjYMyAVvOZlzORFwZFLJfpVN2BcBzLkKB5a683fea",
//           },
//           body: JSON.stringify(formData),
//         }
//       );

//       if (response.ok) {
//         const result = await response.json();
//         console.log("تم إضافة العميل بنجاح:", result);

//         setFormData({
//           client_name: "",
//           phone: "",
//           address: "",
//         });

//         alert("تم إرسال الطلب بنجاح");
//       } else {
//         const errorData = await response.json();
//         console.error("فشل في إضافة العميل:", errorData);
//         alert("فشل في إرسال البيانات. يرجى المحاولة لاحقًا");
//       }
//     } catch (error) {
//       console.error("حدث خطأ أثناء إرسال البيانات:", error);
//       alert("حدث خطأ أثناء الاتصال. يرجى المحاولة لاحقًا");
//     }
//   };

//   return (
//     <div className="bg-white p-6 mt-10 rounded-xl border border-gray-200 w-lg mx-auto">
//       <h2 className="text-lg font-bold mb-4">
//         {customerId ? "تعديل العميل" : "إضافة عميل"}
//       </h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-gray-600">اسم العميل</label>
//           <input
//             type="text"
//             name="client_name"
//             value={formData.client_name}
//             onChange={handleChange}
//             className="w-full p-2 rounded-lg border border-[#D1D1D1] outline-none"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-gray-600">رقم الهاتف</label>
//           <input
//             type="text"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             className="w-full p-2 rounded-lg border border-[#D1D1D1] outline-none"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-600">العنوان</label>
//           <textarea
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//             className="w-full p-2 rounded-lg border border-[#D1D1D1] outline-none"
//           ></textarea>
//         </div>
//         <button
//           type="submit"
//           className="bg-[#EE446E] text-white px-4 py-2 rounded-lg w-full cursor-pointer"
//         >
//           {customerId ? "تحديث العميل" : "إضافة العميل"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CustomerForm;
