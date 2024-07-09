import styles from "./Movie.module.css";

function Movie({ poster, title, stats, deleteButton }) {
  return (
    <li className={styles.movie}>
      <div className={styles.imageContainer}>
        <img src={poster} alt={title} className={styles.image} />
      </div>
      <div className={styles.movieShortDescr}>
        <h5>{title}</h5>
        <p>{stats}</p>
      </div>
      {deleteButton ? deleteButton : null}
    </li>
  );
}

export default Movie;
