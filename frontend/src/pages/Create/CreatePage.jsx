import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import styles from "./CreatePage.module.css";
import toast from "react-hot-toast";
import api from "../../utils/axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      await api.post("/notes", { title, content });
      toast.success("Note created successfully!");
      setTitle("");
      setContent("");
      navigate("/");
    } catch (err) {
      toast.error("Error creating note.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.screenWrapper}>
      <div className={styles.container}>
        <div className={styles.contentWidthGuard}>
          <Link to="/" className={styles.backButton}>
            <ArrowLeftIcon className={styles.backIcon} size={20} />
            <span>Back to Notes</span>
          </Link>

          <h2 className={styles.pageTitle}>Create New Note</h2>

          <form onSubmit={handleSubmit} className={styles.noteForm}>
            <div className={styles.inputGroup}>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                placeholder="Enter note title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoFocus
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="content">Content</label>
              <textarea
                id="content"
                rows="6"
                placeholder="Start typing the contexts of your note..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? (
                <span className={styles.loadingFlexWrapper}>
                  <span>Saving</span>
                  <span className={styles.dotLoader}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                </span>
              ) : (
                "Save Note"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
