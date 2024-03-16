import ThemeToggle from "@/components/modules/ThemeToggle";
import { Toaster } from "@/components/ui/toaster";

const authLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex-center h-dvh ">
      <div className="fixed right-5 top-5">
        <ThemeToggle />
      </div>
      {children} <Toaster />
    </div>
  );
};

export default authLayout;
