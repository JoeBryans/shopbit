"use client";
import { AddButton } from "./cartButton";
import { Button } from "../ui/button";
import { addToCart, DecreaseQty } from "@/hooks/store/cartSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Qty = ({ items }) => {
  console.log("Qty", items);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const { data, status } = useSession();
  const user = data?.user;

  const match = cartItems.find((item) => item?.id === items?.id);
  const quantity = match?.qty || items?.quantity;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const Increment = async (item) => {
    // dispatch(addToCart(item));
    if (!user) {
      dispatch(addToCart(item));
    }
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(
          {
            productId: item?.productId,
            quantity: 1,
            price: item?.product?.price
          }
        )
      })
      console.log(res);
      const datas = await res.json();
      if (datas?.ok) {
        setIsLoading(false);
        toast.success(datas?.message);
        router.refresh();

      }
      else {
        setIsLoading(false);
        toast.error(datas?.message);
      }
    } catch (error) {
      setIsLoading(false);
      console.log("error", error);
      toast.error(error);
    }

  };
  const Decrement = (item) => {
    dispatch(DecreaseQty(item));
  };
  return (
    <div className="w-full flex items-center gap-3 my-2">
      {quantity >= 1 ? (
        <div className="w-full flex items-center justify-start gap-4">
          <Button
            size={"sm"}
            variant={"outline"}
            className="text-xl font-semibold"
            onClick={() => Increment(items)}
          >
            +
          </Button>
          <Button
            size={"sm"}
            variant={"outline"}
            className="text-xl font-semibold"
          >
            {quantity}
          </Button>
          <Button
            size={"sm"}
            variant={"outline"}
            className="text-xl font-semibold"
            onClick={() => Decrement(items)}
          >
            -
          </Button>
        </div>
      ) : (
        <AddButton items={items} />
      )}
    </div>
  );
};

export default Qty;
