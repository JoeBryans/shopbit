import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
export async function POST(req) {
    const { name, slug } = req.json();
    try {
        const category = await prisma.category.create({
            data: {
                name: name,
                slug: slug,
            }
        });
        revalidatePath("/add-products");
        return NextResponse.json({ message: "Category created successfully", category, ok: true });
    } catch (error) {
        console.log(error);

        return NextResponse.json({ message: "Category not created", error: error?.message, ok: false });
    }
}

export async function GET(req) {
    try {
        const category = await prisma.category.findMany();
        return NextResponse.json(category);
    } catch (error) {
        console.log(error);
        return NextResponse.json(error);
    }
}

// export async function GetCategoryById(id) {
//     try {
//         const category = await prisma.category.findUnique({
//             where: {
//                 id: id,
//             },
//         });

//         return category;
//     } catch (error) {
//         return error;
//     }
// }