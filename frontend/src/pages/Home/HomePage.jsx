import styles from "./HomePage.module.css";
import Navbar from "../../components/Navbar/Navbar";
import RateLimitedUI from "../../components/RateLimit/RateLimitedUI";
import { useEffect, useState } from "react";
import api from "../../utils/axios";
import toast from "react-hot-toast";
import NoteCard from "../../components/NoteCard/NoteCard";
import NoteEmpty from "../../components/NoteEmpty/NoteEmpty";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await api.get("/notes");
        console.log("Fetched notes:", response.data);
        setNotes(response.data);
        setIsRateLimited(false);
      } catch (error) {
        console.error("Error fetching notes:", error);
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error(
            "An error occurred while fetching notes. Please try again later.",
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className={styles.screenWrapper}>
      <Navbar />

      {isRateLimited && <RateLimitedUI />}

      <div className={styles.mainContainer}>
        {loading && <div className={styles.spinner}>Loading notes...</div>}

        {notes.length === 0 && !isRateLimited && <NoteEmpty />}

        {notes.length > 0 && !isRateLimited && (
          <div className={styles.contentGrid}>
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
