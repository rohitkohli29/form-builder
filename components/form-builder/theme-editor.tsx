"use client";

import { FormTheme } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ThemeEditorProps {
  theme: FormTheme;
  onUpdate: (theme: FormTheme) => void;
}

export function ThemeEditor({ theme, onUpdate }: ThemeEditorProps) {
  const fontFamilies = [
    'Inter',
    'Arial',
    'Helvetica',
    'Times New Roman',
    'Georgia',
  ];

  const fontSizes = [
    'text-xs',
    'text-sm',
    'text-base',
    'text-lg',
    'text-xl',
    'text-2xl',
  ];

  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-4">Theme Settings</h2>

        <div className="space-y-2">
          <Label>Font Family</Label>
          <Select
            value={theme.fontFamily}
            onValueChange={(value) =>
              onUpdate({ ...theme, fontFamily: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {fontFamilies.map((font) => (
                <SelectItem key={font} value={font}>
                  {font}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Label Font Size</Label>
          <Select
            value={theme.fontSize.label}
            onValueChange={(value) =>
              onUpdate({
                ...theme,
                fontSize: { ...theme.fontSize, label: value },
              })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {fontSizes.map((size) => (
                <SelectItem key={size} value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Input Font Size</Label>
          <Select
            value={theme.fontSize.input}
            onValueChange={(value) =>
              onUpdate({
                ...theme,
                fontSize: { ...theme.fontSize, input: value },
              })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {fontSizes.map((size) => (
                <SelectItem key={size} value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Primary Color</Label>
          <Input
            type="color"
            value={theme.colors.primary}
            onChange={(e) =>
              onUpdate({
                ...theme,
                colors: { ...theme.colors, primary: e.target.value },
              })
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Background Color</Label>
          <Input
            type="color"
            value={theme.colors.background}
            onChange={(e) =>
              onUpdate({
                ...theme,
                colors: { ...theme.colors, background: e.target.value },
              })
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Text Color</Label>
          <Input
            type="color"
            value={theme.colors.text}
            onChange={(e) =>
              onUpdate({
                ...theme,
                colors: { ...theme.colors, text: e.target.value },
              })
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Border Color</Label>
          <Input
            type="color"
            value={theme.colors.border}
            onChange={(e) =>
              onUpdate({
                ...theme,
                colors: { ...theme.colors, border: e.target.value },
              })
            }
          />
        </div>
      </div>
    </Card>
  );
}