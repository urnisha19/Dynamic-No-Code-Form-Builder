//right sidebar
"use client";
import React from "react";
import { useFormBuilder } from "@/context/FormBuilderContext";
import { X } from "lucide-react";

interface SettingsWrapperProps {
  label: string;
  children: React.ReactNode;
}

function SettingsWrapper({ label, children }: SettingsWrapperProps) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-400 mb-1">
        {label}
      </label>
      {children}
    </div>
  );
}

export default function SettingsSidebar() {
  const {
    schema,
    selectedFieldId,
    updateField,
    setSelectedFieldId,
    isPreviewMode,
  } = useFormBuilder();

  const field = schema.fields.find((f) => f.id === selectedFieldId);

  // Empty state when no field is selected or in preview mode
  if (!field || isPreviewMode) {
    return (
      <aside className="hidden lg:block w-72 bg-[#2e2e4a] p-5">
        <h3 className="font-semibold text-[#e0e0e0] mb-2">Field Settings</h3>
        <p className="text-sm text-gray-400">
          Select a field on the canvas to edit its properties here.
        </p>
      </aside>
    );
  }

  // Main editor view
  return (
     <aside className="hidden lg:block w-72 bg-[#2e2e4a] p-5 overflow-y-auto border-l border-[#4a4a6e]">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-[#e0e0e0]">
          Settings:{" "}
          <span className="text-[#00bcd4] capitalize">{field.type}</span>
        </h3>
        <button
          onClick={() => setSelectedFieldId(null)}
          className="text-gray-400 hover:text-white transition-colors"
          aria-label="Close settings"
        >
          <X className="w-5 h-5 text-red-500" />
        </button>
      </div>

      {/* Editable Properties */}
      <div className="space-y-4 text-sm">
        <SettingsWrapper label="Label">
          <input
            className="input-base"
            value={field.label || ""}
            onChange={(e) => updateField(field.id, { label: e.target.value })}
          />
        </SettingsWrapper>

        <SettingsWrapper label="Name / ID">
          <input
            className="input-base"
            value={field.name || ""}
            onChange={(e) => updateField(field.id, { name: e.target.value })}
          />
        </SettingsWrapper>

        {["text", "email", "select"].includes(field.type) && (
          <SettingsWrapper label="Placeholder">
            <input
              className="input-base"
              value={field.placeholder || ""}
              onChange={(e) =>
                updateField(field.id, { placeholder: e.target.value })
              }
            />
          </SettingsWrapper>
        )}

        {["select", "checkbox", "radio"].includes(field.type) && (
          <SettingsWrapper label="Options (one per line: label=value)">
            <textarea
              rows={4}
              className="input-base font-mono"
              value={(field.options || []).join("\n")}
              onChange={(e) =>
                updateField(field.id, {
                  options: e.target.value
                    .split("\n")
                    .map((s) => s.trim())
                    .filter(Boolean),
                })
              }
            />
          </SettingsWrapper>
        )}

        {field.type === "acceptance" && (
          <SettingsWrapper label="Content (HTML allowed)">
            <textarea
              rows={4}
              className="input-base font-mono"
              value={field.content || ""}
              onChange={(e) =>
                updateField(field.id, { content: e.target.value })
              }
            />
          </SettingsWrapper>
        )}

        <SettingsWrapper label="Column Width">
          <select
            value={field.columnWidth || "100%"}
            onChange={(e) =>
              updateField(field.id, { columnWidth: e.target.value })
            }
            className="input-base"
          >
            <option value="100%">Full (100%)</option>
            <option value="66%">Two Thirds (66%)</option>
            <option value="50%">Half (50%)</option>
            <option value="33%">One Third (33%)</option>
          </select>
        </SettingsWrapper>

        <div className="flex items-center gap-2 pt-2">
          <input
            type="checkbox"
            id={`required-${field.id}`}
            checked={!!field.required}
            onChange={(e) =>
              updateField(field.id, { required: e.target.checked })
            }
            className="h-4 w-4 rounded border-[#4a4a6e] bg-[#3c3c5c] text-[#5c6bc0] focus:ring-[#5c6bc0]"
          />
          <label
            htmlFor={`required-${field.id}`}
            className="text-sm text-[#e0e0e0]"
          >
            Required
          </label>
        </div>
      </div>
    </aside>
  );
}
