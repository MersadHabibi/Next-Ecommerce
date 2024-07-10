"use client";

// import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useState } from "react";

export type TOption = {
  value: string;
  label: string;
};

export default function ComboBox({
  options,
  title,
  className,
  selectedOption,
  setSelectedOption,
}: {
  options: TOption[];
  title: string;
  className?: string;
  selectedOption: TOption | null;
  setSelectedOption: (option: TOption | null) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className={cn("justify-start", className)}>
          {selectedOption ? <>{selectedOption.label}</> : <>+ {title}</>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <OptionList
          options={options}
          setOpen={setOpen}
          setSelectedOption={setSelectedOption}
        />
      </PopoverContent>
    </Popover>
  );
}

function OptionList({
  setOpen,
  setSelectedOption,
  options,
}: {
  setOpen: (open: boolean) => void;
  setSelectedOption: (option: TOption | null) => void;
  options: TOption[];
}) {
  return (
    <Command>
      {/* <CommandInput placeholder="Filter option..." /> */}
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup value="backlog">
          {options.map((option) => {
            return (
              <CommandItem
                className={cn("data")}
                key={option.value}
                value={option.value}
                data-value={true}
                data-disabled={false}
                disabled={false}
                onSelect={(value) => {
                  setSelectedOption(
                    options.find((priority) => priority.value === value) ||
                      null,
                  );
                  setOpen(false);
                }}>
                {option.label}
              </CommandItem>
            );
          })}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
