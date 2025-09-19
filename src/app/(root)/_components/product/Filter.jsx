"use client"
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { cn } from '@/lib/utils'
import { Check, Minus, Plus, Star } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { DualRangeSlider } from '@/components/ui/dualrangslider'
import { set } from 'zod'
const FilleStar = ({ star }) => {
    const num = Math.round(star);
    const rate = new Array(num).fill(0);
    console.log(" rate", rate);

    return (
        <div className="flex items-center gap-2 ">{
            rate.map((item, index) => {
                return <Star
                    key={index}
                    size={15}
                    fill='yellow'
                    className="cursor-pointer " />
            })
        }
            {/* {
                star === 5 ? null :
                    <span
                        className='flex items-center ml-2 gap-2 text-gray-600'
                    >{star} Up</span>
            } */}

        </div>
    )
}

// const sizes = [
//     { label: 'S', value: 'S' },
//     { label: 'M', value: 'M' },
//     { label: 'L', value: 'L' },
//     { label: 'XL', value: 'XL' },
//     { label: 'XXL', value: 'XXL' },
//     { label: 'XXXL', value: 'XXXL' },
// ]

const Filter = () => {
    const queryClient = useQueryClient();
    const { data: category, isLoading } = useQuery(
        {
            queryKey: ['category'],
            queryFn: async () => {
                const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/category`)
                const data = await res.json();
                return data;
            },
        }
    )
    // toggle for open and close
    const [rateOpen, setRateOpen] = useState(false)
    const [catOpen, setCatOpen] = useState(false)
    const [priceOpen, setPriceOpen] = useState(false)
    // price range
    const [price, setPrice] = useState([1000, 9999999])
    // const [size, setSize] = useState(null)
    const [minRating, setMinRating] = useState(0)
    console.log("minRating", minRating);



    // const [catOpen, setCatOpen] = useState(false)


    return (
        <div className='w-full h-full border-r-1 border-gray-200 p-4 space-y-4 '>

            <div className='w-full flex flex-col gap-2 border-b-1'>
                <h1 className='text-lg font-semibold text-gray-700 m w-full flex items-center justify-between'
                    onClick={() => setCatOpen(!catOpen)}
                >Browse by Category
                    <span>
                        {
                            catOpen ? (<Minus size={20} className="cursor-pointer " />) : (<Plus size={20} className="cursor-pointer " />)
                        }
                    </span>
                </h1>
                <div className={`${catOpen ? "hidden " : "flex flex-col gap-2 "} w-full`}>

                    {
                        category?.map((cat, index) => {
                            return (
                                <Link href={
                                    {
                                        pathname: "/product",
                                        query: {
                                            category: cat.name
                                        }
                                    }
                                }>
                                    <Button variant={"secondary"}
                                        key={index}
                                        className="w-full text-left
                            flex  justify-start capitalize "
                                    >
                                        {cat.name}
                                    </Button>
                                </Link>
                            )
                        }
                        )
                    }
                </div>

            </div>

            <div className='w-full flex flex-col gap-2 mb-4 py-2 border-b-1'>
                <h1 className='text-lg font-semibold text-gray-700 m w-full flex items-center justify-between'
                    onClick={() => setPriceOpen(!priceOpen)}
                >Price
                    <span>
                        {
                            priceOpen ? (<Minus size={20} className="cursor-pointer " />) : (<Plus size={20} className="cursor-pointer " />)
                        }
                    </span>
                </h1>

                <div className={`${priceOpen ? "hidden " : "flex flex-col gap-2 "} w-full space-y-2 overflow-auto scrollbar-hide px-2`}>
                    <div className='w-full flex justify-end my-3'>
                        <Link
                            href={{
                                pathname: "/product",
                                query: {
                                    minPrice: price[0],
                                    maxPrice: price[1]
                                }
                            }}
                        >
                            <Button variant={"warning"} className={"w-max "}>
                                Apply
                            </Button>
                        </Link>
                    </div>
                    <DualRangeSlider
                        label={(value) => value}
                        labelPosition="bottom"
                        value={price}

                        onValueChange={setPrice}
                        min={1000}
                        max={9999999}
                        step={1}
                    />

                    <div className='w-full flex gap-2 mt-4'>
                        <Input type="number" name="price" placeholder="Price"
                            value={price[0]}
                        />
                        <Input type="number" name="price"
                            value={price[1]}
                            placeholder="Price" />
                    </div>

                </div>

            </div>


            <div className='w-full flex flex-col gap-2 '>
                <h1 className='text-lg font-semibold text-gray-700 m w-full flex items-center justify-between'
                    onClick={() => setRateOpen(!rateOpen)}
                >Ratings
                    <span>
                        {
                            rateOpen ? (<Minus size={20} className="cursor-pointer " />) : (<Plus size={20} className="cursor-pointer " />)
                        }
                    </span>
                </h1>
                <div className={`${rateOpen ? "hidden " : "flex flex-col gap-2 "} w-full`}>

                    {[5, 4, 3, 2, 1].map(star => (
                        <Link
                            href={{
                                pathname: "/product",
                                query: {
                                    rating: star
                                }

                            }}

                            key={star}
                            className='flex items-center gap-2 text-gray-700 hover:bg-gray-200 cursor-pointer transition-all p-1.5 rounded-lg text-center'
                            onClick={() => setMinRating(star)}
                        >
                            <Checkbox name="user" checked={
                                minRating === star
                            }
                                className={"data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-indigo-7000 dark:data-[state=checked]:bg-indigo-700 rounded-full"}
                            />

                            <div className={
                                cn(
                                    'flex items-center gap-2 ',
                                    star ? "text-yellow-500" : "text-gray-700"
                                )
                            }>
                                <FilleStar star={star} />
                            </div>
                        </Link>
                    ))}

                </div>

            </div>
            {/* <div className='w-full flex flex-col gap-2 border-b-1'>
                <h1 className='text-lg font-semibold text-gray-700 m w-full flex items-center justify-between'
                    onClick={() => setCatOpen(!catOpen)}
                >Sizes
                    <span>
                        {
                            catOpen ? (<Minus size={20} className="cursor-pointer " />) : (<Plus size={20} className="cursor-pointer " />)
                        }
                    </span>
                </h1>
                <div className={`${catOpen ? "hidden " : "flex flex-wrap  gap-2 "} w-full`}>

                    {sizes.map(size => (
                        <Link
                            href={{
                                pathname: "/product",
                                query: {
                                    size: size.value
                                }

                            }}

                            key={size}
                            className='text-gray-700 hover:bg-gray-200 cursor-pointer transition-all p-1.5 rounded-md text-center border-1'
                            onClick={() => setSize(size.value)}
                        >


                            {size.label}
                        </Link>
                    ))}

                </div>

            </div> */}
            {/* <Label>
            <span>price</span>
             <Input type="number" name="price" placeholder="Price" />
           </Label>
            <button type="submit" className="w-full">
              Search
              </button> */}

        </div>
    )
}

export default Filter