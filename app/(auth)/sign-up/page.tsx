import type { Metadata } from "next";
import SignUpForm from "@/components/templates/(auth)/sign-up/SignUpForm";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "...",
};

const SignUpPage = () => {
  return (
    <div className="">
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
