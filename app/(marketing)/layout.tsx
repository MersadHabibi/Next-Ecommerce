import Footer from "@/components/templates/Footer/Footer";
import Navbar from "@/components/templates/Navbar/Navbar";
import { Suspense } from "react";
import Loading from "./loading";

export default async function authLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-dvh pt-16 relative">
      <Navbar />

      <div className="container">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>

      <Footer />
    </div>
  );
}
