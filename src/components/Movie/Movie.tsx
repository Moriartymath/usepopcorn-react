import styles from "./Movie.module.css";

type MovieProps = {
  poster: string;
  title: string;
  stats: string;
  deleteButton?: string;
};

function Movie({ poster, title, stats, deleteButton }: MovieProps) {
  return (
    <li className={styles.movie}>
      <div className={styles.imageContainer}>
        <img src={poster} alt={title} className={styles.image} />
      </div>
      <div className={styles.movieShortDescr}>
        <h3>{title}</h3>
        <p>{stats}</p>
      </div>
      {deleteButton ? deleteButton : null}
    </li>
  );
}

export default Movie;
