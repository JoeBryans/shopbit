import { AddButton } from '@/components/Cart/cartButton';
import Currency from '@/components/custom/currency';
import { headers } from 'next/headers';
import Image from 'next/image';
import React from 'react'

const page = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/wishlist`, {
        method: "GET",
        headers: {
            Cookie: (await headers()).get('cookie') || "",
        },
    })
    const wishList = await res?.json();
    return (
        <div className='w-full min-h-[100vh]  flex flex-col items-center mt-10'>
            <h1 className="text-2xl font-bold mb-5 -m-t-5 ">Saved Products</h1>
            <div className='max-w-2xl w-full p-4  mx-auto border-1 rounded-lg'>
                {
                    wishList && (
                        wishList.map((wishlist, index) => {
                            return <div key={index}>
                                <div className="flex md:w-[500px] w-full gap-3 shadow-lg px-3 mt-5 border-b-2 h-44 py-1 items-center rounded-lg mx-auto">
                                    <div className=" w-36 h-28 flex items-center justify-center rounded-lg">
                                        <Image
                                            src={wishlist?.product?.images[0]?.url}
                                            alt="image"
                                            width={100}
                                            height={100}
                                            priority
                                            className="w-[100%] h-[80%] object-contain rounded-lg hover:scale-110 transition-all duration-300 ease-in-out cusor-pointer"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1 w-72  ">
                                        <div className="">
                                            <span className="">{wishlist?.product?.category?.name}</span>
                                            <span className="line-clamp-1">{wishlist?.product?.name}</span>
                                            <Currency price={wishlist?.product?.price} />

                                        </div>

                                        <div className="flex flex-col w-full mt-1">
                                            <AddButton items={wishlist} />

                                        </div>

                                        {/* <DeleteButton items={Items}/> */}
                                    </div>
                                </div>
                            </div>
                        })
                    )
                }
            </div>
        </div>
    )
}

export default page