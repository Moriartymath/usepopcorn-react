import { useEffect, useState } from "react";
import styles from "./MoviePreview.module.css";
import Rating from "./Rating/Rating.tsx";
import AddToWatchedList from "./Rating/AddToWatchedList/AddToWatchedList.tsx";
import axios from "axios";
import spinner from "../../assets/spinner.svg";
import buttonStyles from "../ColapseButton/ColapseButton.module.css";
import MovieType from "../../Types/MovieType.tsx";

type MoviePreviewProps = {
  imdbId: string;
  setWatchedList: Function;
  setSelectedMovieId: Function;
  userRating?: number;
};

function MoviePreview({
  imdbId,
  setWatchedList,
  setSelectedMovieId,
  userRating = null,
}: MoviePreviewProps) {
  const [userRatingScore, setUserRatingScore] = useState(null);
  const [movieObj, setMovieObj] = useState(null) as [MovieType, Function];

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();

    axios
      .get(`http://www.omdbapi.com/?apikey=120a7fbf&i=${imdbId}`, {
        cancelToken: cancelToken.token,
      })
      .then((res) => {
        const data = res.data;
        console.log(data);
        setMovieObj({
          Title: data.Title,
          Year: data.Year,
          Poster: data.Poster,
          runtime: data.Runtime,
          imdbRating: data.imdbRating,
          Genre: data.Genre,
          userRating: userRating || userRatingScore,
          Released: data.Released,
          Plot: data.Plot,
          imdbID: data.imdbID,
          Director: data.Director,
        });
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log("Cancel preview!");
        } else console.log(err);
      });
    return () => {
      cancelToken.cancel("Canceling");
      setMovieObj(null);
      setUserRatingScore(null);
    };
  }, [setMovieObj, imdbId]);

  useEffect(() => {
    if (movieObj)
      setMovieObj((currObj) => {
        return { ...currObj, userRating: userRatingScore };
      });
  }, [userRatingScore]);

  if (!movieObj)
    return (
      <img
        src={spinner}
        alt="Loading..."
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
          <button
            className={buttonStyles.closeButton}
            onClick={() => setSelectedMovieId(null)}
            style={{
              marginRight: 0,
              marginLeft: "0.3em",
              alignSelf: "flex-start",
              opacity: "0.9",
            }}
          >
            &larr;
          </button>
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
        {userRating ? (
          <p>You rated this movie {userRating} ⭐️</p>
        ) : (
          <Rating
            userRatingScore={userRating || userRatingScore}
            setUserRatingScore={setUserRatingScore}
          >
            <AddToWatchedList
              movieObj={movieObj}
              setWatchedList={setWatchedList}
              userRating={userRatingScore}
            />
          </Rating>
        )}
        <p>{movieObj.Plot}</p>
      </main>
    </div>
  );
}

export default MoviePreview;
