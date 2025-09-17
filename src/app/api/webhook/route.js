import Stripe from "stripe";
import { NextResponse } from "next/server";
import prisma from "../../../lib/db";

export async function POST(req) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  const webhookSecret = process.env.STRIPE_WEBHOOK_KEY;
  // console.log("body", body);

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    console.log("event", event);
  } catch (error) {
    return NextResponse.json(error);
  }
  const paymentEvent = event.data.object;
  console.log("paymentEvent :", paymentEvent);
  try {
    if (
      event.type === "charge.succeeded" ||
      event.type === "payment_intent.succeeded" ||
      event.type === "charge.updated" ||
      event.type === "payment_intent.updated"
    ) {
      await prisma.order.update({
        where: { paymentIntentId: paymentEvent.id },
        data: {
          paymentStatus: "paid",
        },
      });
    } else if (event.type === "payment_intent.payment_failed") {
      const paymentEvent = event.data.object;

      await prisma.order.update({
        where: { paymentIntentId: paymentEvent.id },
        data: {
          paymentStatus: "faild",
        },
      });
    }
  } catch (error) {
    return NextResponse.json(error);
  }
  return NextResponse.json({ received: true });
}

// import Stripe from "stripe";
// import { NextResponse } from "next/server";
// import db from "../../../lib/db";

// export async function POST(req) {
//   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//   const body = await req.text();
//   const sig = req.headers.get("Stripe-Signature");

//   const webhookSecret = process.env.STRIPE_WEBHOOK_KEY;

//   let event;
//   try {
//     event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
//   } catch (error) {
//     return NextResponse.json(error);
//   }
//   const paymentEvent = event.data.object;

//   console.log("paymentEvent :", paymentEvent);
//   if (event.type === "payment_intent.succeeded") {
//     console.log("payment successfull", paymentEvent.id);

//     await db.order.update({
//       where: { paymentIntentId: paymentEvent.id },
//       data: {
//         paymentStatus: "paid",
//       },
//     });
//   } else if (event.type === "payment_intent.payment_failed") {
//     const paymentEvent = event.data.object;
//     console.log(paymentEvent);

//     await db.order.update({
//       where: { paymentIntentId: paymentEvent.id },
//       data: {
//         paymentStatus: "faild",
//       },
//     });
//   }
//   return NextResponse.json({ received: true });
// }
