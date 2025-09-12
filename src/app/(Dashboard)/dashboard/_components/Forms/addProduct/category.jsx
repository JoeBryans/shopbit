"use client";
import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as yup from "yup";
import { toast } from "sonner";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { CreateCategory } from "@/actions/category";

const Schema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }).toLowerCase().trim(),
    slug: z.string().min(2, {
        message: "Slug must be at least 2 characters.",
    }).toLowerCase().trim(),
});
const Category = () => {
    const [loading, setLoading] = useState(false);
    const form = useForm({
        resolver: zodResolver(Schema),
        defaultValues: {
            name: "",
            slug: "",
        },
    });

    const onSubmit = async (data) => {
        try {
            setLoading(true)
            const res = await CreateCategory(data);
            if (res?.ok) {
                setLoading(false)
                toast.success("Category created successfully");
                return;
            } else {
                setLoading(false)
                toast.error("Category not created");
                return;
            }
        } catch (error) {
            setLoading(false)
            console.log(error);
            toast.error("Category not created");
            return;
        }
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <span className="border px-3 py-1.5 cursor-pointer rounded-lg bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50">
                    Category
                </span>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="opacity-80">Search for product</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center gap-4  z-40">
                        <FormField
                            controle={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className=" max-w-md w-full mx-auto">
                                    <FormLabel>Name</FormLabel>
                                    <FormControl></FormControl>
                                    <Input placeholder="category name" {...field} />

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            controle={form.control}
                            name="slug"
                            render={({ field }) => (
                                <FormItem className={"max-w-md w-full mx-auto"}>
                                    <FormLabel>Slug</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Slug" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <Button
                            type="submit"
                            variant={"primary"}
                            className="cursor-pointer w-full "
                        >
                            create {loading && <Loader2 className={"ml-2 animate-spin"} />}
                        </Button>
                    </form>
                </Form>

            </DialogContent>
        </Dialog>
    );
};

export default Category;
