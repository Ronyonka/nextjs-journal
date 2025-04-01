import Link from "next/link";
import { format } from "date-fns";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

type JournalEntryCardProps = {
  entry: {
    id: string;
    title: string;
    content: string;
    date: Date;
    categories: { name: string }[];
  };
};

export default function JournalEntryCard({ entry }: JournalEntryCardProps) {
  return (
    <Link
      href={`/journal/${entry.id}`}
      className="block transition-all hover:opacity-75"
    >
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
          <p className="mt-4 line-clamp-3">{entry.content}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
