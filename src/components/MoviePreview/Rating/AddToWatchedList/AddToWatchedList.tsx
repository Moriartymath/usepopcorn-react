import styles from "./AddToWatchedList.module.css";
import MovieType from "../../../../Types/MovieType";

type AddToWatchedListProps = {
  movieObj: MovieType;
  setWatchedList: Function;
  children: string;
  userRating: number;
  setSelectedId: Function;
};

function AddToWatchedList({
  movieObj,
  setWatchedList,
  children,
  userRating,
  setSelectedId,
}: AddToWatchedListProps) {
  return (
    <button
      className={!userRating ? styles.addToList : styles.message}
      onClick={() => {
        if (userRating) setSelectedId(null);
        else
          setWatchedList((list: Array<any>) =>
            !list.some((movie) => movie.imdbID === movieObj.imdbID)
              ? [...list, movieObj]
              : list
          );
      }}
    >
      {children}
    </button>
  );
}

export default AddToWatchedList;
