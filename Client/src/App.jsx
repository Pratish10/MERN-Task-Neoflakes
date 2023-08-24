import "./App.css";
import FileUploadForm from "./components/FileUploadForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VideosList from "./components/videosList";
import NotFound from "./components/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FileUploadForm />} />;
        <Route path="/videoList" element={<VideosList />} />;
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
