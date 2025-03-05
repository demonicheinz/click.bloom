"use client";

import { useTheme } from "@/lib/theme/theme-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Pipette, Check } from "lucide-react";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  label: string;
}

const presetColors = [
  "#000000",
  "#ffffff",
  "#ef4444",
  "#f97316",
  "#f59e0b",
  "#10b981",
  "#06b6d4",
  "#3b82f6",
  "#6366f1",
  "#8b5cf6",
  "#d946ef",
  "#ec4899",
];

export function ColorPicker({ color, onChange, label }: ColorPickerProps) {
  return (
    <div className="grid gap-2">
      <Label>{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn("w-full justify-start text-left font-normal")}
          >
            <div className="flex w-full items-center gap-2">
              <div
                className="h-4 w-4 rounded-full border"
                style={{ backgroundColor: color }}
              />
              <span className="flex-1">{color}</span>
              <Pipette className="h-4 w-4" />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label>Hex</Label>
                <Input
                  value={color}
                  onChange={(e: { target: { value: string } }) => onChange(e.target.value)}
                  className="h-8 w-28"
                />
              </div>
              <div className="grid grid-cols-6 gap-2">
                {presetColors.map((preset) => (
                  <button
                    type="button"
                    key={preset}
                    className={cn(
                      "h-6 w-6 rounded-md border",
                      color === preset && "ring-2 ring-primary",
                    )}
                    style={{ backgroundColor: preset }}
                    onClick={() => onChange(preset)}
                  >
                    {color === preset && <Check className="h-4 w-4 text-white" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
