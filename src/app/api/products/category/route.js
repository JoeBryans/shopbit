import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    // console.log("category from params :", category);


    // const category = searchParams.get('category');
    // console.log("category from params :", category);
    try {
        const products = await prisma.product.findMany(

            {
                where: {
                    category: {
                        name: {
                            equals: category,
                            mode: 'insensitive'
                        }
                    },
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
                    wishlist: {
                        select: {
                            id: true,
                            productId: true,
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc',
                }
            }
        );

        // console.log("products :", products);


        return NextResponse.json(products);
    } catch (error) {
        console.log(error);

        return NextResponse.json({ message: "something went wrong  ", error });
    }

}
