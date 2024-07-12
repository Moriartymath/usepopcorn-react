import { useEffect, useState } from "react";
import styles from "./App.module.css";
import MovieList from "./MovieList/MovieList.tsx";
import SearchBar from "./SearchBar/SearchBar.tsx";
import WatchedMovieList from "./WatchedMovieList/WatchedMovieList.tsx";
import MoviePreview from "./MoviePreview/MoviePreview.tsx";
import SearchInput from "./SearchBar/SearchInput/SearchInput.tsx";
import SearchStats from "./SearchBar/SearchStats/SearchStats.tsx";
import BoxLayout from "./BoxLayout/BoxLayout.tsx";

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

  return (
    <div className={styles.App}>
      <SearchBar>
        <SearchInput inputText={inputText} setInputText={setInputText} />
        <SearchStats amount={tempMovieData.length} />
      </SearchBar>
      <main className={styles.main}>
        <BoxLayout>
          <MovieList
            movieList={tempMovieData}
            setSelectedMovieId={setSelectedMovieId}
            isFullStats={false}
          />
        </BoxLayout>
        <BoxLayout>
          {selectMovieId ? (
            <MoviePreview
              movieObj={tempWatchedData.find(
                (movie) => movie.imdbID === selectMovieId
              )}
              watchedList={watchedList}
              setWatchedList={setWatchedList}
            />
          ) : (
            <WatchedMovieList
              watchedMovieList={tempWatchedData}
              setSelectedMovieId={setSelectedMovieId}
            />
          )}
        </BoxLayout>
      </main>
    </div>
  );
}

export default App;
