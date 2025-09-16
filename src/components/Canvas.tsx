//center
"use client";
import React from "react";
import FormBuilder from "./FormBuilder";
import { useDrop } from "react-dnd";
import { useFormBuilder, FieldType } from "@/context/FormBuilderContext";

export default function Canvas() {
  const { addField } = useFormBuilder();

  // Make the canvas a drop target for new fields
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "PALETTE_FIELD",
      drop: (item: { type: FieldType }) => {
        addField(item.type); // Add the new field to the form schema
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }),
    [addField]
  );

  return (
    <div
      ref={(node) => drop(node)}
      className={`relative flex-1 bg-[#a3a3c2] p-6 overflow-auto transition-all
                  ${
                    isOver
                      ? "border-2 border-dashed border-[#00bcd4]"
                      : "border-2 border-transparent"
                  }`}
    >
      <h1 className="text-center font-bold text-xl text-[#2e2e4a] mb-5">
        Form
      </h1>

      <FormBuilder />

      {/* Overlay message while dragging */}
      {isOver && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#5c6bc0]/10 pointer-events-none">
          <p className="text-[#00bcd4] font-semibold">Drop to add field</p>
        </div>
      )}
    </div>
  );
}
