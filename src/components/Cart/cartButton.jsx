"use client";
import React, {  useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import {
  addToCart,
  clearCart,
  removeFromCart,
} from "@/hooks/store/cartSlice";
import { useRouter } from "next/navigation";
import axios from "axios";
import { loadClientSecret } from "@/hooks/store/localstorage";

export const AddButton = ({ items }) => {
  const dispatch = useDispatch();

  const AddToCart = (item) => {
    dispatch(addToCart(item));
  };
  return (
    <Button
      size={"sm"}
      className="cursor-pointer bg-blue-500 hover:bg-white hover:text-blue-500 hover:border-blue-500 hover:border-2 font-semibold transition:all w-full"
      onClick={() => AddToCart(items)}
    >
      Add to cart
    </Button>
  );
};

export const RemoveButton = ({ items }) => {
  const dispatch = useDispatch();

  const RemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
  };
  return (
    <Button
      size={"sm"}
      className="cursor-pointer bg-yellow-500 hover:bg-white hover:text-yellow-500 hover:border-yellow-500 hover:border-2 font-semibold transition:all w-max"
      onClick={() => RemoveFromCart(items)}
    >
      Remove
    </Button>
  );
};

export const ClearButton = () => {
  const dispatch = useDispatch();

  const ClearCart = () => {
    dispatch(clearCart());
  };
  return (
    <Button
      size={"sm"}
      className="cursor-pointer bg-slate-500 hover:bg-white hover:text-slate-500 hover:border-slate-500 hover:border-2 font-semibold transition:all w-max"
      onClick={ClearCart}
    >
      Clear Cart
    </Button>
  );
};

export const CheckOutButton = ({
  items,
  shipping,
  total,
  totalquantity,
  paymentMethod,
}) => {
  const [diabled, setDisabled] = useState(true);
  const router = useRouter();
  const paymentIntentId = loadClientSecret("paymentIntentId");

  console.log(paymentIntentId);
  useEffect(() => {
    if (shipping || paymentMethod !== null) {
      setDisabled(false);
    }
  }, []);
  const handleCheckOut = async (items) => {
    const res = await axios.post(
      "/api/order",
      {
        items: items,
        total: total,
        totalquantity: totalquantity,
        shippingAddress: shipping,
        paymentMethod: paymentMethod,
        paymentIntentId: paymentIntentId || null,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    router.push("/payment");
    localStorage.setItem("clientSecret", res?.data.clientSecret);
    localStorage.setItem("paymentIntentId", res?.data.paymentIntentId);
  };

  return (
    <Button
      className="mt-5 bg-blue-500 hover:bg-white hover:text-blue-500 hover:border-blue-500 hover:border-2 font-semibold transition:all w-full"
      onClick={() => handleCheckOut(items)}
      disabled={diabled}
    >
      Place Order
    </Button>
  );
};

// export const AddAddress = ({ items }: props) => {

//   return (
//     <Button
//       size={"sm"}
//       className="bg-blue-500 hover:bg-white hover:text-blue-500 hover:border-blue-500 hover:border-2 font-semibold transition:all w-full"
//       onClick={() => AddShippinAddress(items)}
//     >
//       create
//     </Button>
//   );
// };
