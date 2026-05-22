import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const categories = await prisma.categories.findMany({
      orderBy: { id: "asc" },
    });

    return Response.json(categories);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to fetch categories" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const categories = await prisma.categories.createMany({
      data: body,
      skipDuplicates: true,
    });

    return Response.json(categories);
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to create categories" },
      { status: 500 },
    );
  }
}
