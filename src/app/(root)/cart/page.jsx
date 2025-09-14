"use client";
import React, { use, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SignedInUserCartCard, UnSignedInUserCartCard } from './CartItems';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
export async function FetchCart() {
  const res = await fetch('/api/cart', {
    cache: "no-store"
  });
  const { cart } = await res.json();
  return cart
}
const page = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { data: user, status } = useSession();
  const [cart, setCart] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (user?.user && cartItems?.length > 0) {
      for (const item of cartItems) {
        console.log("item:", item);
        async function PostCart() {
          try {
            const res = await fetch('/api/cart', {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                productId: item?.id,
                quantity: item?.qty,
                price: item?.price
              })
            });
            const data = await res.json();
            console.log(data);
            if (data?.ok) {
              toast.success(data?.message);
              localStorage.removeItem("cartItems");
              router.refresh();
            } else {
              toast.error(data?.message);
              router.refresh();
            }
          } catch (error) {
            console.log(error);
            toast.error(error);
            return
          }

        }
        PostCart();
        // router.push("/sign-in");
      }
      return
    }
  }, [cartItems,user?.user])

  useEffect(() => {

    async function Cart() {
      const cart = await FetchCart();
      console.log(cart);
      setCart(cart);
    }
    Cart();
  }, [])

  if (user) {
    return (
      <div className='w-full min-h-[100vh]  flex flex-col items-center '>
        <div className='max-w-7xl  w-full flex flex-wrap gap-10 items-start '>
          <div className='w-full   mx-auto'>
            {cart && cart.length > 0 ? (
              cart.map((item, index) => {
                return <div key={index}>
                  {
                    <SignedInUserCartCard key={index} CartItems={item} />

                  }
                </div>


              })
            ) : null}
          </div>
        </div>
      </div>
    )
  } else {

    return (
      <div className='w-full min-h-[100vh]  flex flex-col items-center '>
        <div className='max-w-7xl  w-full flex flex-wrap gap-10 items-start '>
          <div className='w-full   mx-auto'>
            {cartItems && cartItems.length > 0 ? (
              cartItems.map((item, index) => {
                return null
                // <unSignedInUserCartCard key={index} CartItems={item} />
              })
            ) : null}
          </div>
        </div>
      </div>
    )
  }
}

export default page