import { NextPage } from "next";
import Head from "next/head";
import { Navbar } from "../ui";

interface LayoutProp {
  title?: string
}

export const MainLayout: NextPage<LayoutProp> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{!title? 'Countries App': title}</title>
        <meta name="description" content="Country information" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main style={{ backgroundColor: "hsl(0, 0%, 98%)", minHeight: "100vh" }}>
        {children}
      </main>
    </>
  );
};
