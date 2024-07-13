import { getMeAction } from "@/actions/authActions";
import { USER_ROLE } from "@/enums";
import { TUser } from "@/types";
import { redirect } from "next/navigation";

export default async function ProtectAdminRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user }: { user: TUser } = await getMeAction();

  if (user?.role !== USER_ROLE.ADMIN) {
    redirect("/");
  }

  return <>{children}</>;
}
