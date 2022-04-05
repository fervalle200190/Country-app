import React, { useContext, useState } from "react";
import Options from "./Options";
import Search from "../../public/images/search-outline.svg";
import styles from "../../styles/MainOptions.module.scss";
import { NextPage } from "next";
import { ThemeContext } from "../../context";

const regions: string[] = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
const initialRegion: string = "Filter By Region";

interface Props {
  handleList: (c: string)=> void,
  findCountry: (b: string)=> void
}

export const MainOptions: NextPage<Props> = ({ handleList, findCountry }) => {
  const [onRegion, setOnRegion] = useState<string>(initialRegion);
  const [inputSearch, setInputSearch] = useState<string>("");
  const { theme } = useContext(ThemeContext)
  const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
    setOnRegion(e.currentTarget.innerHTML);
    setInputSearch("")
  };
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(e.target.value);
    findCountry(e.target.value)
    if(onRegion !== initialRegion) {
      setOnRegion(initialRegion)
    }
  };
  return (
    <div className={styles["main-options-container"]}>
      <div className={styles['flex-wrapper']}>
        <div className={styles["input-container"]}>
          <div className={`${styles["search-logo"]} ${theme === 'dark'? styles['dark-svg']: ""}`}>
            <Search />
          </div>
          <input
            type="text"
            name="country"
            placeholder="Search for a country..."
            onChange={handleInput}
            value={inputSearch}
            className={`${styles["input-search"]} ${theme === 'dark'? styles.dark: ""}`}
            autoComplete={'off'}
          />
        </div>
        <Options
          regions={regions}
          handleClick={handleClick}
          onRegion={onRegion}
          handleList={handleList}
        />
      </div>
    </div>
  );
};
