import Sidebar from "@/components/templates/admin/Sidebar";
import TopBar from "@/components/templates/admin/TopBar";
import { Suspense } from "react";
import Loading from "./loading";
import ProtectAdminRoute from "@/components/templates/admin/ProtectAdminRoute";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectAdminRoute>
      <div className="grid h-dvh w-full overflow-y-hidden lg:grid-cols-4 xl:grid-cols-5">
        <Sidebar />
        <div className="lg:col-span-3 xl:col-span-4">
          <TopBar />
          <div className="h-dvh overflow-y-auto px-6 pb-20 pt-6">
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </div>
        </div>
      </div>
    </ProtectAdminRoute>
  );
}
