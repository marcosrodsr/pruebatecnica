"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";

interface EvaluationResponse {
  [key: string]: string | number | string[];
}

interface EvaluationFormProps {
  form: {
    id: string;
    title: string;
    fields: { question: string; type: string; options?: string[] }[];
  };
  onSubmit: (data: EvaluationResponse) => void;
}

export default function EvaluationForm({
  form,
  onSubmit,
}: EvaluationFormProps) {
  const { register, handleSubmit, control } = useForm<EvaluationResponse>();

  const onFormSubmit = (data: EvaluationResponse) => {
    onSubmit(data);
  };

  return (
    <div className="bg-gray-700 p-4 rounded-md mb-4">
      <h3 className="text-lg font-semibold text-blue-400 mb-4">{form.title}</h3>
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-8">
        {form.fields.map((field, index) => (
          <div key={index} className="mb-4">
            <label className="block text-gray-300 text-sm mb-2">
              {field.question}
            </label>
            {field.type === "text" && (
              <input
                type="text"
                {...register(field.question)}
                className="p-3 w-full border border-gray-600 rounded-md bg-gray-900 text-white"
              />
            )}
            {field.type === "number" && (
              <input
                type="number"
                {...register(field.question)}
                className="p-3 w-full border border-gray-600 rounded-md bg-gray-900 text-white"
              />
            )}
            {field.type === "checkbox" && (
              <div className="space-y-2">
                {field.options?.map((option, optIndex) => (
                  <div key={optIndex} className="flex items-center">
                    <input
                      type="checkbox"
                      value={option}
                      {...register(field.question)}
                      className="mr-2"
                    />
                    <span>{option}</span>
                  </div>
                ))}
              </div>
            )}
            {field.type === "slider" && (
              <Controller
                control={control}
                name={field.question}
                render={({ field: controllerField }) => (
                  <div className="flex items-center space-x-2">
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={controllerField.value as number || 3}
                      onChange={(e) => controllerField.onChange(Number(e.target.value))}
                      className="w-full"
                    />
                    <span className="text-white">{controllerField.value || 3}</span>
                  </div>
                )}
              />
            )}
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
        >
          Enviar Evaluación
        </button>
      </form>
    </div>
  );
}
