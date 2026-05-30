import styles from "./Navbar.module.css";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

const index = () => {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <h1 className={styles.logoText}>QuickQuill</h1>
        <Link to="/create" className={styles.createBtn}>
          <Plus size={18} strokeWidth={2.5} />
          <span>New Note</span>
        </Link>
      </div>
    </header>
  );
};

export default index;
