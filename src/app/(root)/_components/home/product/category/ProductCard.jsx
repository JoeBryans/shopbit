import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import React from 'react'

const ProductCard = ({ products }) => {
    return (
        <div className='max-w-5xl w-[95%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 '>
            {products?.length>0&&(products.map((product) => {
                return (<Card key={product.id} className='p-4'>
                    <CardContent>
                        <div>
                            <Image src={product.images[0].url} alt={product.name} width={100} height={100}
                                className='w-full h-44 object-cover'
                            />
                        </div>
                    </CardContent>


                </Card>
                )
            }
            ))}
        </div>
    )
}

export default ProductCard