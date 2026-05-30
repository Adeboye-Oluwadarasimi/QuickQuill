import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import CreatePage from "./pages/Create/CreatePage";
import NoteDetailPage from "./pages/NoteDetail/NoteDetailPage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  );
};

export default App;
