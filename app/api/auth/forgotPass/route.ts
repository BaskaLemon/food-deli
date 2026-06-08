import { prisma } from "@/lib/prisma";
import { nanoid } from "nanoid";
import { transporter } from "@/lib/mailer";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    console.log("1. email:", email);

    const user = await prisma.users.findUnique({ where: { email } });
    console.log("2. user found:", !!user);

    if (!user) {
      return Response.json({ error: "Email not found" }, { status: 404 });
    }

    const token = nanoid(32);
    const expires = new Date(Date.now() + 1000 * 60 * 60);

    await prisma.password_reset_tokens.create({
      data: {
        id: nanoid(),
        token,
        email,
        expires_at: expires,
      },
    });
    console.log("3. token created");

    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

    await transporter.sendMail({
      from: `"NomNom" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset your password",
      html: `<a href="${resetLink}">Reset Password</a>`,
    });
    console.log("4. email sent");

    return Response.json({ success: true });
  } catch (error) {
    console.error("ERROR:", error);
    return Response.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}
