"use client";

import { logoutAction } from "@/actions/authActions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { useAuthStore } from "@/stores/authStore";
import { Heart, LogIn, LogOut, User, UserPlus } from "lucide-react";
import Link from "next/link";

export default function UserBtn() {
  const isLogin = useAuthStore((state) => state.isLogin);
  const username = useAuthStore((state) => state.username);
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
      <DialogTrigger className="flex-center h-9 w-9 rounded-md border border-secondry hover:bg-secondry dark:border-secondry-dark dark:hover:bg-secondry-dark">
        <User size="20" />
      </DialogTrigger>
      <DialogContent className="max-w-80">
        {isLogin ? (
          <DialogHeader>
            <DialogTitle className="mb-3"> {username} </DialogTitle>
            <div className="w-full border-b border-secondry dark:border-secondry-dark"></div>
            <div className="w-full pt-3">
              <Button
                variant="outline"
                className="w-full justify-start gap-x-3">
                <Heart size="20" />
                Liked Products
              </Button>
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
            {/* <div className="border-secondry dark:border-secondry-dark w-full border-b"></div> */}
            <div className="w-full pt-6">
              <Link href="./sign-in">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-x-3">
                  <LogIn size="20" />
                  Sign-In
                </Button>
              </Link>
              <Link href="./sign-up">
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
