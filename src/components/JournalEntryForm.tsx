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
import { getCategories } from "@/actions/categories";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function formatCategoryDisplay(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

export function JournalEntryForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadCategories() {
      const result = await getCategories();
      if ("data" in result) {
        setCategories(result.data);
      }
      setIsLoading(false);
    }
    loadCategories();
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const category = showNewCategoryInput ? newCategory : selectedCategory;

    const result = await createJournalEntry(title, category, content);

    if ("errorMessage" in result) {
      toast.error("Failed to create journal entry", {
        description: result.errorMessage,
      });
    } else {
      toast.success("Journal entry created successfully");
      router.push("/");
    }

    setIsSubmitting(false);
  }

  const handleCategoryChange = (value: string) => {
    if (value === "new") {
      setShowNewCategoryInput(true);
      setSelectedCategory("");
    } else {
      setShowNewCategoryInput(false);
      setSelectedCategory(value);
      setNewCategory("");
    }
  };

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
        {showNewCategoryInput ? (
          <div className="flex gap-2">
            <Input
              id="new-category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Enter new category name"
              required
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowNewCategoryInput(false);
                setNewCategory("");
              }}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <Select
            name="category"
            required
            value={selectedCategory}
            onValueChange={handleCategoryChange}
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder={isLoading ? "Loading categories..." : "Select a category"} />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.name}>
                  {formatCategoryDisplay(category.name)}
                </SelectItem>
              ))}
              <SelectItem value="new">+ Add New Category</SelectItem>
            </SelectContent>
          </Select>
        )}
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
