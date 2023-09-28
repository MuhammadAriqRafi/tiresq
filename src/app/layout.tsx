import "./globals.css";
import Navbar from "@/components/navbar";
import ToasterBase from "@/components/ui/toaster-base";
import TRPCProvider from "@/app/_trpc/TRPCProvider";
import NextTopLoader from "nextjs-toploader";
import { cn } from "@/lib/utils/utils";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { ClerkProvider } from "@clerk/nextjs";
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
    <ClerkProvider>
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
          <ToasterBase />
          <NextTopLoader showSpinner={false} />
          <TRPCProvider>{children}</TRPCProvider>
          <Navbar />
        </body>
      </html>
    </ClerkProvider>
  );
}
