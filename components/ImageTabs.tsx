"use client";

import { Button } from "./ui/button";
import { cn } from "@/lib/utils"; // Utilidad estándar de ShadCN
import Image from "next/image";
import { useState, useCallback } from "react";

type TabId = "organize" | "hired" | "boards";

interface TabConfig {
  id: TabId;
  label: string;
  src: string;
  alt: string;
}

const TABS: TabConfig[] = [
  {
    id: "organize",
    label: "Organize Applications",
    src: "/hero-images/hero1.png",
    alt: "Dashboard showing organized job applications in columns",
  },
  {
    id: "hired",
    label: "Get Hired",
    src: "/hero-images/hero2.png",
    alt: "Interview scheduling and offer tracking interface",
  },
  {
    id: "boards",
    label: "Manage Boards",
    src: "/hero-images/hero3.png",
    alt: "Multiple kanban boards for different job searches",
  },
];

export default function ImageTabs() {
  const [activeTab, setActiveTab] = useState<TabId>("organize");
  const [isLoaded, setIsLoaded] = useState(false);

  // 2. CALLBACK ESTABLE (no cambia entre renders)
  const handleTabChange = useCallback((id: TabId) => {
    setIsLoaded(false);
    setActiveTab(id);
  }, []);

  const activeConfig = TABS.find((t) => t.id === activeTab)!;

  return (
    <section className="border-t bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/*
           */}
          <div
            role="tablist"
            aria-label="Feature previews"
            className="mb-8 flex flex-wrap justify-center gap-2"
          >
            {TABS.map((tab) => {
              const isActive = tab.id === activeTab;

              return (
                <Button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${tab.id}`}
                  id={`tab-${tab.id}`}
                  onClick={() => handleTabChange(tab.id)}
                  variant="ghost" // Usamos variantes de ShadCN
                  className={cn(
                    "rounded-lg px-6 py-3 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  {tab.label}
                </Button>
              );
            })}
          </div>

          {/* ─────────────────────────────────────────
              4. PANEL CON TRANSICIÓN Y KEY PARA RE-MOUNT
             ───────────────────────────────────────── */}
          <div
            role="tabpanel"
            id={`panel-${activeTab}`}
            aria-labelledby={`tab-${activeTab}`}
            className="relative mx-auto max-w-5xl overflow-hidden rounded-lg border border-border shadow-xl"
          >
            <div
              key={activeTab} // Fuerza re-mount → transición de opacidad
              className={cn(
                "transition-opacity duration-500 ease-in-out",
                isLoaded ? "opacity-100" : "opacity-0",
              )}
            >
              <Image
                src={activeConfig.src}
                alt={activeConfig.alt}
                width={1200}
                height={800}
                priority={activeTab === "organize"} // Solo la primera es crítica
                className="h-auto w-full"
                onLoad={() => setIsLoaded(true)}
                sizes="(max-width: 1280px) 100vw, 1200px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
