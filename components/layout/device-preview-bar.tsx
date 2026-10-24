"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Smartphone,
  Laptop,
  Monitor,
  Maximize2,
  X,
  ChevronDown,
  Info,
} from "lucide-react";

export interface DeviceSizeSpec {
  id: string;
  type: "Mobile" | "Laptop" | "Monitor";
  sizeInches: string;
  category: string;
  viewportWidth: number;
  aspectRatio: string;
  notes: string;
}

export const DEVICE_SIZES: DeviceSizeSpec[] = [
  {
    id: "mob-std",
    type: "Mobile",
    sizeInches: "6.1\" to 6.3\"",
    category: "Standard Smartphone",
    viewportWidth: 390,
    aspectRatio: "19.5:9",
    notes: "iPhone 15, Pixel 8 sweet spot",
  },
  {
    id: "mob-max",
    type: "Mobile",
    sizeInches: "6.7\" to 6.8\"",
    category: "Max / Ultra Phone",
    viewportWidth: 430,
    aspectRatio: "19.5:9",
    notes: "Pro Max, S24 Ultra gaming/productivity",
  },
  {
    id: "mob-fold",
    type: "Mobile",
    sizeInches: "7.6\" to 8.0\"+",
    category: "Foldable Opened",
    viewportWidth: 640,
    aspectRatio: "6:5",
    notes: "Galaxy Z Fold, Pixel Fold fully opened",
  },
  {
    id: "lap-budget",
    type: "Laptop",
    sizeInches: "11.6\"",
    category: "Compact / Budget",
    viewportWidth: 1024,
    aspectRatio: "16:9",
    notes: "Chromebooks & entry education devices",
  },
  {
    id: "lap-ultra",
    type: "Laptop",
    sizeInches: "13.0\" to 13.3\"",
    category: "Ultraportable",
    viewportWidth: 1280,
    aspectRatio: "16:10",
    notes: "MacBook Air 13\", Dell XPS travel laptop",
  },
  {
    id: "lap-std",
    type: "Laptop",
    sizeInches: "14.0\"",
    category: "The Modern Standard",
    viewportWidth: 1440,
    aspectRatio: "16:10",
    notes: "MacBook Pro 14\", corporate standard",
  },
  {
    id: "lap-trad",
    type: "Laptop",
    sizeInches: "15.6\"",
    category: "Traditional Standard",
    viewportWidth: 1536,
    aspectRatio: "16:9",
    notes: "Mid-range classic laptop",
  },
  {
    id: "lap-power",
    type: "Laptop",
    sizeInches: "16.0\"",
    category: "Modern Powerhouse",
    viewportWidth: 1680,
    aspectRatio: "16:10",
    notes: "Creator powerhouse & workstation laptop",
  },
  {
    id: "lap-replace",
    type: "Laptop",
    sizeInches: "17.3\" to 18.0\"",
    category: "Desktop Replacement",
    viewportWidth: 1920,
    aspectRatio: "16:9",
    notes: "Massive gaming & high-perf laptop",
  },
  {
    id: "mon-base",
    type: "Monitor",
    sizeInches: "21.5\" to 24.0\"",
    category: "Baseline Desktop",
    viewportWidth: 1920,
    aspectRatio: "16:9",
    notes: "1080p standard dual-monitor setup",
  },
  {
    id: "mon-sweet",
    type: "Monitor",
    sizeInches: "27.0\"",
    category: "The Sweet Spot",
    viewportWidth: 2560,
    aspectRatio: "16:9",
    notes: "1440p / 4K detailed workspace",
  },
  {
    id: "mon-large",
    type: "Monitor",
    sizeInches: "32.0\"",
    category: "Large Format",
    viewportWidth: 2880,
    aspectRatio: "16:9",
    notes: "Multitasking 4K desktop canvas",
  },
  {
    id: "mon-ultra",
    type: "Monitor",
    sizeInches: "34.0\" to 38.0\"",
    category: "Ultrawide (21:9)",
    viewportWidth: 3440,
    aspectRatio: "21:9",
    notes: "Panoramic dual-monitor replacement",
  },
  {
    id: "mon-super",
    type: "Monitor",
    sizeInches: "49.0\"",
    category: "Super Ultrawide (32:9)",
    viewportWidth: 5120,
    aspectRatio: "32:9",
    notes: "Dual 27-inch side-by-side seamless workspace",
  },
];

