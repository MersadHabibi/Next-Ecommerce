import type { Metadata } from "next";
import SignInForm from "@/components/templates/(auth)/sign-in/SignInForm";

export const metadata: Metadata = {
  title: "Sign In",
  description: "...",
};

const SignInPage = () => {
  return (
    <div className="">
      <SignInForm />
    </div>
  );
};

export default SignInPage;
