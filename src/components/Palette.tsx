"use client";
import React, { useRef, useEffect } from "react";
import { useDrag } from "react-dnd";
import { useFormBuilder, FieldType } from "@/context/FormBuilderContext";
import {
  FileType,
  Mail,
  UploadCloud,
  ChevronDown,
  CheckSquare,
  Check,
  Calendar,
  Clock,
  CircleDot,
} from "lucide-react";

// Defines the data structure for a single draggable field
type PaletteField = {
  type: FieldType;
  label: string;
  icon: React.ElementType;
};

// Defines the structure for groups of fields
type FieldGroup = {
  title: string;
  fields: PaletteField[];
};

// Updated the data to use the imported icons instead of emojis
const fieldGroups: FieldGroup[] = [
  {
    title: "Inputs",
    fields: [
      { type: "text", label: "Text", icon: FileType },
      { type: "email", label: "Email", icon: Mail },
      { type: "file", label: "File Upload", icon: UploadCloud },
    ],
  },
  {
    title: "Choices",
    fields: [
      { type: "select", label: "Dropdown", icon: ChevronDown },
      { type: "checkbox", label: "Checkbox", icon: CheckSquare },
      { type: "radio", label: "Radio", icon: CircleDot },
      { type: "acceptance", label: "Acceptance", icon: Check },
    ],
  },
  {
    title: "Date & Time",
    fields: [
      { type: "date", label: "Date", icon: Calendar },
      { type: "time", label: "Time", icon: Clock },
    ],
  },
];

const DraggableField = ({ type, label, icon: Icon }: PaletteField) => {
  const { isPreviewMode } = useFormBuilder();

  // Create a ref for the draggable div
  const dragRef = useRef<HTMLDivElement | null>(null);

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "PALETTE_FIELD",
      item: { type },
      canDrag: !isPreviewMode,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [type, isPreviewMode]
  );

  // Attach the drag behavior to the ref
  useEffect(() => {
    if (dragRef.current) {
      drag(dragRef.current);
    }
  }, [drag]);

  return (
    <div
      ref={dragRef}
      className={`flex items-center gap-3 px-3 py-2 rounded-md border border-[#4a4a6e] bg-[#3c3c5c] transition-all duration-200 ease-in-out
        ${
          isPreviewMode
            ? "opacity-50 cursor-not-allowed"
            : "cursor-grab active:cursor-grabbing hover:shadow-md hover:border-[#5c6bc0]"
        }
        ${isDragging ? "opacity-30" : "opacity-100"}
      `}
    >
      <Icon className="w-5 h-5 text-[#e0e0e0]" />
      <span className="text-sm font-medium text-[#e0e0e0]">{label}</span>
    </div>
  );
};

export default function Palette() {
  return (
    <aside className="hidden lg:flex flex-col w-64 min-w-[16rem] bg-[#a3a3c2] p-4 overflow-y-auto border-r border-[#4a4a6e]">
      <h2 className="text-lg font-bold text-[#2e2e4a] mb-4">Fields</h2>
      <div className="space-y-6">
        {fieldGroups.map((group) => (
          <div key={group.title}>
            <h3 className="text-sm font-bold text-[#2e2e4a] mb-2 uppercase tracking-wide">
              {group.title}
            </h3>
            <div className="space-y-2">
              {group.fields.map((field) => (
                <DraggableField key={field.type} {...field} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
