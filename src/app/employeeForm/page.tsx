"use client";

import React, { useState } from "react";
import { Employee } from "src/types";

interface EmployeeFormProps {
  initialEmployee: Employee;
  onSave: (employee: Employee) => void;
  onCancel: () => void;
}

export default function EmployeeForm({ initialEmployee, onSave, onCancel }: EmployeeFormProps) {
  const [employee, setEmployee] = useState<Employee>(initialEmployee);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmployee({
      ...employee,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(employee);
  };

  return (
    <div className="bg-gray-700 p-4 rounded-md mb-4">
      <h3 className="text-lg font-semibold text-blue-400 mb-4">
        {employee.id ? "Editar Empleado" : "Crear Nuevo Empleado"}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-300 text-sm mb-2">
            Nombre:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={employee.name}
            onChange={handleChange}
            className="p-3 w-full border border-gray-600 rounded-md bg-gray-900 text-white"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="role" className="block text-gray-300 text-sm mb-2">
            Rol:
          </label>
          <input
            type="text"
            id="role"
            name="role"
            value={employee.role}
            onChange={handleChange}
            className="p-3 w-full border border-gray-600 rounded-md bg-gray-900 text-white"
          />
        </div>

        <div className="flex justify-between">
          <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">
            Guardar
          </button>
          <button type="button" onClick={onCancel} className="bg-red-500 text-white py-2 px-4 rounded">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
