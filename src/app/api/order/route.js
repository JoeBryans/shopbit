import { authOptions } from "@/auth";
import prisma from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { email } from "zod";

export async function POST(request) {
    const { items, totalPrice, shippingAddress, paymentMethod, paymentIntentId } = await request.json();
    const { user } = await getServerSession(authOptions);
    const userId = user?.id;
    console.log("userId:", userId);

    try {
        if (!userId) return NextResponse.json({ error: "User not found" });
        let payment;
        // if (paymentIntentId !== null || paymentIntentId !== undefined) {
        //     payment = await stripe.paymentIntents.retrieve(paymentIntentId);
        //     console.log("payment retrieved", payment);
        //     return NextResponse.json({
        //         clientSecret: payment.client_secret,
        //         paymentIntentId: payment.id,
        //     });
        // } 
        // else {
        if (paymentMethod === "card") {
            payment = await stripe.paymentIntents.create({
                amount: parseInt(totalPrice) * 100,
                currency: "NGN",
                automatic_payment_methods: {
                    enabled: true
                },
                metadata: {
                    userId: userId,
                    amount: totalPrice,
                    country: shippingAddress.country,
                    state: shippingAddress.state,
                    postalCode: shippingAddress.postalCode,
                    city: shippingAddress.city,
                    address: shippingAddress.address,
                    phone: shippingAddress.phone,
                    email: shippingAddress.email,
                    firstName: shippingAddress.firstName,
                    lastName: shippingAddress.lastName,
                    paymentMethod: paymentMethod
                }
            });
            console.log("payment attached", payment);
        }

        const order = await prisma.order.create({
            data: {
                total: totalPrice,
                userId: userId,
                status: "PENDING",
                paymentStatus: "PENDING",
                shippingAddress: shippingAddress,

                orderItems: {
                    create: items.map(item => {
                        return {
                            productId: item.productId,
                            quantity: item.quantity,
                            price: item.totalPrice
                        }
                    })
                },
                payment: {
                    create: {
                        amount: totalPrice,
                        status: payment.status,
                        paymentMethod: payment.payment_method,
                        paymentIntentId: payment.id,
                        metadata: payment.metadata,
                        userId: userId
                    }
                }
                // shippingAddress:shippingAddress,
                // paymentMethod:paymentMethod
            }
        })
        if (order) {
            const deleteCart = await prisma.cartItems.deleteMany({
                where: {
                    userId: userId
                }
            })
            console.log("cart deleted", deleteCart);
        }


        console.log("order created", order);

        return NextResponse.json({
            clientSecret: payment.client_secret,
            paymentIntentId: payment.id,
        });
        // }

        // const paymentIntent = await stripe.paymentIntents.create({
        //     amount: totalPrice,
        //     currency: "usd",
        //     payment_method_types: ["card"],
        //     shipping: {
        //         address: {
        //             city: shippingAddress.city,
        //             country: shippingAddress.country,
        //             line1: shippingAddress.address,
        //             postal_code: shippingAddress.postalCode,
        //             state: shippingAddress.state,
        //         },
        //         name: shippingAddress.firstName,
        //         phone: shippingAddress.phone,
        //     },
        //     metadata: {
        //         userId: userId,
        //     },
        // });

    } catch (error) {
        console.log(error);

        return NextResponse.json({ error: error });
    }
}
export async function GET(req) {
    // const { user } = await getServerSession(authOptions);

    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    console.log("session is :", session);
    console.log("userId is :", userId);
    try {
        if (!userId) return NextResponse.json({ error: "User not found" });
        const PendingOrders = await prisma.order.findMany({
            where: {
                userId: userId,
                status: "PENDING",
                paymentStatus: "PENDING",
            },
            include: {
                orderItems: true,
                payment: true,
            }
        });

        const orders = await prisma.order.findMany({
            where: {
                userId: userId,
                status: "DELIVERED" || "COMPLETED",
                paymentStatus: "PAID",
            },
            include: {
                orderItems: {
                    select: {
                        product: {
                            select: {
                                name: true,
                                price: true,
                                id: true,
                                images: true,
                                category: {
                                    select: {
                                        name: true,
                                        slug: true,
                                    }
                                }
                            }
                        },
                        quantity: true,
                        price: true,

                    },


                },
                payment: true,
            },
        });
        console.log("orders", orders);
        return NextResponse.json(orders);
    } catch (error) {
        console.log(error);
        return NextResponse.json(error);
    }
}