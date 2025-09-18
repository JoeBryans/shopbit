import { authOptions } from "@/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    try {
        if (!userId) return NextResponse.json({ error: "User not found" });
        const { orderId } = await params;
        console.log("orderId", orderId);

        const order = await prisma.order.findUnique({
            where: {
                id: orderId,
                // userId: userId,
            },
            include: {
                orderItems: {
                    select: {
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
                        quantity: true,
                        price: true,
                    }
                },
                payment: true,
            }
        });
        console.log(order);

        return NextResponse.json(order);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error });
    }
}