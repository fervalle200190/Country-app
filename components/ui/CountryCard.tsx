import { NextPage } from "next";
import { useRouter } from "next/router";
import { Info } from "../../interfaces";
import styles from "../../styles/CountryCard.module.scss";

interface Props {
  el: Info;
}

export const CountryCard: NextPage<Props> = ({ el }) => {
  const router = useRouter()
  const handleClick = ()=> {
    router.push(`/country/${el.name}`)
  }
  return (
    <div className={styles['flex-card']} onClick={handleClick}>
      <div className={styles["card-container"]}>
        <div className={styles["card-img-cont"]}>
          <img src={el.flags} alt={el.name} className={styles["card-image"]} />
        </div>
        <div className={styles["details-container"]}>
          <h4>{el.name}</h4>
          <ul>
            <li>
              <b>Population: </b> {el.population}
            </li>
            <li>
              <b>Region: </b> {el.region}
            </li>
            <li>
              <b>Capital: </b> {el.capital}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
