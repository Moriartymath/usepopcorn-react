import styles from "./SearchInput.module.css";
import { useEffect, useRef } from "react";
type SearchInputProps = {
  inputText: string;
  setInputText: Function;
  inputRef: { current: any };
};

function SearchInput({ inputText, setInputText, inputRef }: SearchInputProps) {
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <input
      ref={inputRef}
      type="text"
      value={inputText}
      onChange={(ev) => setInputText(ev.target.value)}
      placeholder="Search movies..."
      className={styles.search}
    />
  );
}

export default SearchInput;
