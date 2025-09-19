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
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";




export function CartBar() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const queryClient = useQueryClient();
  // tangstack query
  const { error, data: cart } = useQuery(
    {
      queryKey: ['cart'],
      queryFn: async () => {
        const res = await fetch("/api/cart");
        return res.json()
      }
      // enabled: address && paymentMethod,
    }
  )


  // const total = cartItems.reduce((acc, item) => acc + item.qty, 0);
  // const total=cartItems.reduce((acc,item)=>{
  //   return acc+Number(item.qty)*Number(item.price)
  // },0)
  return (
    <Sheet>
      <SheetTrigger >
        <div className="flex items-center gap-2 relative cursor-pointer">
          <FaIcons.FaShoppingBasket size={20} />
          {cart && cart.length > 0 ? (
            <p className="font-semibold text-lg absolute  z-20 text-white  -right-3 -top-3 w-full h-full rounded-full bg-blue-600 flex justify-center items-center">
              {cart && cart.length > 0 ? cart.length : null}
            </p>
          ) : null}
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription>
            <span className="font-semibold text-xl">
              You have{" "}
              <span>
                {cart && cart.length > 0 ? cart.length : 0}
              </span>{" "}
              Items in Your Cart!
            </span>
          </SheetDescription>
        </SheetHeader>
        <div className="">
          {cart &&
            cart?.length > 0 && cart.slice(0, 3).map((item, index) => {
              return <CartItems key={index} Items={item} />;
            })}
        </div>
        <SheetFooter>
          <SheetClose asChild>
            {cart && cart.length > 0 ? (
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
