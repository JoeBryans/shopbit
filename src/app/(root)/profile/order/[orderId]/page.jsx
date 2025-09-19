import Currency from '@/components/custom/currency'
import { Button } from '@/components/ui/button'
import { headers } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = async ({ params }) => {
    const { orderId } = await params
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/order/${orderId}`,
        {
            method: "GET",
            headers: {
                Cookie: (await headers()).get("cookie") || "",
            },
            cache: "no-store", // always fresh
        }
    )
    const order = await res.json()
    return (
        <div className='w-full mx-auto'>
            {
                order && (
                    <div className="max-w-3xl w-full flex flex-col items-start mx-auto gap-4 bg-gray-50 p-4 rounded-lg border-1 ">

                        <div className='bg-white flex flex-col gap-2 py-2 px-4 rounded-lg text-gray-600 w-full'>
                            <span>Order : {order.id}</span>
                            <span>Date of Order : {order?.createdAt}</span>
                            <span>Total Price : {order?.total}</span>
                            <span>Total itmes : {order?.orderItems?.length}</span>
                        </div>

                        <div className='flex flex-col gap-4  w-full border-1 rounded-lg p-4'>
                            <h3 className='text-xl text-center font-semibold'>Order Items</h3>
                            {
                                order?.orderItems?.map((item, index) => {
                                    return (
                                        <div key={index} className='flex  gap-4 w-full bg-white p-4 rounded-lg '>
                                            <div className='w-36 h-24 '>
                                                <Image
                                                    src={item?.product?.images[0]?.url}
                                                    alt={item?.product?.name}
                                                    width={300}
                                                    height={300}
                                                    className='w-full object-cover h-full'
                                                />
                                            </div>
                                            <div className='w-full flex flex-col gap-2 '>
                                                <span className='line-clamp-1'>{item?.product?.name}</span>
                                                <span>Quantity : {item?.quantity}</span>
                                                <div className='flex items-center justify-between flex-wrap w-full'>
                                                    <span>Price :
                                                        <Currency price={item?.price} />
                                                    </span>
                                                    <Link href={`/profile/reviews/${item?.product?.id}`} >
                                                        <Button variant={"outline"}>
                                                            Add review
                                                        </Button>                                           </Link>
                                                </div>
                                            </div>

                                        </div>
                                    )
                                })
                            }

                        </div>

                        <div
                            className='flex flex-col gap-4 w-full border-1 p-4 rounded-lg'
                        >
                            <h3 className='text-xl text-center font-semibold'>Payment</h3>
                            <div className='flex gap-2 items-center'>
                                <h3>Payment Method : </h3>
                                <span> {order?.paymentMethod || "card"}</span>
                            </div>

                            <div className='flex flex-col gap-2 '>
                                <h3>Payment Details </h3>
                                <span>Item total : {order?.payment?.amount}</span>
                                <span>Delivery Feel : 2000</span>
                                <span>Total Amount : {order?.payment?.amount}</span>

                            </div>
                        </div>

                        {/* delivery info */}

                        <div className='flex flex-col gap-2 border-1 rounded-lg w-full p-4'>
                            <h3>Delivery Information</h3>
                            <span>{order?.shippingAddress?.firstName} {order?.shippingAddress?.lastName}</span>
                            <span>{order?.shippingAddress?.email}</span>
                            <span>{order?.shippingAddress?.phone}</span>
                            <span>{order?.shippingAddress?.deliveryAddress}</span>
                        </div>

                    </div>
                )
            }
        </div>
    )
}

export default page