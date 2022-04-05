import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { ThemeContext } from "../../context";
import Moon from "../../public/images/moon-outline.svg";
import styles from "../../styles/Navbar.module.scss";

export const Navbar = () => {
  const { changeTheme, theme } = useContext(ThemeContext);
  const router = useRouter();
  const handleClick = () => {
    router.push(`/`);
  };
  const checkTheme = () => {
    if(theme === "light") {
      changeTheme("dark")
      localStorage.setItem("theme", "true")
    } else {
      changeTheme("light")
      localStorage.setItem("theme", "false")
    }
  };
  useEffect(() => {
    let actual = localStorage.getItem("theme");
    if (actual === "true") {
      changeTheme("dark");
    } else {
      changeTheme("light")
      localStorage.setItem("theme", "false")
    }
  }, [changeTheme]);

  return (
    <header className={`${styles["header-container"]} ${theme === "light"? "": styles.dark }`}>
      <nav className={styles["navbar-container"]}>
        <h1 className={styles["logo-main"]} onClick={handleClick}>
          Where in the world?
        </h1>
        <div className={styles["switch-container"]} onClick={checkTheme}>
          <div className={styles["moon-container"]}>
            <Moon />
          </div>
          <span className={styles["dark-title"]}>
            Dark Mode
          </span>
        </div>
      </nav>
    </header>
  );
};
