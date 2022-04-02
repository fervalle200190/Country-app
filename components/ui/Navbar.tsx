import { useRouter } from "next/router";
import Moon from "../../public/images/moon-outline.svg";
import styles from "../../styles/Navbar.module.scss";

export const Navbar = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/`);
  };
  return (
    <header className={styles["header-container"]}>
      <nav className={styles["navbar-container"]}>
        <h1 className={styles["logo-main"]} onClick={handleClick}>
          Where in the world?
        </h1>
        <div className={styles["switch-container"]}>
          <div className={styles["moon-container"]}>
            <Moon />
          </div>
          <span className={styles["dark-title"]}>Dark Mode</span>
        </div>
      </nav>
    </header>
  );
};
