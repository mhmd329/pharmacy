import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "@/store/slices/modal";
import { IoClose } from "react-icons/io5";
import CartItem from "./CartItem";
import Link from "next/link";
import { useEffect, useState } from "react";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart?.cart || []);
  const { isOpen, modalName } = useSelector((state) => state.modal);

  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || !isOpen || modalName !== "cart") return null;

  return (
    <div
      onClick={() => dispatch(closeModal())}
      className="fixed inset-0 z-50 bg-black/50 flex justify-end transition-opacity"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white h-full w-[90%] sm:w-[400px] shadow-lg overflow-y-auto p-6 transition-transform duration-300 ease-in-out transform translate-x-0"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">العربة</h2>
          <IoClose
            size={30}
            className="cursor-pointer hover:text-[#EE446E]"
            onClick={() => dispatch(closeModal())}
          />
        </div>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">العربة فارغة</p>
        ) : (
          <>
            {cartItems.map((item, index) => (
              <CartItem key={`${item.id}-${index}`} item={item} />
            ))}

            <div className="flex justify-between items-center mt-5 text-[20px]">
              <p className="text-[#383838] text-xl">د.أ{totalPrice}</p>
              <p className="text-[#B0A6BD] text-xl">السعر</p>
            </div>

            <Link href="/checkout">
            <button
              onClick={() => dispatch(closeModal())}
              className="rounded-xl p-3 mt-3 cursor-pointer bg-[#EE446E] text-white w-full text-center"
              >اتمام الشراء
            </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
