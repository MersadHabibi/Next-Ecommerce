import type { Metadata } from "next";
import { Roboto, Noto_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import ThemeProvider from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/templates/Navbar/Navbar";
import { redirect } from "next/navigation";
import { getMeAction } from "@/actions/authActions";
import CheckAuthUser from "@/components/modules/CheckAuthUser";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const notoSans = Noto_Sans({ subsets: ["latin"], weight: ["700"] });

export const metadata: Metadata = {
  title: "Next ecommerce",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isLogin, username }: { isLogin: boolean; username: string } =
    await getMeAction();

  return (
    <html lang="en">
      <body className={cn("bg-white dark:bg-black", roboto.className)}>
        {isLogin ? <CheckAuthUser username={username} /> : null}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
