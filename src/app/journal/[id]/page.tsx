"use client";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function JournalEntryPage({
  params,
}: {
  params: { id: string };
}) {
  // Fetch the journal entry by ID
  const entry = await prisma.journalEntry.findUnique({
    where: { id: params.id },
    include: { categories: true }, // Include related categories if needed
  });

  if (!entry) {
    return <div>Journal entry not found.</div>;
  }

  const handleEdit = () => {
    alert("Edit button clicked! (Placeholder)");
  };

  const handleDelete = () => {
    alert("Delete button clicked! (Placeholder)");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-gray-800">{entry.title}</h1>
        <h3 className="mb-2 text-lg text-gray-600">
          Category: {entry.categories.map((cat) => cat.name).join(", ")}
        </h3>
        <p className="mb-6 text-gray-700">{entry.content}</p>
        <p className="mb-6 text-sm text-gray-500">
          Date: {new Date(entry.date).toLocaleDateString()}
        </p>
        <div className="flex space-x-4">
          <button
            onClick={handleEdit}
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
