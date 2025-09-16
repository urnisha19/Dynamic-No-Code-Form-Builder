"use client";
import { useDrag, useDrop } from "react-dnd";
import { useFormBuilder, Field } from "@/context/FormBuilderContext";
import FieldRenderer from "./FieldRenderer";

interface FormElementProps {
  field: Field;
  index: number;
  moveField: (from: number, to: number) => void;
}

export default function FormElement({
  field,
  index,
  moveField,
}: FormElementProps) {
  const {
    selectedFieldId,
    setSelectedFieldId,
    deleteField,
    duplicateField,
    isPreviewMode,
  } = useFormBuilder();

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "FORM_FIELD",
    item: { index },
    canDrag: !isPreviewMode,
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  }));

  const [, dropRef] = useDrop(() => ({
    accept: "FORM_FIELD",
    hover: (item: { index: number }) => {
      if (item.index === index) return;
      moveField(item.index, index);
      item.index = index;
    },
  }));

  return (
    <div
      ref={(node) => dragRef(dropRef(node))}
      onClick={(e) => {
        e.stopPropagation();
        if (!isPreviewMode) setSelectedFieldId(field.id);
      }}
      className={`relative transition p-3 bg-[#3c3c5c] rounded-lg border mb-3
        ${isDragging ? "opacity-50 border-[#5c6bc0]" : "border-transparent"}
        ${
          !isPreviewMode && selectedFieldId === field.id
            ? "ring-2 ring-[#5c6bc0] shadow-md"
            : ""
        }
        ${!isPreviewMode ? "group cursor-move" : ""}
      `}
    >
      <FieldRenderer
        field={field}
        preview={isPreviewMode}
        onDelete={() => deleteField(field.id)}
        onDuplicate={() => duplicateField(field.id)}
        onSettings={() => setSelectedFieldId(field.id)}
      />
    </div>
  );
}
