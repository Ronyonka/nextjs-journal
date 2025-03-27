"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createJournalEntry } from "@/actions/journal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function JournalEntryForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const content = formData.get("content") as string;

    const { error } = await createJournalEntry(title, category, content);

    if (error) {
      toast.error("Failed to create journal entry", {
        description: error,
      });
    } else {
      toast.success("Journal entry created successfully");
      router.push("/dashboard");
    }

    setIsSubmitting(false);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          placeholder="Enter your journal entry title"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select name="category" required>
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="personal">Personal</SelectItem>
            <SelectItem value="work">Work</SelectItem>
            <SelectItem value="travel">Travel</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          name="content"
          placeholder="Write your journal entry here..."
          className="min-h-[200px]"
          required
        />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Create Entry"}
      </Button>
    </form>
  );
}
