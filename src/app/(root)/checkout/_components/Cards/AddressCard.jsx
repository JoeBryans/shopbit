"use client"
import { Checkbox } from '@/components/ui/checkbox'
import { setAddress } from '@/hooks/store/checkOutSlice'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

const AddressCard = ({ address }) => {


    return (
        <div className=' bg-white w-full p-4  mx-auto text-gray-700'>


            <div className='w-full flex items-center justify-between border-b-1 '>
                <div className='w-full flex items-center gap-2 '>
                    <Checkbox name="user" checked={
                        address ? true : false
                    }
                        className={"data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-indigo-7000 dark:data-[state=checked]:bg-indigo-700 rounded-full"}
                    />
                    <h1 className='font-semibold text-lg ml-4'> YOUR ADDRESSES</h1>                    </div>
                <Link href={"/checkout/addresses"} className="text-gray-600 flex items-center gap-1 ">
                    <span className="font-semibold text-xl">Change</span>
                    <ChevronRight size={30} />
                </Link>
            </div>


            <div className='flex flex-col gap-4 '>
                {address && (


                    <div className='w-full flex flex-col gap-2 items-start border-b-1 py-1.5 '

                    >
                        <span>{address?.firstName} {address?.lastName}</span>
                        <div className='w-full flex items-center  gap-1'>

                            <span className=''>{address?.country}</span> |

                            <span className=''>{address?.city}, {address?.state},</span>
                            <span className=''>{address?.phone}</span>
                        </div>


                    </div>


                )}
            </div>



        </div>
    )
}

export default AddressCard