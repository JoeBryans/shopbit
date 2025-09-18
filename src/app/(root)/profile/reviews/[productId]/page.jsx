"use client";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button';
import Loader from '@/components/custom/Loader';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { el } from 'date-fns/locale';


const addressSchema = z.object({
    rating: z.string().min(1, { message: "Rating is required between 1 to 5" }).transform((val) => Number(val)),
    comment: z.string().min(3, { message: "Comment is required" }),
})
// async function PostReview({ data }) {


//     try {
//         const res = await fetch("/api/review", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(data),
//         })

//         const { review } = await res.json();
//         if (!res?.ok) throw new Error("something went wrong");

//         // router.push("/checkout/payment-methods")
//         return review
//     } catch (error) {
//         console.log(error);
//         return error
//     }
// }

const AddReview = () => {
    const param = useParams()
    const productId = param.productId
    const form = useForm(
        {
            resolver: zodResolver(addressSchema),
            defaultValues: {
                rating: 0,
                comment: "",
            },
        }
    )
    const router = useRouter();
    const queryClient = useQueryClient();


    //  query and mutation for address
    const mutation = useMutation(
        {
            mutationFn: async (item) => {

                try {
                    const res = await fetch("/api/review", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(
                            {
                                rating: item?.data?.rating,
                                comment: item?.data?.comment,
                                productId: productId,

                            }
                        )
                    })
                    const datas = await res.json();
                    if (res?.ok) {
                        console.log(datas);
                        toast.success("review created successfully");
                        return datas;
                    } else {
                        toast.error("something went wrong");
                    }
                } catch (error) {

                    console.log(error);
                    toast.error(error);
                    return error;
                }
            },
            onSuccess: () => {
                toast.success("review created successfully");
                router.push("/profile/reviews")
            },
            onError: (error) => {
                toast.error(error);
            },
        }
    )

    const ratingLimit = form.watch("rating")


    const onSubmit = async (data) => {
        if (ratingLimit < 1 || ratingLimit > 5) {
            toast.error("Rating should be between 1 to 5")
            return
        }
        mutation.mutate(
            {
                data: data,
                action: "addReview",
            }
        );
    }

    return (
        <div className='  w-full p-4  mx-auto text-gray-700'>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='max-w-xl w-full mx-auto bg-gray-50 rounded-lg p-4'
                >

                    <div className='w-full flex flex-col gap-4  '>
                        <h1 className='font-semibold text-sm mt-4 text-center'> what do you think about this product?</h1>
                        <div className='w-full flex flex-col
                        px-4  gap-4'>
                            <FormField
                                name="rating"
                                controle={form.control}
                                render={({ field }) => (
                                    <FormItem
                                        className={" w-full  "}
                                    >
                                        <FormLabel>Rating</FormLabel>
                                        <FormControl>
                                            <Input
                                                // type="number"
                                                placeholder="Number of rating e.g. 5" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            <FormField
                                name="comment"
                                controle={form.control}
                                render={({ field }) => (
                                    <FormItem
                                        className={" w-full  mx-auto"}
                                    >
                                        <FormLabel>
                                            Comment
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="  comment" {...field}
                                                className={"w-full h-44 resize-none focus:outline-none "}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='w-full flex justify-end my-3'>

                            <Button type="submit" variant={"primary"} className={"flex justify-center items-center gap-2 mt-4 w-max text-xl font-semibold"}>
                                {
                                    mutation?.isPending ? <Loader isLoading={mutation?.isPending} /> : <>Create</>
                                }
                            </Button>
                        </div>
                    </div>

                </form>

            </Form>

        </div>
    )
}

export default AddReview