import { getUser } from "@/auth/server";
import AskAIButton from "@/components/AskAIButton";
import NewEntryButton from "@/components/NewEntryButton";
import { prisma } from "@/db/prisma";

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
    <div className="h- full flex items-center gap-4">
      <div className="flex w-full max-w-4xl justify-end gap-2">
        <AskAIButton user={user} />
        <NewEntryButton user={user} />
      </div>
    </div>
  );
}

export default Homepage;
