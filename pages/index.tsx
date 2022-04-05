import type { NextPage } from "next";
import { GetStaticProps } from "next";
import { countryApi } from "../api";
import { MainLayout } from "../components/layouts";
import { CountryCard, MainOptions } from "../components/ui";
import { CountryRes, CountryProps, Info } from "../interfaces";
import { toDecimal } from "../util";
import styles from "../styles/Index.module.scss";
import { useContext, useEffect, useState } from "react";
import { ThemeContext, ThemeProvider } from "../context";

const Home: NextPage<CountryProps> = ({ response }) => {
  const [countrylist, setCountrylist] = useState<Info[]>([]);
  const { theme } = useContext(ThemeContext);
  const handleList = (c: string) => {
    const region = response.filter((el) => el.region === c);
    setCountrylist(region);
  };
  const findCountry = (b: string) => {
    if (b === "") return setCountrylist(response);
    const countries = response.filter((el) =>
      el.name.toLowerCase().includes(b.toLowerCase())
    );
    if (countries === undefined) {
      setCountrylist([]);
    } else {
      setCountrylist(countries);
    }
  };
  useEffect(() => {
    setCountrylist(response);
  }, []);
  return (
    <MainLayout>
      <MainOptions handleList={handleList} findCountry={findCountry} />
      <div
        className={`${styles["grid-container"]} ${
          theme === "dark" ? styles.dark : ""
        }`}
      >
        {countrylist.length > 0 ? (
          countrylist.map((el, index) => <CountryCard el={el} key={index} />)
        ) : (
          <h3
            style={{
              textAlign: "center",
              color: `${theme === "dark" ? "#fff" : "#000"}`,
            }}
          >
            There's no Information
          </h3>
        )}
      </div>
    </MainLayout>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (ctx) => {
  const res = await countryApi.get<CountryRes[]>(`/all`);
  const response = res.data
    .map((el) => {
      return {
        name: el.name.common,
        flags: el.flags.svg,
        population: toDecimal(el.population.toString()) || 0,
        region: el.region,
        capital: el.capital || "No Information",
      };
    })
    .sort((a, b) => {
      return a.name > b.name ? 1 : -1;
    });
  return {
    props: {
      response,
    },
  };
};
