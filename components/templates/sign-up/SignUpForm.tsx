"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  username: z.string().min(4, {
    message: "Username must be at least 5 characters.",
  }),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters",
  }),
});

export function SignUpForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function handleSubmit(e: z.infer<typeof formSchema>) {
    fetch("/api/sign-up")
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-80 space-y-8 rounded-lg bg-gray-200/70 px-7 py-7 text-center shadow-lg dark:bg-gray-800">
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
                  className="h-10 border-2 bg-gray-200 shadow-none dark:bg-gray-700"
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
                  className="h-10 border-2 bg-gray-200 shadow-none dark:bg-gray-700"
                />
              </FormControl>
              {/* <FormDescription>This is your public display name.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="h-10 w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}
export default SignUpForm;
