import { comparePassword, signToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return Response.json({ error: "Email not found" }, { status: 404 });
    }

    const valid = await comparePassword(password, user.password);

    if (!valid) {
      return Response.json({ error: "Wrong password" }, { status: 401 });
    }

    const token = signToken({
      id: user.id,
      role: user.role || "USER",
    });

    return Response.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);

    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
