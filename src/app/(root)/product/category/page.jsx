import React from 'react'
import ProductCard from '../../_components/home/product/category/ProductCard'
import SideBar from '../../_components/SideBar'
const page = async ({ searchParams }) => {
    const params = await searchParams
    const category = params?.category

    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/products/category?category=${category}`, { cache: 'no-store' })
    const data = await res.json()

    return (
        <div className='w-full flex justify-between '>
            <SideBar/>
            <div className='md:mr-10'>
                <ProductCard products={data} /></div>  
        </div>
    )
}

export default page