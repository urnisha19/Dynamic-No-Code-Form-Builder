"use client";
import React, { useState, useRef, useEffect, ReactNode } from "react";
import { Eye, EyeOff, RotateCcw, AlertTriangle } from "lucide-react";
import { useFormBuilder } from "@/context/FormBuilderContext";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  children: ReactNode;
}

function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  children,
}: ConfirmationModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Effect for closing on 'Escape' key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Effect for trapping focus within the modal
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;
    const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusableElements.length === 0) return;
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKeyPress = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };
    firstElement.focus();
    document.addEventListener("keydown", handleTabKeyPress);
    return () => document.removeEventListener("keydown", handleTabKeyPress);
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="alertdialog"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        ref={modalRef}
        className="relative bg-[#2e2e4a] border border-[#e0e0e0] rounded-lg shadow-xl w-[90%] max-w-sm"
      >
        <div className="flex items-center gap-3 border-b border-[#e0e0e0] px-4 py-3">
          <AlertTriangle className="w-6 h-6 text-red-500" />
          <h2 className="text-lg font-semibold text-[#e0e0e0]">{title}</h2>
        </div>
        <div className="p-4">
          <div className="text-sm text-[#e0e0e0] mb-5 leading-relaxed">
            {children}
          </div>
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md text-sm bg-[#3c3c5c] text-[#e0e0e0] border border-[#e0e0e0] hover:bg-opacity-75 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="px-4 py-2 rounded-md text-sm bg-red-600 text-white font-medium shadow-sm hover:bg-red-700 transition-colors"
            >
              Yes, Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Topbar() {
  const { isPreviewMode, setIsPreviewMode, schema, resetSchema } =
    useFormBuilder();
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      <header className="w-full bg-[#2e2e4a] border-b border-[#e0e0e0] shadow-sm px-4 sm:px-5 py-3 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#5c6bc0] to-[#00bcd4] flex items-center justify-center text-white font-bold">
            Form
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-semibold text-[#e0e0e0] tracking-tight">
              {schema?.name || "Dynamic No-Code Form"}
            </h1>
            <p className="text-xs text-gray-400">
              Build dynamic, no-code forms
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-md font-medium text-sm transition-all shadow-sm border ${
              isPreviewMode
                ? "bg-[#3c3c5c] text-[#e0e0e0] border-[#e0e0e0] hover:bg-[#2e2e4a]"
                : "bg-[#5c6bc0] text-white border-transparent hover:bg-opacity-80"
            }`}
          >
            {isPreviewMode ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
            <span className="hidden sm:inline">
              {isPreviewMode ? "Exit Preview" : "Preview"}
            </span>
          </button>
          <button
            type="button"
            onClick={() => setShowConfirm(true)}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-md font-medium text-sm bg-[#3c3c5c] text-red-500 border border-transparent shadow-sm hover:border-red-500/50 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </header>

      {/* RENDER THE MODAL HERE */}
      <ConfirmationModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={resetSchema}
        title="Reset Form?"
      >
        This will erase{" "}
        <span className="font-semibold text-red-500">all your changes</span> and
        restore the default form. Are you sure you want to continue?
      </ConfirmationModal>
    </>
  );
}