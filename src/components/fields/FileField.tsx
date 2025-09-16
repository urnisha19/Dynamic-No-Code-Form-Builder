"use client";
import React from "react";
import { FieldRendererProps } from "./types";

export default function FileField({ field, preview }: FieldRendererProps) {
  return (
    <input
      type="file"
      name={field.name}
      id={field.name}
      required={field.required}
      disabled={!preview} // Input is disabled in "edit" mode, and enabled in "preview" mode
      className="block w-full text-sm text-gray-400 transition-all duration-150
                 file:mr-4 file:px-4 file:py-2 file:rounded-md
                 file:border-0 file:text-sm file:font-semibold
                 file:bg-[#5c6bc0]/10 file:text-[#5c6bc0]
                 hover:file:bg-[#5c6bc0]/20
                 disabled:opacity-50 disabled:cursor-not-allowed"
    />
  );
}
