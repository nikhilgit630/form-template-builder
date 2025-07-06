// src/redux/templates/slice.js
import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  templates: [], // 👈 No fixed template-1 anymore
  selectedTemplateId: null,
  selectedSectionId: null,
};

const templatesSlice = createSlice({
  name: "templates",
  initialState,
  reducers: {
    // Set currently active template ID
    setSelectedTemplateId: (state, action) => {
      state.selectedTemplateId = action.payload;
    },

    // Load template from localStorage (if not already loaded)
    loadTemplateFromStorage: (state, action) => {
      const { id, template } = action.payload;
      const exists = state.templates.find((t) => t.id === id);
      if (!exists) {
        state.templates.push(template);
      }
    },

    // Add section to current template
    addSection: (state) => {
      const sectionId = nanoid();
      const template = state.templates.find(
        (t) => t.id === state.selectedTemplateId
      );
      if (template) {
        template.sections.push({
          id: sectionId,
          title: "",
          fields: [],
        });
        state.selectedSectionId = sectionId;
      }
    },

    updateSectionTitle: (state, action) => {
      const { sectionId, title } = action.payload;
      const template = state.templates.find(
        (t) => t.id === state.selectedTemplateId
      );
      const section = template?.sections.find((sec) => sec.id === sectionId);
      if (section) {
        section.title = title;
      }
    },

    setSelectedSection: (state, action) => {
      state.selectedSectionId = action.payload;
    },

    addField: (state, action) => {
      const { sectionId, fieldType } = action.payload;
      const template = state.templates.find(
        (t) => t.id === state.selectedTemplateId
      );
      const section = template?.sections.find((sec) => sec.id === sectionId);
      if (section) {
        section.fields.push({
          id: nanoid(),
          type: fieldType,
          label: "",
          helpText: "",
          required: false,
        });
      }
    },
    
    updateField: (state, action) => {
        const { sectionId, fieldId, key, value } = action.payload;
        const template = state.templates.find(
            (t) => t.id === state.selectedTemplateId
        );
        const section = template?.sections.find((sec) => sec.id === sectionId);
        const field = section?.fields.find((f) => f.id === fieldId);
        if (field) {
            field[key] = value;
        }
    }, 
    reorderFields: (state, action) => {
        const { sectionId, sourceIndex, destinationIndex } = action.payload;
        const template = state.templates.find((t) => t.id === state.selectedTemplateId);
        const section = template?.sections.find((s) => s.id === sectionId);
      
        if (section && sourceIndex !== destinationIndex) {
          const [moved] = section.fields.splice(sourceIndex, 1);
          section.fields.splice(destinationIndex, 0, moved);
        }
    },      
    deleteField: (state, action) => {
      const { sectionId, fieldId } = action.payload;
      const template = state.templates.find(
        (t) => t.id === state.selectedTemplateId
      );
      const section = template?.sections.find((sec) => sec.id === sectionId);
      if (section) {
        section.fields = section.fields.filter((f) => f.id !== fieldId);
      }
    },
  },
});

export const {
  addSection,
  addField,
  updateField,
  deleteField,
  updateSectionTitle,
  reorderFields,
  setSelectedSection,
  setSelectedTemplateId,
  loadTemplateFromStorage,
} = templatesSlice.actions;

export default templatesSlice.reducer;
