"use server";

import { createClient } from "@/auth/server";
import { prisma } from "@/db/prisma";
import { handleError } from "@/lib/utils";

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

    // First, ensure the category exists
    const existingCategory = await prisma.category.findUnique({
      where: { name: category },
    });

    let categoryId: string;
    if (!existingCategory) {
      const newCategory = await prisma.category.create({
        data: { name: category },
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