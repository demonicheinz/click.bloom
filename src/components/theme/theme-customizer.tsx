"use client";

import { useTheme, type TemplateStyle } from "@/lib/theme/theme-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ColorPicker } from "./color-picker";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define shadow intensity type for proper type checking
type ShadowIntensity = "none" | "light" | "medium" | "heavy";

const templates: { value: TemplateStyle; label: string }[] = [
  { value: "default", label: "Default" },
  { value: "minimal", label: "Minimal" },
  { value: "gradient", label: "Gradient" },
  { value: "glass", label: "Glass" },
  { value: "modern", label: "Modern" },
];

const fonts = [
  { value: "var(--font-geist-sans)", label: "Geist Sans" },
  { value: "var(--font-geist-mono)", label: "Geist Mono" },
];

export function ThemeCustomizer() {
  const { theme, updateColors, updateTypography, updateStyle, setTemplate } = useTheme();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customize Theme</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="colors">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="typography">Typography</TabsTrigger>
            <TabsTrigger value="layout">Layout</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>

          <TabsContent
            value="colors"
            className="space-y-4"
          >
            <ColorPicker
              label="Primary Color"
              color={theme.colors.primary}
              onChange={(color) => updateColors({ primary: color })}
            />
            <ColorPicker
              label="Secondary Color"
              color={theme.colors.secondary}
              onChange={(color) => updateColors({ secondary: color })}
            />
            <ColorPicker
              label="Accent Color"
              color={theme.colors.accent}
              onChange={(color) => updateColors({ accent: color })}
            />
            <ColorPicker
              label="Background Color"
              color={theme.colors.background}
              onChange={(color) => updateColors({ background: color })}
            />
            <ColorPicker
              label="Text Color"
              color={theme.colors.foreground}
              onChange={(color) => updateColors({ foreground: color })}
            />
          </TabsContent>

          <TabsContent
            value="typography"
            className="space-y-4"
          >
            <div className="grid gap-2">
              <Label>Font Family</Label>
              <Select
                value={theme.typography.fontFamily}
                onValueChange={(value) => updateTypography({ fontFamily: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {fonts.map((font) => (
                    <SelectItem
                      key={font.value}
                      value={font.value}
                    >
                      {font.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Base Font Size</Label>
              <Slider
                min={12}
                max={20}
                step={1}
                value={[parseInt(theme.typography.fontSize.base)]}
                onValueChange={([value]) =>
                  updateTypography({
                    fontSize: {
                      ...theme.typography.fontSize,
                      base: `${value}px`,
                    },
                  })
                }
              />
            </div>

            <div className="grid gap-2">
              <Label>Line Height</Label>
              <Slider
                min={1}
                max={2}
                step={0.1}
                value={[parseFloat(theme.typography.lineHeight)]}
                onValueChange={([value]) => updateTypography({ lineHeight: value.toString() })}
              />
            </div>
          </TabsContent>

          <TabsContent
            value="layout"
            className="space-y-4"
          >
            <div className="grid gap-2">
              <Label>Border Radius</Label>
              <Slider
                min={0}
                max={20}
                step={1}
                value={[parseInt(theme.style.borderRadius)]}
                onValueChange={([value]) => updateStyle({ borderRadius: `${value}px` })}
              />
            </div>

            <div className="grid gap-2">
              <Label>Shadow Intensity</Label>
              <Select
                value={theme.style.shadowIntensity}
                onValueChange={(value: ShadowIntensity) => updateStyle({ shadowIntensity: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="heavy">Heavy</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Opacity</Label>
              <Slider
                min={0}
                max={1}
                step={0.1}
                value={[theme.style.opacity]}
                onValueChange={([value]) => updateStyle({ opacity: value })}
              />
            </div>
          </TabsContent>

          <TabsContent
            value="templates"
            className="space-y-4"
          >
            <div className="grid gap-4">
              {templates.map((template) => (
                <Button
                  key={template.value}
                  variant={theme.template === template.value ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => setTemplate(template.value)}
                >
                  {template.label}
                </Button>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
