import Head from "next/head";
import ToasterBase from "@/components/ui/toaster-base";
import NextTopLoader from "nextjs-toploader";
import { cn } from "@/utils/utils";
import { api } from "@/utils/api";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { ClerkProvider } from "@clerk/nextjs";
export { useReportWebVitals } from "next-axiom";
import { type AppType, type AppProps } from "next/app";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

const TiresQ: AppType = ({ Component, pageProps }: AppProps) => {
  return (
    <ClerkProvider>
      <Head>
        <title>TiresQ</title>
        <meta
          name="description"
          content="Having a flat tire? TiresQ to the rescue!, TiresQ is a web based nearest tambal ban finder app to ease your life when having flat tire"
        />
        <link type="image/png" sizes="32x32" rel="icon" href="/favicon.png" />
      </Head>

      <Analytics />

      <div className={cn(inter.className, "mx-auto max-w-screen-md")}>
        <ToasterBase />
        <NextTopLoader showSpinner={false} />
        <Component {...pageProps} />
      </div>
    </ClerkProvider>
  );
};

export default api.withTRPC(TiresQ);
