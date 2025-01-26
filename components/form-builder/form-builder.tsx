"use client";

import { useState } from 'react';
import { FormData, FormField } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle, Trash2, Plus, X, GripVertical } from 'lucide-react';

interface FormBuilderProps {
  formData: FormData;
  onUpdate: (form: FormData) => void;
}

export function FormBuilder({ formData, onUpdate }: FormBuilderProps) {
  const addField = () => {
    const newField: FormField = {
      id: `field-${Date.now()}`,
      type: 'text',
      label: 'New Field',
      placeholder: '',
      required: false,
      options: [],
      validation: {},
    };

    onUpdate({
      ...formData,
      fields: [newField, ...formData.fields],
    });
  };

  const updateField = (index: number, field: FormField) => {
    const newFields = [...formData.fields];
    newFields[index] = field;
    onUpdate({ ...formData, fields: newFields });
  };

  const removeField = (index: number) => {
    const newFields = formData.fields.filter((_, i) => i !== index);
    onUpdate({ ...formData, fields: newFields });
  };

  const addOption = (fieldIndex: number) => {
    const field = formData.fields[fieldIndex];
    const options = field.options || [];
    updateField(fieldIndex, {
      ...field,
      options: [...options, `Option ${options.length + 1}`],
    });
  };

  const updateOption = (fieldIndex: number, optionIndex: number, value: string) => {
    const field = formData.fields[fieldIndex];
    const newOptions = [...(field.options || [])];
    newOptions[optionIndex] = value;
    updateField(fieldIndex, {
      ...field,
      options: newOptions,
    });
  };

  const removeOption = (fieldIndex: number, optionIndex: number) => {
    const field = formData.fields[fieldIndex];
    const newOptions = (field.options || []).filter((_, i) => i !== optionIndex);
    updateField(fieldIndex, {
      ...field,
      options: newOptions,
    });
  };

  const needsOptions = (type: string) => ['select', 'checkbox', 'radio'].includes(type);

  const renderFieldOptions = (field: FormField, fieldIndex: number) => {
    if (!needsOptions(field.type)) return null;

    return (
      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Field Options</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => addOption(fieldIndex)}
            className="hover:bg-primary/10"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Option
          </Button>
        </div>
        <div className="space-y-2">
          {field.options?.map((option, optionIndex) => (
            <div key={optionIndex} className="flex items-center gap-2 group">
              <div className="p-2 cursor-move opacity-50 group-hover:opacity-100">
                <GripVertical className="h-4 w-4" />
              </div>
              <Input
                value={option}
                onChange={(e) => updateOption(fieldIndex, optionIndex, e.target.value)}
                placeholder={`Option ${optionIndex + 1}`}
                className="flex-1"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeOption(fieldIndex, optionIndex)}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderValidationFields = (field: FormField, fieldIndex: number) => {
    if (field.type === 'range') {
      return (
        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Min Value</Label>
              <Input
                type="number"
                value={field.validation?.min || 0}
                onChange={(e) =>
                  updateField(fieldIndex, {
                    ...field,
                    validation: {
                      ...field.validation,
                      min: Number(e.target.value),
                    },
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Max Value</Label>
              <Input
                type="number"
                value={field.validation?.max || 100}
                onChange={(e) =>
                  updateField(fieldIndex, {
                    ...field,
                    validation: {
                      ...field.validation,
                      max: Number(e.target.value),
                    },
                  })
                }
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium">Step</Label>
            <Input
              type="number"
              value={field.validation?.step || 1}
              onChange={(e) =>
                updateField(fieldIndex, {
                  ...field,
                  validation: {
                    ...field.validation,
                    step: Number(e.target.value),
                  },
                })
              }
            />
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 w-full h-auto">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 -mx-4">
        <div className="flex justify-between items-center w-full mx-auto">
          <Input
            value={formData.title}
            onChange={(e) => onUpdate({ ...formData, title: e.target.value })}
            className="text-base md:text-2xl font-bold w-auto bg-transparent border-none hover:bg-secondary/50 focus:bg-secondary/50 transition-colors"
          />
          <Button onClick={addField} className="text-sm md:text-base shadow-lg hover:shadow-xl transition-shadow">
            <PlusCircle className="mr-2 h-5 w-5" />
            Add Field
          </Button>
        </div>
      </div>

      <div className="space-y-4 max-w-5xl mx-auto">
        {formData.fields.map((field, index) => (
          <Card key={field.id} className="p-6 group hover:shadow-lg transition-shadow">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="hidden md:block p-2 cursor-move opacity-50 group-hover:opacity-100 transition-opacity">
                  <GripVertical className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-4">
                  <div className="flex md:justify-between gap-x-4  md:px-0 md:gap-4">
                    <Input
                      value={field.label}
                      onChange={(e) =>
                        updateField(index, { ...field, label: e.target.value })
                      }
                      className="md:w-1/3 flex-1"
                      placeholder="Field Label"
                    />
                    <Select
                      value={field.type}
                      onValueChange={(value: any) =>
                        updateField(index, { ...field, type: value })
                      }
                    >
                      <SelectTrigger className=" flex-1 md:w-1/3">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text">Text</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="number">Number</SelectItem>
                        <SelectItem value="textarea">Textarea</SelectItem>
                        <SelectItem value="select">Select</SelectItem>
                        <SelectItem value="checkbox">Checkbox</SelectItem>
                        <SelectItem value="radio">Radio</SelectItem>
                        <SelectItem value="range">Range</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => removeField(index)}
                    >
                      <Trash2 className="h-4 w-4 " />
                    </Button>
                  </div>

                  <Input
                    value={field.placeholder || ''}
                    onChange={(e) =>
                      updateField(index, { ...field, placeholder: e.target.value })
                    }
                    placeholder="Placeholder text"
                  />

                  <Label className="flex items-center space-x-2 cursor-pointer hover:bg-secondary/50 p-2 rounded-md transition-colors w-fit">
                    <input
                      type="checkbox"
                      checked={field.required}
                      onChange={(e) =>
                        updateField(index, { ...field, required: e.target.checked })
                      }
                      className="rounded border-primary/20"
                    />
                    <span className="text-sm font-medium">Required field</span>
                  </Label>

                  {renderFieldOptions(field, index)}
                  {renderValidationFields(field, index)}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}