"use client";
import { AddButton } from "./cartButton";
import { Button } from "../ui/button";
import { addToCart, DecreaseQty } from "../../hooks/store/cartSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import GetUser from "../headers/GetUser";
import { useSession } from "next-auth/react";

const Qty = ({ items }) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const { data, status } = useSession();

  const match = cartItems.find((item) => item.id === items.id);
  // const user=GetUser();
  console.log("user", data?.user);
  const user = data?.user;
  const quantity = match?.qty;
  const Increment = async (item) => {
    dispatch(addToCart(item));
    if (!user) {
      return
    }
    try {
      const cart = await fetch("/api/carts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          totalPrice: item.price,
          userId: user.id,
          qty: 1,
          productId: item.id,
        }),
      });
      console.log("cart", cart);
    } catch (error) {
      console.log("error", error);
    }

  };
  const Decrement = (item) => {
    dispatch(DecreaseQty(item));
  };
  return (
    <div className="w-full flex items-center gap-3 my-2">
      {quantity >= 1 ? (
        <div className="w-full flex items-center justify-between gap-2">
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
