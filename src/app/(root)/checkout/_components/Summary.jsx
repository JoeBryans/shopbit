"use client"
import Currency from '@/components/custom/currency'
import { Button } from '@/components/ui/button'
import { loadClientSecret } from '@/hooks/store/localstorage'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import React from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
const Summary = () => {
    const queryClient = useQueryClient()
    const { address, paymentMethod } = useSelector((state) => state.checkOut)
    const [isLoading, setIsLoading] = React.useState(false)
    const { data: cart } = useQuery(
        {
            queryKey: ['cart'],
            queryFn: async () => {
                const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/cart`)
                const data = await res.json();
                return data;
            },
        }
    )
    const totalPrice = cart && cart.length > 0 && cart?.reduce((acc, item) => {
        return acc + Number(item.quantity) * Number(item.product.price);
    }, 0);

    const paymentIntentId = loadClientSecret("paymentIntentId");

    const handleCheckOut = async () => {
        try {
            setIsLoading(true)
            const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/order`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    items: cart,
                    totalPrice: totalPrice,
                    // totalquantity: ,
                    shippingAddress: address,
                    paymentMethod: paymentMethod?.name,
                    paymentIntentId: paymentIntentId || null,
                })
            })
            const data = await res.json();
            if (res?.ok) {
                setIsLoading(false)
                toast.success(" Order placed successfully");
                localStorage.setItem("clientSecret", data?.clientSecret);
                localStorage.setItem("paymentIntentId", data?.paymentIntentId);
                router.push("/checkout/pay");

            } else {
                setIsLoading(false)
                toast.error("Something went wrong");
            }

        } catch (error) {
            setIsLoading(false)
            console.log(error);
            toast.error(error);
        }
    };

    return (
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
                    <Button
                        variant={"primary"}
                        className={"flex justify-center items-center gap-2 mt-4 w-full"}
                        onClick={handleCheckOut}
                        disabled={cart?.length === 0 || !address || !paymentMethod || isLoading}

                    >
                        <span className=' font-semibold text-sm'>Proceed to Checkout</span>
                        ({
                            cart && cart.length > 0 ? <Currency price={totalPrice}
                                className={"text-xs line-clamp-1"}
                            /> : null
                        })

                    </Button>
                )
            }



        </div>
    )
}

export default Summary