import { Suspense, useEffect, useRef, useState, useTransition } from "react";
import styles from "./App.module.css";
import MovieList from "./MovieList/MovieList.tsx";
import SearchBar from "./SearchBar/SearchBar.tsx";
import WatchedMovieList from "./WatchedMovieList/WatchedMovieList.tsx";
import MoviePreview from "./MoviePreview/MoviePreview.tsx";
import SearchInput from "./SearchBar/SearchInput/SearchInput.tsx";
import SearchStats from "./SearchBar/SearchStats/SearchStats.tsx";
import BoxLayout from "./BoxLayout/BoxLayout.tsx";
import axios from "axios";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

function App() {
  const [inputText, setInputText] = useState("");
  const [selectMovieId, setSelectedMovieId] = useState(null);
  const [watchedList, setWatchedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  console.count("Component is RE-RENDERED!");

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();

    axios
      .get(`http://www.omdbapi.com/?apikey=120a7fbf&s=${inputText}`, {
        cancelToken: cancelToken.token,
      })
      .then(
        (res) => {
          console.log(res.data);
          setMovieList(res.data.Search || []);
        },
        (err) => console.count(err)
      );
    return () => {
      cancelToken.cancel("Cancelled!");
      setMovieList([]);
    };
  }, [inputText, setMovieList]);

  return (
    <div className={styles.App}>
      <SearchBar>
        <SearchInput inputText={inputText} setInputText={setInputText} />
        <SearchStats amount={tempMovieData.length} />
      </SearchBar>
      <main className={styles.main}>
        <BoxLayout>
          {movieList.length !== 0 && inputText ? (
            <MovieList
              movieList={movieList}
              setSelectedMovieId={setSelectedMovieId}
              isFullStats={false}
            />
          ) : !inputText && movieList.length === 0 ? (
            <h2
              style={{
                color: "white",
                alignSelf: "center",
                position: "relative",
                top: "45%",
              }}
            >
              {"Start typing 🔎"}
            </h2>
          ) : (
            <img
              src="spinner.svg"
              style={{
                alignSelf: "center",
                position: "relative",
                top: "35%",
              }}
            />
          )}
        </BoxLayout>
        <BoxLayout>
          {selectMovieId ? (
            <MoviePreview
              imdbId={
                [...watchedList, ...movieList].find(
                  (movie) => movie.imdbID === selectMovieId
                ).imdbID
              }
              setWatchedList={setWatchedList}
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
