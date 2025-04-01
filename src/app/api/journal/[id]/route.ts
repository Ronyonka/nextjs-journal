import { getUser } from "@/auth/server";
import { prisma } from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, content } = await request.json();

    const entry = await prisma.journalEntry.findUnique({
      where: {
        id: params.id,
        userId: user.id,
      },
    });

    if (!entry) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const updatedEntry = await prisma.journalEntry.update({
      where: { id: params.id },
      data: {
        title,
        content,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updatedEntry);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
