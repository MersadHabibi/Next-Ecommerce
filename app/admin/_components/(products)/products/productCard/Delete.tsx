import { Trash } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteProductAction } from "@/actions/productActions";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import Loader from "@/components/modules/Loader";
import { useProducts } from "@/app/admin/_stores/productsStore";

export default function Delete({ id }: { id: string }) {
  const [isLoading, setIsLoading] = useState(false);

  const setProducts = useProducts((state) => state.setProducts);

  const { toast } = useToast();

  async function onDeleteProduct(id: string) {
    setIsLoading(true);
    const res = await deleteProductAction(id);
    setIsLoading(false);

    if (res.status === 202) {
      setProducts(res.allProducts);

      return toast({
        description: res.message,
      });
    }

    toast({
      variant: "destructive",
      description: res.message,
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger
        disabled={isLoading}
        className="flex-center size-11 rounded-md bg-red-600 text-white transition hover:opacity-80 disabled:opacity-70">
        {isLoading ? <Loader /> : <Trash />}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this product?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-black text-white dark:bg-white dark:text-black"
            onClick={() => onDeleteProduct(id)}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
