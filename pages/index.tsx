import type { NextPage } from "next";
import { GetStaticProps } from "next";
import { countryApi } from "../api";
import { MainLayout } from "../components/layouts";
import { CountryCard, MainOptions } from "../components/ui";
import { CountryRes, CountryProps } from "../interfaces";
import { toDecimal } from "../util";
import styles from '../styles/Index.module.scss'

const Home: NextPage<CountryProps> = ({ response }) => {
  return (
    <MainLayout>
      <MainOptions />
      <div className={styles['grid-container']}>
        {response.map((el, index) => (
          <CountryCard el={el} key={index} />
        ))}
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
        population:
          toDecimal(el.population.toString()) || 0,
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
