import ThemeToggle from "@/components/modules/ThemeToggle";
import SignUpForm from "@/components/templates/sign-up/SignUpForm";

const signUpPage = () => {

  return (
    <div className="">
      <div className="fixed right-5 top-5">
        <ThemeToggle />
      </div>
      <SignUpForm />
    </div>
  );
};

export default signUpPage;
