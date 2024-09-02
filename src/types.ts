export interface Employee {
    id: string;
    name: string;
    role: string;
  }
  // src/types.ts

export interface FormField {
  question: string;
  type: 'number' | 'text' | 'checkbox' | 'multiple-choice' | 'slider'; // Aquí se agrega 'slider'
  options?: string[];
  value?: number;
  isDefault?: boolean;
  }
  
  export interface EvaluationFormTemplate {
    id: string;
    title: string;
    fields: FormField[];
  }
  
  export interface EvaluationFormTemplate {
    id: string;
    title: string;
    fields: FormField[];
  }