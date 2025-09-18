"use client"
import { cn } from '@/lib/utils'
import { QueryClient, useMutation } from '@tanstack/react-query';
import { Heart } from 'lucide-react'
import React, { use } from 'react'
import { toast } from 'sonner';

const Wishlist = ({ product }) => {
    const queryClient = new QueryClient();

    const mutation = useMutation(
        {
            mutationFn: async (data) => {
                console.log("data", data);

                try {
                    const res = await fetch("/api/wishlist", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(
                            {
                                productId: data?.productId
                            }
                        )
                    })
                    const datas = await res.json();
                    if (datas?.ok) {
                        console.log(datas);
                        toast.success(datas?.message);
                        window.location.reload();
                        return datas;
                    } else {
                        toast.error(datas?.message);
                        console.log(datas?.message);
                    }
                } catch (error) {

                    console.log(error);
                    toast.error("something went wrong");
                    return error;
                }
            },
            onSuccess: (data) => {
                queryClient.invalidateQueries(["product"]);
            },
            onError: (error) => {
                console.log(error);
            },
        }
    )

    return <div
        className={
            cn(
                "rounded-full p-1 z-20 absolute top-3 right-1  transition-all duration-200 bg-gray-100 ease-in-out cursor-pointer",

            )
        }
        onClick={() => mutation.mutate({
            productId: product?.id
        })}
    >
        <Heart size={20} fill={
            product?.wishlist?.length > 0 ? "red" : "white"
        }
            stroke={
                product?.wishlist?.length > 0 ? "red" : "white"
            }
        />
    </div>


}

export default Wishlist