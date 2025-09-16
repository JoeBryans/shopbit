"use client";
import { AddButton } from "./cartButton";
import { Button } from "../ui/button";
import { addToCart, DecreaseQty } from "@/hooks/store/cartSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";


async function DecreaseItem(data) {

  try {
    const res = await fetch("/api/cart", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {
          productId: data?.productId,
          id: data?.id,
        }
      )
    })
    console.log(res);
    const datas = await res.json();
    if (datas?.ok) {
      toast.success(datas?.message);
    } else {
      toast.error(datas?.message);
    }
  } catch (error) {
    console.log(error);
    toast.error(error);
  }
}

async function IncrementItem(data) {

  try {
    const res = await fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {
            productId: data?.productId,
            quantity: data?.quantity,
            price: data?.price
        }
      )
    })
    console.log(res);
    const datas = await res.json();
    if (datas?.ok) {
      toast.success(datas?.message);
    } else {
      toast.error(datas?.message);
    }
  } catch (error) {
    console.log(error);
    toast.error(error);
  }
}

const Qty = ({ items }) => {

  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const { data, status } = useSession();
  const user = data?.user;
  const queryClient = useQueryClient();

  const match = cartItems.find((item) => item?.id === items?.id);
  const quantity = match?.qty || items?.quantity;


  const DecreaseMutation = useMutation(
    {
      mutationFn: DecreaseItem,
      onSuccess: (data) => {
        queryClient.invalidateQueries(["cart"]);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  )
  const IncrementMutation = useMutation(
    {
      mutationFn: IncrementItem,
      onSuccess: (data) => {
        queryClient.invalidateQueries(["cart"]);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  )

  const Increment = async (item) => {
    // dispatch(addToCart(item));
    if (!user) {
      dispatch(addToCart(item));
    } else {
      IncrementMutation.mutate(
        {
          productId: item?.productId,
          quantity: 1,
          price: item?.product?.price
        }
      );
    }

  };
  const Decrement = async (item) => {
    if (!user) {
      dispatch(addToCart(item));
    } else {
      DecreaseMutation.mutate(
        {
          productId: item?.productId,
          id: item?.id,
        }
      );
    }

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
