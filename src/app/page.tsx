import { getUser } from "@/auth/server";
import AskAIButton from "@/components/AskAIButton";
import NewEntryButton from "@/components/NewEntryButton";
import { prisma } from "@/db/prisma";
import { JournalEntries } from "@/components/JournalEntries";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function Homepage({ searchParams }: Props) {
  const entryIdParam = (await searchParams).journalEntryId;
  const user = await getUser();

  const journalEntryId = Array.isArray(entryIdParam)
    ? entryIdParam[0]
    : entryIdParam || "";

  const journalEntry = await prisma.journalEntry.findUnique({
    where: { id: journalEntryId, userId: user?.id },
  });
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Your Journal</h1>
        <Button asChild>
          <Link href="/journal/new">New Entry</Link>
        </Button>
      </div>
      <JournalEntries />
    </div>
  );
}

export default Homepage;
