export type FormField = {
  id: string;
  type: 'text' | 'email' | 'number' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'range';
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[]; // For select, checkbox, and radio
  validation?: {
    min?: number;
    max?: number;
    step?: number;
    pattern?: string;
    message?: string;
  };
};

export type FormTheme = {
  fontFamily: string;
  fontSize: {
    label: string;
    input: string;
  };
  colors: {
    primary: string;
    background: string;
    text: string;
    border: string;
  };
};

export type FormData = {
  id: string;
  title: string;
  fields: FormField[];
  theme: FormTheme;
};