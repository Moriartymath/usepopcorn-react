import styles from "./AddToWatchedList.module.css";
import MovieType from "../../../../Types/MovieType";

type AddToWatchedListProps = {
  movieObj: MovieType;
  setWatchedList: Function;
};

function AddToWatchedList({ movieObj, setWatchedList }: AddToWatchedListProps) {
  return (
    <button
      className={styles.addToList}
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
