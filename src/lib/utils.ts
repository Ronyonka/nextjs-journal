import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleError = (error: unknown) => {
  if (error instanceof Error) {
    return { errorMessage: error.message };
  } else {
    return { errorMessage: "An error occurred" };
  }
};

export async function withRetry<T>(
  operation: () => Promise<T>,
  retries = 3,
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    if (retries > 0 && error.message.includes("database")) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return withRetry(operation, retries - 1);
    }
    throw error;
  }
}
