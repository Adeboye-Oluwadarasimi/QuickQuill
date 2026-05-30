import { NotebookIcon } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./NoteEmpty.module.css";

const NoteEmpty = () => {
  return (
    <div className={styles.container}>
      <NotebookIcon className={styles.icon} size={64} />

      <h2 className={styles.title}>No notes yet</h2>

      <p className={styles.description}>
        Ready to organize your thoughts? Create your first note to get started.
      </p>

      <Link to="/create" className={styles.createButton}>
        Create Note
      </Link>
    </div>
  );
};

export default NoteEmpty;
