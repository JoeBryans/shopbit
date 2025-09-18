"use client"
import React, { use, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { toast } from 'sonner'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { Camera, Upload } from 'lucide-react'
import Loader from '@/components/custom/Loader'
import { Dialog, DialogClose, DialogContent, DialogFooter } from '@/components/ui/dialog'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const schema = yup.object({
    name: yup.string(),
    email: yup.string().email(),
    phone: yup.string(),
})

async function ProfileImage(image) {
    console.log(image)

    try {
        const res = await fetch("/api/user", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                image: image
            })
        })

        const data = await res.json()
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}

const ProfileCard = () => {
    const { data: session, status } = useSession()
    const user = session?.user
    const [isLoading, setIsLoading] = useState(false)
    const [image, setImage] = useState(null)
    const [isOpen, setIsOpen] = useState(true)
    const queryClient = useQueryClient()

    const { handleSubmit, register, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: user?.name || "",
            email: user?.email || "",
            phone: user?.phone || "",
        }
    })

    // image upload to cloudinary
    const onChange = async (e) => {
        const file = e.target.files[0]
        console.log(file)

        // setImage(file)
        const formData = new FormData()
        formData.append("file", file)
        formData.append("upload_preset", "bryan-mall")
        try {
            const uploadedImages = null;



            const res = await fetch(
                `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await res.json();
            // uploadedImages.push(data.secure_url);
            setImage(data.secure_url);


        } catch (error) {
            console.log(error)
        }
        // setImage(e.target.files[0])
    }

    // query user
    const { data: userDate } = useQuery(
        {
            queryKey: ["user"],
            queryFn: async () => {
                const res = await fetch("/api/user")
                const data = await res.json();
                console.log("data", data);

                return data;
            },
        }
    )



    const uploadImageMutation = useMutation(
        {
            mutationFn: ProfileImage,
            onSuccess: (image) => {
                queryClient.invalidateQueries(["user"])
            },
            onError: (error) => {
                console.log(error);
            },
        }
    )

    const UploadImage = async () => {
        uploadImageMutation.mutate(image)
        setIsOpen(false)
    }

    useEffect(() => {
        if (user || userDate) {
            setValue("name", user?.name || userDate?.name)
            setValue("email", user?.email || userDate?.email)
            setValue("phone", user?.phone || userDate?.phone)
            // setValue("image", user?.image || userDate?.image)
            // setValue("email", user?.email)
            // setValue("phone", user?.phone)
            // setValue("image", user?.image)
        }
    }, [user])

    const formMutation = useMutation(
        {
            mutationFn: async (data) => {
                console.log(data)

                try {
                    const res = await fetch("/api/user", {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data),
                    });
                    const datas = await res.json();
                    if (!res?.ok) {
                        toast.error(datas?.message);
                    } else {
                        toast.success("user updated successfully");
                    }
                } catch (error) {
                    setIsLoading(false)
                    toast.error(error?.message);
                }
            },
            onSuccess: (data) => {
                queryClient.invalidateQueries(["user"])
            },
            onError: (error) => {
                console.log(error);
            },
        }
    )

    const onSubmit = async (data) => {
        formMutation.mutate(data)
    };
    return (
        <div className='w-full mt-10'>
            <Card className=" max-w-2xl w-full h-max text-gray-800 rounded-lg border-1 px-4">
                <CardHeader className="w-full flex items-center justify-center">
                    {/* <span className="text-2xl font-semibold"> Profile</span> */}
                </CardHeader>
                <CardContent className="w-full flex flex-col items-start p-3 mx-auto ">
                    <form className=" block mx-auto w-full  " onSubmit={handleSubmit(onSubmit)}>


                        {
                            image === null ? (
                                <div
                                    htmlFor="name"
                                    className="flex flex-col gap-3 items-center px-3 py-1 w-full "
                                >
                                    <div className='relative '>
                                        <div className='relative w-20 h-20 overflow-hidden rounded-full'>
                                            <Image
                                                src={
                                                    userDate ? userDate.image : user?.image
                                                }
                                                alt={user?.name}
                                                width={100}
                                                height={100}
                                                className="rounded-full"
                                            /></div>
                                        <Label htmlFor="image" className="absolute bottom-0 right-0   flex items-center justify-center z-20  bg-opacity-50 cursor-pointer bg-white rounded-full p-1">
                                            <Camera size={20} />
                                        </Label>


                                    </div>
                                    <Input
                                        id="image"
                                        type="file"
                                        onChange={onChange}
                                        accept="image/*"
                                        className="hidden focuse:outline-0 fucous:border-0 border-2 rounded-lg py-2"
                                    />

                                </div>
                            ) : (
                                <div>
                                    <Dialog open={isOpen}>
                                        <DialogContent className={"flex flex-col items-center justify-center"}>
                                            <div className='relative w-96 h-96 overflow-hidden'>
                                                <Image
                                                    src={image}
                                                    alt={"profile"}
                                                    width={300}
                                                    height={300}
                                                    className="w-full h-full object-cover"
                                                /></div>
                                            <DialogFooter>
                                                <DialogClose asChild>
                                                    <Button variant={"outline"} className={"w-max"}
                                                        onClick={UploadImage}
                                                    >
                                                        {
                                                            uploadImageMutation.isLoading ? <Loader isLoading={uploadImageMutation.isLoading} /> : 
                                                        <span className="text-sm">Upload Image</span>
                                                        }
                                                    </Button>
                                                </DialogClose>
                                            </DialogFooter>
                                        </DialogContent>

                                    </Dialog>
                                </div>
                            )
                        }

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
                                type="submit"
                            >
                                {isLoading ? <Loader isLoading={formMutation.isLoading} /> : "Update Profile"}
                            </Button>

                        </div>
                    </form>

                </CardContent>
            </Card>
        </div>
    )
}

export default ProfileCard