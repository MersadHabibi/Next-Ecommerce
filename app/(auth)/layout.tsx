import { Toaster } from "@/components/ui/toaster";

const authLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex-center h-dvh ">
      {children} <Toaster />
    </div>
  );
};

export default authLayout;
