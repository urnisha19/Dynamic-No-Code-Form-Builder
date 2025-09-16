"use client";
import React from "react";
import {
  FieldActionHandlers,
  FieldRendererProps,
} from "@/components/fields/types";
import { Settings, Copy, Trash2 } from "lucide-react";

interface BaseFieldProps extends FieldRendererProps, FieldActionHandlers {
  children: React.ReactNode;
}

//BaseField wraps any form input component with a label and hover action buttons.
export default function BaseField({
  field,
  children,
  onDelete,
  onDuplicate,
  onSettings,
}: BaseFieldProps) {
  // We don't render an external label for the 'acceptance' type, as its content acts as the label.
  const shouldRenderLabel = field.label && field.type !== "acceptance";

  return (
    <div className="relative flex w-full flex-col group">
      {/* Hover action buttons are only shown if their handlers are provided. */}
      {(onDelete || onDuplicate || onSettings) && (
        <div className="absolute top-0 right-0 z-10 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {onSettings && (
            <button
              type="button"
              onClick={onSettings}
              className="p-1.5 rounded bg-[#5c6bc0] text-white hover:bg-opacity-80 transition-colors"
              aria-label="Settings"
            >
              <Settings className="h-4 w-4" />
            </button>
          )}
          {onDuplicate && (
            <button
              type="button"
              onClick={onDuplicate}
              className="p-1.5 rounded bg-green-300 text-white hover:bg-opacity-80 transition-colors"
              aria-label="Duplicate"
            >
              <Copy className="h-4 w-4" />
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              onClick={onDelete}
              className="p-1.5 rounded bg-red-500 text-white hover:bg-red-600 transition-colors"
              aria-label="Delete"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      )}

      {/* Label */}
      {shouldRenderLabel && (
        <label
          htmlFor={field.name}
          className="mb-1 text-sm font-medium text-[#e0e0e0]"
        >
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {/* Input / children */}
      <div className="relative">{children}</div>
    </div>
  );
}
