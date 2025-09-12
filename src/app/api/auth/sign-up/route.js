import prisma from "../../../../lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const body = await req.json();
  const { email, password } = body;
  console.log(body);
  try {
    const existUser = await prisma.user.findUnique({ where: { email: email } });
    if (existUser) {
      return NextResponse.json(
        { message: "User already exists " },
        {
          status: 400,
        }
      );
    }
    console.log(existUser);

    const passwordHash = await bcrypt.hash(password ?? "", 10);
    console.log(passwordHash);
    const imageUrl = `https://avatar.iran.liara.run/username?username=${body.email}`;
    const user = await prisma.user.create({
      data: {
        ...body,
        image: imageUrl,
        password: passwordHash,
      },
    });
    console.log(user);

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(error);
  }
}
