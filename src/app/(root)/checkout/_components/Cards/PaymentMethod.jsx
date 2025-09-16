import { Checkbox } from '@/components/ui/checkbox'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const PaymentMethodCard = ({ paymentMethod }) => {
    return (
        <div className=' bg-white w-full p-4  mx-auto text-gray-700'>

            <div className='w-full flex items-center justify-between border-b-1 '>
                <div className='w-full flex items-center gap-2 '>
                    <Checkbox name="user" checked={
                        paymentMethod ? true : false
                    }
                        className={"data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-indigo-7000 dark:data-[state=checked]:bg-indigo-700 rounded-full"}
                    />
                    <h1 className='font-semibold text-lg'>2. PAYMENT METHOD</h1>
                </div>
                <Link href={"/checkout/payment-methods"} className="text-gray-600 flex items-center gap-1 ">
                    <span className="font-semibold text-xl">Change</span>
                    <ChevronRight size={30} />
                </Link>
            </div>
            <div className='w-full flex flex-col gap-2 items-start ml-6  '>
                <span>{paymentMethod?.name}</span>
                <span>{paymentMethod?.description}</span>
            </div>



        </div>
    )
}

export default PaymentMethodCard