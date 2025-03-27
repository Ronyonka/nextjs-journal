"use server";

import { createClient } from "@/auth/server";
import { prisma } from "@/db/prisma";
import { handleError } from "@/lib/utils";

function formatCategoryName(name: string): string {
  return name.trim().toLowerCase();
}

export const getUserJournalEntries = async () => {
  try {
    const { auth } = await createClient();
    const { data: { user } } = await auth.getUser();

    if (!user) {
      throw new Error("User not authenticated");
    }

    const entries = await prisma.journalEntry.findMany({
      where: {
        userId: user.id,
      },
      include: {
        categories: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return { data: entries, error: null };
  } catch (error) {
    return handleError(error);
  }
};

export const createJournalEntry = async (
  title: string,
  category: string,
  content: string,
) => {
  try {
    const { auth } = await createClient();

    const {
      data: { user },
    } = await auth.getUser();

    if (!user) {
      throw new Error("User not authenticated");
    }

    const formattedCategoryName = formatCategoryName(category);

    // First, ensure the category exists
    const existingCategory = await prisma.category.findUnique({
      where: { name: formattedCategoryName },
    });

    let categoryId: string;
    if (!existingCategory) {
      const newCategory = await prisma.category.create({
        data: { name: formattedCategoryName },
      });
      categoryId = newCategory.id;
    } else {
      categoryId = existingCategory.id;
    }

    // Create the journal entry with the category
    const entry = await prisma.journalEntry.create({
      data: {
        title,
        content,
        userId: user.id,
        categories: {
          connect: { id: categoryId },
        },
      },
    });

    return { data: entry, error: null };
  } catch (error) {
    return handleError(error);
  }
}; 