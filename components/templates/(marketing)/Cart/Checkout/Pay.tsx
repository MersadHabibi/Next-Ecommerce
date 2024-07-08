"use client";

import { checkoutAction } from "@/actions/cartActions";
import Loader from "@/components/modules/Loader";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useCartStore } from "@/stores/cartStore";
import { useState } from "react";

export default function Pay() {
  const [isLoading, setIsLoading] = useState(false);

  const setCartItems = useCartStore((state) => state.setCartItems);

  const { toast } = useToast();

  const onCheckout = async () => {
    const address = localStorage.getItem("address") as string;
    setIsLoading(true);
    const res = await checkoutAction(address);
    setIsLoading(false);

    console.log(res);

    if (res.status === 200) {
      setCartItems([]);
      return toast({
        description: res.message,
      });
    }

    toast({
      variant: "destructive",
      description: res.message,
    });
  };

  return (
    <Button
      className="w-full bg-black shadow-none disabled:opacity-70 dark:bg-white"
      onClick={onCheckout}
      disabled={isLoading}>
      {isLoading ? <Loader /> : "Checkout"}
    </Button>
  );
}
