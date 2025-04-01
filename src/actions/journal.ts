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
    const {
      data: { user },
    } = await auth.getUser();

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
        createdAt: "desc",
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

export async function deleteJournalEntry(id: string) {
  try {
    const { auth } = await createClient();
    const {
      data: { user },
    } = await auth.getUser();

    if (!user) {
      throw new Error("User not authenticated");
    }

    await prisma.journalEntry.delete({
      where: { id },
    });

    return { data: "Journal entry deleted successfully", error: null };
  } catch (error) {
    console.error("Error deleting entry:", error);
    return { data: null, error: "Failed to delete journal entry" };
  }
}

export const editJournalEntry = async (
  id: string,
  title: string,
  content: string,
  category?: string,
) => {
  try {
    const { auth } = await createClient();
    const {
      data: { user },
    } = await auth.getUser();

    if (!user) {
      throw new Error("User not authenticated");
    }

    // Verify the entry belongs to the user
    const existingEntry = await prisma.journalEntry.findUnique({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!existingEntry) {
      throw new Error("Entry not found or unauthorized");
    }

    const updateData: any = {
      title,
      content,
      updatedAt: new Date(),
    };

    // If category is provided, handle category update
    if (category) {
      const formattedCategoryName = formatCategoryName(category);
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

      updateData.categories = {
        set: [], // Remove existing categories
        connect: { id: categoryId }, // Connect new category
      };
    }

    const updatedEntry = await prisma.journalEntry.update({
      where: { id },
      data: updateData,
      include: {
        categories: true,
      },
    });

    return { data: updatedEntry, error: null };
  } catch (error) {
    return handleError(error);
  }
};
