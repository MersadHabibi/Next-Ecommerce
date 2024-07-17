"use client";

import { subscribeAction } from "@/actions/SubscribeActions";
import Loader from "@/components/modules/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { notoSans } from "@/config/fonts";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

export default function Subscribe() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const onSubscribe = async () => {
    setIsLoading(true);
    const res = await subscribeAction(email);
    setIsLoading(false);

    if (res.error) {
      return toast({
        variant: "destructive",
        description: res.error,
      });
    }

    toast({
      description: res.message,
    });
    console.log(res);
  };

  return (
    <div className="flex w-full flex-col-reverse items-center justify-between rounded-lg border border-secondary px-5 py-2 dark:border-secondary-dark sm:flex-row sm:items-start lg:py-4 xl:py-7">
      <div className="w-full space-y-5 px-2 py-5 sm:w-auto sm:space-y-10">
        <h3
          className={cn(
            "text-[25px] font-medium sm:text-4xl",
            notoSans.className,
          )}>
          Subscribe To Newsletter
        </h3>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.currentTarget.value)}
          />
          <Button
            type="submit"
            className={cn("bg-black dark:bg-white")}
            onClick={onSubscribe}
            disabled={isLoading}>
            {isLoading ? <Loader className="size-4" /> : "Subscribe"}
          </Button>
        </div>
      </div>
      <div className="w-52 p-3 xl:my-auto">
        <Image
          className={cn("h-full w-full object-contain")}
          src="/images/choose-us/subscribe.png"
          alt="Subscribe"
          width={150}
          height={150}
        />
      </div>
    </div>
  );
}
