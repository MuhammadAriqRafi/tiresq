import "./globals.css";
import Navbar from "@/components/navbar";
import TRPCProvider from "@/app/_trpc/TRPCProvider";
import NextTopLoader from "nextjs-toploader";
import { cn } from "@/lib/utils/utils";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TiresQ",
  description: "Having a flat tire? TiresQ to the rescue!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/png"
          sizes="32x32"
        />
      </head>

      <Analytics />

      <body className={cn(inter.className, "mx-auto max-w-screen-md")}>
        <Toaster />
        <NextTopLoader showSpinner={false} />
        <TRPCProvider>{children}</TRPCProvider>
        <Navbar />
      </body>
    </html>
  );
}
