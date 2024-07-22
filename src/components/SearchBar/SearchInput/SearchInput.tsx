import styles from "./SearchInput.module.css";

type SearchInputProps = {
  inputText: string;
  setInputText: Function;
};

function SearchInput({ inputText, setInputText }: SearchInputProps) {
  
  return (
    <input
      type="text"
      value={inputText}
      onChange={(ev) => setInputText(ev.target.value)}
      placeholder="Search movies..."
      className={styles.search}
    />
  );
}

export default SearchInput;
