"use client";

import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { revalidate } from "./revalidateAction";

export default function ReloadOrders() {
  return (
    <Button
      className="flex-center size-9 rounded-md bg-black text-white transition hover:bg-black/80 disabled:opacity-70 dark:bg-white dark:text-black dark:hover:bg-white/80"
      onClick={async () => await revalidate()}>
      <RefreshCcw className="!size-5 shrink-0" />
    </Button>
  );
}
