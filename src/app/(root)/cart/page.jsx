"use client";
import React, { use, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SignedInUserCartCard, UnSignedInUserCartCard } from './CartItems';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Currency from '@/components/custom/currency';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Loading from './Loading';




const page = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const queryClient = useQueryClient();

  const router = useRouter();
  const { data: user, status } = useSession();
  // tangstack query
  const { error, data: cart, isLoading } = useQuery(
    {
      queryKey: ['cart'],
      queryFn: async () => {
        const res = await fetch("/api/cart");
        return res.json();
      },
      // refetchInterval: 1000 * 60 * 5,
    }
  )

  const totalPrice = cart && cart.length > 0 && cart?.reduce((acc, item) => {
    return acc + Number(item.quantity) * Number(item.product.price);
  }, 0);




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
        PostCart()

      }
      return
    }
  }, [cartItems, user?.user])

 if (isLoading) {
    return <Loading />
  }

  if (user) {
    return (
      <div className='w-full min-h-[100vh]  flex flex-col items-center '>
        <div className='max-w-6xl  my-14 w-full flex flex-wrap gap-4 items-start '>
          <div className='max-w-2xl w-full p-4 bg-white  mx-auto'>
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

          {/* cart summary */}
          <div className='max-w-[300px] w-full p-4 bg-white  mx-auto'>

            <h1 className='text-xl font-semibold text-gray-700 mb-4 border-b-1'>Your Cart Summary</h1>
            {/* items total */}
            <div className='flex justify-between items-center border-b-1 '>
              <span className='text-gray-700 font-semibold text-sm'>Item's Total ({cart && cart.length})</span>
              {
                cart && cart.length > 0 ? (
                  <Currency price={totalPrice} />
                ) : null
              }
            </div>
            {/* shipping */}
            <div className='flex justify-between items-center mt-2 border-b-1 '>
              <span className='text-gray-700 font-semibold'>Shipping</span>
              <span className='text-gray-700 font-semibold'>Free</span>
            </div>
            {/* Sub total */}
            <div className='flex justify-between items-center mt-2 border-b-1 '>
              <span className='text-gray-700 font-semibold'>Sub Total</span>
              {
                cart && cart.length > 0 ? (
                  <Currency price={totalPrice} />
                ) : null
              }
            </div>

            {
              cart?.length > 0 && (
                <Link href={"/checkout/summary"} className="mt-4 text-blue-600">

                  <Button
                    variant={"primary"}
                    className={"flex justify-center items-center gap-2 mt-4 w-full"}


                  >
                    <span className=' font-semibold text-sm'>Proceed to Checkout</span>
                    ({
                      cart && cart.length > 0 ? <Currency price={totalPrice}
                        className={"text-xs line-clamp-1"}
                      /> : null
                    })

                  </Button>
                </Link>
              )
            }



          </div>
        </div>
      </div>
    )
  } else {

    return (
      <div className='w-full min-h-[100vh]  flex flex-col items-center '>
        <div className='max-w-6xl bg-red-400  w-full flex flex-wrap gap-10 items-start '>
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