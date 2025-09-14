import { authOptions } from "@/auth";
import prisma from "@/lib/db";
import { tr } from "date-fns/locale";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    const { productId, quantity, price } = await req.json();
console.log("body", productId, quantity, price);
   
    const { user } = await getServerSession(authOptions)
    const userId = user?.id;

    try {
        if (!userId) {
            return null

        }
        const existingCart = await prisma.cartItems.findUnique({
            where: {
                productId_userId: {
                    productId: productId,
                    userId: userId,
                }
            },
        });
        console.log("existingCart", existingCart);
        if (existingCart) {
            const cart = await prisma.cartItems.update({
                where: {
                    id: existingCart.id,
                },
                data: {
                    quantity: existingCart?.quantity + quantity,
                    totalPrice: existingCart?.totalPrice + price * quantity,
                },
            });
            revalidatePath("/cart");
            return NextResponse.json({ cart, ok: true, message: "product added to cart" });
        } else {

            const cart = await prisma.cartItems.create({
                data: {
                    productId: productId,
                    userId: userId,
                    quantity: quantity,
                    totalPrice: price * quantity
                }
            })
            console.log("cart", cart);
            return NextResponse.json({ cart, ok: true, message: "product added to cart" });

        }

    } catch (error) {
        console.log(error);

        return NextResponse.json(error);
    }
};


export async function GET(req) {
    const user = await getServerSession(authOptions)
    const userId = user?.user?.id;
    try {
        const cart = await prisma.cartItems.findMany({
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
                }
            }
        });
        console.log("cart", cart);
        return NextResponse.json({ cart, ok: true, });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "something went wrong  ", error: error, ok: false, status: 500 });
    }
}

export async function PATCH(req) {
    const body = await req.json();
    console.log("body", body);

    const { user } = await getServerSession(authOptions)
    const userId = user?.user?.id;
    const productId = body.map((item) => item.id);
    console.log("productId", productId);
    try {
        if (!userId) return null;
        // const cart = await prisma.carts.update({
        //     where: {
        //         id:Id,
        //         userId: userId,

        //     },


    } catch (error) {
        console.log(error);

        return NextResponse.json({ message: "something went wrong  ", error: error, ok: false, status: 500 });
    }
};