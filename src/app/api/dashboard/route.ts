import { prisma } from "@/db/prisma";
import { getUser } from "@/auth/server";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Fetch heatmap data
  const entries = await prisma.journalEntry.findMany({
    where: { userId: user.id },
    select: { date: true },
  });

  const heatmap = entries.reduce((acc, entry) => {
    const date = entry.date.toISOString().split("T")[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const heatmapData = Object.entries(heatmap).map(([date, count]) => ({
    date,
    count,
  }));

  // Fetch category distribution
  const categories = await prisma.category.findMany({
    where: { journalEntries: { some: { userId: user.id } } },
    include: { journalEntries: true },
  });

  const categoryDistribution = categories.map((category) => ({
    name: category.name,
    value: category.journalEntries.length,
  }));

  // Fetch word count by category
  const wordCountByCategory = categories.map((category) => ({
    name: category.name,
    wordCount: category.journalEntries.reduce(
      (sum, entry) => sum + entry.content.split(" ").length,
      0,
    ),
  }));

  return NextResponse.json({
    heatmap: heatmapData,
    categoryDistribution,
    wordCountByCategory,
  });
}
