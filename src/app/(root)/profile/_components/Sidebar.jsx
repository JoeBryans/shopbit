import { SignOut } from '@/components/headers/SignOut'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const profileBars = [
    {
        name: "My Profile",
        path: "/profile"
    },
    {
        name: "Orders",
        path: "/profile/order"
    },
    {
        name: "Address",
        path: "/profile/address"
    },
    // {
    //     name:"Payment",
    //     path:"/profile/payment" 
    // },
    // {
    //     name:"Order History",
    //     path:"/profile/order-history" 
    // },
    {
        name: "Wishlist",
        path: "/profile/wishlist"
    },
    // {
    //     name: "Favourites",
    //     path: "/profile/favourites"
    // },
    {
        name: "Reviews",
        path: "/profile/reviews"
    },
    // {
    //     name: "Settings",
    //     path: "/profile/settings"
    // },

]
const Sidebar = () => {
    return (
        <div className='w-44 bg-white p-4 border-b-1 max-h-[80vh] border-gray-200 sticky top-0  px-5'>
            <div className="flex flex-col gap-4  ">
                {
                    profileBars.map((item, index) => {
                        return (
                            <Link key={index} href={item.path}
                                className='flex items-center gap-2 text-gray-700 hover:bg-gray-200 cursor-pointer transition-all p-1.5 rounded-lg text-center'
                            >
                                
                                <span>{item.name}</span>

                                {/* </a> */}
                            </Link>
                        )
                    })
                }
            </div>
            <div className='my-4  flex items-center gap-2  absolute bottom-10 '>
                <SignOut />
            </div>
        </div>
    )
}

export default Sidebar