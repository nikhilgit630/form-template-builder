import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SectionBlock from "../components/Builder/SectionBlock";
import FieldSidebar from "../components/Builder/FieldSidebar";
import LivePreview from "../components/preview/livePreview";
import {
  addSection,
  setSelectedTemplateId,
  loadTemplateFromStorage,
} from "../Redux/Template/Slice";

const BuilderPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const templates = useSelector((state) => state.templates.templates);
  const selectedTemplateId = useSelector(
    (state) => state.templates.selectedTemplateId
  );
  const template = templates.find((t) => t.id === selectedTemplateId);

  useEffect(() => {
    dispatch(setSelectedTemplateId(id));
    const saved = localStorage.getItem(id);

    if (saved) {
      dispatch(loadTemplateFromStorage({ id, template: JSON.parse(saved) }));
    } else {
      // New template – initialize empty in Redux
      dispatch(
        loadTemplateFromStorage({
          id,
          template: {
            id,
            name: "Nikhil Template",
            sections: [],
          },
        })
      );
    }
  }, [id, dispatch]);

  const handleAddSection = () => {
    dispatch(addSection());
  };

  const handleSave = () => {
    if (template) {
      localStorage.setItem(template.id, JSON.stringify(template));
      toast.success("Template Saved!");
    }
  };

  return (
    <div className="flex h-screen">
      <LivePreview template={template} />

      <div className="flex-1 px-6 py-4 overflow-y-auto bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">
          {template?.name || "Nikhil Template"}
        </h1>

        {template?.sections.map((section) => (
          <SectionBlock key={section.id} section={section} />
        ))}

        <div className="mt-4 space-x-3">
          <button
            onClick={handleAddSection}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            + Add Section
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save Template
          </button>
        </div>
      </div>

      <FieldSidebar />
    </div>
  );
};

export default BuilderPage;
