"use client"
import React from 'react'

import Summary from './_components/Summary'
import { usePathname } from 'next/navigation'

const Wrapper = ({children}) => {
    const path = usePathname()
    const isPayment = path.includes('/pay')
    console.log(isPayment)

    // if(isPayment){

    return (
        <main className='max-w-6xl  my-14 w-full flex flex-wrap gap-4 items-start '>

            <div className='max-w-2xl w-full mx-auto'>
                {children}
            </div>

            {
                !isPayment && (
                    <Summary />)}
        </main>)
}

export default Wrapper