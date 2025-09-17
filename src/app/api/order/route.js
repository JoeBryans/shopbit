import { authOptions } from "@/auth";
import prisma from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

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
                // metadata: {
                //     userId: userId,
                //     amount: totalPrice,
                //     shippingAddress: address,
                //     paymentMethod: paymentMethod
                // }
            });
            console.log("payment attached", payment);
        }

        const order = await prisma.order.create({
            data: {
                total: totalPrice,
                userId: userId,
                status: "pending",
                orderItems: {
                    create: items.map(item => {
                        return {
                            productId: item.productId,
                            quantity: item.quantity,
                            price: item.totalPrice
                        }
                    })
                }
                // shippingAddress:shippingAddress,
                // paymentMethod:paymentMethod
            }
        })

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