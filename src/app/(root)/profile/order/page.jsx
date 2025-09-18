"use client"
import Currency from '@/components/custom/currency';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { QueryClient, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

// const Date = ({ date }) => {
//     const setDate = date.toLocaleString("en-NG", {
//         weekday: 'long', // "numeric", "2-digit"
//         year: 'numeric', // "numeric", "2-digit"
//         month: 'long', // "numeric", "2-digit", "narrow", "short", "long"
//         day: 'numeric', // "numeric", "2-digit"
//     }

//     )
//     console.log(setDate);

//     return setDate
// }
const page = () => {

    const queryClient = new QueryClient();
    const { data: orders, isLoading } = useQuery(
        {
            queryKey: ["orders"],
            queryFn: async () => {
                const res = await fetch(`http://localhost:3000/api/order`)
                const data = await res.json();
                return data;
            },

        }
    )





    console.log("orders", orders);
    return (
        <div>
            <div className=' w-max p-4 space-y-4   mx-auto'>
                {
                    orders?.length > 0 && (orders.map((order, index) => {
                        return (
                            <Card key={index} className={"w-xl  bg-gray-50 p-4 rounded-lg border-1 flex-wrap "}>
                                <div className='flex justify-between items-center'>

                                    <CardContent className={"flex flex-col gap-1 max-w-[500px] w-full"}>
                                        <div className='flex items-center justify-4'>
                                            <div className='flex items-center gap-2 '>
                                                <span>Date</span>
                                                <span>

                                                    <Date date={order.createdAt} />
                                                </span>|
                                            </div>
                                            <span
                                                className={cn(
                                                    "ml-2",
                                                    order.status === "PENDING" && "text-yellow-500",
                                                    order.status === "COMPLETED" && "text-green-500",
                                                    order.status === "DELIVERED" && "text-green-500",
                                                    order.status === "FAILED" && "text-red-500",
                                                    order.status === "REFUNDED" && "text-red-500",
                                                    order.status === "VOIDED" && "text-red-500",
                                                    order.status === "UNCOLLECTIBLE" && "text-red-500",
                                                )}
                                            >{order.status}</span>
                                        </div>
                                        <div className='flex items-center gap-2 justify-4 text-sm text-gray-300'>
                                            <span>Total :</span>
                                            <Currency price={order?.total} />
                                        </div>
                                        <div className='flex items-center gap-2 text-sm  justify-4 text-gray-300'>
                                            <span>Order Id :</span>
                                            <span>{order?.id}</span>
                                        </div>
                                        <div className='flex items-center gap-2 text-sm  justify-4 text-gray-300'>
                                            <span>Payment Method : </span>
                                            <span>{order?.paymentMethod || "card"}</span>
                                        </div>
                                        {/* orderItems */}
                                        <div className='w-max flex items-center mt-3 gap-2'>
                                            {
                                                order.orderItems.map((product, index) => {
                                                    return (
                                                        <div className='w-full' key={index}>
                                                            <div className='w-14 h-14 '>
                                                                <Image
                                                                    src={product.product.images[0].url}
                                                                    alt={product.product.name}
                                                                    width={300}
                                                                    height={300}
                                                                    className='w-full object-cover'
                                                                />
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </CardContent>
                                    <CardContent className={"w-60 flex flex-col gap-1 mt-10"}>
                                        <Button variant={"primary"} className={"w-full"}>
                                            <Link href={`/profile/order/${order.id}`}>
                                                View Details
                                            </Link>
                                        </Button>
                                        {
                                            order?.shippingAddress && (
                                                <div className='flex flex-col gap-4 '>
                                                    <span>Delivery Address</span>
                                                    <div className='flex items-center gap-2 line-clamp-2 text-sm text-gray-300 '>
                                                        {order?.shippingAddress?.deliveryAddress}, {order?.shippingAddress?.city}, {order?.shippingAddress?.state}, {order?.shippingAddress?.country}
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </CardContent>
                                </div>

                            </Card>
                        )
                    }))
                }
            </div>
        </div>
    )
}

export default page