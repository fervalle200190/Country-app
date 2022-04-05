import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { countryApi } from "../../api";
import { MainLayout } from "../../components/layouts";
import { CountryRes } from "../../interfaces";
import styles from "../../styles/CountryInfo.module.scss";
import Arrow from "../../public/images/arrow-back-outline.svg";
import { toDecimal } from "../../util";
import { BorderButton } from "../../components/ui";
import { ThemeContext } from "../../context";

interface Props {
  oneCountry: CountryRes;
  allCountries: allCount[];
}

interface allCount {
  name: string;
  finder: string;
}

const Country: NextPage<Props> = ({ oneCountry, allCountries }) => {
  // console.log(allCountries)
  const [countryLang, setCountryLang] = useState<string[]>([]);
  const [borders, setBorders] = useState<any[]>([]);
  const router = useRouter();
  const getLang = () => {
    let obj = oneCountry.languages;
    let languages = [];
    for (const language in obj) {
      languages.push(obj[language]);
    }
    setCountryLang(languages);
  };
  const getBorders = () => {
    if (!oneCountry.borders) return null;
    const names = oneCountry.borders.map((el) =>
      allCountries.find((el2) => el2.finder === el)
    );
    if (names === undefined) {
      setBorders([]);
    } else {
      setBorders(names);
    }
  };
  useEffect(() => {
    getLang();
    getBorders();
  }, []);
  const getName = () => {
    if (!oneCountry.name.nativeName) return "No Information";
    let obj = oneCountry.name.nativeName;
    for (const name in obj) {
      if (typeof obj[name].official === "string") {
        return obj[name].official;
      } else {
        return obj[name].official;
      }
    }
  };
  const getCurrency = () => {
    if (!oneCountry.currencies) return "No Information";
    let obj = oneCountry.currencies;
    if (typeof obj === "object") {
      for (const curre in obj) {
        return obj[curre].name;
      }
    }
  };
  const handleRe = () => {
    router.push(`/`);
  };
  const { theme } = useContext(ThemeContext);
  return (
    <MainLayout title={oneCountry.name.common}>
      <div>
        <div className={styles["country-information"]}>
          <button
            onClick={handleRe}
            className={`${styles["back-button"]} ${
              theme === "dark" ? styles["dark-back"] : ""
            }`}
          >
            <Arrow />
            Back
          </button>
          <div className={styles["deep-details"]}>
            <div className={styles["image-container"]}>
              <img src={oneCountry.flags.svg} alt={oneCountry.name.common} />
            </div>
            <article
              className={`${styles["article-container"]} ${
                theme === "dark" ? styles.dark : ""
              }`}
            >
              <h2>{oneCountry.name.common}</h2>
              <div className={`${styles["country-detailed"]}`}>
                <div className={styles["inner-detailed"]}>
                  <ul>
                    <li>
                      <b> Native Name:</b> {getName() || "No Information"}
                    </li>
                    <li>
                      <b> Population:</b>{" "}
                      {toDecimal(oneCountry.population.toString())}
                    </li>
                    <li>
                      <b> Region:</b> {oneCountry.region}
                    </li>
                    <li>
                      <b> Sub Region:</b>{" "}
                      {oneCountry.subregion || "No Information"}
                    </li>
                    <li>
                      <b> Capital:</b> {oneCountry.capital || "No Information"}
                    </li>
                  </ul>
                  <ul className={styles["second-ul"]}>
                    <li>
                      <b> Top Level Domain:</b>{" "}
                      {oneCountry.tld || "No Information"}
                    </li>
                    <li>
                      <b> Currencies:</b> {getCurrency()}
                    </li>
                    <li>
                      <b> Languages:</b> {countryLang.join(`, `)}
                    </li>
                  </ul>
                </div>
                <div className={styles["border-section"]}>
                  <h4>Border Countries:</h4>
                  <div>
                    {borders.length > 1 ? (
                      borders.map((el) => (
                        <BorderButton key={el.name} name={el.name} />
                      ))
                    ) : (
                      <button>No information</button>
                    )}
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Country;

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const { data } = await countryApi.get<CountryRes[]>(`/all`);
  const countriesName = data.map((el) => ({
    country: `${el.name.common}`,
  }));
  return {
    paths: countriesName.map((el) => ({
      params: el,
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data } = await countryApi.get<CountryRes[]>(`/all`);
  const { country } = params as { country: string };
  const allCountries = data.map((el) => {
    return { name: el.name.common, finder: el.cca3 };
  });
  const oneCountry = data.find((el) => el.name.common === country);
  return {
    props: {
      oneCountry,
      allCountries,
    },
  };
};
