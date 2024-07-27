import { useEffect, useState, useRef } from "react";
import styles from "./MoviePreview.module.css";
import Rating from "./Rating/Rating.tsx";
import AddToWatchedList from "./Rating/AddToWatchedList/AddToWatchedList.tsx";
import axios from "axios";
import spinner from "../../assets/spinner.svg";
import buttonStyles from "../ColapseButton/ColapseButton.module.css";
import MovieType from "../../Types/MovieType.tsx";
import { useKeyPress } from "../../hooks/useKeyPress.ts";

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
  const evalAmount = useRef({ imdbId, ratingDecisionAmount: 0 });

  function handleClosePreview() {
    setSelectedMovieId(null);
  }

  useEffect(() => {
    if (userRatingScore !== null) {
      evalAmount.current.ratingDecisionAmount += 1;
      console.log(evalAmount);
    }
    return () => {
      if (imdbId !== evalAmount.current.imdbId)
        evalAmount.current = { imdbId, ratingDecisionAmount: 0 };
    };
  }, [userRatingScore, imdbId]);

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();

    axios
      .get(`http://www.omdbapi.com/?apikey=120a7fbf&i=${imdbId}`, {
        cancelToken: cancelToken.token,
      })
      .then((res) => {
        const data = res.data;
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
        document.title = res.data.Title;
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
      document.title = "usePopcorn";
    };
  }, [setMovieObj, imdbId]);

  useEffect(() => {
    if (movieObj)
      setMovieObj((currObj) => {
        return { ...currObj, userRating: userRatingScore };
      });
  }, [userRatingScore]);

  useKeyPress("Escape", handleClosePreview);

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
          <h3>{movieObj.Title}</h3>
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
            />
          </Rating>
        )}
        <p>{movieObj.Plot}</p>
        <p>Directed by {movieObj.Director}</p>
      </main>
    </div>
  );
}

export default MoviePreview;
