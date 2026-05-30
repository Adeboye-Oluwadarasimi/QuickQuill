import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Trash2, Save, Loader2 } from "lucide-react";
import api from "../../utils/axios";
import toast from "react-hot-toast";
import styles from "./NoteDetailPage.module.css";

const NoteDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State handles form values
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch the single note data on mount
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await api.get(`/notes/${id}`);
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (err) {
        toast.error(
          "An error occurred while fetching the note. Please try again later.",
        );
        console.error(err);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id, navigate]);

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    if (saving) return;
    setSaving(true);
    try {
      await api.put(`/notes/${id}`, { title, content });
      toast.success("Changes saved successfully!");
      navigate("/");
    } catch (err) {
      toast.error("Failed to save changes.");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully!");
      navigate("/");
    } catch (err) {
      toast.error("Failed to delete note.");
      console.error(err);
    }
  };

  if (loading)
    return (
      <div className={styles.loading}>
        <Loader2 className={styles.spinner} size={48} />
      </div>
    );

  return (
    <div className={styles.pageContainer}>
      <div className={styles.wrapper}>
        {/* Header Action Row */}
        <div className={styles.headerRow}>
          <Link to="/" className={styles.backLink}>
            <ArrowLeft size={18} />
            <span>Back to Notes</span>
          </Link>

          <button
            type="button"
            className={styles.deleteBtn}
            onClick={handleDelete}
          >
            <Trash2 size={16} />
            <span>Delete Note</span>
          </button>
        </div>

        {/* Note Editor Form Wrapper */}
        <form onSubmit={handleSaveChanges} className={styles.noteForm}>
          <div className={styles.inputGroup}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter note title..."
              autoFocus
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Eggs, oats, spinach, almond milk..."
              rows="8"
              required
            />
          </div>

          {/* Bottom Action Footer */}
          <div className={styles.footerRow}>
            <button type="submit" className={styles.saveBtn} disabled={saving}>
              <Save size={18} />
              <span>{saving ? "Saving Changes..." : "Save Changes"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteDetailPage;
