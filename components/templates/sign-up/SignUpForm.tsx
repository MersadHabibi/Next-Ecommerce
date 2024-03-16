"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
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
import Loader from "@/components/modules/Loader";
import signUpAction from "@/actions/authActions";

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
  const router = useRouter();

  const { toast } = useToast();

  async function formSubmitHandler(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const formData = new FormData();

    formData.append("username", values.username);
    formData.append("password", values.password);

    const res = await signUpAction(formData);

    setIsLoading(false);

    if (res.status === 201) {
      router.push("/");

      return toast({
        description: "sign up successfully",
      });
    }

    if (res.status === 409) {
      return toast({
        description: "This name has already been used",
      });
    }

    // server error
    return toast({
      description: "Try later",
    });
  }

  return (
    <Form {...form}>
      <form
        // action={formSubmitHandler}
        onSubmit={form.handleSubmit(formSubmitHandler)}
        className="w-80 space-y-8 rounded-lg bg-gray-200/70 px-7 py-7 text-center shadow-xl dark:bg-gray-800">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-medium">Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="username"
                  {...field}
                  className="h-11 border-2 bg-gray-200 shadow-none dark:bg-gray-700"
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
              <FormLabel className="text-lg font-medium">Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="password"
                  {...field}
                  className="h-11 border-2 bg-gray-200 shadow-none dark:bg-gray-700"
                />
              </FormControl>
              {/* <FormDescription>This is your public display name.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isLoading}
          className="h-10 w-full disabled:opacity-70">
          {isLoading ? <Loader /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
export default SignUpForm;
