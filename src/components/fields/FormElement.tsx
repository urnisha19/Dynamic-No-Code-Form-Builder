"use client";
import React, { useRef, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useFormBuilder, Field, FieldType } from "@/context/FormBuilderContext";
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
    addField,
  } = useFormBuilder();

  const nodeRef = useRef<HTMLDivElement | null>(null);

  // Drag setup
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "FORM_FIELD",
    item: { index },
    canDrag: !isPreviewMode,
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  }));

  // Drop setup
  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: ["FORM_FIELD", "PALETTE_FIELD"],

    drop: (item: { index?: number; type?: FieldType }, monitor) => {
      if (monitor.getItemType() === "PALETTE_FIELD" && item.type) {
        addField(item.type, index);
      }
    },

    hover: (item: { index?: number }, monitor) => {
      if (monitor.getItemType() === "FORM_FIELD" && item.index !== undefined) {
        if (item.index === index) return;
        moveField(item.index, index);
        item.index = index;
      }
    },

    collect: (monitor) => ({
      isOver:
        monitor.isOver({ shallow: true }) &&
        monitor.getItemType() === "PALETTE_FIELD",
    }),
  }));

  // Attach drag + drop to the DOM node safely
  useEffect(() => {
    if (nodeRef.current) {
      dragRef(dropRef(nodeRef.current));
    }
  }, [dragRef, dropRef]);

  return (
    <div
      ref={nodeRef}
      onClick={(e) => {
        e.stopPropagation();
        if (!isPreviewMode) setSelectedFieldId(field.id);
      }}
      className={`relative transition p-3 bg-[#3c3c5c] rounded-lg border mb-3
        ${isDragging ? "opacity-50" : "border-transparent"}
        ${
          !isPreviewMode && selectedFieldId === field.id
            ? "ring-2 ring-[#5c6bc0] shadow-md"
            : ""
        }
        ${!isPreviewMode ? "group cursor-move" : ""}
      `}
    >
      {/* Drop indicator */}
      {isOver && (
        <div className="absolute -top-1 left-0 w-full h-1 bg-[#00bcd4] rounded-full" />
      )}

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
