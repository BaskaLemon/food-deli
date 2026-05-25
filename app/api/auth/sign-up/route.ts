import { nanoid } from "nanoid";
import { hashPassword, signToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password, phone, address } = await req.json();

    const existing = await prisma.users.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 },
      );
    }

    const hashed = await hashPassword(password);

    const user = await prisma.users.create({
      data: {
        id: nanoid(),
        email,
        password: hashed,
        phone,
        address,
        role: "USER",
      },
    });

    const token = signToken({
      id: user.id,
      role: user.role || "USER",
    });

    return NextResponse.json({ token, user });
  } catch (error) {
    console.error("[SIGN-UP ERROR]", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 },
    );
  }
}
