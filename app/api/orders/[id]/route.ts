import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page") ?? 1);
    const limit = Number(searchParams.get("limit") ?? 10);
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    const where = {
      ...(from &&
        to && {
          created_at: {
            gte: new Date(from),
            lte: new Date(new Date(to).setHours(23, 59, 59, 999)),
          },
        }),
    };

    const [orders, total] = await Promise.all([
      prisma.food_orders.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { created_at: "desc" },
        include: {
          food_order_items: { include: { dishes: true } },
          users: true,
        },
      }),
      prisma.food_orders.count({ where }),
    ]);

    return Response.json({ orders, total });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const { status } = await req.json();

    const order = await prisma.food_orders.update({
      where: { id },
      data: { status },
    });

    return Response.json(order);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to update order" }, { status: 500 });
  }
}
