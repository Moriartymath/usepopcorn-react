import buttonStyles from "../ColapseButton/ColapseButton.module.css";

function DeleteButton({ imdbID, watchedList, setWatchedList }) {
  function deleteFromWatchedList() {
    const copy = watchedList.slice();
    const movieIndex = copy.findIndex((movie) => movie.imdbID === imdbID);
    copy.splice(movieIndex, 1);
    setWatchedList(copy);
  }

  return (
    <button
      className={buttonStyles.closeButton}
      style={{
        display: "block",
        position: "unset",
        alignSelf: "center",
        margin: "0",
        zIndex: "100",
      }}
      onClick={() => {
        console.log("Close Clicked!");

        deleteFromWatchedList();
      }}
    >
      &times;
    </button>
  );
}

export default DeleteButton;
