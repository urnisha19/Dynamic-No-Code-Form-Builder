"use client";
import React, { useRef, useEffect } from "react";
import FormBuilder from "./FormBuilder";
import { useDrop } from "react-dnd";
import { useFormBuilder, FieldType } from "@/context/FormBuilderContext";

export default function Canvas() {
  const { addField } = useFormBuilder();

  // Drop target setup
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "PALETTE_FIELD",
      drop: (item: { type: FieldType }) => {
        addField(item.type);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }),
    [addField]
  );

  //
  const dropRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (dropRef.current) {
      drop(dropRef.current);
    }
  }, [drop]);

  return (
    <div
      ref={dropRef}
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

      {isOver && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#5c6bc0]/10 pointer-events-none">
          <p className="text-[#00bcd4] font-semibold">Drop to add field</p>
        </div>
      )}
    </div>
  );
}
