import { authOptions } from "@/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req) {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    try {
        if (!userId) return NextResponse.json({ error: "User not found" });
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                accounts: true,
                cartItems: true,
                // orders: true,
                address: true,
                payment: true,
                recentViews: true,
            }
        });
        return NextResponse.json(user);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error });
    }
}

export async function PATCH(req) {
    const body = await req.json();
    const { user } = await getServerSession(authOptions);
    const userId = user?.id;
    try {
        if (!userId) return null;
        const user = await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                ...body,
            },
        });
        return NextResponse.json({ user, ok: true, message: "user updated successfully" });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "something went wrong  ", error, ok: false, status: 500 });
    }
};

export async function DELETE(req) {
    const { user } = await getServerSession(authOptions);
    const userId = user?.id;
    try {
        if (!userId) {
            return null;
        } else {
            const user = await prisma.user.delete({
                where: {
                    id: userId,
                },
            });
            return NextResponse.json({ user, ok: true, message: "user deleted successfully" });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "something went wrong  ", error, ok: false, status: 500 });
    }
}   