import React from "react";
import styles from "./Movie.module.css";

type MovieProps = {
  poster: string;
  title: string;
  stats: React.ReactElement;
  deleteButton?: string;
  setSelectedMovieId: Function;
  imbdID: string;
};

function Movie({
  poster,
  title,
  stats,
  deleteButton,
  setSelectedMovieId,
  imbdID,
}: MovieProps) {
  return (
    <li className={styles.movie} onClick={() => setSelectedMovieId(imbdID)}>
      <div className={styles.imageContainer}>
        <img src={poster} alt={title} className={styles.image} />
      </div>
      <div className={styles.movieShortDescr}>
        <h3>{title}</h3>
        <div className={styles.movieStats}>{stats}</div>
      </div>
      {deleteButton ? deleteButton : null}
    </li>
  );
}

export default Movie;
