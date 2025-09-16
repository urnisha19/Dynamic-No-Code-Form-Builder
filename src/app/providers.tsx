"use client";
import React, { ReactNode } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { FormBuilderProvider } from "@/context/FormBuilderContext";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <FormBuilderProvider>
      <DndProvider backend={HTML5Backend}>{children}</DndProvider>
    </FormBuilderProvider>
  );
}
