import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const token = req.headers.get("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload || payload.role !== "ADMIN") {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }

    const { status } = await req.json();

    console.log("Updating order:", id, "to status:", status);

    const order = await prisma.food_orders.update({
      where: { id },
      data: { status },
    });

    return Response.json(order);
  } catch (error) {
    console.error("PATCH order error:", error);
    return Response.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to update order",
      },
      { status: 500 },
    );
  }
}
