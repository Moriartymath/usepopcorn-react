import { useState } from "react";
import Movie from "../Movie/Movie.tsx";
import styles from "./MovieList.module.css";

type MovieListProps = {
  movieList: Array<{
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
  }>;
};

function MovieList({ movieList }: MovieListProps) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <ul className={styles.list}>
      <button
        className={styles.closeButton}
        onClick={() => setIsOpen((currState) => !currState)}
      >
        {isOpen ? <>&minus;</> : <>&#x2b;</>}
      </button>
      {isOpen
        ? movieList.map((movie) => (
            <Movie
              title={movie.Title}
              poster={movie.Poster}
              stats={`🗓️ ${movie.Year}`}
            />
          ))
        : null}
    </ul>
  );
}

export default MovieList;
