"use client";

// import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { cn } from "@/lib/utils";

export type Status = {
  value: string;
  label: string;
};

export default function ComboBox({
  statuses,
  title,
  classname,
}: {
  statuses: Status[];
  title: string;
  classname?: string;
}) {
  const [open, setOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<Status | null>(null);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className={cn("justify-start", classname)}>
          {selectedStatus ? <>{selectedStatus.label}</> : <>+ {title}</>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <StatusList
          statuses={statuses}
          setOpen={setOpen}
          setSelectedStatus={setSelectedStatus}
        />
      </PopoverContent>
    </Popover>
  );
}

function StatusList({
  setOpen,
  setSelectedStatus,
  statuses,
}: {
  setOpen: (open: boolean) => void;
  setSelectedStatus: (status: Status | null) => void;
  statuses: Status[];
}) {
  return (
    <Command>
      {/* <CommandInput placeholder="Filter status..." /> */}
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup value="backlog">
          {statuses.map((status) => {
            console.log(status);
            return (
              <CommandItem
                className={cn("data")}
                key={status.value}
                value={status.value}
                data-value={true}
                data-disabled={false}
                disabled={false}
                onSelect={(value) => {
                  console.log(value);
                  setSelectedStatus(
                    statuses.find((priority) => priority.value === value) ||
                      null,
                  );
                  setOpen(false);
                }}>
                {status.label}
              </CommandItem>
            );
          })}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
