import React, { useState } from "react";
import Options from "./Options";
import Search from "../../public/images/search-outline.svg";
import styles from "../../styles/MainOptions.module.scss";

const regions: string[] = ["Africa", "America", "Asia", "Europe", "Oceania"];
const initialRegion: string = "Filter By Region";

export const MainOptions = () => {
  const [onRegion, setOnRegion] = useState<string>(initialRegion);
  const [inputSearch, setInputSearch] = useState<string>("");
  const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
    setOnRegion(e.currentTarget.innerHTML);
    setInputSearch("")
  };
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(e.target.value);
    if(onRegion !== initialRegion) {
      setOnRegion(initialRegion)
    }
  };
  return (
    <div className={styles["main-options-container"]}>
      <div className={styles['flex-wrapper']}>
        <div className={styles["input-container"]}>
          <div className={styles["search-logo"]}>
            <Search />
          </div>
          <input
            type="text"
            name="country"
            placeholder="Search for a country..."
            onChange={handleInput}
            value={inputSearch}
            className={styles["input-search"]}
            autoComplete={'off'}
          />
        </div>
        <Options
          regions={regions}
          handleClick={handleClick}
          onRegion={onRegion}
        />
      </div>
    </div>
  );
};
