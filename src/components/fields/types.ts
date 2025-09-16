import { Field } from "@/context/FormBuilderContext";

/** Props passed to any component that renders a form field's input. */
export interface FieldRendererProps {
  /** The field object containing all properties from the schema. */
  field: Field;
  /** When true, the component should render in a non-editable preview mode. */
  preview?: boolean;
}

/** Optional handlers for the builder action buttons (e.g., Delete, Duplicate). */
export interface FieldActionHandlers {
  /** Handler for the delete action. */
  onDelete?: () => void;
  /** Handler for the duplicate action. */
  onDuplicate?: () => void;
  /** Handler for opening the settings panel. */
  onSettings?: () => void;
}