import { type AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { api } from "@/utils/api";
import { Inter } from "next/font/google";
import Head from "next/head";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

const MyApp: AppType = ({ Component, pageProps }) => {
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
        <Component {...pageProps} />
      </div>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
