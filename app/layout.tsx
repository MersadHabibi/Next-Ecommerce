import GetMe from "@/components/templates/(auth)/GetMe";
import { Toaster } from "@/components/ui/toaster";
import { roboto } from "@/config/fonts";
import { cn } from "@/lib/utils";
import ThemeProvider from "@/providers/theme-provider";
import type { Metadata } from "next";
import "./globals.css";
import VisitCounter from "@/components/templates/VisitCounter";

export const metadata: Metadata = {
  title: "Next e-commerce",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("bg-white dark:bg-black", roboto.className)}>
        <GetMe>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange>
            <VisitCounter>{children}</VisitCounter>
            <Toaster />
          </ThemeProvider>
        </GetMe>
      </body>
    </html>
  );
}
