import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = verifyToken(token);

    if (!payload || payload.role !== "ADMIN") {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page") ?? 1);
    const limit = Number(searchParams.get("limit") ?? 10);

    const [orders, total] = await Promise.all([
      prisma.food_orders.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { created_at: "desc" },
        include: {
          food_order_items: {
            include: { dishes: true },
          },
          users: true,
        },
      }),
      prisma.food_orders.count(),
    ]);

    return Response.json({ orders, total });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}
