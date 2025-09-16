"use client";
import React from "react";
import { FieldRendererProps } from "./types";

export default function AcceptanceField({
  field,
  preview,
}: FieldRendererProps) {
  const id = `${field.id}-acceptance`;

  return (
    <label
      htmlFor={id}
      className="flex items-start gap-3 text-sm font-medium text-[#e0e0e0] has-[:disabled]:opacity-70 has-[:disabled]:cursor-not-allowed"
    >
      <input
        id={id}
        type="checkbox"
        name={field.name}
        required={field.required}
        disabled={!preview}
        className="h-4 w-4 mt-1 flex-shrink-0 rounded border-[#4a4a6e] bg-[#3c3c5c] text-[#5c6bc0] focus:ring-[#5c6bc0] disabled:cursor-not-allowed"
      />
      <div
        className="prose prose-sm prose-invert"
        dangerouslySetInnerHTML={{ __html: field.content || "" }}
      />
    </label>
  );
}
