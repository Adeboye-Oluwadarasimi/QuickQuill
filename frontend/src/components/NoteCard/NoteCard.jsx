import styles from "./NoteCard.module.css";
import { Edit, Trash2, X } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
import api from "../../utils/axios";
import toast from "react-hot-toast";
import { useState } from "react";

const NoteCard = ({ note, setNotes }) => {
  const { title, content } = note;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully!");
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } catch (err) {
      toast.error("Error deleting note.");
      console.error(err);
    }
  };
  return (
    <>
      <div className={styles.noteCard} onClick={() => setIsModalOpen(true)}>
        <div className={styles.noteContainer}>
          <h3 className={styles.noteTitle}>{title}</h3>
          <p className={styles.noteContent}>{content}</p>

          <div className={styles.noteFooter}>
            <span className={styles.date}>{formatDate(note.createdAt)}</span>
            <div className={styles.buttons}>
              <Link
                to={`/note/${note._id}`}
                className={styles.editButton}
                onClick={(e) => e.stopPropagation()}
              >
                <Edit />
              </Link>
              <button
                className={styles.deleteButton}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(e, note._id);
                }}
              >
                <Trash2 />
              </button>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          className={styles.modalOverlay}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.modalClose}
              onClick={() => setIsModalOpen(false)}
            >
              <X />
            </button>
            <h2 className={styles.modalTitle}>{title}</h2>
            <div className={styles.modalBody}>
              <p className={styles.modalText}>{content}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NoteCard;
