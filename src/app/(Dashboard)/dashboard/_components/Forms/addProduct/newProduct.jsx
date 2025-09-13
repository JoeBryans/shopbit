"use client";
import { Camera, Loader2, PlusIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";

import { useRouter } from "next/navigation";

import CloudUploadButton from "./CloudButton";
import dynamic from "next/dynamic";
import 'react-quill-new/dist/quill.snow.css';
import { AddInfo, Sizes } from "./AddInfo";
import Loader from "../../Loader";
import { GetCategory } from "@/actions/category";

const ReactQuill = dynamic(() => import("react-quill-new"), {
    ssr: false,

    loading: () => (
        <div> <Loader isLoading={true} /></div>
    ),
});


const ProductSchema = z.object({
    name: z.string().toLowerCase().trim().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    brand: z.string().min(2, {
        message: "Brand must be at least 2 characters.",
    }),
    sku: z.string().toLowerCase().trim().min(2, {
        message: "Sku must be at least 2 characters.",
    }),
    price: z
        .string()
        .min(2)
        .transform((val) => Number(val), {
            message: "Price must be at least 2 characters.",
        }),
    discountPrice: z
        .string()
        .min(2)
        .transform((val) => Number(val), {
            message: "Price must be at least 2 characters.",
        }),
    categoryId: z.string().toLowerCase().trim().min(2, {
        message: "Category must be at least 2 characters.",
    }),
    units: z.string(),
    dimensions: z.string().toLowerCase().trim(),
    weight: z.string().transform((val) => Number(val)),
    lowStock: z.string().toLowerCase().trim().transform((val) => Number(val)),
    warranty: z.string().toLowerCase().trim(),
    taxRate: z.string().transform((val) => Number(val)),
    //   notes: z.string().min(2, {
    //     message: "Notes must be at least 2 characters.",
    //   }),

    quantity: z.string().transform((val) => Number(val), {
        message: "Quantity must be at least 2 characters.",
    }),

    shippingInfo: z.string(),
    description: z.string().min(2, {
        message: "Description must be at least 2 characters.",
    }),
    additionalInfo: z.array(
        z.object({
            title: z.string().min(2, {
                message: "Title must be at least 2 characters.",
            }),
            value: z.string().min(2, {
                message: "Value must be at least 2 characters.",
            }),
        })
    ),
    color: z.string(),
    hex: z.string(),
    size: z.array(
        z.object({
            value: z.string().min(1, {
                message: "Value must be at least 1 characters.",
            }),
        })
    ),

    // location: z.string(),


});
export function NewProduct() {
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editProduct, setEditProduct] = useState(false);
    const [uploadFiles, setUploadFiles] = useState([]);
    const [additionalInfo, setAdditionalInfo] = useState([]);
    const [size, setSize] = useState([]);
    const router = useRouter();
    // form validation
    const form = useForm({
        resolver: zodResolver(ProductSchema),
        defaultValues: {
            name: "",
            sku: "",
            description: "",
            categoryId: "",
            quantity: "",
            price: "0",
            lowStock: "",
            discountPrice: "0",
            units: "",
            brand: "",
            dimensions: "",
            weight: "0",
            taxRate: "0",
            warranty: "",
            shippingInfo: "",
            additionalInfo: "",
            color: "",
            hex: "",
            size: "",


            // location: "",
            // categoryId: "",
        },
    });

    // rich text editor
    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "list",
        "link",
        "image",
        "font",
        "size",
        "align",
    ];

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "bullet" }, { list: "ordered" }, { list: "check" }],
            ["link", "image"],
            [{ script: "sub" }, { script: "super" }],
            ["clean"],
        ],
    };
    // get categories
    useEffect(() => {
        async function FetchCategory() {
            const res = await fetch("/api/category", {
                method: "GET",
            });
            const resData = await res.json();
            // console.log(resData);
            setCategory(resData);
        }
        FetchCategory();

    }, []);
    // set additional info
    useEffect(() => {
        form.setValue("additionalInfo", additionalInfo);
    }, [additionalInfo]);
    // set size
    useEffect(() => {
        form.setValue("size", size);
    }, [size]);

    const handleEdit = async () => {
        console.log("edit", edit);
        if (!edit) return;
        setEditProduct(true);
        const res = await GetSingleProduct(edit);
        console.log(res);
        const price = JSON.stringify(res?.price);
        console.log("price", price);

        form.setValue("name", res?.name);
        form.setValue("category", res?.category?.id);
        form.setValue("sku", res?.sku);
        form.setValue("price", price);
        form.setValue("description", res?.description);
        form.setValue("image_Url", res?.imageUrl);
    };
    // submit form
    const onSubmit = async (data) => {
        console.log("data", data);

        try {
            setLoading(true);
            if (editProduct) {
                const respond = await fetch(`/api/products/${edit}`, {
                    method: "POST",
                    body: JSON.stringify(data),
                });
                const res = await respond.json();
                console.log(res);
                if (res?.ok) {
                    setLoading(false);
                    toast.success("product updated successfully");
                    router.refresh();
                    return res;
                } else {
                    setLoading(false);
                    toast.error("product not updated");
                    return res;
                }
            } else {
                const respond = await fetch(`/api/products`, {
                    method: "POST",
                    body: JSON.stringify({
                        ...data,
                        images: uploadFiles,
                    }),
                });
                const res = await respond.json(); console.log(res);
                if (res?.ok) {
                    setLoading(false);
                    toast.success(res?.message || "product created successfully");
                    router.refresh();
                    return res;
                } else {
                    setLoading(false);
                    toast.error(res?.message || "product not created");
                    return res;
                }
            }
        } catch (error) {
            setLoading(false);
            toast.error(error?.message || "product not created");
            console.log(error);
        }
    };
    return (
        <div className="w-full min-h-[100vh] mx-auto flex flex-col gap-8  mb-10">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                    className="mx-auto max-w-5xl w-full"
                >
                    {" "}
                    <div className=" w-full flex flex-col gap-8 shadow-md rounded-lg  p-5 mx-auto">
                        <div className="w-full flex flex-wrap  items-center gap-4   ">
                            <FormField
                                controle={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className=" max-w-md w-full mx-auto">
                                        <FormLabel>Name</FormLabel>
                                        <FormControl></FormControl>
                                        <Input placeholder="Product name" {...field} />

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                controle={form.control}
                                name="brand"
                                render={({ field }) => (
                                    <FormItem className={"max-w-md w-full  mx-auto"}>
                                        <FormLabel>Brand</FormLabel>
                                        <FormControl >
                                            <Input placeholder="Brand" {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="w-full flex flex-wrap  items-center gap-4">
                            <FormField
                                controle={form.control}
                                name="categoryId"
                                render={({ field }) => (
                                    <FormItem className=" max-w-md w-full mx-auto">
                                        <FormLabel>Category</FormLabel>
                                        <FormControl>
                                            <div className="flex  items-center gap-2">
                                                <Select

                                                    onValueChange={field.
                                                        onChange
                                                    } {...field}>
                                                    <SelectTrigger className=" max-w-md w-full mx-auto">
                                                        <SelectValue placeholder="Categories" />
                                                    </SelectTrigger>
                                                    <SelectContent className="">
                                                        <SelectGroup>
                                                            <SelectLabel>Categories</SelectLabel>
                                                            {category.length > 0 && (category?.map((item, index) => (
                                                                <SelectItem value={item.id} key={index}>
                                                                    {item.name}
                                                                </SelectItem>
                                                            )))}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>

                                            </div>

                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                controle={form.control}
                                name="sku"
                                render={({ field }) => (
                                    <FormItem className={"max-w-md w-full mx-auto"}>
                                        <FormLabel>Sku</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Sku" {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="w-full flex flex-wrap  items-center gap-4">
                            <FormField
                                controle={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem className=" max-w-md w-full mx-auto">
                                        <FormLabel> Price</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Price" {...field} type={"number"} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                controle={form.control}
                                name="discountPrice"
                                render={({ field }) => (
                                    <FormItem className={"max-w-md w-full mx-auto"}>
                                        <FormLabel>Discount Price</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="discount price"
                                                {...field}
                                                type={"number"}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="w-full flex flex-wrap  items-center gap-4">
                            <FormField
                                controle={form.control}
                                name="quantity"
                                render={({ field }) => (
                                    <FormItem className={"max-w-md w-full mx-auto"}>
                                        <FormLabel>Quantity</FormLabel>
                                        <FormControl>
                                            <Input placeholder="quantity" {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}

                            />
                            <FormField
                                controle={form.control}
                                name="lowStock"
                                render={({ field }) => (
                                    <FormItem className={"max-w-md w-full mx-auto"}>
                                        <FormLabel>Low Stock Alart</FormLabel>
                                        <FormControl>
                                            <Input placeholder="low stock" {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="w-full flex flex-wrap  items-center gap-4">
                            <FormField
                                controle={form.control}
                                name="units"
                                render={({ field }) => (
                                    <FormItem className={"max-w-md w-full mx-auto"}>
                                        <FormLabel>Units</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Units" {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                controle={form.control}
                                name="shippingInfo"
                                render={({ field }) => (
                                    <FormItem className=" max-w-md w-full mx-auto">
                                        <FormLabel> Shipping Info</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Shipping Info" {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="w-full flex flex-wrap  items-center gap-4">
                            <FormField
                                controle={form.control}
                                name="warranty"
                                render={({ field }) => (
                                    <FormItem className=" max-w-md w-full mx-auto">
                                        <FormLabel>Warranty</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Warranty" {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                controle={form.control}
                                name="taxRate"
                                render={({ field }) => (
                                    <FormItem className={"max-w-md w-full mx-auto"}>
                                        <FormLabel>Tax Rate </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Tax Rate" {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* <div className="w-full flex flex-wrap  items-center gap-4">
                            <FormField
                                controle={form.control}
                                name="lowStock"
                                render={({ field }) => (
                                    <FormItem className={"max-w-md w-full mx-auto"}>
                                        <FormLabel>Low Stock</FormLabel>
                                        <FormControl>
                                            <Input placeholder="low stock" {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                controle={form.control}
                                name="barcode"
                                render={({ field }) => (
                                    <FormItem className={"max-w-md w-full mx-auto"}>
                                        <FormLabel>Barcode</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Barcode" {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div> */}


                        <div className="w-full flex flex-wrap  items-center gap-4">
                            <FormField
                                controle={form.control}
                                name="dimensions"
                                render={({ field }) => (
                                    <FormItem className={"max-w-md w-full mx-auto"}>
                                        <FormLabel>Dimensions</FormLabel>
                                        <FormControl>
                                            <Input placeholder="dimensions" {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                controle={form.control}
                                name="weight"
                                render={({ field }) => (
                                    <FormItem className={"max-w-md w-full mx-auto"}>
                                        <FormLabel>Weight in Kg</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Weight in Kg" {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="w-full flex flex-wrap  items-center gap-4">
                            <FormField
                                controle={form.control}
                                name="size"
                                render={({ field }) => (
                                    <FormItem className={"max-w-md w-full mx-auto"}>
                                        <FormLabel>Size</FormLabel>
                                        <FormControl>
                                            <Sizes size={size} setSize={setSize} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className={"max-w-md w-full mx-auto flex justify-between items-center"}>
                                <FormField
                                    controle={form.control}
                                    name="color"
                                    render={({ field }) => (
                                        <FormItem >
                                            <FormLabel> Color</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Color e.g. Titanium Whitesilver" {...field} />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    controle={form.control}
                                    name="hex"
                                    render={({ field }) => (
                                        <FormItem >
                                            <FormLabel>Hex Color </FormLabel>
                                            <FormControl>
                                                <Input placeholder="color in hex e.g. #E5E4E2" {...field} />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div className="w-full flex flex-wrap  items-center gap-4">
                            <FormField
                                controle={form.control}
                                name="additionalInfo"
                                render={({ field }) => (
                                    <FormItem className={"max-w-md w-full mx-auto"}>
                                        <FormLabel>Additional Info</FormLabel>
                                        <FormControl>

                                            <AddInfo additionalInfo={additionalInfo} setAdditionalInfo={setAdditionalInfo} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className={"max-w-md w-full mx-auto"}>
                                <CloudUploadButton uploadFiles={uploadFiles} setUploadFiles={setUploadFiles} />
                            </div>

                        </div>

                        <div className="w-full flex flex-col  items-center gap-4">
                            <FormField
                                controle={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem className={" w-full mx-auto"}>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <div className="w-full overflow-auto scrollbar-hide">
                                                <ReactQuill
                                                    className="w-full max-h-96  rounded-lg "
                                                    theme="snow"
                                                    modules={modules}
                                                    formats={formats}
                                                    {...field}
                                                    onChange={field.onChange}
                                                    placeholder="Enter Description"
                                                />
                                            </div>


                                            {/* <Textarea placeholder="product description" {...field} /> */}
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </div>
                        {/* <ImageUploader open={open} setOpen={setOpen} /> */}
                        <div className="w-full flex flex-wrap justify-center  items-center gap-4  mx-auto ">
                            {uploadFiles?.map((item, index) => {
                                return (
                                    <div key={index} className="flex items-center  w-40 relative">
                                        <img src={item.url} alt={item.name} className="w-20 h-20 rounded-lg" />
                                        {/* <X onClick={() => DeleteImage(item.id)} className="absolute top-0 right-0 cursor-pointer" /> */}
                                    </div>
                                )
                            })}
                        </div>
                        <div className="w-full flex justify-center ">
                            <Button
                                type="submit"
                                variant={"primary"}
                                className={"cursor-pointer font-bold text-lg w-md "}
                            >
                                {editProduct ? "Update Product" : "Add Product"}{" "}
                                {loading && <Loader2 className={"ml-2 animate-spin"} />}
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    );
}