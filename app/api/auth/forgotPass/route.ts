import { prisma } from "@/lib/prisma";
import { nanoid } from "nanoid";
import { resend } from "@/lib/resend";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const user = await prisma.users.findUnique({
      where: { email },
    });

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

    const resetLink =
      `${process.env.NEXT_PUBLIC_APP_URL}` + `/reset-password?token=${token}`;

    await resend.emails.send({
      from: "noreply@resend.dev",
      to: email,
      subject: "Reset your password",
      html: `
        <div>
          <h1>Password Reset</h1>

          <p>
            Click the button below to reset your password.
          </p>

          <a
            href="${resetLink}"
            style="
              background:black;
              color:white;
              padding:12px 20px;
              border-radius:8px;
              text-decoration:none;
              display:inline-block;
              margin-top:12px;
            "
          >
            Reset Password
          </a>

          <p style="margin-top:20px;">
            This link expires in 1 hour.
          </p>
        </div>
      `,
    });

    return Response.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
