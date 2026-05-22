import { prisma } from "@/lib/prisma";
import { nanoid } from "nanoid";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category_id = searchParams.get("category_id");

    const dishes = await prisma.dishes.findMany({
      where: category_id ? { category_id: Number(category_id) } : undefined,
      orderBy: { created_at: "desc" },
    });

    return Response.json(dishes);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to fetch dishes" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name, description, price, category_id, image_url } =
      await req.json();

    const dish = await prisma.dishes.create({
      data: {
        id: nanoid(),
        name,
        description,
        price,
        category_id: Number(category_id),
        image_url,
      },
    });

    return Response.json(dish);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to create dish" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    await prisma.dishes.delete({ where: { id } });

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to delete dish" }, { status: 500 });
  }
}
