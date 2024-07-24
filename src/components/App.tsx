import styles from "./App.module.css";
import { CSSProperties, useEffect, useState } from "react";
import MovieList from "./MovieList/MovieList.tsx";
import SearchBar from "./SearchBar/SearchBar.tsx";
import WatchedMovieList from "./WatchedMovieList/WatchedMovieList.tsx";
import MoviePreview from "./MoviePreview/MoviePreview.tsx";
import SearchInput from "./SearchBar/SearchInput/SearchInput.tsx";
import SearchStats from "./SearchBar/SearchStats/SearchStats.tsx";
import BoxLayout from "./BoxLayout/BoxLayout.tsx";
import axios from "axios";
import spinner from "../assets/spinner.svg";
import Loader from "./Loader/Loader.tsx";

const textStyle = {
  color: "white",
  alignSelf: "center",
  position: "relative",
  top: "45%",
};

function App() {
  const [inputText, setInputText] = useState("");
  const [selectMovieId, setSelectedMovieId] = useState(null);
  const [watchedList, setWatchedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [netError, setNetError] = useState(null);
  const [moviesFound, setMoviesFound] = useState(true);

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();

    const fetchMovies = async function () {
      try {
        if (inputText && !netError) setIsLoading(true);

        const res = await axios.get(
          `http://www.omdbapi.com/?apikey=120a7fbf&s=${inputText}`,
          {
            cancelToken: cancelToken.token,
          }
        );

        setNetError(null);
        setMovieList(res.data.Error ? [] : res.data.Search);
        setMoviesFound(res.data.Error ? false : true);
      } catch (err) {
        if (axios.isCancel(err)) console.log("Canceling!");
        else {
          console.log(err);
          setNetError("You are offline 😿");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();

    return () => {
      cancelToken.cancel("Cancelled!");
      setMovieList([]);
    };
  }, [inputText, setMovieList]);
  console.log(watchedList);
  return (
    <div className={styles.App}>
      <SearchBar>
        <SearchInput inputText={inputText} setInputText={setInputText} />
        <SearchStats amount={0} />
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
