"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserJournalEntries } from "@/actions/journal";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { format } from "date-fns";

type JournalEntry = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  categories: { name: string }[];
};

export function JournalEntries() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadEntries() {
      const result = await getUserJournalEntries();
      if ("errorMessage" in result) {
        toast.error("Failed to load journal entries", {
          description: result.errorMessage,
        });
      } else if (result.data) {
        setEntries(result.data);
      }
      setIsLoading(false);
    }
    loadEntries();
  }, []);

  if (isLoading) {
    return <div>Loading entries...</div>;
  }

  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-8">
        <p className="text-muted-foreground">No journal entries yet.</p>
        <Button asChild>
          <Link href="/journal/new">Create your first entry</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {entries.map((entry) => (
        <Card key={entry.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <CardTitle className="text-xl">{entry.title}</CardTitle>
              <div className="flex gap-2">
                {entry.categories.map((category) => (
                  <span
                    key={category.name}
                    className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary"
                  >
                    {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                  </span>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {format(new Date(entry.createdAt), "MMMM d, yyyy")}
            </p>
            <p className="mt-4 line-clamp-3">{entry.content}</p>
            <Button variant="link" className="mt-4 p-0" asChild>
              <Link href={`/journal/${entry.id}`}>Read more</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 