import { Suspense } from "react";
import JournalEntryServer from "./JournalEntryServer";

export default async function JournalEntryPage({
  params,
}: {
  params: { id: string };
}) {
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
