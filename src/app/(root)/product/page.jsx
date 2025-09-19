import React from 'react'
import Filter from '../_components/product/Filter'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import Wishlist from '@/components/custom/wishlist'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Currency from '@/components/custom/currency'
import { AddButton } from '@/components/Cart/cartButton'

const page = async ({ searchParams }) => {
    const params = await searchParams
    console.log(params);
    let value = {
        name: null,
        value: null
    }
    if (params?.q) {
        value = {
            name: "q",
            value: params?.q
        }
    }
    else if (params?.rating) {
        value = {
            name: "rating",
            value: params?.rating
        }
    }
    else if (params?.category) {
        value = {
            name: "category",
            value: params?.category
        }
    }
    else if (params?.minPrice) {
        value = {
            name: "minPrice",
            value: params?.minPrice
        }
    } else if (params?.size) {
        value = {
            name: "size",
            value: params?.size
        }
    }
    else if (params?.maxPrice) {
        value = {
            name: "maxPrice",
            value: params?.maxPrice
        }
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/products/search?${value.name}=${value?.value}`,
        {
            cache: "no-store"
        }
    )

    const data = await res?.json()
    // console.log("data", data);
    return (
        <div className='w-full min-h-[100vh] '>
            <div className='w-max flex gap-8 overflow-auto scrollbar-hide '>
                <div className='w-64 h-full '>
                    <Filter />
                </div>

                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full h-full overflow-auto scrollbar-hide mt-10'>

                    {
                        data?.map((product, index) => {
                            return (
                                <Card key={product.id} className='p-0 border shadow-sm hover:shadow-md transition-shadow duration-200 ease-linear rounded-lg group w-60'>
                                    <CardContent className={"p-0 "}>
                                        <div className='w-full relative h-48 rounded-lg overflow-hidden'>
                                            <Image src={product.images[0].url} alt={product.name} width={500} height={500}
                                                className='w-full  object-cover
                                                           group-hover:scale-105 transition-all duration-200 ease-in-out rounded-lg'
                                            />
                                            <Wishlist product={product} />
                                            {/* <HeartIcon className='absolute top-3 right-1 text-red-500 hover:text-white' size={30} /> */}
                                        </div>
                                        <div className='text-gray-600 mt-2 flex flex-col gap-2 px-4 mb-5'>
                                            <p className="text-sm font-semibold  ">{product?.category?.name}</p>
                                            <Link href={`/product/${product.id}`}>
                                                <h1 className='text-lg font-semibold line-clamp-1'>{product.name}</h1>
                                            </Link>
                                            <div className='flex justify-between items-center'>
                                                <p>
                                                    {product.brand}
                                                </p>
                                                {
                                                    product.deals?.length > 0 && (
                                                        <Button className='text-xs text-slate-500'>
                                                            {product.deals[0].product.name}
                                                        </Button>
                                                    )
                                                }
                                            </div>
                                            <div className='flex items-center gap-2 group pricing flex-wrap'>
                                                <Currency price={product.discountPrice} />
                                                <Currency price={product.price}
                                                    className={"opacity-0 group-hover:not-[.pricing]:opacity-100 transition-all duration-200 ease-in-out text-sm line-through text-slate-500"}
                                                />


                                            </div>

                                            <AddButton items={product} />
                                        </div>
                                    </CardContent>


                                </Card>
                            )
                        })
                    }

                </div>
            </div>

        </div>
    )
}

export default page