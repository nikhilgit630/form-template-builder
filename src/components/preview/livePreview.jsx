// src/components/Preview/LivePreview.jsx
import React from "react";

const LivePreview = ({ template }) => {
  if (!template) return null;

  return (
    <div className="w-[320px] border-r bg-gradient-to-b from-white via-indigo-50 to-blue-50 px-5 py-6 h-screen overflow-y-auto shadow-inner">
      <h2 className="text-xl font-bold text-indigo-700 mb-6 text-center">
        🔍 Live Preview
      </h2>

      {template.sections.map((section) => (
        <div
          key={section.id}
          className="mb-8 p-4 bg-white rounded-lg shadow-sm border-l-4 border-indigo-400"
        >
          <h3 className="text-lg font-semibold text-indigo-600 mb-4">
            📁 {section.title || "Untitled Section"}
          </h3>

          {section.fields.map((field) => (
            <div key={field.id} className="mb-5">
              <label className="block font-medium text-sm text-gray-700 mb-1">
                {field.label || "Untitled Field"}{" "}
                {field.required && <span className="text-red-500">*</span>}
              </label>

              {field.type === "short_text" && (
                <input
                  type="text"
                  disabled
                  className="w-full border border-indigo-200 bg-indigo-50 px-3 py-2 rounded-md shadow-sm text-gray-800"
                />
              )}

              {field.type === "number" && (
                <input
                  type="number"
                  disabled
                  className="w-full border border-green-300 bg-green-50 px-3 py-2 rounded-md shadow-sm text-gray-800"
                />
              )}

              {field.type === "paragraph" && (
                <textarea
                  disabled
                  rows={3}
                  className="w-full border border-yellow-300 bg-yellow-50 px-3 py-2 rounded-md shadow-sm text-gray-800"
                />
              )}
              {field.type === "alphanumeric" && (
                <input
                  type="text"
                  disabled  
                  className="w-full border border-purple-300 bg-purple-50 px-3 py-2 rounded-md shadow-sm text-gray-800"
                />
              )}

              {field.type === "dropdown" && (
                <select
                  disabled
                  className="w-full border border-pink-300 bg-pink-50 px-3 py-2 rounded-md shadow-sm text-gray-800"
                >
                  <option>{field.helpText || "Select option"}</option>
                </select>
              )}

              {field.type === "radio" && (
                <div className="flex gap-4 text-sm text-gray-700">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      disabled
                      className="accent-indigo-500"
                    />
                    Option 1
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      disabled
                      className="accent-indigo-500"
                    />
                    Option 2
                  </label>
                </div>
              )}

              {field.type === "boolean" && (
                <label className="inline-flex items-center gap-2 text-gray-700">
                  <input
                    type="checkbox"
                    disabled
                    className="w-4 h-4 text-indigo-600"
                  />
                  Yes / No
                </label>
              )}

              {field.type === "upload" && (
                <input
                  type="file"
                  disabled
                  className="w-full text-sm text-gray-500 file:bg-indigo-100 file:border file:border-indigo-300 file:px-3 file:py-1 file:rounded-md file:text-indigo-700 file:cursor-not-allowed"
                />
              )}

              {field.type === "image" && (
                <div className="border border-dashed rounded p-4 text-center text-gray-400 bg-gray-100 text-sm">
                  📷 [Image Placeholder]
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default LivePreview;
