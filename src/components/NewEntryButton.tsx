"use client";

import { User } from "@supabase/supabase-js";

type Props = {
  user: User | null;
};
function NewEntryButton({ user }: Props) {
  // console.log(user?.email);
  return <div>NewEntryButton</div>;
}

export default NewEntryButton;
