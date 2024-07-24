import styles from "./AddToWatchedList.module.css";
import MovieType from "../../../../Types/MovieType";

type AddToWatchedListProps = {
  movieObj: MovieType;
  setWatchedList: Function;
  userRating: number;
};

function AddToWatchedList({
  movieObj,
  setWatchedList,
  userRating,
}: AddToWatchedListProps) {
  return (
    <button
      className={!userRating ? styles.addToList : styles.message}
      onClick={() =>
        setWatchedList((list: Array<any>) =>
          !list.some((movie) => movie.imdbID === movieObj.imdbID)
            ? [...list, movieObj]
            : list
        )
      }
    >
      Add to list
    </button>
  );
}

export default AddToWatchedList;
