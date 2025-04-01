"use client";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-2">
      <h2 className="text-lg font-semibold">Something went wrong!</h2>
      <p className="text-muted-foreground text-sm">{error.message}</p>
      <button
        onClick={() => reset()}
        className="bg-primary text-primary-foreground mt-4 rounded-md px-4 py-2 text-sm"
      >
        Try again
      </button>
    </div>
  );
}