export function DevicePreviewBar() {
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"All" | "Mobile" | "Laptop" | "Monitor">("All");

  useEffect(() => {
    const updateDimensions = () => {
      setWindowWidth(window.innerWidth);
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Determine current active physical device match based on width
  const matchedDevice = (() => {
    if (windowWidth < 420) return DEVICE_SIZES[0]; // 6.1" - 6.3" Mobile
    if (windowWidth < 600) return DEVICE_SIZES[1]; // 6.7" - 6.8" Max
    if (windowWidth < 900) return DEVICE_SIZES[2]; // 7.6" - 8.0" Foldable
    if (windowWidth < 1200) return DEVICE_SIZES[3]; // 11.6" Compact Laptop
    if (windowWidth < 1380) return DEVICE_SIZES[4]; // 13.0" - 13.3" Ultraportable
    if (windowWidth < 1500) return DEVICE_SIZES[5]; // 14.0" Modern Standard
    if (windowWidth < 1620) return DEVICE_SIZES[6]; // 15.6" Traditional
    if (windowWidth < 1850) return DEVICE_SIZES[7]; // 16.0" Powerhouse
    if (windowWidth < 2300) return DEVICE_SIZES[9]; // 21.5" - 24" Baseline / 17.3" Laptop
    if (windowWidth < 2750) return DEVICE_SIZES[10]; // 27" Sweet Spot
    if (windowWidth < 3200) return DEVICE_SIZES[11]; // 32" Large Format
    if (windowWidth < 4500) return DEVICE_SIZES[12]; // 34" - 38" Ultrawide
    return DEVICE_SIZES[13]; // 49" Super Ultrawide
  })();

  const filteredDevices =
    activeTab === "All"
      ? DEVICE_SIZES
      : DEVICE_SIZES.filter((d) => d.type === activeTab);

  return (
    <div className="border-b border-border bg-[#F2F2EC] text-primary text-xs">
      <div className="max-w-[320rem] mx-auto px-4 py-1.5 flex items-center justify-between gap-3">
        {/* Current Active Resolution & Physical Match */}
        <div className="flex items-center gap-2 truncate">
          <Badge variant="outline" className="font-mono text-[10px] bg-white border-border shrink-0">
            {windowWidth}px Viewport
          </Badge>
          <div className="flex items-center gap-1.5 truncate text-[11px] font-medium text-primary">
            {matchedDevice.type === "Mobile" && <Smartphone className="w-3.5 h-3.5 text-accent shrink-0" />}
            {matchedDevice.type === "Laptop" && <Laptop className="w-3.5 h-3.5 text-accent shrink-0" />}
            {matchedDevice.type === "Monitor" && <Monitor className="w-3.5 h-3.5 text-accent shrink-0" />}
            <span className="font-semibold text-primary">{matchedDevice.sizeInches}</span>
            <span className="text-secondary truncate">({matchedDevice.category})</span>
          </div>
        </div>

        {/* Toggleable Physical Size Reference Modal */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1 px-2.5 py-0.5 rounded-sm bg-white border border-border text-[11px] font-mono hover:bg-[#EAEAE2] transition-colors"
          >
            <span>All 14 Screen Specs</span>
            <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>

      {/* Expanded Table Accordion */}
      {isOpen && (
        <div className="border-t border-border bg-surface p-4 animate-in slide-in-from-top-1 duration-150">
          <div className="max-w-6xl mx-auto space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-border">
              <div>
                <h4 className="font-semibold text-xs text-primary flex items-center gap-1.5">
                  <Maximize2 className="w-4 h-4 text-accent" />
                  Physical Screen Sizes &amp; Responsive Layout Architecture
                </h4>
                <p className="text-[11px] text-secondary">
                  Complete target grid scaling across phones, foldables, laptops, monitors, 21:9 ultrawides, and 32:9 super ultrawides.
                </p>
              </div>

              {/* Category tabs */}
              <div className="flex gap-1 text-[11px]">
                {(["All", "Mobile", "Laptop", "Monitor"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-2 py-0.5 rounded-sm border ${
                      activeTab === tab
                        ? "bg-primary text-white border-primary"
                        : "bg-[#F8F8F5] text-secondary border-border hover:text-primary"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Reference Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 text-xs">
              {filteredDevices.map((spec) => {
                const isCurrent = matchedDevice.id === spec.id;
                return (
                  <div
                    key={spec.id}
                    className={`p-2.5 rounded-sm border transition-colors ${
                      isCurrent
                        ? "bg-accent-subtle border-accent ring-1 ring-accent"
                        : "bg-[#F8F8F5] border-border hover:bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between pb-1">
                      <span className="font-bold text-xs text-primary">
                        {spec.sizeInches}
                      </span>
                      <Badge
                        variant={isCurrent ? "accent" : "outline"}
                        className="text-[9px] uppercase font-mono py-0 px-1"
                      >
                        {spec.type}
                      </Badge>
                    </div>
                    <div className="font-medium text-[11px] text-primary truncate">
                      {spec.category}
                    </div>
                    <div className="text-[10px] text-secondary font-mono mt-0.5">
                      ~{spec.viewportWidth}px width &bull; {spec.aspectRatio}
                    </div>
                    <div className="text-[10px] text-secondary leading-tight mt-1 pt-1 border-t border-border/50">
                      {spec.notes}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
