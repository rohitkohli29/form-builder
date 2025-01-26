"use client";

import { useEffect, useState } from "react";
import { FormBuilder } from "@/components/form-builder/form-builder";
import { FormPreview } from "@/components/form-builder/form-preview";
import { ThemeEditor } from "@/components/form-builder/theme-editor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormData } from "@/lib/types";
import { defaultTheme } from "@/lib/constants";
import { CodeBlock } from "@/components/ui/code-block";

export default function FormBuilderPage() {
  const [formData, setFormData] = useState<FormData>({
    id: "1",
    title: "My Form",
    fields: [],
    theme: defaultTheme,
  });

  const [formDataCode, setFormDataCode] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("edit");

  const generateFormCode = () => {
    return formData.fields.toReversed()
      .map((field) => {
        const attributes = [
          `type="${field.type}"`,
          `placeholder="${field.placeholder || ''}"`,
          field.required ? 'required' : null,
        ]
          .filter(Boolean)
          .join(' ');
  
        if (['select', 'radio', 'checkbox'].includes(field.type)) {
          const options = field.options
            ?.map((option) => `<option value="${option}">${option}</option>`)
            .join('\n');
  
          return (
` <div>
    <label>${field.label}</label>
    <select ${attributes}>
      ${options}
    </select>
  </div>`);
        }
  
        return (
` <div>
    <label>${field.label}</label>
    <input ${attributes}/>
  </div>`);
      })
      .join('\n');
  };
  

  useEffect(() => {
    const code = generateFormCode();
    setFormDataCode(code);
  }, [formData]);

  return (
    <div className="md:container w-full mx-auto md:py-8 p-4">
      <h1 className="text-3xl font-bold mb-8">{"Rohit's Form Builder"}</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="edit">Edit Form</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="theme">Theme</TabsTrigger>
        </TabsList>

        <TabsContent value="edit">
          <FormBuilder
            formData={formData}
            onUpdate={(updatedForm) => setFormData(updatedForm)}
          />
        </TabsContent>

        <TabsContent value="preview">
          <FormPreview formData={formData} />
          <div>
            <CodeBlock  language="jsx" filename={`${formData.title}.jsx`} code={
`<form action={formAction}>
  ${formDataCode}
  <button type="submit">Submit</button>
</form>`
            } />
          </div>
        </TabsContent>

        <TabsContent value="theme">
          <ThemeEditor
            theme={formData.theme}
            onUpdate={(newTheme) =>
              setFormData({ ...formData, theme: newTheme })
            }
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
