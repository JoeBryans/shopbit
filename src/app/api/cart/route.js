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
    if (!userId) {
        return null
    }
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
        return NextResponse.json(cart);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "something went wrong  ", error: error, ok: false, status: 500 });
    }
}

// export async function DELETE(req) {
//     const { productId } = await req.json();
// }

export async function PATCH(req) {
    const body = await req.json();
    const { user } = await getServerSession(authOptions)
    const userId = user?.id;
    const { productId, id } = body;
    try {
        if (!userId) return null;
        const existingCart = await prisma.cartItems.findUnique({
            where: {
                id: id,
                productId_userId: {
                    productId: productId,
                    userId: userId,
                }
            },
            include: {
                product: {
                    select: {
                        id: true,
                        name: true,
                        price: true,

                    }
                }
            }
        });
        console.log("existingCart", existingCart);

        if (existingCart) {
            const cart = await prisma.cartItems.update({
                where: {
                    id: id,
                    productId_userId: {
                        productId: productId,
                        userId: userId,
                    }

                },
                data: {
                    quantity: existingCart?.quantity - 1,
                    totalPrice: existingCart.totalPrice - existingCart?.product?.price,
                },
            });
            return NextResponse.json({ cart, ok: true, message: "product removed from cart" });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "something went wrong  ", error: error, ok: false, status: 500 });
    }
};

export async function DELETE(req) {
    const { productId, id } = await req.json();
    const { user } = await getServerSession(authOptions)
    const userId = user?.id;
    try {
        if (!userId) {
            return null;
        } else {
            const cart = await prisma.cartItems.delete({
                where: {
                    id: id,
                    productId_userId: {
                        productId: productId,
                        userId: userId,
                    }
                },
            });
            return NextResponse.json({ cart, ok: true, message: "product removed from cart" });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "something went wrong  ", error: error, ok: false, status: 500 });
    }   
    
}