"use client";
import React from "react";
import { FieldRendererProps } from "./types";
import { parseOptionString } from "@/utils/schemaHelpers";

export default function SelectField({ field, preview }: FieldRendererProps) {
  return (
    <select
      name={field.name}
      id={field.name}
      required={field.required}
      disabled={!preview} // Input is disabled in "edit" mode, and enabled in "preview" mode
      className="input-base disabled:cursor-not-allowed disabled:bg-[#3c3c5c]/50"
    >
      {field.placeholder && <option value="">{field.placeholder}</option>}
      {(field.options || []).map((opt, i) => {
        const { label, value } = parseOptionString(opt);
        return (
          <option key={`${field.id}-opt-${i}`} value={value}>
            {label}
          </option>
        );
      })}
    </select>
  );
}
