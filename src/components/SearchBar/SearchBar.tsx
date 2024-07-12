import styles from "./SearchBar.module.css";
import Title from "./Title/Title.tsx";

function SearchBar({ children }) {
  return (
    <nav className={styles.searchHeader}>
      <Title />
      {children}
    </nav>
  );
}

export default SearchBar;
