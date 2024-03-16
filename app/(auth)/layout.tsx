import { getMeAction } from "@/actions/authActions";
import ThemeToggle from "@/components/modules/ThemeToggle";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export default async function authLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLogin }: { isLogin: boolean } = await getMeAction();

  if (isLogin) {
    redirect("/");
  }

  return (
    <div className="flex-center h-dvh ">
      <div className="fixed right-5 top-5">
        <ThemeToggle />
      </div>
      {children}
    </div>
  );
}
