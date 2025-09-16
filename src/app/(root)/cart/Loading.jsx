import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const Loading = () => {
    return (
        <div className='w-full min-h-[100vh]  flex flex-col items-center '>
            <div className='max-w-6xl  my-14 w-full flex flex-wrap gap-4 items-start '>
                <div className='max-w-2xl w-full p-4 bg-white  mx-auto'>
                    {
                        [1, 2, 3, 4, 5].map((_) => {
                            return <div className="flex flex-col w-full gap-3  px-3 mt-2 border-b-1  h-44 py-1  ">
                                <div className="flex  w-full gap-3   items-center  ">
                                    <div className=" w-36 h-24 flex items-center justify-center rounded-lg">
                                        <Skeleton

                                            className="w-[100%] h-[80%] object-contain rounded-lg hover:scale-110 transition-all duration-300 ease-in-out cusor-pointer"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1 w-72  ">

                                        <Skeleton className="h-10 w-48" />


                                        <Skeleton className="h-10 w-40" />

                                    </div>
                                </div>
                                <div className="w-full px-6 flex items-center justify-between mb-2">
                                    <div className="">
                                        <Skeleton className="h-10 w-48" />
                                    </div>
                                    <div className="">
                                        <Skeleton className="h-10 w-40" />
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>

                <div className='w-[300px] p-4 bg-white  mx-auto'>
                    {/* items total */}
                    <div className='flex justify-between items-center border-b-1 '>
                        <Skeleton className='text-gray-700 font-semibold text-sm h-20 w-40' />
                    </div>
                    {/* shipping */}
                    <div className='flex justify-between items-center mt-2 border-b-1 '>
                        <Skeleton className='text-gray-700 font-semibold h-10 w-40' />
                        <Skeleton className='text-gray-700 font-semibold h-10 w-40' />
                    </div>
                    {/* Sub total */}
                    <div className='flex justify-between items-center mt-2 border-b-1 '>
                        <Skeleton className='text-gray-700 font-semibold h-10 w-40' />
                        <Skeleton className='text-gray-700 font-semibold h-10 w-40' />
                    </div>
                    <Skeleton className='text-gray-700 font-semibold h-10 w-full' />

                </div>
            </div>


        </div>
    )
}

export default Loading