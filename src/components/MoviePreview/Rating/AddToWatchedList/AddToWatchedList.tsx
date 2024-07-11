import styles from "./AddToWatchedList.module.css";

type AddToWatchedListProps = {
  movieObj: {};
  setWatchedList: Function;
};

function AddToWatchedList({ movieObj, setWatchedList }: AddToWatchedListProps) {
  return (
    <button
      className={styles.addToList}
      onClick={() =>
        setWatchedList((list: Array<any>) =>
          !list.some((movie) => movie === movieObj) ? [...list, movieObj] : list
        )
      }
    >
      Add to list
    </button>
  );
}

export default AddToWatchedList;
