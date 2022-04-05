import { NextPage } from "next";
import Head from "next/head";
import { useContext } from "react";
import { ThemeContext } from "../../context";
import { Navbar } from "../ui";

interface LayoutProp {
  title?: string;
}

export const MainLayout: NextPage<LayoutProp> = ({ children, title }) => {
  const { theme } = useContext(ThemeContext);
  const styles = {
    backgroundColor: `${
      theme === "light" ? "hsl(0, 0%, 98%)" : "hsl(207, 26%, 17%)"
    }`,
    minHeight: "100vh",
    transition: "background 0.2s ease-in-out",
  };
  return (
    <>
      <Head>
        <title>{!title ? "Countries App" : title}</title>
        <meta name="description" content="Country information" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main style={styles}>{children}</main>
    </>
  );
};
