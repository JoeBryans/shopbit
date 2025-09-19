import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { connect } from "react-redux";
import { lt } from "zod";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('q');
    const rating = searchParams.get('rating');
    const category = searchParams.get('category');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    console.log("maxPrice from params :", maxPrice);
    console.log("minPrice from params :", minPrice);

    let where = {};
    // console.log("where", where);

    if (search) {
        where.OR = [
            {
                name: {
                    contains: search, mode: "insensitive",
                },
            },
            {
                description: {
                    contains: search,
                    mode: "insensitive",
                },
            },
            {
                brand: {
                    contains: search,
                    mode: "insensitive",
                },
            },
        ];
    }

    console.log("where filter ===>", where);

    if (category) {
        where.OR = [{
            category: {
                name: {
                    contains: category,
                    mode: 'insensitive'
                }
            }
        }]
    }

    if (rating) {
        where.review = {
            some: {
                rating: {
                    gte: Number(rating),
                    // lte: Number(rating),
                },
            },
        }
    }

    if (minPrice && maxPrice) {
        where.price = {
            gte: Number(minPrice),
            lte: Number(maxPrice),
        }
    }
    else if (minPrice) {
        where.price = {
            gte: Number(minPrice),
        }
    }
    else if (maxPrice) {
        where.price = {

            lte: Number(maxPrice),
        }

    }


    // if (price) {

    //     where.OR = [{
    //         price: {
    //             gte: price,
    //             mode: 'insensitive'
    //         }
    //     }]
    // }


    try {
        const products = await prisma.product.findMany({
            where,
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
        });

        // console.log("products :", products);

        return NextResponse.json(products);
    } catch (error) {
        console.log(error);

        return NextResponse.json({ message: "something went wrong  ", error });
    }
}