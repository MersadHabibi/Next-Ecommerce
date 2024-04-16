import { getMeAction } from "@/actions/authActions";
import Sidebar from "./_components/Sidebar";
import Topbar from "./_components/Topbar";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Loading from "./loading";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLogin }: { isLogin: boolean } = await getMeAction();

  // if (!isLogin) redirect("/");

  return (
    <div className="grid h-dvh w-full overflow-y-hidden lg:grid-cols-4 xl:grid-cols-5">
      <Sidebar />
      <div className="lg:col-span-3 xl:col-span-4">
        <Topbar />
        <div className="h-dvh overflow-y-auto px-6 pb-20 pt-6">
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </div>
      </div>
    </div>
  );
}
