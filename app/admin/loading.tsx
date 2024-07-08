import Loader from "@/components/modules/Loader";

export default function Loading() {
  return (
    <div className="flex-center h-full w-full">
      <Loader className="before:border-neutral-500 dark:border-neutral-800 size-7" />
    </div>
  );
}
