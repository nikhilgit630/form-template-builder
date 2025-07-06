// src/pages/HomePage.jsx
import toast from "react-hot-toast";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid"; // npm i uuid

const HomePage = () => {
  const [templateKeys, setTemplateKeys] = useState([]);
  const navigate = useNavigate();

  const handleCreateNewTemplate = () => {
    if (templateKeys.length >= 5) {
      toast.error("⚠️ You can't create more than 5 templates.");
      return;
    }

    const id = `template-${uuidv4().slice(0, 6)}`;
    navigate(`/builder/${id}`);
  };

  const handleDeleteTemplate = (key) => {
    const confirmed = window.confirm(`Are you sure you want to delete ${key}?`);
    if (confirmed) {
      localStorage.removeItem(key);
      setTemplateKeys((prev) => prev.filter((k) => k !== key));
    }
  };

  useEffect(() => {
    const keys = Object.keys(localStorage).filter((key) =>
      key.startsWith("template-")
    );
    setTemplateKeys(keys);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-100 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-10 border border-blue-200">
        <h1 className="text-4xl font-extrabold text-indigo-700 mb-4 text-center">
          🚀 Welcome to My Form Builder
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Easily create, preview, and manage your custom templates.
        </p>

        <div className="flex justify-center mb-8">
          <button
            onClick={handleCreateNewTemplate}
            disabled={templateKeys.length >= 5}
            className={`px-6 py-3 font-semibold text-lg rounded-full shadow transition-all duration-200
              ${
                templateKeys.length >= 5
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-400 to-emerald-500 text-white hover:from-green-500"
              }`}
          >
            ➕ Create New Template
          </button>
        </div>

        <div className="space-y-4">
          {templateKeys.length === 0 ? (
            <p className="text-center text-gray-500 italic">
              No templates saved yet. Create one to get started!
            </p>
          ) : (
            templateKeys.map((key) => (
              <div
                key={key}
                className="p-6 bg-white border rounded-xl shadow-sm flex justify-between items-center hover:shadow-md transition"
              >
                <div className="font-semibold text-indigo-800">{key}</div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => navigate(`/builder/${key}`)}
                    className="px-4 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => navigate(`/generate/${key}`)}
                    className="px-3 py-1 bg-gray-600 text-white rounded"
                  >
                    Fill
                  </button>
                  <button
                    onClick={() => navigate(`/preview/${key}`)}
                    className="px-4 py-1.5 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
                  >
                    👀 Preview
                  </button>
                  <button
                    onClick={() => handleDeleteTemplate(key)}
                    className="px-4 py-1.5 bg-red-600 text-white rounded hover:bg-red-700 transition"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
