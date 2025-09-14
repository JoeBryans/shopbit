"use client";
import Currency from '@/components/custom/currency';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList } from '@/components/ui/tabs';
import { TabsTrigger } from '@radix-ui/react-tabs';
import parse from "html-react-parser";
import { Heart } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect } from 'react'
import RelatedProducts from './RelatedProducts';

const ProductCard = ({ product, relatedProducts }) => {
    const [imageIndex, setImageIndex] = React.useState(0);

    const discountPercentage =
        ((product?.price - product?.discountPrice) / product?.price) * 100;
    console.log("related:", discountPercentage);
    const dicountPerc = Math.round(discountPercentage);


    return (
        <div className="flex w-full min-h-[100vh] flex-col ">
            <div className="max-w-7xl md:px-20 w-[90%] flex flex-col mx-auto mt-5">
                <div className="flex flex-wrap  w-full gap-4  p-3">
                    <div className="max-w-[500px] w-[90%]   px-2 flex flex-col gap-3 items-center">
                        <div className="w-full h-72  ">
                            <Image
                                src={imageIndex === 0 ? product?.images[0]?.url : product?.images[imageIndex]?.url}
                                alt={product?.name}
                                width={1000}
                                height={1000}
                                className="object-cover w-full h-full rounded-lg"
                                // onWheel={}
                            />
                        </div>
                        <div className="flex items-center gap-1 w-full">
                            {product?.images?.map((item, index) => {
                                return (
                                    <div key={index} className="max-w-10">
                                        <Image
                                            src={item?.url}
                                            alt="image"
                                            width={100}
                                            height={100}
                                            className=" object-contain w-[100%] "
                                            // onClick={() => setImageIndex(index)}
                                            onMouseEnter={() => setImageIndex(index)}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* second Part */}
                    <div className="max-w-[500px] w-[90%] text-gray-600  px-2 flex flex-col gap-3 ">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <span className='text-xl md:text-2xl font-semibold'>{product?.name}</span>
                            </div>

                            <Heart color="red" size={30} className="cursor-pointer ml-4 " />
                        </div>
                        <div className="flex items-center gap-8 w-full ">
                            <Currency price={product?.discountPrice} className={"md:text-2xl text-xl font-semibold text-gray-600"} />


                            {/* <span className="text-xl font-semibold">${"400"}</span> */}

                            <Button
                                size={"sm"}
                                className="bg-blue-500 hover:bg-white hover:text-blue-500 hover:border-blue-500 hover:border-2 font-semibold transition:all"
                            >
                                {`${dicountPerc}%`}
                            </Button>
                        </div>
                        {
                            product?.brand && (

                                <div className="flex items-center gap-2">
                                    <span className="">Brand:</span>
                                    <span className=" font-semibold">{product?.brand}</span>
                                </div>
                            )
                        }

                        {/* Review ANd ratings */}
                        {
                            product?.category?.name && (

                                <div className="flex items-center gap-2">
                                    <span className="">Category:</span>
                                    <span className=" font-semibold">
                                        {product?.category?.name}
                                    </span>
                                </div>
                            )
                        }
                        {product?.color?.color && (
                            <div className="flex items-center gap-2">
                                <span className="">Color:</span>
                                <span className=" font-semibold">
                                    {product?.color?.color}
                                </span>
                            </div>
                        )}
                        {product?.size?.length > 0 && (
                            <div className="flex items-center gap-2">
                                <span className="">Sizes:</span>
                                {
                                    product?.size?.map((item, index) => {
                                        return (
                                            <Button variant={"outline"} key={index} className=" font-semibold "
                                                size={"sm"}
                                            >
                                                {item.value}
                                            </Button>
                                        );
                                    }
                                    )
                                }
                            </div>
                        )}

                        {/* // qty */}


                    </div>
                </div>

                <Tabs defaultValue="description" className="w-full md:my-20 my-10 border rounded-lg p-5">
                    <TabsList className={"w-full  bg-gray-50 flex justify-between items-center gap-2 px-5 md:px-10 "}>
                        <TabsTrigger value="description"
                            className='hover:bg-white hover:text-blue-500 hover:border-blue-500 hover:border-2 font-semibold transition:all cursor-pointer rounded-md p-2 '
                        >Description</TabsTrigger>
                        <TabsTrigger
                            value="warranty"
                            className='hover:bg-white hover:text-blue-500 hover:border-blue-500 hover:border-2 font-semibold transition:all cursor-pointer rounded-md p-2 '>Warranty</TabsTrigger>
                        <TabsTrigger value="delivery"
                            className='hover:bg-white hover:text-blue-500 hover:border-blue-500 hover:border-2 font-semibold transition:all cursor-pointer rounded-md p-2 '
                        >Delivery</TabsTrigger>
                        <TabsTrigger value="reviews" className='hover:bg-white hover:text-blue-500 hover:border-blue-500 hover:border-2 font-semibold transition:all cursor-pointer rounded-md p-2 '>Reviews</TabsTrigger>
                    </TabsList>
                    <TabsContent value="description">
                        <div className="block">{parse(product?.description)}</div>
                    </TabsContent>
                    <TabsContent value="warranty">
                        <div className="block">{product?.warranty}</div>
                    </TabsContent>
                    <TabsContent value="delivery">
                        <div className="block">{product?.shippingInfo}</div>
                    </TabsContent>
                    <TabsContent value="reviews">
                        {/* <div className="block">
                            {product?.reviews?.map((items, i) => {
                                return (
                                    <div key={i} className="block border-b-2 mb-2">
                                        <p>reviewer: {items?.reviewerName}</p>
                                        <p>rate: {items?.rating}</p>
                                        <div>
                                            <span>comment:</span>
                                            <span>{items?.comment}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div> */}
                    </TabsContent>
                    <TabsContent value="password">Change your password here.</TabsContent>
                </Tabs>

                {/* related products */}
                <div className="flex flex-col w-full mt-10 ">
                    <h3 className="font-semibold text-xl mb-1">Related Products:</h3>
                    <div className="grid grid-col-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 ">
                        {relatedProducts?.slice(0, 6).map((product, i) => {
                            return (

                                <RelatedProducts key={i} product={product} />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard