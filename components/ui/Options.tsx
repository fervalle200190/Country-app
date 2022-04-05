import React, { FC, useContext, useRef, useState } from "react";
import { ThemeContext } from "../../context";
import Arrow from "../../public/images/chevron-down-outline.svg";
import styles from "../../styles/Options.module.scss";

type Props = {
  regions: string[];
  handleClick: (e: React.MouseEvent<HTMLLIElement>) => void;
  onRegion: string,
  handleList: (c: string)=> void
};

const Options: FC<Props> = ({ regions, handleClick, onRegion, handleList }) => {
  const [show, setShow] = useState("no-show");
  const [spin, setSpin] = useState("")
  const miniOption = useRef<HTMLDivElement>(null);
  const { theme } = useContext(ThemeContext)
  if(typeof window !== 'undefined') {
    document.addEventListener('click',()=> {
      setShow('no-show')
      setSpin("")
    })
  }
  const handleShow = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    if (show === "show") {
      setShow("no-show");
      setSpin("")
    } else {
      setShow("show");
      setSpin("turn")
    }
  };
  return (
    <div className={`${theme === 'dark'? styles.dark: ""}`} >
      <div
        className={`${styles["upper-option"]} up-op`}
        ref={miniOption}
        onClick={handleShow}
      >
        <h2>{onRegion}</h2>
        <Arrow className={spin === 'turn'? styles.turn: ""} />
      </div>
      <ul
        className={`${styles["ul-options"]} ${
          show === "show" ? styles.show : ""
        }`}
      >
        {regions.map((region) => (
          <li key={region} onClick={(e)=> {
            handleClick(e)
            handleList(region)
          }}>
            {region}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Options;
