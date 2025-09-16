"use client"
import React from 'react'
import PaymentMethodCard from '../_components/Cards/PaymentMethod'
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import AddressCard from '../_components/Cards/AddressCard'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { ItemsCard } from '../_components/Cards/ItemsCard'
async function GetCartItems() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/cart`, {
            cache: "no-store",
        })
        const { cart } = await res.json();

        return cart
    } catch (error) {
        console.log(error);
        return error
    }
}

const Summary = () => {
    const { data: session, status } = useSession()
    const { address, paymentMethod } = useSelector((state) => state.checkOut)
    const router = useRouter()
    const user = session?.user
    const queryClient = useQueryClient()

    const { error, data: cartItems } = useQuery(
        {
            queryKey: ['cart'],
            queryFn: GetCartItems,
            // enabled: address && paymentMethod,
        }
    )




    return (
        <div className='w-full min-h-[100vh]  flex flex-col items-center '>
            <div className=' bg-white w-full p-2  mx-auto text-gray-700'>  <AddressCard address={address} />
                <PaymentMethodCard paymentMethod={paymentMethod} />

                <div className='max-w-xl w-full rounded-xl border-1 bg-white'>
                    {cartItems && cartItems.length > 0 ? (
                        cartItems.map((item, index) => {
                            return <ItemsCard key={index} CartItems={item} />




                        })
                    ) : null}
                </div>
                <div className='w-full flex justify-end my-4'>
                    <Button variant={"primary"}
                        className={"disabled:bg-indigo-400 disabled:text-white"}
                        disabled={cartItems === null && !address && !paymentMethod}
                        onClick={() => router.push("/checkout/payment")}

                    >
                        <span className=' font-semibold text-sm'>Proceed to Checkout</span>
                        {/* (
              {
                cart && cart?.length > 0 ? <Currency price={totalPrice}
                  className={"text-xs line-clamp-1"}
                /> : null
              }) */}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Summary