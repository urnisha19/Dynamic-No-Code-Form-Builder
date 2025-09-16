"use client";
import React, { useState } from "react";
import { useFormBuilder } from "@/context/FormBuilderContext";
import FormElement from "./fields/FormElement";
import { FileQuestion } from "lucide-react";

//Helper to map percentage widths
const getWidthClass = (width: string | undefined): string => {
  if (!width) return "md:w-full";
  switch (width) {
    case "100%":
      return "md:w-full";
    case "66%":
      return "md:w-2/3";
    case "50%":
      return "md:w-1/2";
    case "33%":
      return "md:w-1/3";
    default:
      return "md:w-full";
  }
};

export default function FormBuilder() {
  const { schema, moveField, isPreviewMode } = useFormBuilder();
  const [submittedData, setSubmittedData] = useState<Record<
    string,
    any
  > | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    setSubmittedData(data); // show modal
  };

  // Empty canvas state
  if (schema.fields.length === 0 && !isPreviewMode) {
    return (
      <div className="flex flex-col items-center justify-center h-full rounded-lg border-2 border-dashed border-[#4a4a6e] text-gray-400">
        <FileQuestion className="w-16 h-16 mb-4" />
        <h2 className="text-xl text-[#2e2e4a] font-semibold">Canvas is Empty</h2>
        <p className="text-[#2e2e4a]">Drag a field from the left palette to get started.</p>
      </div>
    );
  }

  const WrapperComponent = isPreviewMode ? "form" : "div";

  return (
    <div>
      <WrapperComponent
        className="space-y-4 md:flex md:flex-wrap md:space-y-0 md:-mx-2 bg-[#e0e0e0] p-4 rounded-lg"
        onSubmit={isPreviewMode ? handleSubmit : undefined}
        noValidate={isPreviewMode}
      >
        {schema.fields.map((field, index) => {
          // Compute width classes responsively
          const widthClass = isPreviewMode
            ? getWidthClass(field.columnWidth)
            : "w-full";

          return (
            <div
              key={field.id}
              // Always full-width on mobile, then fraction on larger screens
              className={`w-full px-2 mb-4 ${widthClass}`}
            >
              <FormElement field={field} index={index} moveField={moveField} />
            </div>
          );
        })}

        {/* Show submit button in preview mode */}
        {isPreviewMode && schema.fields.length > 0 && (
          <div className="w-full px-2 mt-6">
            <button
              type="submit"
              className="px-6 py-2 rounded-md font-semibold bg-green-500 text-white hover:bg-opacity-80 transition-colors"
            >
              Submit
            </button>
          </div>
        )}
      </WrapperComponent>

      {/* Modal for submitted data */}
      {submittedData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-[#2e2e4a] text-[#e0e0e0] p-6 rounded-lg w-full max-w-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Submitted Data</h3>
            <table className="w-full border-collapse border border-[#4a4a6e] text-sm">
              <thead>
                <tr className="bg-[#3c3c5c]">
                  <th className="border border-[#4a4a6e] px-3 py-2 text-left">
                    Field
                  </th>
                  <th className="border border-[#4a4a6e] px-3 py-2 text-left">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(submittedData).map(([key, value]) => (
                  <tr key={key} className="hover:bg-[#4a4a6e]">
                    <td className="border border-[#4a4a6e] px-3 py-2 font-medium">
                      {key}
                    </td>
                    <td className="border border-[#4a4a6e] px-3 py-2">
                      {String(value)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={() => setSubmittedData(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
