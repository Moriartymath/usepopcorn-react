import styles from "./MoviePreview.module.css";

type MoviePreviewProps = {
  movieObj: {};
};

function MoviePreview({ movieObj }) {
  return (
    <div className={styles.preview}>
      <div className=""></div>
    </div>
  );
}

export default MoviePreview;
