import { useState } from "react";
import Movie from "../Movie/Movie.tsx";
import styles from "./MovieList.module.css";
import ColapseButton from "../ColapseButton/ColapseButton.tsx";

type MovieListProps = {
  movieList: Array<{
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
    runtime?: number;
    imdbRating?: number;
    userRating?: number;
  }>;
  statsJSX?: React.ReactElement;
  setSelectedMovieId: Function;
  isFullStats: boolean;
};

function MovieList({
  movieList,
  statsJSX,
  isFullStats,
  setSelectedMovieId,
}: MovieListProps) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <ul className={styles.list}>
      <ColapseButton isOpen={isOpen} setIsOpen={setIsOpen} />

      {statsJSX ? statsJSX : null}

      {isOpen
        ? movieList.map((movie) => (
            <Movie
              title={movie.Title}
              poster={movie.Poster}
              stats={
                isFullStats ? (
                  <>
                    <p>⭐️ {movie.imdbRating}</p>
                    <p>🌟 {movie.userRating}</p>
                    <p>⏳ {movie.runtime} min</p>
                  </>
                ) : (
                  <p>🗓️ {movie.Year}</p>
                )
              }
              key={movie.imdbID}
              imbdID={movie.imdbID}
              setSelectedMovieId={setSelectedMovieId}
            />
          ))
        : null}
    </ul>
  );
}

export default MovieList;
