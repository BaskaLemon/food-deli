import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { status } = await req.json();

    const order = await prisma.food_orders.update({
      where: { id: params.id },
      data: { status },
    });

    return Response.json(order);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to update order" }, { status: 500 });
  }
}
