"use client";
import React, { useEffect, useState } from "react";
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
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import Loader from "@/app/(auth)/_components/Loader";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

async function RemoveItem(data) {
  try {
    const res = await fetch("/api/cart", {
      method: "DELETE",
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

async function AddCart(item) {
  console.log(item);

  try {
    const res = await fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {
          productId: item?.productId,
          quantity: item?.quantity,
          price: item?.price
        }
      )
    })
    const datas = await res.json();
    if (res?.ok) {
      toast.success("Product added to cart");
      return datas;
    } else {
      toast.error(datas?.message);
    }
  } catch (error) {
    console.log(error);
    toast.error(error);
  }
}

export const AddButton = ({ items }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useDispatch();
  const { data: user, status } = useSession();
  const userId = user?.user?.id;

  const queryClient = useQueryClient();
  const { data: cart } = useQuery(
    {
      queryKey: ["cart"],
      queryFn: async () => {
        const res = await fetch("/api/cart");
        return res.json();
      },
      // refetchInterval: 1000 * 60 * 5,
    }
  )

  const filterCart = cart?.filter((item) => item?.productId === items?.id);

  const mutation = useMutation(
    {

      mutationFn: AddCart,
      onSuccess: (data) => {
        queryClient.invalidateQueries(["cart"]);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  )
  const AddToCart = async (item) => {
    if (userId) {
      mutation.mutate({
        productId: item?.id,
        quantity: 1,
        price: item?.price
      })
      // try {
      //   setIsLoading(true);
      //   const res = await fetch("/api/cart", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json"
      //     },
      //     body: JSON.stringify({
      //       productId: item?.id,
      //       quantity: 1,
      //       price: item?.price
      //     })
      //   })
      //   console.log(res);
      //   const datas = await res.json();
      //   if (datas?.ok) {
      //     setIsLoading(false);
      //     toast.success(datas?.message);

      //   } else {
      //     setIsLoading(false);
      //     toast.error(datas?.message);
      //   }

      // } catch (error) {
      //   setIsLoading(false);
      //   console.log(error);
      //   toast.error(error);
      //   return;
      // }
    } else {
      dispatch(addToCart(item));

    }
  };
  return (
    <Button
      size={"sm"}
      className="cursor-pointer bg-blue-500 hover:bg-white hover:text-blue-500 hover:border-blue-500 hover:border-2 font-semibold transition:all w-full"
      onClick={() => AddToCart(items)}
    >
      {
        isLoading ? <Loader isLoading={isLoading} /> : <>Add to cart</>
      }
      {
        filterCart?.length > 0 && (

          <span>({filterCart?.length})</span>
        )
      }
    </Button>
  );
};

export const RemoveButton = ({ items }) => {

  const { data: user, status } = useSession();
  const userId = user?.user?.id;
  const queryClient = useQueryClient();

  const RemoveMutation = useMutation(
    {
      mutationFn: RemoveItem,
      onSuccess: (data) => {
        queryClient.invalidateQueries(["cart"]);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  )

  const dispatch = useDispatch();

  const RemoveFromCart = (item) => {

    if (!userId) {
      dispatch(removeFromCart(item));
    } else {
      RemoveMutation.mutate(
        {
          productId: item?.productId,
          id: item?.id,
        }
      );
    }
  };
  return (
    <Button
      size={"sm"}
      className="cursor-pointer bg-orange-600  hover:bg-white hover:text-orange-600  hover:border-orange-600  hover:border-2 font-semibold transition:all w-max"
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
