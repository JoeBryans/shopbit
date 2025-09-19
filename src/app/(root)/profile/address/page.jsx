import { headers } from 'next/headers'
import React from 'react'

const page = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/address`, {
        method: "GET",
        headers: {
            Cookies: (await headers()).get("cookie") || ""
        }
    })
    const data = await res.json()
    return (
        <div className='w-full mx-auto mt-10'>
            <div className='max-w-2xl w-full flex flex-col items-center justify-center mx-auto'>
                <h3 className='text-xl font-semibold text-gray-700 mb-4'>Your Address</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2  gap-4 ">
                    {
                        data?.map((item, index) => {
                            return (
                                <div key={index} className='flex text-gray-600 flex-col gap-2 w-full bg-white p-4 rounded-lg'>
                                    <div className='flex flex-col gap-2 '>
                                        <span className='flex text-sm gap-2'>{item?.firstName} {item?.lastName}</span>
                                        <span className='flex text-sm gap-2'>{item?.email}, {item?.phone}</span>
                                    </div>
                                    <div className='flex items-center gap-2 '>
                                        {item?.deliveryAddress},
                                        {item?.city}
                                        {item?.state}
                                        {item?.country}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

        </div>
    )
}

export default page