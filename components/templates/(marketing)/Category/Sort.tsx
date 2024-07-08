import { ArrowDownUp } from "lucide-react";

export default function Sort() {
  return (
    <div className="border-secondary dark:border-secondary-dark hidden h-12 w-full items-center gap-x-10 rounded-md border px-4 sm:flex">
      <p className="flex items-center gap-x-2 text-gray-800 dark:text-gray-300">
        <ArrowDownUp />
        <span className="font-medium">Sort by:</span>
      </p>
      <div className="category-sort flex h-full items-center gap-x-6 text-gray-700/70 dark:text-gray-300/70">
        <button className="active h-full px-2 hover:text-gray-700/90 dark:hover:text-gray-300/90">
          Newest
        </button>
        <button className="h-full px-2 hover:text-gray-700/90 dark:hover:text-gray-300/90">
          best seller
        </button>
        <button className="h-full px-2 hover:text-gray-700/90 dark:hover:text-gray-300/90">
          cheapest
        </button>
        <button className="h-full px-2 hover:text-gray-700/90 dark:hover:text-gray-300/90">
          expensive
        </button>
      </div>
    </div>
  );
}
