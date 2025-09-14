import React from 'react'
import SideBar from '../../_components/SideBar'
import { SidebarTrigger } from '@/components/ui/sidebar'
import ProductsCard from '../../_components/home/product/category/ProductsCard'
import axios from 'axios'
const page = async ({ searchParams }) => {
    const params = await searchParams
    const category = params?.category

    const res = await axios.get(`${process.env.NEXT_PUBLIC_SITE_URL} /api/products/category?category=${category} `)
    const {data} = res
    return (
        <div className='w-full min-h-[100vh] flex justify-between '>
            <div className='flex h-full'>
                <SideBar />
                <div className='md:hidden '>
                    <SidebarTrigger />
                </div>
            </div>
            <div className='md:mr-10 my-10'>
                <ProductsCard products={data} /></div>
        </div>
    )
}

export default page