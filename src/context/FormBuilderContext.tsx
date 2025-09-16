"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { v4 as uuidv4 } from "uuid";
import defaultSchema from "@/data/formSchema";

// --- Types ---
export type FieldType =
  | "text"
  | "email"
  | "date"
  | "time"
  | "file"
  | "select"
  | "checkbox"
  | "radio"
  | "acceptance";

export interface Field {
  id: string;
  type: FieldType;
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
  content?: string;
  columnWidth?: string;
}

export interface FormSchema {
  id: string;
  version: string;
  name: string;
  toEmail: string;
  subject: string;
  successMessage: string;
  fields: Field[];
}

interface ContextType {
  schema: FormSchema;
  setSchema: React.Dispatch<React.SetStateAction<FormSchema>>;
  selectedFieldId: string | null;
  setSelectedFieldId: React.Dispatch<React.SetStateAction<string | null>>;
  isPreviewMode: boolean;
  setIsPreviewMode: React.Dispatch<React.SetStateAction<boolean>>;
  deleteField: (id: string) => void;
  duplicateField: (id: string) => void;
  updateField: (id: string, updates: Partial<Field>) => void;
  addField: (type: FieldType, atIndex?: number | null) => void;
  moveField: (fromIndex: number, toIndex: number) => void;
  resetSchema: () => void;
}

const STORAGE_KEY = "formBuilderSchema";
const FormBuilderContext = createContext<ContextType | undefined>(undefined);

// --- Helpers ---
const getDefaultFieldConfig = (type: FieldType): Partial<Field> => {
  // NOTE: This is the full, unabridged function.
  switch (type) {
    case "text":
      return { placeholder: "Enter value", label: "Text Field" };
    case "email":
      return { placeholder: "Enter your email", label: "Email Field" };
    case "date":
      return { label: "Date Field" };
    case "time":
      return { label: "Time Field" };
    case "file":
      return { label: "Upload File" };
    case "select":
      return {
        label: "Dropdown Field",
        placeholder: "Select an option",
        options: ["Option 1=option1", "Option 2=option2"],
      };
    case "checkbox":
      return {
        label: "Checkbox Field",
        options: ["Option 1=option1", "Option 2=option2"],
      };
    case "radio":
      return {
        label: "Radio Field",
        options: ["Option 1=option1", "Option 2=option2"],
      };
    case "acceptance":
      return { label: "", content: "I agree to the terms and conditions." };
    default:
      return { label: `${type} Field` };
  }
};

// --- Provider ---
export const FormBuilderProvider = ({ children }: { children: ReactNode }) => {
  const [schema, setSchema] = useState<FormSchema>(() =>
    structuredClone(defaultSchema)
  );
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setSchema(JSON.parse(raw));
      }
    } catch (err) {
      console.error("Could not parse schema from localStorage", err);
      setSchema(structuredClone(defaultSchema));
    }
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(schema));
      } catch (err) {
        console.error("Could not save schema", err);
      }
    }, 500);
    return () => clearTimeout(handler);
  }, [schema]);

  const resetSchema = useCallback(() => {
    const fresh = structuredClone(defaultSchema);
    setSchema(fresh);
    setSelectedFieldId(null);
    setIsPreviewMode(false);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
    } catch (err) {
      console.error("Could not reset schema", err);
    }
  }, []);

  const addField = useCallback(
    (type: FieldType, atIndex: number | null = null) => {
      if (isPreviewMode) return;
      const defaults = getDefaultFieldConfig(type);
      const newField: Field = {
        id: uuidv4(),
        type,
        label: defaults.label ?? `${type} Field`,
        name: `${type}_${uuidv4().slice(0, 8)}`,
        placeholder: defaults.placeholder,
        required: false,
        options: defaults.options || [],
        content: defaults.content,
        columnWidth: "100%",
      };
      setSchema((prev) => {
        const fields = [...prev.fields];
        if (atIndex === null || atIndex >= fields.length) {
          fields.push(newField);
        } else {
          fields.splice(atIndex, 0, newField);
        }
        return { ...prev, fields };
      });
      setSelectedFieldId(newField.id);
    },
    [isPreviewMode]
  );

  const updateField = useCallback(
    (id: string, updates: Partial<Field>) => {
      if (isPreviewMode) return;
      setSchema((prev) => ({
        ...prev,
        fields: prev.fields.map((f) =>
          f.id === id ? { ...f, ...updates } : f
        ),
      }));
    },
    [isPreviewMode]
  );

  const deleteField = useCallback(
    (id: string) => {
      if (isPreviewMode) return;
      setSchema((prev) => ({
        ...prev,
        fields: prev.fields.filter((f) => f.id !== id),
      }));
      if (selectedFieldId === id) {
        setSelectedFieldId(null);
      }
    },
    [isPreviewMode, selectedFieldId]
  );

  const duplicateField = useCallback(
    (id: string) => {
      if (isPreviewMode) return;
      setSchema((prev) => {
        const idx = prev.fields.findIndex((f) => f.id === id);
        if (idx === -1) return prev;
        const original = prev.fields[idx];
        const copy: Field = {
          ...structuredClone(original),
          id: uuidv4(),
          name: `${original.name}_copy_${uuidv4().slice(0, 4)}`,
        };
        const fields = [...prev.fields];
        fields.splice(idx + 1, 0, copy);
        return { ...prev, fields };
      });
    },
    [isPreviewMode]
  );

  const moveField = useCallback(
    (fromIndex: number, toIndex: number) => {
      if (isPreviewMode) return;
      setSchema((prev) => {
        const fields = [...prev.fields];
        if (
          fromIndex < 0 ||
          fromIndex >= fields.length ||
          toIndex < 0 ||
          toIndex > fields.length
        ) {
          return prev;
        }
        const [moved] = fields.splice(fromIndex, 1);
        fields.splice(toIndex, 0, moved);
        return { ...prev, fields };
      });
    },
    [isPreviewMode]
  );

  return (
    <FormBuilderContext.Provider
      value={{
        schema,
        setSchema,
        selectedFieldId,
        setSelectedFieldId,
        isPreviewMode,
        setIsPreviewMode,
        deleteField,
        duplicateField,
        updateField,
        addField,
        moveField,
        resetSchema,
      }}
    >
      {children}
    </FormBuilderContext.Provider>
  );
};

// --- Hook ---
export const useFormBuilder = (): ContextType => {
  const ctx = useContext(FormBuilderContext);
  if (!ctx) {
    throw new Error("useFormBuilder must be used within a FormBuilderProvider");
  }
  return ctx;
};
