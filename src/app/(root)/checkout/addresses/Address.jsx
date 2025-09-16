"use client"
import { Checkbox } from '@/components/ui/checkbox'
import { setAddress } from '@/hooks/store/checkOutSlice'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

const Addresses = ({ address }) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const [selected, setSelected] = useState(null)


    return (
        <div className=' bg-white w-full p-4  mx-auto text-gray-700'>

            <div className='w-full flex items-center justify-between border-b-1 '>
                <div className='w-full flex items-center gap-4 '>

                    <h1 className='font-semibold text-lg ml-4'> YOUR ADDRESSES</h1>
                </div>

            </div>
            <div className='flex flex-col gap-4 '>
                {address?.length > 0 && (
                    address?.map((item, index) => {
                        return (
                            <div className='w-full flex  gap-3 items-center border-b-1 py-1.5 '
                                onClick={() => {
                                    setSelected(item)
                                    dispatch(setAddress(item))
                                    router.push("/checkout/summary")
                                }}
                            >
                                <Checkbox name="user" checked={
                                    selected?.id === item?.id ? true : false
                                }
                                    className={"data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-indigo-7000 dark:data-[state=checked]:bg-indigo-700 rounded-full"}
                                />

                                <div className='w-full flex flex-col gap-2 items-start border-b-1 py-1.5 '

                                >
                                    <span>{item.firstName} {item.lastName}</span>
                                    <div className='w-full flex items-center  gap-1'>

                                        <span className=''>{item.country}</span> |

                                        <span className=''>{item.city}, {item.state},</span>
                                        <span className=''>{item?.phone}</span>
                                    </div>


                                </div>
                            </div>
                        )
                    }
                    )
                )}
            </div>



        </div>
    )
}

export default Addresses