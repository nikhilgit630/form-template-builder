// src/components/Builder/FieldItem.jsx
import React from "react";
import { useDispatch } from "react-redux";
import { updateField, deleteField } from "../../Redux/Template/Slice";

const FieldItem = ({ field, sectionId }) => {
  const dispatch = useDispatch();

  const handleChange = (key, value) => {
    dispatch(updateField({ sectionId, fieldId: field.id, key, value }));
  };

  return (
    <div className="border border-gray-200 p-3 rounded mb-3 bg-gray-50">
      <div className="mb-2">
        <input
          className="w-full p-2 border rounded mb-2"
          placeholder="Field Label"
          value={field.label}
          onChange={(e) => handleChange("label", e.target.value)}
        />
        <input
          className="w-full p-2 border rounded mb-2"
          placeholder="Help Text"
          value={field.helpText}
          onChange={(e) => handleChange("helpText", e.target.value)}
        />
        <select
          className="w-full p-2 border rounded"
          value={field.type}
          onChange={(e) => handleChange("type", e.target.value)}
        >
          <option value="">Select Field Type</option>
          <option value="short_text">Text</option>
          <option value="number">Number</option>
          <option value="alphanumeric">Alphanumeric</option>
          <option value="paragraph">Paragraph</option>
          <option value="dropdown">Dropdown</option>
          <option value="radio">Radio</option>
          <option value="boolean">Yes / No</option>
          <option value="upload">Upload</option>
          <option value="image">Image</option>
        </select>
        <label className="flex items-center mt-2">
          <input
            type="checkbox"
            checked={field.required}
            onChange={(e) => handleChange("required", e.target.checked)}
            className="mr-2"
          />
          Required
        </label>
      </div>

      <button
        onClick={() => dispatch(deleteField({ sectionId, fieldId: field.id }))}
        className="text-red-600 text-sm mt-2 underline"
      >
        Delete Field
      </button>
    </div>
  );
};

export default FieldItem;
