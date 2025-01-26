import { FormTheme } from './types';

export const defaultTheme: FormTheme = {
  fontFamily: 'Inter',
  fontSize: {
    label: 'text-sm',
    input: 'text-base',
  },
  colors: {
    primary: 'hsl(var(--primary))',
    background: 'hsl(var(--background))',
    text: 'hsl(var(--foreground))',
    border: 'hsl(var(--border))',
  },
};