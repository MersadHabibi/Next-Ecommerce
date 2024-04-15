import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function FileInput({
  id,
  children,
  onchange,
  classname,
  key,
}: {
  id: string;
  children?: React.ReactNode;
  onchange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  classname?: string;
  key?: number;
}) {
  return (
    <>
      <Label
        htmlFor={id}
        className={cn(
          "flex-center size-full cursor-pointer flex-col rounded-md text-gray-700 transition-colors hover:bg-neutral-300 hover:text-gray-950 dark:text-gray-300 dark:hover:bg-neutral-900 dark:hover:text-gray-300",
          classname,
        )}>
        {children}
      </Label>
      <Input
        onChange={(event) => onchange(event)}
        id={id}
        key={key}
        type="file"
        className="hidden"
      />
    </>
  );
}
