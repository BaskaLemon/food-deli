import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    const resetToken = await prisma.password_reset_tokens.findUnique({
      where: { token },
    });

    if (!resetToken) {
      return Response.json({ error: "Invalid token" }, { status: 400 });
    }

    if (resetToken.used) {
      return Response.json({ error: "Token already used" }, { status: 400 });
    }

    if (new Date() > resetToken.expires_at) {
      return Response.json({ error: "Token expired" }, { status: 400 });
    }

    const hashed = await hashPassword(password);

    await prisma.users.update({
      where: { email: resetToken.email },
      data: { password: hashed },
    });

    await prisma.password_reset_tokens.update({
      where: { token },
      data: { used: true },
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
