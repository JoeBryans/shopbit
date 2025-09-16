import { authOptions } from "@/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { user } = await getServerSession(authOptions)
    const userId = user?.id;
    const body = await req.json();
    console.log("body", body);
    const { deliveryAddress, city, country, email, firstName, lastName, phone, postalCode, state, additionalInfo } = body;

    try {
        const address = await prisma.address.create({
            data: {
                deliveryAddress: deliveryAddress,
                city: city,
                country: country,
                email: email,
                firstName: firstName,
                lastName: lastName,
                phone: phone,
                postalCode: postalCode,
                state: state,
                additionalInfo: additionalInfo,
                userId: userId,
            }
        })
        console.log("posted address", address);
        
        return NextResponse.json({ address, ok: true });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "something went wrong  ", error: error, ok: false, status: 500 });

    }
}

export async function GET(req) {
    const user = await getServerSession(authOptions)
    const userId = user?.user?.id;
    try {
        const address = await prisma.address.findMany({
            where: {
                userId: userId,
            },
        });
        console.log("address", address);
        return NextResponse.json(address);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "something went wrong  ", error: error, ok: false, status: 500 });
    }
}   