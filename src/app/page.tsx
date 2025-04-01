import { getUser } from "@/auth/server";
import { prisma } from "@/db/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import JournalEntryCard from "@/components/JournalEntryCard";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function Homepage({ searchParams }: Props) {
  const user = await getUser();

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Welcome to Journal</h1>
        <p className="text-muted-foreground">
          Please login or sign up to continue
        </p>
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/sign-up">Sign Up</Link>
          </Button>
        </div>
      </div>
    );
  }

  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    include: {
      categories: {
        select: { name: true },
      },
    },
    orderBy: {
      date: "desc",
    },
  });

  if (entries.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">No journal entries yet</h1>
        <p className="text-muted-foreground">
          Start your journaling journey by creating your first entry
        </p>
        <Button asChild>
          <Link href="/journal/new">Create your first entry</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Your Journal</h1>
        <Button asChild>
          <Link href="/journal/new">New Entry</Link>
        </Button>
      </div>

      <div className="grid gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
        {entries.map((entry) => (
          <JournalEntryCard key={entry.id} entry={entry} />
        ))}
      </div>
    </div>
  );
}

export default Homepage;
