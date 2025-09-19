"use client";
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox'
import { setPaymentMethod } from '@/hooks/store/checkOutSlice';
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
const paymentMethods = [
    {
        id: 1,
        title: "Payment on Delivery",
        name: "payOnDelivery",
        // shortDes: "Go cashless: pay on delivery with bank transfer",
        description: "pay on delivery with bank transfer"
    },
    {
        id: 2,
        title: "Pre-pay Now",
        name: "card",
        description: "Pay with Cards: pre-pay now with your credit card"
    },
    {
        id: 3,
        title: "",
        name: "opay",
        description: "Opay : pay with your opay account"
    }
]
const PaymentMethods = ({ paymentMethod }) => {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const dispatch = useDispatch()

    return (
        <div className=' bg-white w-full p-4  mx-auto text-gray-700'>

            <div className='w-full flex items-center justify-between border-b-1 '>
                <div className='w-full flex items-center gap-2 '>
                    <Checkbox name="user" checked={
                        paymentMethod !== undefined && paymentMethod?.length > 0 ? true : false
                    }
                        className={"data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-indigo-7000 dark:data-[state=checked]:bg-indigo-700 rounded-full"}
                    />
                    <h1 className='font-semibold text-lg'>2. PAYMENT METHOD</h1>
                </div>

            </div>
            <div>
                {
                    paymentMethods.map((item, index) => {
                        return (
                            <div key={index} className='flex flex-col gap-2 border-b-1 my-4'>
                                <h3>{item.title}</h3>
                                <div className='w-full flex items-center gap-2 my-3 cursor-pointer 
                hover:bg-gray-100 hover:text-gray-600 transition-all duration-300 p-1.5 rounded-lg ease-in-out cusor-pointer'
                                    onClick={() => {
                                        setSelectedPaymentMethod(item)
                                        dispatch(setPaymentMethod(item))
                                    }}
                                >
                                    <Checkbox name="payOnDelivery" checked={selectedPaymentMethod !== null && selectedPaymentMethod.name === item.name ? true : false}
                                        className={"data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-indigo-7000 dark:data-[state=checked]:bg-indigo-700 rounded-full"}
                                    />
                                    <h3 className=''>
                                        {item.description}
                                    </h3>
                                </div>
                            </div>
                        )
                    })
                }


            </div>
            <Link href={"/checkout/summary"} className='w-full flex justify-end my-3'>
                <Button variant={"primary"}

                >
                    Save
                </Button>
            </Link>


        </div>
    )
}

export default PaymentMethods