// src/App.jsx
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BuilderPage from "./pages/BuilderPage";
import GenerateFormPage from "./pages/GenerateFormPage";
import HomePage from "./pages/HomePage";
import PreviewPage from "./pages/PreviewPage";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/builder/:id" element={<BuilderPage />} />
          <Route path="/preview/:id" element={<PreviewPage />} />
          <Route path="/generate/:id" element={<GenerateFormPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
