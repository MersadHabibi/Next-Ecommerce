"use client";

import { signUpAction } from "@/actions/authActions";
import Loader from "@/components/modules/Loader";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { notoSans } from "@/config/fonts";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  username: z.string().min(4).max(12),
  password: z.string().min(4).max(12),
});

export function SignUpForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const signIn = useAuthStore((state) => state.signIn);

  const router = useRouter();

  const { toast } = useToast();

  async function formSubmitHandler(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const formData = new FormData();

    formData.append("username", values.username);
    formData.append("password", values.password);

    const res = await signUpAction(formData);

    console.log(res);

    setIsLoading(false);

    if (res.status === 201) {
      router.push("/");

      signIn(res.user);

      return toast({
        description: "sign up successfully",
      });
    }

    if (res.status === 409) {
      return toast({
        variant: "destructive",
        description: "This name has already been used",
      });
    }

    // server error
    return toast({
      variant: "destructive",
      title: "Something went wrong",
      description: "Try later",
    });
  }

  return (
    <Form {...form}>
      <form
        // action={formSubmitHandler}
        onSubmit={form.handleSubmit(formSubmitHandler)}
        className="w-80 space-y-7 rounded-xl border border-secondary px-7 py-7 font-extrabold shadow-md dark:border-secondary-dark dark:bg-primary-dark dark:shadow-none">
        <h1 className={cn("text-center text-2xl", notoSans.className)}>
          Sign Up
        </h1>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md font-normal text-gray-700 dark:text-gray-300">
                Username :{" "}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="username"
                  {...field}
                  className="h-11 border-secondary bg-white shadow-none dark:border-secondary-dark dark:bg-transparent"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md font-normal text-gray-700 dark:text-gray-300">
                Password :{" "}
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="password"
                  {...field}
                  className="h-11 border-secondary bg-white shadow-none dark:border-secondary-dark dark:bg-transparent"
                />
              </FormControl>
              {/* <FormDescription>This is your public display name.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <Button
            type="submit"
            disabled={isLoading}
            className="h-10 w-full border border-secondary bg-primary-dark font-medium text-white shadow-none disabled:opacity-70 dark:border-secondary-dark">
            {isLoading ? <Loader /> : "Submit"}
          </Button>
          <p className="mt-3 text-center text-sm font-normal text-gray-700 dark:text-gray-300">
            Do you have an account?
            <Link
              className="font-medium text-black underline dark:text-white"
              href="./sign-in">
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
}
export default SignUpForm;
