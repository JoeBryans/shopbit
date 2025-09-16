"use client";
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod'
import React, { act, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { set, z } from 'zod'
import { Country, State, City } from 'country-state-city';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import Loader from '@/components/custom/Loader';
import { toast } from 'sonner';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Checkbox } from '@/components/ui/checkbox';


const addressSchema = z.object({
    deliveryAddress: z.string().min(3, { message: "Address is required" }),
    city: z.string().min(1, { message: "City is required" }),
    country: z.string().min(3, { message: "Country is required" }),
    email: z.string().min(3, { message: "Email is required" }),
    firstName: z.string().min(3, { message: "First Name is required" }),
    lastName: z.string().min(3, { message: "Last Name is required" }),
    phone: z.string().min(3, { message: "Phone is required" }),
    postalCode: z.string().min(3, { message: "Postal Code is required" }),
    state: z.string().min(3, { message: "State is required" }),
    additionalInfo: z.string(),
})
async function PostAddress({ data }) {
    console.log(
        "data",
        data
    )

    try {
        const res = await fetch("/api/address", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        })

        const { address } = await res.json();
        if (!res?.ok) throw new Error("something went wrong");

        // router.push("/checkout/payment-methods")
        return address
    } catch (error) {
        console.log(error);
        return error
    }
}

async function GetAddress() {
    try {
        const res = await fetch("/api/address")

        const address = await res.json();
        console.log("address :", address);

        if (!res?.ok) throw new Error("something went wrong");
        return address
    } catch (error) {
        console.log(error);
        return error
    }
}

