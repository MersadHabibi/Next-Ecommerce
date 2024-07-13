import Footer from "@/components/templates/(marketing)/Footer/Footer";
import Navbar from "@/components/templates/Navbar/Navbar";
import { Suspense } from "react";
import Loading from "./loading";

export default async function authLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex h-dvh flex-col justify-between pt-16">
      <Navbar />

      <div className="container mb-20">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>

      <Footer />
    </div>
  );
}
