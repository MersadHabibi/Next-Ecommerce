import Loader from "@/components/modules/Loader";

export default function Loading() {
  return (
    <div className="flex-center fixed inset-0 z-40 size-full h-full w-full bg-black/20 py-4 backdrop-blur-md">
      <Loader classname="before:border-[3.5px] size-8" />
    </div>
  );
}
