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
      className="block h-[280px] transition-all hover:opacity-75"
    >
      <Card className="flex h-full flex-col">
        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle className="line-clamp-2 text-xl">
              {entry.title}
            </CardTitle>
            <div className="flex max-w-[40%] flex-wrap gap-2">
              {entry.categories.map((category) => (
                <span
                  key={category.name}
                  className="bg-primary/10 text-primary rounded-full px-2 py-1 text-xs whitespace-nowrap"
                >
                  {category.name.charAt(0).toUpperCase() +
                    category.name.slice(1)}
                </span>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col justify-between">
          <p className="mt-2 line-clamp-4 flex-1">{entry.content}</p>
          <p className="text-muted-foreground border-t pt-4 text-sm">
            {format(new Date(entry.date), "MMMM d, yyyy")}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
