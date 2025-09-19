import React from 'react'
import ProductCard from './ProductCard';


const page = async ({ params }) => {
    const { id } = await params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/products/${id}`)
    const data = await res.json()

    const relatedRes = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/products/category?category=${encodeURI(data?.category?.name)}`, { next: { revalidate: 10 } })
    const relatedProducts = await relatedRes.json()

    return (
        <div>
            <ProductCard product={data} relatedProducts={relatedProducts} />
        </div>
    )
}

export default page