import { signUpAction } from "@/actions/users";
import { prisma } from "@/db/prisma";
import { createClient } from "@supabase/supabase-js";

jest.mock("@supabase/supabase-js");
jest.mock("@/db/prisma", () => ({
  prisma: {
    user: {
      create: jest.fn(),
    },
  },
}));
jest.mock("next/headers", () => ({
  cookies: jest.fn(() => ({
    get: jest.fn(),
    set: jest.fn(),
  })),
}));

describe("signUpAction", () => {
  it("should create a new user and return a redirect URL", async () => {
    const mockSupabase = {
      auth: {
        signUp: jest.fn().mockResolvedValue({
          data: { user: { id: "user123" } },
          error: null,
        }),
      },
    };
    (createClient as jest.Mock).mockReturnValue(mockSupabase);
    (prisma.user.create as jest.Mock).mockResolvedValue({ id: "user123" });

    const result = await signUpAction(
      "test@example.com",
      "password123",
      "Test User",
    );

    expect(mockSupabase.auth.signUp).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
      options: {
        data: { name: "Test User" },
        emailRedirectTo: expect.any(String),
      },
    });
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        id: "user123",
        name: "Test User",
        email: "test@example.com",
      },
    });
    expect(result).toEqual({ redirectTo: "/signup-confirmation" });
  });

  it("should handle errors from Supabase", async () => {
    const mockSupabase = {
      auth: {
        signUp: jest.fn().mockResolvedValue({
          data: null,
          error: { message: "Email already exists" },
        }),
      },
    };
    (createClient as jest.Mock).mockReturnValue(mockSupabase);

    const result = await signUpAction(
      "test@example.com",
      "password123",
      "Test User",
    );

    expect(result).toEqual({ errorMessage: "Email already exists" });
  });
});
