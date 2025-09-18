"use client"
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { toast } from 'sonner'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Button } from '@/components/ui/button'

const schema = yup.object({
    name: yup.string(),
    email: yup.string().email(),
    phone: yup.string(),
    image: yup.string(),
})
const ProfileCard = () => {
    const [isLoading, setIsLoading] = useState(false)
    const { handleSubmit, register, formState: { errors } } = useForm({ resolver: yupResolver(schema) })

    const onSubmit = async (data) => {
        setIsLoading(true)
        try {
            const res = await fetch("/api/auth/update", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                cache: "no-store",
                body: JSON.stringify(data),
            });
            const datas = await res.json();
            if (!res?.ok) {
                toast.error(datas?.message);
                setIsLoading(false)
            } else {
                setIsLoading(false)
                toast.success("user updated successfully");
            }
        } catch (error) {
            setIsLoading(false)
            toast.error(error?.message);
        }
    };
    return (
        <div className='w-full mt-10'>
            <Card className=" max-w-2xl w-full h-max text-gray-800 rounded-lg border-1 px-4">
                <CardHeader className="w-full flex items-center justify-center">
                    <span className="text-2xl font-semibold"> Profile</span>
                </CardHeader>
                <CardContent className="w-full flex flex-col items-start p-3 mx-auto ">
                    <form className=" block mx-auto w-full  " onSubmit={handleSubmit(onSubmit)}>

                        <Label
                            htmlFor="name"
                            className="flex flex-col gap-3 items-start px-3 py-1 w-full "
                        >
                            <span>FullName</span>
                            <Input
                                id="name"
                                type="text"
                                {...register("name")}
                                className="focuse:outline-0 fucous:border-0 border-2 rounded-lg py-2"
                            />
                            {errors.name && (
                                <span className="text-rose-500 text-xs">
                                    {errors.name.message}
                                </span>
                            )}
                        </Label>
                        <Label
                            htmlFor="email"
                            className="flex flex-col gap-3 items-start px-3 py-1 w-full "
                        >
                            <span>Email</span>
                            <Input
                                id="email"
                                type="email"
                                {...register("email")}
                                className="focuse:outline-0 fucous:border-0 border-2 rounded-lg py-2"
                            />
                            {errors.email && (
                                <span className="text-rose-500 text-xs">
                                    {errors.email.message}
                                </span>
                            )}
                        </Label>
                        <Label
                            htmlFor="phone"
                            className="flex flex-col gap-3 items-start px-3 py-1 w-full "
                        >
                            <span>Phone</span>
                            <Input
                                id="phone"
                                {...register("phone")}
                                type="text"
                                className="focuse:outline-0 fucous:border-0 border-2 rounded-lg py-2"
                            />
                            {errors.phone && (
                                <span className="text-rose-500 text-xs">
                                    {errors.phone.message}
                                </span>
                            )}
                        </Label>



                        <div className="flex flex-col gap-3 items-start px-3 py-1 w-full mt-2 mb-2">
                            <Button
                                disabled={isLoading && isLoading}
                                variant={"primary"}
                                className={"w-full"}
                            >
                                {isLoading ? <Loader isLoading={isLoading} /> : "Update Profile"}
                            </Button>

                        </div>
                    </form>

                </CardContent>
            </Card>
        </div>
    )
}

export default ProfileCard