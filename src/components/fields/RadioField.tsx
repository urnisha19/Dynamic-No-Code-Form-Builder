"use client";
import React from "react";
import { FieldRendererProps } from "./types";
import { parseOptionString } from "@/utils/schemaHelpers";

export default function RadioField({ field, preview }: FieldRendererProps) {
  return (
    <div className="space-y-2">
      {(field.options || []).map((opt, i) => {
        const { label, value } = parseOptionString(opt);
        // Generating a unique ID for each radio button is great for accessibility.
        const id = `${field.id}-radio-${i}`;

        return (
          <label
            key={id}
            htmlFor={id}
            className="flex items-center gap-2 text-sm font-medium text-[#e0e0e0] has-[:disabled]:opacity-70 has-[:disabled]:cursor-not-allowed"
          >
            <input
              id={id}
              type="radio"
              name={field.name}
              value={value}
              // This ensures that the user must select one option if the field is required.
              required={field.required}
              disabled={!preview}
              className="h-4 w-4 rounded-full border-[#4a4a6e] bg-[#3c3c5c] text-[#5c6bc0] focus:ring-[#5c6bc0] disabled:cursor-not-allowed"
            />
            <span>{label}</span>
          </label>
        );
      })}
    </div>
  );
}
