"use client";
import React from "react";
import Topbar from "@/components/Topbar";
import Palette from "@/components/Palette";
import Canvas from "@/components/Canvas";
import SettingsSidebar from "@/components/SettingsSidebar";
import { useFormBuilder } from "@/context/FormBuilderContext";

export default function Home() {
  const { isPreviewMode } = useFormBuilder();

  return (
    <main className="flex h-screen flex-col bg-[#1a1a2e] text-[#e0e0e0]">
      <Topbar />

      <div className="flex flex-1 overflow-hidden">
        {/* The Palette is now hidden when in preview mode. */}
        {!isPreviewMode && <Palette />}

        {/* The Canvas now takes up the full width in preview mode. */}
        <section className="flex-1 overflow-auto">
          <Canvas />
        </section>

        {/* The Settings Sidebar is now hidden when in preview mode. */}
        {!isPreviewMode && <SettingsSidebar />}
      </div>
    </main>
  );
}
