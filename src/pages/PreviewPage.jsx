// src/pages/PreviewPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const PreviewPage = () => {
  const { id } = useParams();
  const [template, setTemplate] = useState(null);

  // 👇 Add this function inside your component
  const handleDownloadTemplate = () => {
    const blob = new Blob([JSON.stringify(template, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${template.id || "template"}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const raw = localStorage.getItem(id);
    if (raw) {
      setTemplate(JSON.parse(raw));
    } else {
      toast.error("Template not found.");
    }
  }, [id]);

  if (!template) return null;

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 bg-gradient-to-b from-white via-indigo-50 to-blue-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-indigo-700 mb-10 text-center">
        🚀 {template.name || id}
      </h1>
      <button
        type="button"
        onClick={handleDownloadTemplate}
        className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-semibold py-2 px-6 rounded-full shadow-md transition"
      >
        Download ⬇️
      </button>

      {template.sections.map((section, index) => (
        <div
          key={section.id}
          className="mb-10 bg-white shadow-md rounded-xl p-6 border-l-4 border-indigo-400 hover:border-indigo-600 transition-all duration-200"
        >
          <h2 className="text-xl font-bold text-indigo-800 mb-5 flex items-center gap-2">
            <span>📂</span>
            {section.title}
          </h2>

          <div className="space-y-5">
            {section.fields.map((field) => (
              <div key={field.id}>
                <label className="block font-semibold text-gray-700 mb-2">
                  {field.label}{" "}
                  {field.required && <span className="text-red-500">*</span>}
                </label>

                {field.type === "short_text" && (
                  <input
                    type="text"
                    disabled
                    placeholder={field.helpText}
                    className="w-full bg-indigo-50 text-gray-700 border border-indigo-300 rounded-lg px-4 py-2 shadow-sm"
                  />
                )}

                {field.type === "number" && (
                  <input
                    type="number"
                    disabled
                    placeholder={field.helpText}
                    className="w-full bg-green-50 text-gray-700 border border-green-300 rounded-lg px-4 py-2 shadow-sm"
                  />
                )}

                {field.type === "paragraph" && (
                  <textarea
                    disabled
                    rows={4}
                    placeholder={field.helpText}
                    className="w-full bg-yellow-50 text-gray-700 border border-yellow-300 rounded-lg px-4 py-2 shadow-sm"
                  />
                )}

                {field.type === "dropdown" && (
                  <select
                    disabled
                    className="w-full bg-pink-50 text-gray-700 border border-pink-300 rounded-lg px-4 py-2 shadow-sm"
                  >
                    <option>{field.helpText || "Select option"}</option>
                  </select>
                )}
                {field.type === "radio" && (
                  <div className="flex flex-col gap-2">
                    {field.options.map((option) => (
                      <label
                        key={option}
                        className="inline-flex items-center gap-2"
                      >
                        <input
                          type="radio"
                          name={field.id}
                          disabled
                          className="text-indigo-600 w-4 h-4"
                        />
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                )}
                {field.type === "alphanumeric" && (
                  <input
                    type="text"
                    disabled
                    placeholder={field.helpText}
                    className="w-full bg-purple-50 text-gray-700 border border-purple-300 rounded-lg px-4 py-2 shadow-sm"
                  />
                )}

                {field.type === "boolean" && (
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      disabled
                      className="text-indigo-600 w-4 h-4"
                    />
                    <span className="text-gray-700">Yes / No</span>
                  </label>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PreviewPage;
