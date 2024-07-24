import MovieList from "../MovieList/MovieList.tsx";
import styles from "./WatchedMovieList.module.css";

type WatchedMovieListProps = {
  watchedMovieList: Array<{
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
    runtime: string;
    imdbRating: number;
    userRating: number;
  }>;
  setSelectedMovieId: Function;
};

function WatchedMovieList({
  watchedMovieList,
  setSelectedMovieId,
}: WatchedMovieListProps) {
  const avrgDuration = watchedMovieList.reduce(
    (acc, movie) =>
      acc + Number(movie.runtime.split(" ")[0]) / watchedMovieList.length,
    0
  );

  const moviesAmount = watchedMovieList.length;

  const avrgImdbRating = watchedMovieList.reduce(
    (acc, movie) => acc + movie.imdbRating / watchedMovieList.length,
    0
  );

  const avrgUserRating = watchedMovieList.reduce(
    (acc, movie) => acc + movie.userRating / watchedMovieList.length,
    0
  );

  return (
    <>
      <MovieList
        movieList={watchedMovieList}
        setSelectedMovieId={setSelectedMovieId}
        isFullStats={true}
        statsJSX={
          <li className={styles.statsDescription}>
            <h3>MOVIES YOU WATCHED</h3>
            <div className={styles.allStats}>
              <p>#️⃣ {moviesAmount} movies</p>
              <p>⭐️ {avrgImdbRating}</p>
              <p>🌟 {avrgUserRating}</p>
              <p>⏳ {avrgDuration} min</p>
            </div>
          </li>
        }
      />
    </>
  );
}

export default WatchedMovieList;
