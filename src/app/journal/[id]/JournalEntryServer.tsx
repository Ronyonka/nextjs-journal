import { cache } from "react";
import { prisma } from "@/db/prisma";
import DeleteEntryButton from "@/components/DeleteEntryButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import Link from "next/link";

const getJournalEntry = cache(async (id: string) => {
  const entry = await prisma.journalEntry.findUnique({
    where: { id },
    include: {
      categories: {
        select: { name: true },
      },
    },
  });

  if (!entry) {
    return null;
  }

  return entry;
});

export default async function JournalEntryServer({ id }: { id: string }) {
  const entry = await getJournalEntry(id);

  if (!entry) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6">
        <p className="text-muted-foreground">Journal entry not found.</p>
        <Button asChild>
          <Link href="/journal">Return to journal entries</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle className="text-xl">{entry.title}</CardTitle>
            <div className="flex gap-2">
              {entry.categories.map((category) => (
                <span
                  key={category.name}
                  className="bg-primary/10 text-primary rounded-full px-2 py-1 text-xs"
                >
                  {category.name.charAt(0).toUpperCase() +
                    category.name.slice(1)}
                </span>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            {format(new Date(entry.date), "MMMM d, yyyy")}
          </p>
          <p className="mt-4">{entry.content}</p>
          <div className="mt-6 flex space-x-4">
            <Button asChild variant="outline">
              <Link href={`/journal/${entry.id}/edit`}>Edit Entry</Link>
            </Button>
            <DeleteEntryButton id={id} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
