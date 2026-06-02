import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { nanoid } from "nanoid";

export async function GET(req: Request) {
  try {
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return Response.json({ error: "Invalid token" }, { status: 401 });
    }

    const orders = await prisma.food_orders.findMany({
      where: { user_id: payload.id },
      orderBy: { created_at: "desc" },
    });

    return Response.json(orders);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return Response.json({ error: "Invalid token" }, { status: 401 });
    }

    const { items, total } = await req.json();

    const order = await prisma.food_orders.create({
      data: {
        id: nanoid(),
        user_id: payload.id,
        total_price: total,
        status: "PENDING",
        food_order_items: {
          create: items.map(
            (item: { dish_id: string; price: number; quantity: number }) => ({
              id: nanoid(),
              dish_id: item.dish_id,
              quantity: item.quantity,
              price: item.price,
            }),
          ),
        },
      },
    });

    return Response.json(order);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to place order" }, { status: 500 });
  }
}
