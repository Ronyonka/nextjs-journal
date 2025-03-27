"use client";

import { JournalEntry } from "@prisma/client";

type Props = {
  journalEntries: JournalEntry[];
};
function SidebarGroupContent({ journalEntries }: Props) {
  console.log(journalEntries);
  return <div>Your Journal Entries Here</div>;
}

export default SidebarGroupContent;
