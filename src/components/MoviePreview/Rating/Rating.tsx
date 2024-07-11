import { useState } from "react";
import styles from "./Rating.module.css";
import RatingStar from "./RatingStar/RatingStar.tsx";
import AddToWatchedList from "./AddToWatchedList/AddToWatchedList.tsx";

const maxRating = 10;

type RatingProps = {
  movieObj: {};
  watchedList: any[];
  setWatchedList: Function;
  userRatingScore: number;
  setUserRatingScore: Function;
};

function Rating({
  userRatingScore,
  setUserRatingScore,
  watchedList,
  setWatchedList,
  movieObj,
}: RatingProps) {
  const [rating, setRating] = useState(0);

  return (
    <ul className={styles.ratingList} onMouseLeave={() => setRating(0)}>
      {Array.from(new Array(maxRating), (_, index) => (
        <RatingStar
          key={index}
          count={index + 1}
          setRating={setRating}
          color={
            index + 1 <= rating ||
            (userRatingScore !== null && index + 1 <= userRatingScore)
              ? "#ffdf00"
              : ""
          }
          setUserRatingScore={setUserRatingScore}
        />
      ))}
      <span className={styles.ratingNumber}>{`${
        userRatingScore ? userRatingScore : rating
      }/${maxRating}`}</span>
      {userRatingScore !== null ? (
        <AddToWatchedList setWatchedList={setWatchedList} movieObj={movieObj} />
      ) : null}
    </ul>
  );
}

export default Rating;
