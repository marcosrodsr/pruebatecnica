"use client";

import React, { useState, useEffect } from "react";
import EmployeeForm from "../employeeForm/page";
import AdminEvaluationForm from "../adminEvaluationForm/page";
import EvaluationForm from "../evaluationForm/page";
import SearchBar from '@/components/SearchBar'; // Asegúrate de ajustar la ruta según tu estructura de archivos
import { Employee, EvaluationFormTemplate } from "src/types";

interface Evaluation {
  id: string;
  employeeId: string;
  evaluationName: string;
  scores: {
    communication: number;
    innovationCreativity: number;
    adaptabilityFlexibility: number;
  };
}

export default function Admin() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [evaluationForms, setEvaluationForms] = useState<EvaluationFormTemplate[]>([]);
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [editingForm, setEditingForm] = useState<EvaluationFormTemplate | null>(null);
  const [selectedForm, setSelectedForm] = useState<EvaluationFormTemplate | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Estados para búsqueda
  const [employeeSearchTerm, setEmployeeSearchTerm] = useState("");
  const [evaluationSearchTerm, setEvaluationSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [employeesRes, evaluationsRes, formsRes] = await Promise.all([
          fetch("http://localhost:4000/employees"),
          fetch("http://localhost:4000/evaluations"),
          fetch("http://localhost:4000/evaluationForms")
        ]);

        if (!employeesRes.ok || !evaluationsRes.ok || !formsRes.ok) {
          throw new Error('Error al obtener datos');
        }

        const employeesData = await employeesRes.json();
        const evaluationsData = await evaluationsRes.json();
        const formsData = await formsRes.json();

        setEmployees(employeesData);
        setEvaluations(evaluationsData);
        setEvaluationForms(formsData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Ocurrió un error inesperado');
        }
      }
    };

    fetchData();
  }, []);

  const handleSaveEmployee = (employee: Employee) => {
    // Lógica para guardar empleado
  };

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee);
  };

  const handleDeleteEmployee = (id: string) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
    fetch(`http://localhost:4000/employees/${id}`, {
      method: 'DELETE',
    }).catch(error => console.error('Error al eliminar empleado:', error));
  };

  const handleSaveForm = (form: EvaluationFormTemplate) => {
    // Lógica para guardar formulario
  };

  const handleEditForm = (form: EvaluationFormTemplate) => {
    setEditingForm(form);
  };

  const handleDeleteForm = (id: string) => {
    setEvaluationForms(evaluationForms.filter((formItem) => formItem.id !== id));
    fetch(`http://localhost:4000/evaluationForms/${id}`, {
      method: 'DELETE',
    }).catch(error => console.error('Error al eliminar formulario:', error));
  };

  const handleSelectEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
  };

  const handleSelectFormToFill = (form: EvaluationFormTemplate) => {
    setSelectedForm(form);
  };

  const handleSaveEvaluation = (data: any) => {
    // Lógica para guardar evaluación
  };

  // Filtrado de empleados basado en el término de búsqueda
  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(employeeSearchTerm.toLowerCase())
  );

  // Filtrado de evaluaciones basado en el término de búsqueda
  const filteredEvaluations = selectedEmployee
    ? evaluations.filter(evaluation =>
        evaluation.employeeId === selectedEmployee.id &&
        evaluation.evaluationName.toLowerCase().includes(evaluationSearchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-black via-gray-900 to-black text-white">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-500">Administración</h1>
      <div className="w-full max-w-4xl p-8 bg-gray-800 shadow-md rounded-md">
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">Gestión de Empleados</h2>
          <SearchBar
            searchTerm={employeeSearchTerm}
            onSearchTermChange={(e) => setEmployeeSearchTerm(e.target.value)}
          />
          <button
            onClick={() => setEditingEmployee({ id: "", name: "", role: "" })}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mb-4"
          >
            Crear Nuevo Empleado
          </button>
          {editingEmployee && (
            <EmployeeForm
              initialEmployee={editingEmployee}
              onSave={handleSaveEmployee}
              onCancel={() => setEditingEmployee(null)}
            />
          )}
          <ul>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => (
                <li key={employee.id} className="mb-2 cursor-pointer">
                  <span onClick={() => handleSelectEmployee(employee)}>
                    {employee.name} - {employee.role}
                  </span>
                  <button onClick={() => handleEditEmployee(employee)} className="ml-4 text-blue-400">Editar</button>
                  <button onClick={() => handleDeleteEmployee(employee.id)} className="ml-4 text-red-400">Eliminar</button>
                </li>
              ))
            ) : (
              <li>No se encontraron empleados</li>
            )}
          </ul>
        </div>

        {selectedEmployee && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-blue-400">Evaluaciones de {selectedEmployee.name}</h2>
            <SearchBar
              searchTerm={evaluationSearchTerm}
              onSearchTermChange={(e) => setEvaluationSearchTerm(e.target.value)}
            />
            <ul>
              {filteredEvaluations.length > 0 ? (
                filteredEvaluations.map((evaluation) => (
                  <li key={evaluation.id} className="mb-4 bg-gray-700 p-4 rounded-md">
                    <h3 className="text-lg font-bold text-blue-300">{evaluation.evaluationName}</h3>
                    <p>Comunicación: {evaluation.scores.communication}</p>
                    <p>Innovación y Creatividad: {evaluation.scores.innovationCreativity}</p>
                    <p>Adaptabilidad y Flexibilidad: {evaluation.scores.adaptabilityFlexibility}</p>
                  </li>
                ))
              ) : (
                <li>No se encontraron evaluaciones</li>
              )}
            </ul>
          </div>
        )}

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">Gestión de Formularios de Evaluación</h2>
          <button
            onClick={() => setEditingForm({ id: "", title: "", fields: [] })}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mb-4"
          >
            Crear Nuevo Formulario
          </button>
          {editingForm && (
            <AdminEvaluationForm
              initialForm={editingForm}
              onSave={handleSaveForm}
              onCancel={() => setEditingForm(null)}
            />
          )}
          <ul>
            {evaluationForms.length > 0 ? (
              evaluationForms.map((form) => (
                <li key={form.id} className="mb-2 cursor-pointer">
                  <span>{form.title}</span>
                  <button onClick={() => handleEditForm(form)} className="ml-4 text-blue-400">Editar</button>
                  <button onClick={() => handleDeleteForm(form.id)} className="ml-4 text-red-400">Eliminar</button>
                  <button onClick={() => handleSelectFormToFill(form)} className="ml-4 text-green-400">Rellenar</button>
                </li>
              ))
            ) : (
              <li>No se encontraron formularios de evaluación</li>
            )}
          </ul>
        </div>

        {selectedForm && (
            <EvaluationForm 
              form={selectedForm} 
              onSubmit={(data) => {
                console.log("Formulario completado:", data);
                const newEvaluation = {
                  id: Date.now().toString(),
                  evaluationName: selectedForm.title,
                  scores: {
                    communication: data["Promedio de Comunicación"] || 0,
                    innovationCreativity: data["Promedio de Innovación y Creatividad"] || 0,
                    adaptabilityFlexibility: data["Promedio de Adaptabilidad y Flexibilidad"] || 0,
                  },
                  ...data,
                };
                handleSaveEvaluation(newEvaluation);
                setSelectedForm(null); 
              }} 
            />
          )}
      </div>
    </div>
  );
}
