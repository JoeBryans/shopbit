"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import * as FaIcons from "react-icons/fa";
import CartItems from "./cartItems";
import Link from "next/link";
import { useSelector } from "react-redux";
export function CartBar() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  console.log(cartItems);

  // const total = cartItems.reduce((acc, item) => acc + item.qty, 0);
  // const total=cartItems.reduce((acc,item)=>{
  //   return acc+Number(item.qty)*Number(item.price)
  // },0)
  return (
    <Sheet>
      <SheetTrigger asChild>
        <span className="flex items-center gap-2 relative cursor-pointer">
          <FaIcons.FaShoppingBasket size={20} />
          {cartItems && cartItems.length > 0 ? (
            <p className="font-semibold text-lg absolute  z-20 text-white  -right-3 -top-3 w-full h-full rounded-full bg-blue-600 flex justify-center items-center">
              {cartItems && cartItems.length > 0 ? cartItems.length : null}
            </p>
          ) : null}
        </span>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription>
            <span className="font-semibold text-xl">
              You have{" "}
              <span>
                {cartItems && cartItems.length > 0 ? cartItems.length : 0}
              </span>{" "}
              Items in Your Cart!
            </span>
          </SheetDescription>
        </SheetHeader>
        <div className="">
          {cartItems &&
            cartItems.slice(0, 3).map((item, index) => {
              return <CartItems key={index} Items={item} />;
            })}
        </div>
        <SheetFooter>
          <SheetClose asChild>
            {cartItems && cartItems.length > 0 ? (
              <Link href={"/cart"} className=" text-blue-600">
                Veiw all cart Items
              </Link>
            ) : null}
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