const Address = () => {
    const form = useForm(
        {
            resolver: zodResolver(addressSchema),
            defaultValues: {
                deliveryAddress: "",
                city: "",
                country: "",
                email: "",
                firstName: "",
                lastName: "",
                phone: "",
                postalCode: "",
                state: "",
                additionalInfo: "",
            },
        }
    )
    const router = useRouter();
    const queryClient = useQueryClient();
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [state, setState] = useState([]);
    const [city, setCity] = useState([]);
    const [address, setAddress] = useState([]);
    console.log("address", address);

    // get countries
    const countryData = Country.getAllCountries().map(city => ({
        value: city.name,
        displayValue: city.name,

        countryCode: city.isoCode,
    }))
    // get states and cities
    useEffect(() => {
        if (selectedCountry) {
            const country = countryData.filter(item => item.value === selectedCountry)

            const stateData = State.getStatesOfCountry(country[0]?.countryCode).map(state => ({
                value: state.name,
                displayValue: state.name,
                stateCode: state.isoCode,

            }))
            setState(stateData)


            if (selectedState) {
                console.log("selectedCountry", country);

                const states = state.filter(item => item.value === selectedState)
                console.log("state :", state);
                const cityData = City.getCitiesOfState(country[0]?.countryCode, states[0]?.stateCode).map(city => ({
                    value: city.name,
                    displayValue: city.name,
                }))
                console.log("cityData", cityData);

                setCity(cityData)
            }
        }
    }, [selectedCountry, selectedState])

    //  query and mutation for address
    const { error, data } = useQuery(
        {
            queryKey: ['address'],
            queryFn: GetAddress,

        }
    )

    const mutation = useMutation(
        {
            mutationFn: PostAddress,
            onSuccess: () => {
                toast.success("address created successfully");
                router.push("/checkout/payment-methods")
                // queryClient.invalidateQueries('address');
            },
            // onError: (error) => {
            //     toast.error(error);
            // },
            retry: 2,

        }
    )
    const onSubmit = async (data) => {
        mutation.mutate(
            {
                data: data,
                action: "addAddress",
            }
        );
    }

    return (
        <div className=' bg-white w-full p-4  mx-auto text-gray-700'>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='w-full '
                >
                    <div className='w-full flex items-center gap-4 '>
                        <Checkbox name="user" checked={
                            data !== undefined && data?.length > 0 ? true : false
                        }
                            className={"data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"}
                        />
                        <h1 className='font-semibold text-lg'>CUSTOMER ADDRESS</h1>
                    </div>

                    {mutation.isError && <div className='text-red-500'>{mutation.isError}</div>}

                    <div className='w-full flex flex-col gap-4 items-start  '>
                        <h1 className='ml-4 font-semibold text-sm mt-4'>ADD NEW ADDRESS</h1>
                        <div className='w-full flex items-center 
                        px-4 justify-between gap-4'>
                            <FormField
                                name="firstName"
                                controle={form.control}
                                render={({ field }) => (
                                    <FormItem
                                        className={"max-w-[300px] w-full  mx-auto"}
                                    >
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="First Name" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="lastName"
                                controle={form.control}
                                render={({ field }) => (
                                    <FormItem
                                        className={"max-w-[300px] w-full  mx-auto"}
                                    >
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Last Name" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className='w-full flex items-center 
                        px-4 justify-between gap-4'>
                            <FormField
                                name="phone"
                                controle={form.control}
                                render={({ field }) => (
                                    <FormItem
                                        className={"max-w-[300px] w-full  mx-auto"}
                                    >
                                        <FormLabel>Phone</FormLabel>
                                        <FormControl>
                                            <Input placeholder=" Phone" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="email"
                                controle={form.control}
                                render={({ field }) => (
                                    <FormItem
                                        className={"max-w-[300px] w-full  mx-auto"}
                                    >
                                        <FormLabel> Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="your email" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className='w-full flex items-center 
                        px-4 justify-between gap-4'>
                            <FormField
                                name="country"
                                controle={form.control}
                                render={({ field }) => (
                                    <FormItem
                                        className={"max-w-[300px] w-full  mx-auto"}
                                    >
                                        <FormLabel> Country</FormLabel>
                                        <FormControl>
                                            {/* <Input placeholder="  Country" {...field} /> */}
                                            <Select
                                                onValueChange={(value) => {
                                                    field.onChange(value);
                                                    setSelectedCountry(value)
                                                }}
                                                {...field}
                                            >
                                                <SelectTrigger className=" max-w-md w-full mx-auto">
                                                    <SelectValue placeholder="Countries" />
                                                </SelectTrigger>
                                                <SelectContent className="">
                                                    <SelectGroup>
                                                        <SelectLabel>Countries</SelectLabel>
                                                        {countryData.length > 0 && (countryData?.map((item,) => (
                                                            <SelectItem value={
                                                                item.value
                                                            } key={item.countryCode}>
                                                                {item.displayValue}
                                                            </SelectItem>
                                                        )))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="state"
                                controle={form.control}
                                render={({ field }) => (
                                    <FormItem
                                        className={"max-w-[300px] w-full  mx-auto"}
                                    >
                                        <FormLabel> State</FormLabel>
                                        <FormControl>

                                            <Select
                                                onValueChange={(value) => {
                                                    field.onChange(value);
                                                    setSelectedState(value)
                                                }}
                                                {...field}
                                            >
                                                <SelectTrigger className=" max-w-md w-full mx-auto">
                                                    <SelectValue placeholder="States" />
                                                </SelectTrigger>
                                                <SelectContent className="">
                                                    <SelectGroup>
                                                        <SelectLabel>States</SelectLabel>
                                                        {state.length > 0 && (state?.map((item,) => (
                                                            <SelectItem value={
                                                                item.value
                                                            } key={item.stateCode}>
                                                                {item.displayValue}
                                                            </SelectItem>
                                                        )))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='w-full flex items-center 
                        px-4 justify-between gap-4'>
                            <FormField
                                name="city"
                                controle={form.control}
                                render={({ field }) => (
                                    <FormItem
                                        className={"max-w-[300px] w-full  mx-auto"}
                                    >
                                        <FormLabel> City</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={(value) => {
                                                    field.onChange(value);
                                                }}
                                                {...field}
                                            >
                                                <SelectTrigger className=" max-w-md w-full mx-auto">
                                                    <SelectValue placeholder="States" />
                                                </SelectTrigger>
                                                <SelectContent className="">
                                                    <SelectGroup>
                                                        <SelectLabel>Cities</SelectLabel>
                                                        {city?.length > 0 && (city?.map((item, index) => (
                                                            <SelectItem value={
                                                                item?.value
                                                            } key={index}>
                                                                {item.displayValue}
                                                            </SelectItem>
                                                        )))}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="postalCode"
                                controle={form.control}
                                render={({ field }) => (
                                    <FormItem
                                        className={"max-w-[300px] w-full  mx-auto"}
                                    >
                                        <FormLabel>
                                            Postal Code
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Postal Code" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='w-full flex flex-col  items-center  space-y-4 '>
                            <FormField
                                name="deliveryAddress"
                                controle={form.control}
                                render={({ field }) => (
                                    <FormItem
                                        className={" w-full  mx-auto"}
                                    >
                                        <FormLabel> Delivery Address</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="  delivery address" {...field}
                                                className={"w-full h-20 rounded-lg resize-none focus:outline-none "}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="additionalInfo"
                                controle={form.control}
                                render={({ field }) => (
                                    <FormItem
                                        className={" w-full  mx-auto"}
                                    >
                                        <FormLabel>
                                            Additional Information
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="  additional information" {...field}
                                                className={"w-full h-44 resize-none focus:outline-none "}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='w-full flex justify-end my-3'>

                            <Button type="submit" variant={"primary"} className={"flex justify-center items-center gap-2 mt-4 w-max text-xl font-semibold"}>
                                {
                                    mutation?.isPending ? <Loader isLoading={mutation?.isPending} /> : <>Save</>
                                }
                            </Button>
                        </div>
                    </div>

                </form>

            </Form>

        </div>
    )
}

export default Address