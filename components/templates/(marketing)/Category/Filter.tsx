"use client";

import { useEffect, useState } from "react";
import ComboBox, { Status } from "./ComboBox";

import { useMediaQuery } from "usehooks-ts";

const statuses: Status[] = [
  {
    value: "backlog",
    label: "Backlog",
  },
  {
    value: "todo",
    label: "Todo",
  },
  {
    value: "in progress",
    label: "In Progress",
  },
  {
    value: "done",
    label: "Done",
  },
  {
    value: "canceled",
    label: "Canceled",
  },
];

export default function Filter() {
  const matches = useMediaQuery("(min-width: 640px)");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="border-secondary dark:border-secondary-dark w-full space-y-4 rounded-lg border bg-neutral-100 p-3 dark:bg-neutral-950 xl:p-4">
      {!matches && isClient ? (
        <ComboBox
          statuses={statuses}
          title="Sort by"
          className="h-11 w-full rounded-md !bg-white !shadow-none dark:!bg-black sm:hidden"
        />
      ) : null}
      <ComboBox
        statuses={statuses}
        title="Gender"
        className="h-11 w-full rounded-md !bg-white !shadow-none dark:!bg-black"
      />
      <ComboBox
        statuses={statuses}
        title="Color"
        className="h-11 w-full rounded-md !bg-white !shadow-none dark:!bg-black"
      />
      <ComboBox
        statuses={statuses}
        title="Size"
        className="h-11 w-full rounded-md !bg-white !shadow-none dark:!bg-black"
      />
    </div>
  );
}
