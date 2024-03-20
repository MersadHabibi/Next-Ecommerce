import Footer from "@/components/templates/Footer/Footer";
import Navbar from "@/components/templates/Navbar/Navbar";

export default async function authLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-dvh pt-16">
      <Navbar />

      <div className="container">{children}</div>

      <Footer />
    </div>
  );
}
