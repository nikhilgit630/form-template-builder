// src/components/Builder/FieldSidebar.jsx
import React from "react";
import { FIELD_TYPES } from "../../constants/fieldTypes";
import { useDispatch, useSelector } from "react-redux";
import { addField } from "../../Redux/Template/Slice";

const FieldSidebar = () => {
  const dispatch = useDispatch();
  const selectedSectionId = useSelector(
    (state) => state.templates.selectedSectionId
  );

  const handleAddField = (fieldType) => {
    if (selectedSectionId) {
      dispatch(addField({ sectionId: selectedSectionId, fieldType }));
    } else {
      alert("⚠️ Please select a section to add the field");
    }
  };

  return (
    <div className="w-[260px] h-screen bg-gradient-to-b from-indigo-100 to-blue-100 px-5 py-6 shadow-inner border-l overflow-y-auto">
      <h2 className="text-xl font-bold text-indigo-800 mb-5 text-center">
        ✨ Field Elements
      </h2>
      <div className="grid grid-cols-1 gap-4">
        {FIELD_TYPES.map((field, index) => (
          <button
            key={field.type}
            onClick={() => handleAddField(field.type)}
            className={`p-3 text-sm font-medium rounded-lg shadow-md transition-all duration-200 text-white
              ${
                index % 3 === 0
                  ? "bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600"
                  : index % 3 === 1
                  ? "bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500"
                  : "bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-blue-500"
              } hover:scale-[1.03] active:scale-[0.97]`}
          >
            {field.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FieldSidebar;
