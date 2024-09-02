"use client";

import React, { useState, useEffect } from 'react';

interface FormField {
  question: string;
  type: 'number' | 'text' | 'checkbox' | 'multiple-choice' | 'slider';
  options?: string[];
}

interface EvaluationFormTemplate {
  id: string;
  title: string;
  fields: FormField[];
}

interface AdminEvaluationFormProps {
  initialForm?: EvaluationFormTemplate;
  onSave: (data: EvaluationFormTemplate) => void;
  onCancel: () => void;
}

const defaultFields: FormField[] = [
  { question: 'Promedio de Comunicación', type: 'slider', options: ['1', '2', '3', '4', '5'] },
  { question: 'Promedio de Adaptabilidad y Flexibilidad', type: 'slider', options: ['1', '2', '3', '4', '5'] },
  { question: 'Promedio de Innovación y Creatividad', type: 'slider', options: ['1', '2', '3', '4', '5'] },
];

export default function AdminEvaluationForm({ initialForm, onSave, onCancel }: AdminEvaluationFormProps) {
  const [form, setForm] = useState<EvaluationFormTemplate>({
    id: initialForm?.id || Date.now().toString(),
    title: initialForm?.title || '',
    fields: initialForm ? [...defaultFields, ...initialForm.fields.filter(field => !defaultFields.some(df => df.question === field.question))] : defaultFields,
  });

  useEffect(() => {
    if (initialForm) {
      setForm({
        id: initialForm.id,
        title: initialForm.title,
        fields: [...defaultFields, ...initialForm.fields.filter(field => !defaultFields.some(df => df.question === field.question))],
      });
    }
  }, [initialForm]);

  const addField = () => {
    setForm({
      ...form,
      fields: [...form.fields, { question: '', type: 'text' }],
    });
  };

  const updateField = (index: number, field: Partial<FormField>) => {
    const newFields = [...form.fields];
    newFields[index] = { ...newFields[index], ...field };
    setForm({ ...form, fields: newFields });
  };

  const handleAddOption = (index: number) => {
    const newFields = [...form.fields];
    newFields[index].options = [...(newFields[index].options || []), ''];
    setForm({ ...form, fields: newFields });
  };

  const handleOptionChange = (fieldIndex: number, optionIndex: number, value: string) => {
    const newFields = [...form.fields];
    if (newFields[fieldIndex].options) {
      newFields[fieldIndex].options![optionIndex] = value;
    }
    setForm({ ...form, fields: newFields });
  };

  const handleRemoveField = (index: number) => {
    if (!defaultFields.some(f => f.question === form.fields[index].question)) {
      const newFields = [...form.fields];
      newFields.splice(index, 1);
      setForm({ ...form, fields: newFields });
    }
  };

  const handleSave = () => {
    onSave(form);
  };

  return (
    <div className="bg-gray-700 p-4 rounded-md mb-4">
      <h3 className="text-lg font-semibold text-blue-400 mb-4">
        {form.title ? 'Editar Formulario' : 'Crear Nuevo Formulario'}
      </h3>
      
      <input
        type="text"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        placeholder="Título del formulario"
        className="w-full mb-4 p-2 rounded bg-gray-600 text-white"
      />

      {form.fields.map((field, index) => (
        <div key={index} className="mb-4 p-4 bg-gray-800 rounded">
          <input
            type="text"
            value={field.question}
            onChange={(e) => updateField(index, { question: e.target.value })}
            placeholder="Pregunta"
            className="w-full mb-2 p-2 rounded bg-gray-600 text-white"
            disabled={defaultFields.some(f => f.question === field.question)} // Deshabilita las preguntas por defecto
          />
          
          <select
            value={field.type}
            onChange={(e) => updateField(index, { type: e.target.value as FormField['type'] })}
            className="w-full mb-2 p-2 rounded bg-gray-600 text-white"
            disabled={defaultFields.some(f => f.question === field.question)} // Deshabilita el tipo para las preguntas por defecto
          >
            <option value="text">Texto</option>
            <option value="number">Número</option>
            <option value="checkbox">Checkbox</option>
            <option value="multiple-choice">Múltiple Opción</option>
            <option value="slider">Slider (1-5)</option>
          </select>

          {field.type === 'slider' && (
            <input
              type="range"
              min="1"
              max="5"
              value={field.options?.[0] || '1'}
              onChange={(e) => handleOptionChange(index, 0, e.target.value)}
              className="w-full mb-2"
              disabled={defaultFields.some(f => f.question === field.question)} // Deshabilita el slider para las preguntas por defecto
            />
          )}

          {(field.type === 'multiple-choice' || field.type === 'checkbox') && (
            <>
              {field.options?.map((option, optIndex) => (
                <input
                  key={optIndex}
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, optIndex, e.target.value)}
                  placeholder={`Opción ${optIndex + 1}`}
                  className="w-full mb-2 p-2 rounded bg-gray-600 text-white"
                />
              ))}
              <button
                onClick={() => handleAddOption(index)}
                className="text-blue-400"
              >
                Añadir Opción
              </button>
            </>
          )}
          <button
            onClick={() => handleRemoveField(index)}
            className="text-red-400 mt-2"
            disabled={defaultFields.some(f => f.question === field.question)} // Deshabilita el botón para las preguntas por defecto
          >
            Eliminar Pregunta
          </button>
        </div>
      ))}

      <button onClick={addField} className="py-2 px-4 bg-blue-500 rounded text-white">Añadir Pregunta</button>
      
      <div className="flex justify-between mt-4">
        <button onClick={handleSave} className="bg-green-500 text-white py-2 px-4 rounded">Guardar</button>
        <button onClick={onCancel} className="bg-red-500 text-white py-2 px-4 rounded">Cancelar</button>
      </div>
    </div>
  );
}
