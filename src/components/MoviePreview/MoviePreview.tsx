import { useEffect, useState } from "react";
import styles from "./MoviePreview.module.css";
import Rating from "./Rating/Rating.tsx";
import AddToWatchedList from "./Rating/AddToWatchedList/AddToWatchedList.tsx";
import axios from "axios";

type MoviePreviewProps = {
  imdbId: string;
  setWatchedList: Function;
};

type MovieObj = {
  imdbID?: string;
  Title?: string;
  Year?: string;
  Poster?: string;
  runtime?: number;
  imdbRating?: number;
  userRating?: number;
  Genre: string;
  Released: string;
  Plot: string;
};

function MoviePreview({ imdbId, setWatchedList }: MoviePreviewProps) {
  const [userRatingScore, setUserRatingScore] = useState(null);
  const [movieObj, setMovieObj] = useState(null) as [MovieObj, Function];

  useEffect(() => {
    console.log("PREVIEW EFFECT CALLED!");
    const cancelToken = axios.CancelToken.source();

    axios
      .get(`http://www.omdbapi.com/?apikey=120a7fbf&i=${imdbId}`, {
        cancelToken: cancelToken.token,
      })
      .then((res) => {
        console.log(imdbId);
        console.log(res.data);
        const data = res.data;
        setMovieObj({
          Title: data.Title,
          Year: data.Year,
          Poster: data.Poster,
          runtime: data.Runtime,
          imdbRating: data.imdbRating,
          userRating: userRatingScore,
          Genre: data.Genre,
          Released: data.Released,
          Plot: data.Plot,
        });
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log("Cancel preview!");
        } else console.log(err);
      });
    return () => {
      console.log("CLEANUP FUNCTION CALLED!");
      cancelToken.cancel("Canceling");
      setMovieObj(null);
      setUserRatingScore(null);
    };
  }, [setMovieObj, imdbId]);

  if (!movieObj)
    return (
      <img
        src="spinner.svg"
        style={{
          alignSelf: "center",
          position: "relative",
          top: "35%",
        }}
      />
    );

  return (
    <div className={styles.preview}>
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
              {movieObj.Released} · {movieObj.runtime}
            </p>
            <p>{movieObj.Genre}</p>
            <p>⭐️ {movieObj.imdbRating} IMDb rating</p>
          </div>
        </div>
      </header>
      <main className={styles.main}>
        <Rating
          userRatingScore={userRatingScore}
          setUserRatingScore={setUserRatingScore}
        >
          <AddToWatchedList
            movieObj={movieObj}
            setWatchedList={setWatchedList}
          />
        </Rating>
        <p>{movieObj.Plot}</p>
      </main>
    </div>
  );
}

export default MoviePreview;
