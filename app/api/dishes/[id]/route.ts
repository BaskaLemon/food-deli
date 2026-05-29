import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const dish = await prisma.dishes.update({
      where: { id },
      data: {
        name: body.name,
        price: body.price,
        description: body.description,
        image_url: body.image_url,
      },
    });
    return Response.json(dish);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to update dish" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    await prisma.food_order_items.deleteMany({
      where: { dish_id: id },
    });

    await prisma.dishes.delete({
      where: { id },
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to delete dish" }, { status: 500 });
  }
}
