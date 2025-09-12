"use server";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function CreateCategory(data) {
    const { name, slug } = data;
    console.log(data);



    try {
        const category = await prisma.category.create({
            data: {
                name: name,
                slug: slug,
            }
        });
        revalidatePath("/add-products");
        return { message: "Category created successfully", category, ok: true };
    } catch (error) {
        console.log(error);

        return { message: "Category not created", error, ok: false };
    }
}

export async function GetCategory() {
    try {
        const category = await prisma.category.findMany();

        return category;
    } catch (error) {
        console.log(error);

        return error;
    }
}

export async function GetCategoryById(id) {
    try {
        const category = await prisma.category.findUnique({
            where: {
                id: id,
            },
        });

        return category;
    } catch (error) {
        return error;
    }
}