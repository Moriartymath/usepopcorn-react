import { useState } from "react";
import ColapseButton from "../ColapseButton/ColapseButton.tsx";
import styles from "./BoxLayout.module.css";

function BoxLayout({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={styles.box}>
      <ColapseButton isOpen={isOpen} setIsOpen={setIsOpen} />
      {isOpen && children}
    </div>
  );
}

export default BoxLayout;
