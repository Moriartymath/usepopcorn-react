import { useState } from "react";
import styles from "./RatingStar.module.css";

type RatingStarProps = {
  count: number;
  color: string;
  setRating: Function;
  setUserRatingScore: Function;
};

function RatingStar({
  count,
  setRating,
  color,
  setUserRatingScore,
}: RatingStarProps) {
  return (
    <li
      className={styles.star}
      onMouseEnter={() => setRating(count)}
      onClick={() => setUserRatingScore(count)}
      style={{ color: color }}
    >
      <span>&#x2605;</span>
    </li>
  );
}

export default RatingStar;
