import React from 'react'
import { SidebarTrigger } from '@/components/ui/sidebar'
import SideBar from '@/app/(root)/_components/SideBar'
import ProductsCard from '@/app/(root)/_components/category/ProductsCard'
import Filter from '../../_components/product/Filter'
const page = async ({ searchParams }) => {
    const params = await searchParams
    console.log("category", params?.category)

    const ParamsCategory = params?.category

    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/products/category?category=${ParamsCategory}`,
        {
            cache: "no-store"
        }
    )
    const data = await res.json()
    console.log("data", data);
    return (
        <div className='w-full min-h-[100vh] flex justify-between overflow-auto scrollbar-hide '>
            <div className='flex h-full '>
                <Filter />
                <div className='md:hidden z-30'>
                    <SidebarTrigger />
                </div>
            </div>
            <div className='md:mr-10 my-10 mx-auto'>
                <ProductsCard products={data} /></div>
        </div>
    )
}

export default page