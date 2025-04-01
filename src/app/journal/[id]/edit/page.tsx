import { getUser } from "@/auth/server";
import { prisma } from "@/db/prisma";
import { JournalEntryEditForm } from "@/components/JournalEntryEditForm";
import { redirect } from "next/navigation";

export default async function EditJournalEntryPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await getUser();
  if (!user) redirect("/login");

  const entry = await prisma.journalEntry.findUnique({
    where: {
      id: params.id,
      userId: user.id, // Ensure user can only edit their own entries
    },
    include: {
      categories: {
        select: { name: true },
      },
    },
  });

  if (!entry) {
    redirect("/not-found");
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 text-3xl font-bold">Edit Journal Entry</h1>
      <JournalEntryEditForm entry={entry} />
    </div>
  );
}
