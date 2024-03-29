import Sidebar from "./_components/Sidebar";
import Topbar from "./_components/Topbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid h-dvh w-full overflow-y-hidden lg:grid-cols-4 xl:grid-cols-5">
      <Sidebar />
      <div className="lg:col-span-3 xl:col-span-4">
        <Topbar />
        <div className="h-dvh overflow-y-auto pb-20">{children}</div>
      </div>
    </div>
  );
}
