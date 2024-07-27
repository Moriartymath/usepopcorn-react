import styles from "./App.module.css";
import { CSSProperties, useEffect, useRef, useState } from "react";
import MovieList from "./MovieList/MovieList.tsx";
import SearchBar from "./SearchBar/SearchBar.tsx";
import WatchedMovieList from "./WatchedMovieList/WatchedMovieList.tsx";
import MoviePreview from "./MoviePreview/MoviePreview.tsx";
import SearchInput from "./SearchBar/SearchInput/SearchInput.tsx";
import SearchStats from "./SearchBar/SearchStats/SearchStats.tsx";
import BoxLayout from "./BoxLayout/BoxLayout.tsx";
import Loader from "./Loader/Loader.tsx";
import { useMovies } from "../hooks/useMovies.ts";
import { useLocalStorageState } from "../hooks/useLocalStorageState.ts";
import { useKeyPress } from "../hooks/useKeyPress.ts";

const textStyle = {
  color: "white",
  alignSelf: "center",
  position: "relative",
  top: "45%",
};

function App() {
  const [inputText, setInputText] = useState("");
  const [selectMovieId, setSelectedMovieId] = useState(null);
  const [watchedList, setWatchedList] = useLocalStorageState(
    [],
    "watchedMovies"
  );
  const inputElement = useRef(null) as { current: HTMLInputElement };

  const { movieList, isLoading, moviesFound, setMovieList, netError } =
    useMovies(inputText);

  useKeyPress("Enter", () => {
    if (document.activeElement !== inputElement.current) {
      setInputText("");
      setMovieList([]);
      inputElement.current.focus();
    }
  });

  return (
    <div className={styles.App}>
      <SearchBar>
        <SearchInput
          inputText={inputText}
          setInputText={setInputText}
          inputRef={inputElement}
        />
        <SearchStats amount={movieList.length} />
      </SearchBar>
      <main className={styles.main}>
        <BoxLayout>
          {!isLoading && !netError && inputText && moviesFound && (
            <MovieList
              movieList={movieList}
              setSelectedMovieId={setSelectedMovieId}
              isFullStats={false}
            />
          )}
          {isLoading && !netError && <Loader />}

          {netError && <h1>You are offline 💀</h1>}
          {!inputText && !netError && (
            <h2 style={textStyle as CSSProperties}>{"Start typing 🔎"}</h2>
          )}
          {inputText && !moviesFound && !isLoading && (
            <h2 style={textStyle as CSSProperties}>Movies not found 😔</h2>
          )}
        </BoxLayout>
        <BoxLayout>
          {selectMovieId ? (
            <MoviePreview
              imdbId={selectMovieId}
              setWatchedList={setWatchedList}
              setSelectedMovieId={setSelectedMovieId}
              userRating={
                watchedList.find((movie) => movie.imdbID === selectMovieId)
                  ?.userRating
              }
            />
          ) : (
            <WatchedMovieList
              watchedMovieList={watchedList}
              setSelectedMovieId={setSelectedMovieId}
            />
          )}
        </BoxLayout>
      </main>
    </div>
  );
}

export default App;
