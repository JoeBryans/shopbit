import { authOptions } from "@/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { use } from "react";

export async function GET(req, { params }) {

    try {
        const { id } = await params;
        const product = await prisma.product.findUnique({
            where: {
                id: id,
            },
            include: {
                images: {
                    select: {
                        url: true,
                        cloudPublicId: true
                    }
                },
                color: {
                    select: {
                        color: true,
                        hex: true,
                        price: true
                    }
                },
                category: {
                    select: {
                        id: true,
                        name: true,
                        slug: true
                    }

                },
                // user: {
                //     select: {
                //         id: true,
                //         name: true,
                //         email: true,
                //         phone: true,
                //         address: true,
                //     }
                // },
                review: {
                    select: {
                        id: true,
                        rating: true,
                        comment: true,
                        createAt: true,
                    }

                },

            },


        });
        return NextResponse.json(product);
    } catch (error) {
        console.log(error);

        return NextResponse.json({ message: "something went wrong  ", error, ok: false, status: 500 });
    }
}


export async function DELETE(req, { params }) {
    try {
        const { id } = await params;
        const deletedProduct = await prisma.product.delete({
            where: {
                id: id,
            },
        });
        return NextResponse.json({ message: "Product deleted successfully", deletedProduct });
    } catch (error) {
        console.log(error);

        return NextResponse.json({ message: "something went wrong  ", error });
    }
}       

export async function PUT(req, { params }) {
    const body = await req.json();
    const { user } = await getServerSession(authOptions);
    const userId = user?.user?.id;
    const { id } = await params;
    try {
        const product = await prisma.product.update({
            where: {
                id: id,
            },
            data: {
                ...body,
                userId:userId,
            },
        });
        return NextResponse.json({ message: "Product updated successfully", product });
    } catch (error) {
        console.log(error);

        return NextResponse.json({ message: "something went wrong  ", error });
    }
}