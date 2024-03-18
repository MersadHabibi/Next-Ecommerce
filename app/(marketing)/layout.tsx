import { getMeAction } from "@/actions/authActions";
import Logo from "@/components/modules/Logo";
import Navbar from "@/components/templates/Navbar/Navbar";
import ThemeToggle from "@/components/modules/ThemeToggle";
import { redirect } from "next/navigation";

export default async function authLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-dvh pt-16">
      <Navbar />

      <div>{children}</div>
    </div>
  );
}
