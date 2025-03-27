"use server";

import { prisma } from "@/db/prisma";
import { handleError } from "@/lib/utils";

export const getCategories = async () => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: 'asc',
      },
    });
    return { data: categories, error: null };
  } catch (error) {
    return handleError(error);
  }
}; 