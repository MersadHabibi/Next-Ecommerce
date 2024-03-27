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
  const [isClient, setIsclient] = useState(false);

  useEffect(() => {
    setIsclient(true);
  }, []);

  return (
    <div className="w-full space-y-4 rounded-lg border border-secondry bg-neutral-100 p-3 dark:border-secondry-dark dark:bg-neutral-950 xl:p-4">
      {!matches && isClient ? (
        <ComboBox
          statuses={statuses}
          title="Sort by"
          classname="w-full h-11 rounded-md !bg-white dark:!bg-black !shadow-none sm:hidden"
        />
      ) : null}
      <ComboBox
        statuses={statuses}
        title="Gender"
        classname="w-full h-11 rounded-md !bg-white dark:!bg-black !shadow-none"
      />
      <ComboBox
        statuses={statuses}
        title="Color"
        classname="w-full h-11 rounded-md !bg-white dark:!bg-black !shadow-none"
      />
      <ComboBox
        statuses={statuses}
        title="Size"
        classname="w-full h-11 rounded-md !bg-white dark:!bg-black !shadow-none"
      />
    </div>
  );
}
