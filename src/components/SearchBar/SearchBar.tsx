import styles from "./SearchBar.module.css";
import SearchInput from "./SearchInput/SearchInput.tsx";
import SearchStats from "./SearchStats/SearchStats.tsx";
import Title from "./Title/Title.tsx";

type SearchBarProps = {
  inputText: string;
  setInputText: Function;
};

function SearchBar({ inputText, setInputText }: SearchBarProps) {
  return (
    <header className={styles.searchHeader}>
      <Title />
      <SearchInput inputText={inputText} setInputText={setInputText} />
      <SearchStats />
    </header>
  );
}

export default SearchBar;
