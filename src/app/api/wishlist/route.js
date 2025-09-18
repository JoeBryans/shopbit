import { authOptions } from "@/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export async function POST(req) {
    const { productId } = await req.json();
    const { user } = await getServerSession(authOptions);
    const userId = user?.id;
    try {
        if (!userId) return null;
        const existingWishlist = await prisma.wishlist.findUnique({
            where: {
                productId: productId,
                userId: userId,
            }
        });
        console.log("existingWishlist", existingWishlist);
        if (existingWishlist) {
            const wishlist = await prisma.wishlist.delete({
                where: {
                    id: existingWishlist.id,
                },

            });
            return NextResponse.json({ wishlist, ok: true, message: "product removed from wishlist" });
        } else {

            const wishlist = await prisma.wishlist.create({
                data: {
                    productId: productId,
                    userId: userId,
                }
            })
            console.log("wishlist", wishlist);
            return NextResponse.json({ wishlist, ok: true, message: "product added to wishlist" });
        }

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
        const wishlist = await prisma.wishlist.findMany({
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
        return NextResponse.json(wishlist);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "something went wrong  ", error, ok: false, status: 500 });
    }
}

