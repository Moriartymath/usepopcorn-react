import { useState } from "react";
import ColapseButton from "../ColapseButton/ColapseButton.tsx";
import styles from "./MoviePreview.module.css";
import Rating from "./Rating/Rating.tsx";

type MoviePreviewProps = {
  movieObj: {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
    runtime: number;
    imdbRating: number;
    userRating: number;
  };
};

function MoviePreview({ movieObj }: MoviePreviewProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [userRatingScore, setUserRatingScore] = useState(null);

  return (
    <div className={styles.preview}>
      <ColapseButton isOpen={isOpen} setIsOpen={setIsOpen} />
      <header className={styles.header}>
        <div className={styles.imageContainer}>
          <img
            src={movieObj.Poster}
            alt={movieObj.Title}
            className={styles.image}
          />
        </div>
        <div className={styles.shortDescripton}>
          <h2>{movieObj.Title}</h2>
          <div className={styles.movieInfo}>
            <p>
              16 Jul {movieObj.Year} · {movieObj.runtime} min
            </p>
            <p>Action, Adventure, Sci-Fi</p>
            <p>⭐️ {movieObj.imdbRating} IMDb rating</p>
          </div>
        </div>
      </header>
      <main className={styles.main}>
        <Rating
          userRatingScore={userRatingScore}
          setUserRatingScore={setUserRatingScore}
        />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus,
          quae iure sint ullam voluptates magni cum eligendi ipsum neque
          doloribus repellendus aperiam incidunt quos quasi facere, eius dicta
          natus quibusdam?
        </p>
      </main>
    </div>
  );
}

export default MoviePreview;
