// src/components/Builder/SectionBlock.jsx
import React from "react";
import { useDispatch } from "react-redux";
import {
  setSelectedSection,
  addField,
  updateSectionTitle,
  reorderFields,
} from "../../Redux/Template/Slice";
import FieldItem from "./fieldItems";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Single draggable field wrapper
const SortableFieldItem = ({ field, sectionId }) => {
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({
      id: field.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <div {...attributes} {...listeners} className="cursor-move mb-1">
        <span className="text-sm text-gray-400">↕ Drag</span>
      </div>
      <FieldItem field={field} sectionId={sectionId} />
    </div>
  );
};
  
const SectionBlock = ({ section }) => {
  const dispatch = useDispatch();

  const sensors = useSensors(useSensor(PointerSensor));

  const handleTitleChange = (e) => {
    dispatch(
      updateSectionTitle({ sectionId: section.id, title: e.target.value })
    );
  };

  const handleSelect = () => {
    dispatch(setSelectedSection(section.id));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = section.fields.findIndex((f) => f.id === active.id);
      const newIndex = section.fields.findIndex((f) => f.id === over.id);

      dispatch(
        reorderFields({
          sectionId: section.id,
          sourceIndex: oldIndex,
          destinationIndex: newIndex,
        })
      );
    }
  };

  return (
    <div
      className="border border-gray-300 rounded p-4 mb-4 bg-white"
      onClick={handleSelect}
    >
      <input
        className="text-xl font-semibold mb-3 w-full outline-none border-b pb-1"
        placeholder="Section Title"
        value={section.title}
        onChange={handleTitleChange}
      />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={section.fields.map((f) => f.id)}
          strategy={verticalListSortingStrategy}
        >
          {section.fields.map((field) => (
            <SortableFieldItem
              key={field.id}
              field={field}
              sectionId={section.id}
            />
          ))}
        </SortableContext>
      </DndContext>

      <button
        className="mt-4 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() =>
          dispatch(addField({ sectionId: section.id, fieldType: "short_text" }))
        }
      >
        + Add Field
      </button>
    </div>
  );
};

export default SectionBlock;
