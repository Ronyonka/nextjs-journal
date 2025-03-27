import { shadow } from "@/app/styles/utils";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { ModeToggle } from "./DarkModeToggle";
import LogOutButton from "./LogOutButton";
import { getUser } from "@/auth/server";

async function Header() {
  const user = await getUser();
  return (
    <header
      className="bg-popover relative flex h-24 w-full items-center justify-between px-3 sm:px-8"
      style={{ boxShadow: shadow }}
    >
      <Link className="flex items-end gap-2" href="/">
        <Image
          src="/journal.png"
          height={60}
          width={60}
          alt="logo"
          className="roundend-full"
          priority
        />
        <h1 className="flex flex-col pb-1 text-2xl leading-6 font-semibold">
          Free <span>Mind</span>
        </h1>
      </Link>

      <div className="flex gap-4">
        {user ? (
          <LogOutButton />
        ) : (
          <>
            <Button asChild>
              <Link href="/sign-up" className="hidden sm:block">
                Sign Up
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/login">Login</Link>
            </Button>
          </>
        )}
        <ModeToggle />
      </div>
    </header>
  );
}

export default Header;
