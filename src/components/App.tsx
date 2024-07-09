import { useState } from "react";
import styles from "./App.module.css";
import MovieList from "./MovieList/MovieList.tsx";
import SearchBar from "./SearchBar/SearchBar.tsx";
import WatchedMovieList from "./WatchedMovieList/WatchedMovieList.tsx";

function App() {
  const [inputText, setInputText] = useState("");

  return (
    <div className={styles.App}>
        <SearchBar inputText={inputText} setInputText={setInputText} />
      <main>
        <MovieList />
        <WatchedMovieList />
      </main>
    </div>
  );
}

export default App;
