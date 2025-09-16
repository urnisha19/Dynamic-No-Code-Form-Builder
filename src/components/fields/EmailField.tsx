"use client";
import React from "react";
import { FieldRendererProps } from "./types";

export default function EmailField({ field, preview }: FieldRendererProps) {
  return (
    <input
      type="email"
      name={field.name}
      id={field.name}
      placeholder={field.placeholder}
      required={field.required}
      disabled={!preview} // Input is disabled in "edit" mode, and enabled in "preview" mode
      className="input-base disabled:cursor-not-allowed disabled:bg-[#3c3c5c]/50"
    />
  );
}
