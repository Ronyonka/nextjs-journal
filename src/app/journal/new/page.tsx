import { JournalEntryForm } from "@/components/JournalEntryForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewJournalEntryPage() {
  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Create New Journal Entry</CardTitle>
        </CardHeader>
        <CardContent>
          <JournalEntryForm />
        </CardContent>
      </Card>
    </div>
  );
} 