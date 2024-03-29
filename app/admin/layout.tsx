import Sidebar from "./_components/Sidebar";
import Topbar from "./_components/Topbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid h-dvh w-full lg:grid-cols-4 xl:grid-cols-5">
      <Sidebar />
      <div className="lg:col-span-3 xl:col-span-4">
        <Topbar />
        {children}
      </div>
    </div>
  );
}
