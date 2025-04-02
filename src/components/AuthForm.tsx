"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CardContent, CardFooter } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useTransition, useState } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { loginAction, signUpAction } from "@/actions/users";

type Props = {
  type: "login" | "signUp";
};

function AuthForm({ type }: Props) {
  const isLoginForm = type === "login";
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;

    startTransition(async () => {
      if (isLoginForm) {
        const { errorMessage } = await loginAction(email, password);
        if (errorMessage) {
          toast.error("Error", { description: errorMessage });
        } else {
          toast.success("Logged In", {
            description: "You have been successfully logged in",
          });
          router.replace("/");
        }
      } else {
        const result = await signUpAction(email, password, name);
        if (result.errorMessage) {
          toast.error("Error", { description: result.errorMessage });
        } else {
          toast.success("Signed Up", {
            description: "Check your email for the confirmation link.",
          });
          router.push(result.redirectTo); // Redirect to the signup confirmation page
        }
      }
    });

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardContent className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="Enter your email"
            type="email"
            required
            disabled={isPending}
          />
        </div>
        {!isLoginForm && (
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">First Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter your first name"
              type="text"
              required
              disabled={isPending}
            />
          </div>
        )}
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            placeholder="Enter your password"
            type="password"
            required
            disabled={isPending}
          />
        </div>
      </CardContent>
      <CardFooter className="mt-4 flex flex-col gap-6">
        <Button className="w-full" disabled={loading}>
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : isLoginForm ? (
            "Login"
          ) : (
            "Sign Up"
          )}
        </Button>
        <p className="text-xs">
          {isLoginForm
            ? "Don't have an account yet?"
            : "Already have an account?"}{" "}
          <Link
            href={isLoginForm ? "/sign-up" : "/login"}
            className={`text-blue-500 underline ${
              isPending ? "pointer-events-none opacity-50" : ""
            }`}
          >
            {isLoginForm ? "Sign Up" : "Login"}
          </Link>
        </p>
      </CardFooter>
    </form>
  );
}

export default AuthForm;
