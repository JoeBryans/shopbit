import { authOptions } from "@/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { rating, comment, productId } = await req.json();
    console.log("rating", rating);
    console.log("comment", comment);
    console.log("productId", productId);
    
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    try {
        if (!userId) return null;
        const review = await prisma.review.create({
            data: {
                productId: productId,
                rating: rating,
                comment: comment,
                userId: userId,
            }
        })
        console.log("review", review);
        return NextResponse.json(review);
    } catch (error) {
        console.log(error);

        return NextResponse.json(error);
    }
}


export async function GET(req) {
    const { user } = await getServerSession(authOptions);
    const userId = user?.id;
    try {
        if (!userId) return NextResponse.json({ error: "User not found" });
        const reviews = await prisma.review.findMany({
            where: {
                userId: userId,
            },
            include: {
                product: {
                    select: {
                        id: true,
                        name: true,
                        price: true,
                        category: {
                            select: {
                                id: true,
                                name: true,
                                slug: true
                            }
                        },
                        images: {
                            select: {
                                url: true,
                                cloudPublicId: true
                            }
                        },
                    }
                },
            }
        });
        console.log("reviews", reviews);

        return NextResponse.json(reviews);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "something went wrong  ", error, ok: false, status: 500 });
    }
}