"use client";
import React from "react";
import { FieldRendererProps, FieldActionHandlers } from "./types";
import TextField from "./TextField";
import EmailField from "./EmailField";
import DateField from "./DateField";
import TimeField from "./TimeField";
import FileField from "./FileField";
import SelectField from "./SelectField";
import CheckboxField from "./CheckboxField";
import RadioField from "./RadioField";
import AcceptanceField from "./AcceptanceField";
import BaseField from "./BaseField";

interface Props extends FieldRendererProps, FieldActionHandlers {}

export default function FieldRenderer(props: Props) {
  const { field, preview, onDelete, onDuplicate, onSettings } = props;

  // This helper wraps the actual input with the BaseField, which provides the label and action buttons.
  const wrapWithBaseField = (children: React.ReactNode) => {
    // In preview mode, we don't need to pass the action handlers.
    if (preview) {
      return <BaseField field={field}>{children}</BaseField>;
    }
    return (
      <BaseField
        field={field}
        onDelete={onDelete}
        onDuplicate={onDuplicate}
        onSettings={onSettings}
      >
        {children}
      </BaseField>
    );
  };

  switch (field.type) {
    case "text":
      return wrapWithBaseField(<TextField field={field} preview={preview} />);
    case "email":
      return wrapWithBaseField(<EmailField field={field} preview={preview} />);
    case "date":
      return wrapWithBaseField(<DateField field={field} preview={preview} />);
    case "time":
      return wrapWithBaseField(<TimeField field={field} preview={preview} />);
    case "file":
      return wrapWithBaseField(<FileField field={field} preview={preview} />);
    case "select":
      return wrapWithBaseField(<SelectField field={field} preview={preview} />);
    case "checkbox":
      return wrapWithBaseField(
        <CheckboxField field={field} preview={preview} />
      );
    case "radio":
      return wrapWithBaseField(<RadioField field={field} preview={preview} />);
    case "acceptance":
      return wrapWithBaseField(
        <AcceptanceField field={field} preview={preview} />
      );
    default:
      // A fallback for any unknown field types.
      return (
        <div className="p-4 bg-red-100 text-red-700 rounded-md">
          Unknown field type: {field.type}
        </div>
      );
  }
}
