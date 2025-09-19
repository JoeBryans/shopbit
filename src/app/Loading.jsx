import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const Loading = () => {
    return (
        <div className='w-full flex flex-col gap-8'>
            {
                [1, 2, 3, 4, 5].map((_) => (<Skeleton className='max-w-full w-max  rounded-2xl pt-2 animate-pulse bg-white'>

                    <Skeleton className="flex gap-1 bg-white mx-auto  px-4  overflow-auto scrollbar-hide animate-pulse">

                        {[1, 2, 3, 4, 5, 6]?.map((product) => {
                            return (
                                <Skeleton key={product.id}
                                    className={"w-60 flex flex-col items-start py-2 px-1 animate-pulse bg-white border-1 round-lg"}
                                >
                                    <div className='w-full'>
                                        <Skeleton
                                            className='bg-white w-full h-44 object-cover animate-pulse'
                                        />

                                    </div >
                                </Skeleton>

                            )
                        }
                        )}
                    </Skeleton>

                </Skeleton>))
            }
        </div>

    )
}

export default Loading