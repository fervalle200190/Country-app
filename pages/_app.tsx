import type { AppProps } from "next/app";
import { ThemeProvider } from "../context";
import "../styles/main.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
