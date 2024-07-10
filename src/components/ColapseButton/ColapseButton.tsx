import styles from "./ColapseButton.module.css";

type ColapseButtonProps = {
  isOpen: boolean;
  setIsOpen: Function;
};

function ColapseButton({ isOpen, setIsOpen }: ColapseButtonProps) {
  return (
    <button
      className={styles.closeButton}
      onClick={() => setIsOpen((currState: boolean) => !currState)}
    >
      {isOpen ? <>&minus;</> : <>&#x2b;</>}
    </button>
  );
}

export default ColapseButton;
