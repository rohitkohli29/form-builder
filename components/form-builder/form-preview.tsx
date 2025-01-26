"use client";

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormData } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

interface FormPreviewProps {
  formData: FormData;
}

export function FormPreview({ formData }: FormPreviewProps) {

  const generateValidationSchema = () => {
    const schema: Record<string, z.ZodTypeAny> = {};
  
    formData.fields.forEach((field) => {
      let fieldSchema;
  
      if (field.type === 'number' || field.type === 'range') {
        let numberSchema = z.number();
        if (field.validation?.min !== undefined) {
          numberSchema = numberSchema.min(field.validation.min, { message: `Minimum value is ${field.validation.min}` });
        }
        if (field.validation?.max !== undefined) {
          numberSchema = numberSchema.max(field.validation.max, { message: `Maximum value is ${field.validation.max}` });
        }
        fieldSchema = numberSchema;
      } else {
        let stringSchema = z.string();
        if (field.required) {
          stringSchema = stringSchema.min(1, { message: `This ${field.label} is required` });
        }
        if (field.type === 'email') {
          stringSchema = stringSchema.email({ message: 'Invalid email address' });
        }
        fieldSchema = stringSchema;
      }
  
      schema[field.id] = field.required ? fieldSchema : fieldSchema.optional();
    });
  
    return z.object(schema);
  };
  
  
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(generateValidationSchema()),
  });

  const onSubmit = (data: any) => {
    console.log('Form submitted:', data);
  };

  const renderField = (field: FormData['fields'][0]) => {
    const commonProps = {
      placeholder: field.placeholder,
      className: `w-full ${formData.theme.fontSize.input}`,
      style: {
        fontFamily: formData.theme.fontFamily,
        borderColor: formData.theme.colors.border,
        backgroundColor: formData.theme.colors.background,
        color: formData.theme.colors.text,
      },
    };

    switch (field.type) {
      case 'textarea':
        return <Textarea {...commonProps} {...register(field.id)} />;
      
      case 'select':
        return (
          <Controller
            name={field.id}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select onValueChange={onChange} value={value}>
                <SelectTrigger style={commonProps.style}>
                  <SelectValue placeholder={field.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {field.options?.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        );
      
      case 'checkbox':
        return (
          <div className="flex flex-col gap-2">
            {field.options?.map((option) => (
              <Label
                key={option}
                className="flex items-center gap-2 cursor-pointer"
                style={{
                  fontFamily: formData.theme.fontFamily,
                  color: formData.theme.colors.text,
                }}
              >
                <Controller
                  name={`${field.id}.${option}`}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Checkbox checked={value} onCheckedChange={onChange} />
                  )}
                />
                {option}
              </Label>
            ))}
          </div>
        );
      
      case 'radio':
        return (
          <Controller
            name={field.id}
            control={control}
            render={({ field: { onChange, value } }) => (
              <RadioGroup
                value={value}
                onValueChange={onChange}
                className="flex flex-col gap-2"
              >
                {field.options?.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={`${field.id}-${option}`} />
                    <Label
                      htmlFor={`${field.id}-${option}`}
                      style={{
                        fontFamily: formData.theme.fontFamily,
                        color: formData.theme.colors.text,
                      }}
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          />
        );

      case 'range':
        return (
          <Controller
            name={field.id}
            control={control}
            render={({ field: { onChange, value } }) => (
              <div className="space-y-2">
                <Slider
                  min={field.validation?.min || 0}
                  max={field.validation?.max || 100}
                  step={field.validation?.step || 1}
                  value={[value || field.validation?.min || 0]}
                  onValueChange={([newValue]) => onChange(newValue)}
                />
                <div className="text-sm text-muted-foreground text-center">
                  Value: {value || field.validation?.min || 0}
                </div>
              </div>
            )}
          />
        );
      
      default:
        return <Input type={field.type} {...commonProps} {...register(field.id)} />;
    }
  };

  if(formData.fields.length === 0){
    return  (
      <div className='text-center py-4'>
        <h1 className='text-2xl font-bold'>Please added at least one field to see form</h1>
      </div>
    )
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-2xl mx-auto p-6"
      style={{
        backgroundColor: formData.theme.colors.background,
      }}
    >
      {formData.fields.toReversed().map((field) => (
        <div key={field.id} className="space-y-2">
          <Label
            htmlFor={field.id}
            className={`block ${formData.theme.fontSize.label}`}
            style={{
              fontFamily: formData.theme.fontFamily,
              color: formData.theme.colors.text,
            }}
          >
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </Label>
          {renderField(field)}
          {errors[field.id] && (
            <p className="text-red-500 text-sm">
              {(errors[field.id]?.message as string) || 'This field is required'}
            </p>
          )}
        </div>
      ))}
      <Button
        type="submit"
        className="w-full"
        style={{
          backgroundColor: formData.theme.colors.primary,
          color: '#fff',
        }}
      >
        Submit
      </Button>
    </form>
  );
}