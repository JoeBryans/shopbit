import Currency from '@/components/custom/currency'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Heart, HeartIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const RelatedProducts = ({ product }) => {
    return (

        <Card key={product.id} className='p-0 border shadow-sm hover:shadow-md transition-shadow duration-200 ease-linear rounded-lg group'>
            <CardContent className={"p-0 "}>
                <div className='w-full relative h-48 rounded-lg overflow-hidden'>
                    <Image src={product.images[0].url} alt={product.name} width={500} height={500}
                        className='w-full  object-cover
                                group-hover:scale-105 transition-all duration-200 ease-in-out rounded-lg'
                    />
                    <HeartIcon className='absolute top-3 right-1 text-red-500 hover:text-white' size={30} />
                </div>
                <div className='text-gray-600 mt-2 flex flex-col gap-2 px-4 mb-5'>
                    <p className="text-xs font-semibold  ">{product?.category?.name}</p>
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
                    <div className='flex items-center flex-wrap gap-2 group pricing'>
                        <Currency price={product.discountPrice} />
                        <Currency price={product.price}
                            className={"opacity-0 group-hover:not-[.pricing]:opacity-100 transition-all duration-200 ease-in-out text-sm line-through text-slate-500"}
                        />
                        {/* <p className='line-through'>{product.price}</p> */}

                    </div>
                    <Button variant={"primary"} className={"w-full"}>
                        Add to Cart
                    </Button>
                </div>
            </CardContent>


        </Card>

    )
}

export default RelatedProducts