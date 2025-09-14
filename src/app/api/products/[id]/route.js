import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {

    try {
        const { id } = await params;
        const product = await prisma.product.findUnique({
            where: {
                id: id,
            },
            include: {
                images: {
                    select: {
                        url: true,
                        cloudPublicId: true
                    }
                },
                color: {
                    select: {
                        color: true,
                        hex: true,
                        price: true
                    }
                },
                category: {
                    select: {
                        id: true,
                        name: true,
                        slug: true
                    }

                },
                // user: {
                //     select: {
                //         id: true,
                //         name: true,
                //         email: true,
                //         phone: true,
                //         address: true,
                //     }
                // },
                review: {
                    select: {
                        id: true,
                        rating: true,
                        comment: true,
                        createAt: true,
                    }

                },

            },


        });
        return NextResponse.json(product);
    } catch (error) {
        console.log(error);

        return NextResponse.json({ message: "something went wrong  ", error, ok: false, status: 500 });
    }
}