"use client";

import { logoutAction } from "@/actions/authActions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { USER_ROLE } from "@/enums";
import { useAuthStore } from "@/stores/authStore";
import {
  BadgeDollarSign,
  Lock,
  LogIn,
  LogOut,
  User,
  UserPlus,
} from "lucide-react";
import Link from "next/link";

export default function UserBtn() {
  const isLogin = useAuthStore((state) => state.isLogin);
  const username = useAuthStore((state) => state.user?.username);
  const role = useAuthStore((state) => state.user?.role);
  const logout = useAuthStore((state) => state.logout);

  async function logoutHandler() {
    const res: { status: number; message: string } = await logoutAction();

    if (res.status === 200) {
      logout();

      return toast({
        description: res.message,
      });
    }

    toast({
      description: res.message,
    });
  }

  return (
    <Dialog>
      <DialogTrigger className="flex-center h-9 w-9 rounded-md border border-secondary hover:bg-secondary dark:border-secondary-dark dark:hover:bg-secondary-dark">
        <User size="20" />
      </DialogTrigger>
      <DialogContent className="max-w-80">
        {isLogin ? (
          <DialogHeader>
            <DialogTitle className="mb-3"> {username} </DialogTitle>
            <div className="w-full border-b border-secondary dark:border-secondary-dark"></div>
            <div className="w-full">
              {role === USER_ROLE.ADMIN ? (
                <Link href={"/admin"}>
                  <Button
                    variant="outline"
                    className="!mt-3 w-full justify-start gap-x-3">
                    <Lock size="20" />
                    Admin
                  </Button>
                </Link>
              ) : null}
              {/* <Button
                variant="outline"
                className="w-full justify-start gap-x-3">
                <Heart size="20" />
                Liked Products
              </Button> */}
              <Link href={"/orders"}>
                <Button
                  onClick={logoutHandler}
                  variant="outline"
                  className="!mt-3 w-full justify-start gap-x-3">
                  <BadgeDollarSign size="20" />
                  Orders
                </Button>
              </Link>
              <Button
                onClick={logoutHandler}
                variant="outline"
                className="!mt-3 w-full justify-start gap-x-3">
                <LogOut size="20" />
                Log-Out
              </Button>
            </div>
          </DialogHeader>
        ) : (
          <DialogHeader>
            {/* <div className="border-secondary dark:border-secondary-dark w-full border-b"></div> */}
            <div className="w-full pt-6">
              <Link href="/sign-in">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-x-3">
                  <LogIn size="20" />
                  Sign-In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button
                  variant="outline"
                  className="!mt-3 w-full justify-start gap-x-3">
                  <UserPlus size="20" />
                  Sign-Up
                </Button>
              </Link>
            </div>
          </DialogHeader>
        )}
      </DialogContent>
    </Dialog>
  );
}
