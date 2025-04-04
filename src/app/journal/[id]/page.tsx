import { Suspense } from "react";
import JournalEntryServer from "./JournalEntryServer";

interface PageProps {
  params: { id: string };
}

export default function JournalEntryPage({ params }: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900 dark:border-white"></div>
        </div>
      }
    >
      <JournalEntryServer id={params.id} />
    </Suspense>
  );
}
