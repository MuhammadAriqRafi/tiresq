import Head from "next/head";
import NextTopLoader from "nextjs-toploader";
import ToasterBase from "@/components/ui/toaster-base";
import { Analytics } from "@vercel/analytics/react";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import { type AppType, type AppProps } from "next/app";
import { api } from "@/utils/api";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

const TiresQ: AppType = ({ Component, pageProps }: AppProps) => {
  return (
    <ClerkProvider {...pageProps}>
      <Head>
        <title>TiresQ</title>
        <meta
          name="description"
          content="Having a flat tire? TiresQ to the rescue!, TiresQ is a web based nearest tambal ban finder app to ease your life when having flat tire"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={inter.className}>
        <NextTopLoader showSpinner={false} />
        <ToasterBase />
        <Analytics />
        <Component {...pageProps} />
      </div>
    </ClerkProvider>
  );
};

export default api.withTRPC(TiresQ);
