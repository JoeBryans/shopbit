import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/db";
import { authOptions } from "@/auth";

export async function POST(req) {
    const body = await req.json();
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    const { images } = body;
    const image = images.map((img) => {
        return { url: img.url, cloudPublicId: img.id }
    })
    console.log("images :", images);


    try {
        if (!userId) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        const product = await prisma.product.create({
            data: {
                name: body.name,
                brand: body.brand,
                price: body.price,
                discountPrice: body.discountPrice,
                quantity: body.quantity,
                units: body.units,
                shippingInfo: body.shippingInfo,
                warranty: body.warranty,
                description: body.description,
                dimensions: body.dimensions,
                additionalInfo: body.additionalInfo,
                size: body.size,
                sku: body.sku,
                lowStock: body.lowStock,
                taxRate: body.taxRate,
                categoryId: body.categoryId,
                images: {
                    create: images.map((img) => ({
                        url: img.url,
                        cloudPublicId: img.id
                    }))
                },
                color: {
                    create: {
                        color: body.color,
                        hex: body.hex,
                        price: body.price,
                    }

                },
                userId: userId,

            },
            include: { images: true, color: true, category: true },
        });





        return NextResponse.json({

            message: "Product created successfully",
            product,
            ok: true,
        });
    } catch (error) {
        console.log(error);

        return NextResponse.json({
            message: `something went wrong  
      ${error?.message}
      `,
            error,
            ok: false,
        });
    }
};

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    console.log("category from params :", category);
    try {
        const LatestProducts = await prisma.product.findMany(
            {
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

                    }
                },
                orderBy: {
                    createdAt: 'desc',
                }
            }
        );
        const phones = await prisma.product.findMany({
            where: {
                category: {
                    name: {
                        equals: "phones and accessories",
                        mode: 'insensitive'
                    }
                },

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
                        name: true,
                        slug: true
                    }

                },
                wishlist: {
                    select: {
                        id: true,
                        productId: true,
                    }
                }
            },
            orderBy: {
                createdAt: 'desc',
            }
        });
        const fashion = await prisma.product.findMany({
            where: {
                category: {
                    name: {
                        equals: "Fashion",
                        mode: 'insensitive'
                    }
                },

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
                wishlist: {
                    select: {
                        id: true,
                        productId: true,
                    }
                }
            },
            orderBy: {
                createdAt: 'desc',
            }
        });
        const electronics = await prisma.product.findMany({
            where: {
                category: {
                    name: {
                        equals: "Electronics & Appliances",
                        mode: 'insensitive'
                    }
                },

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
                wishlist: {
                    select: {
                        id: true,
                        productId: true,
                    }
                }
            },
            orderBy: {
                createdAt: 'desc',
            }
        });
        const computers = await prisma.product.findMany({
            where: {
                category: {
                    name: {
                        equals: "computers and accessories",
                        mode: 'insensitive'
                    }
                },

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
                wishlist: {
                    select: {
                        id: true,
                        productId: true,
                    }
                }
            },
            orderBy: {
                createdAt: 'desc',
            }
        });
        const clothing = await prisma.product.findMany({
            where: {
                category: {
                    name: {
                        equals: "Clothing, Shoes & Jewelry",
                        mode: 'insensitive'
                    }
                },

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
                wishlist: {
                    select: {
                        id: true,
                        productId: true,
                    }
                }
            },
            orderBy: {
                createdAt: 'desc',
            }
        });
        const home = await prisma.product.findMany({
            where: {
                category: {
                    name: {
                        equals: "Home and Kitchen",
                        mode: 'insensitive'
                    }
                },

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
                        name: true,
                        slug: true
                    }

                },
                wishlist: {
                    select: {
                        id: true,
                        productId: true,
                    }
                }
            },
            orderBy: {
                createdAt: 'desc',
            }
        });

        console.log("computers :", computers);

        return NextResponse.json({
            LatestProducts,
            phones,
            fashion,
            electronics,
            computers,
            home,
            clothing,
        });
    } catch (error) {
        console.log(error);

        return NextResponse.json({ message: "something went wrong  ", error });
    }
}


export async function DELETE(req) {
    try {
        //  delect many products where image url is null
        const deletedProducts = await prisma.product.deleteMany({
            where: {
                categoryId: "68c46f7c7f93e6311395deff"
            },
        });
        return NextResponse.json({ message: "Products deleted successfully", deletedProducts });
    } catch (error) {
        console.log(error);

        return NextResponse.json({ message: "something went wrong  ", error });

    }
}

