import { useDispatch } from "react-redux";
import { removeFromCart, increaseQuantity, decreaseQuantity } from "@/store/slices/Caart";
import { RiDeleteBin6Line } from "react-icons/ri";
import Image from "next/image";
import Link from "next/link";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(item.id));
  };

  const handleIncrease = () => {
    dispatch(increaseQuantity(item.id));
  };

  const handleDecrease = () => {
    dispatch(decreaseQuantity(item.id));
  };

  return (
    <div className="flex justify-between items-center w-full text-[20px] py-5 border-b-1 border-[#DFE1E3]">
      <Image
        src={item?.image || "/imgs/products/no-image-available.jpg"}
        alt={item?.name || "منتج"}
        width={100}
        height={100}
      />
      <div className="product-details flex flex-col gap-2.5 text-[#383838] w-full ps-4">
        <Link
          href={`/our-products/${item.id}`}>
          <h3 className="font-medium hover:text-[#EE446E]">{item?.name || "اسم المنتج غير موجود"}</h3>
        </Link>
        <p className="text-2xl">د.أ{item?.price || "سعر المنتج غير موجود"}</p>
        <div className="flex justify-between items-center">
          <div className="quantity-wrapper flex justify-between items-center gap-2 border-1 border-[#DFE1E3] rounded-md w-20 px-2">
            <p className="cursor-pointer" onClick={handleDecrease}>-</p>
            <p>{item?.quantity || "عدد المنتج غير موجود"}</p>
            <p className="cursor-pointer" onClick={handleIncrease}>+</p>
          </div>
          <RiDeleteBin6Line className="cursor-pointer" onClick={handleRemoveFromCart} />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
