import { getUser } from "@/auth/server";
import { prisma } from "@/db/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const user = await getUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { title, content } = await request.json();

    const entry = await prisma.journalEntry.findUnique({
      where: {
        id: params.id,
        userId: user.id,
      },
    });

    if (!entry) {
      return new NextResponse("Not found", { status: 404 });
    }

    const updatedEntry = await prisma.journalEntry.update({
      where: {
        id: params.id,
      },
      data: {
        title,
        content,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updatedEntry);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
