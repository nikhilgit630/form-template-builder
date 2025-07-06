// src/pages/GenerateFormPage.jsx
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const GenerateFormPage = () => {
  const { id } = useParams(); // 👈 Get template ID from URL
  const [template, setTemplate] = useState(null);
  const [formData, setFormData] = useState({});
  const [invalidFields, setInvalidFields] = useState({});

  const handleLoadTemplate = (key) => {
    const raw = localStorage.getItem(key);
    if (raw) {
      setTemplate(JSON.parse(raw));
      toast.success("Template loaded!");
    } else {
      toast.error("No template found in localStorage.");
    }
  };

  const handleInputChange = (fieldId, value) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
    setInvalidFields((prev) => ({ ...prev, [fieldId]: false }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const invalids = {};
    for (const section of template.sections) {
      for (const field of section.fields) {
        const value = formData[field.id];

        if (field.required && (value === undefined || value === "")) {
          toast.error(`Please fill required field: ${field.label}`);
          invalids[field.id] = true;
          setInvalidFields(invalids);
          return;
        }

        if (field.type === "short_text" && /\d/.test(value)) {
          toast.error(`"${field.label}" should not contain numbers.`);
          invalids[field.id] = true;
          setInvalidFields(invalids);
          return;
        }

        if (field.type === "number" && isNaN(Number(value))) {
          toast.error(`"${field.label}" should contain only numbers.`);
          invalids[field.id] = true;
          setInvalidFields(invalids);
          return;
        }
      }
    }

    localStorage.setItem(`form-data-${template.id}`, JSON.stringify(formData));
    toast.success("Form submitted and saved!");
    };
    useEffect(() => {
      if (id) {
        const raw = localStorage.getItem(id);
        if (raw) {
          setTemplate(JSON.parse(raw));
          toast.success("Template loaded successfully!");
        } else {
          toast.error("Template not found.");
        }
      }
    }, [id]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 bg-gradient-to-br from-sky-50 to-blue-100 rounded-xl shadow-lg">
      <h1 className="text-3xl font-extrabold text-blue-700 mb-6 text-center">
        🚀 Fill Out Your Template Form
      </h1>

      {!template ? (
        <div className="mb-6 bg-white p-6 rounded-xl shadow">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Enter Template Key
          </label>
          <input
            type="text"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLoadTemplate(e.target.value.trim());
              }
            }}
            className="w-full border border-blue-300 focus:ring-2 focus:ring-blue-500 px-4 py-2 rounded-lg outline-none"
            placeholder="e.g. template-abc123"
          />
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow p-6 space-y-8"
        >
          {template.sections.map((section) => (
            <div
              key={section.id}
              className="bg-blue-50 p-4 rounded-lg shadow-inner"
            >
              <h2 className="text-xl font-semibold text-blue-800 mb-4 border-b pb-1">
                📘 {section.title}
              </h2>

              {section.fields.map((field) => (
                <div key={field.id} className="mb-5">
                  <label className="block text-md font-medium text-gray-700 mb-1">
                    {field.label}{" "}
                    {field.required && <span className="text-red-500">*</span>}
                  </label>

                  {field.type === "short_text" && (
                    <input
                      type="text"
                      value={formData[field.id] || ""}
                      onChange={(e) =>
                        handleInputChange(field.id, e.target.value)
                      }
                      className={`w-full px-4 py-2 rounded-lg border ${
                        invalidFields[field.id]
                          ? "border-red-500 ring-2 ring-red-300"
                          : "border-gray-300 focus:ring-2 focus:ring-blue-400"
                      } outline-none`}
                      placeholder={field.helpText || ""}
                    />
                  )}

                  {field.type === "number" && (
                    <input
                      type="number"
                      value={formData[field.id] || ""}
                      onChange={(e) =>
                        handleInputChange(field.id, e.target.value)
                      }
                      className={`w-full px-4 py-2 rounded-lg border ${
                        invalidFields[field.id]
                          ? "border-red-500 ring-2 ring-red-300"
                          : "border-gray-300 focus:ring-2 focus:ring-blue-400"
                      } outline-none`}
                      placeholder={field.helpText || ""}
                    />
                  )}

                  {field.type === "paragraph" && (
                    <textarea
                      rows={4}
                      value={formData[field.id] || ""}
                      onChange={(e) =>
                        handleInputChange(field.id, e.target.value)
                      }
                      className={`w-full px-4 py-2 rounded-lg border ${
                        invalidFields[field.id]
                          ? "border-red-500 ring-2 ring-red-300"
                          : "border-gray-300 focus:ring-2 focus:ring-blue-400"
                      } outline-none`}
                      placeholder={field.helpText || ""}
                    />
                  )}

                  {field.type === "dropdown" && (
                    <select
                      value={formData[field.id] || ""}
                      onChange={(e) =>
                        handleInputChange(field.id, e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-blue-400"
                    >
                      <option>Select an option</option>
                      <option value="Option 1">Option 1</option>
                      <option value="Option 2">Option 2</option>
                    </select>
                  )}

                  {field.type === "radio" && (
                    <div className="flex gap-6 mt-2">
                      {["Yes", "No"].map((option) => (
                        <label
                          key={option}
                          className="inline-flex items-center"
                        >
                          <input
                            type="radio"
                            value={option}
                            name={field.id}
                            checked={formData[field.id] === option}
                            onChange={(e) =>
                              handleInputChange(field.id, e.target.value)
                            }
                            className="text-blue-600 focus:ring-blue-400"
                          />
                          <span className="ml-2 text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {field.type === "boolean" && (
                    <div className="mt-2">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={formData[field.id] || false}
                          onChange={(e) =>
                            handleInputChange(field.id, e.target.checked)
                          }
                          className="text-blue-600 rounded focus:ring-2 focus:ring-blue-400"
                        />
                        <span className="ml-2 text-gray-700">Yes</span>
                      </label>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}

          <div className="text-center">
            <button
              type="submit"
              className="mt-6 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-2 px-8 rounded-full shadow-md transition duration-300"
            >
              Submit 🚀
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default GenerateFormPage;
