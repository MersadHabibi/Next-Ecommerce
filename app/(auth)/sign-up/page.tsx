import type { Metadata } from "next";
import SignUpForm from "@/components/templates/sign-up/SignUpForm";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "...",
};

const signUpPage = () => {
  return (
    <div className="">
      <SignUpForm />
    </div>
  );
};

export default signUpPage;
