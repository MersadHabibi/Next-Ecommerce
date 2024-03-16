import type { Metadata } from "next";
import SignInForm from "@/components/templates/sign-in/SignInForm";

export const metadata: Metadata = {
  title: "Sign In",
  description: "...",
};

const signInPage = () => {
  return (
    <div className="">
      <SignInForm />
    </div>
  );
};

export default signInPage;
