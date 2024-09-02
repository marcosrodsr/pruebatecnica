"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Employee {
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  hireDate: string;
  profileImage: string;
}

interface Evaluation {
  id: string;
  evaluationName: string;
  scores: {
    communication: number;
    innovationCreativity: number;
    adaptabilityFlexibility: number;
  };
  date: string;
}

export default function Profile() {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem('loggedInUserId');
    if (!userId) {
      // Redirigir a login si no hay un ID de usuario
      router.push('/login');
      return;
    }

    fetch(`http://localhost:4000/employees/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => setEmployee(data))
      .catch((error) => console.error('Error fetching employee data:', error));

    fetch(`http://localhost:4000/evaluations?employeeId=${userId}`)
      .then((response) => response.json())
      .then((data) => setEvaluations(data))
      .catch((error) => console.error('Error fetching evaluations data:', error));
  }, [router]);

  if (!employee) {
    return <div className="text-white">Cargando...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-black via-gray-900 to-black text-white">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-500">Perfil de Administrador</h1>
      <div className="w-full max-w-4xl p-8 bg-gray-800 shadow-md rounded-md">
        <div className="flex items-center mb-8">
          <img src={employee.profileImage} alt="Perfil" className="w-32 h-32 rounded-full mr-6" />
          <div>
            <h1 className="text-4xl font-bold text-blue-500 mb-2">{employee.name}</h1>
            <p className="text-lg text-gray-300">{employee.position} en {employee.department}</p>
            <p className="text-sm text-gray-400">Fecha de Ingreso: {employee.hireDate}</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-500 mb-4">Información Personal</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
            <p><strong>Correo Electrónico:</strong> {employee.email}</p>
            <p><strong>Cargo:</strong> {employee.position}</p>
            <p><strong>Departamento:</strong> {employee.department}</p>
            <p><strong>Fecha de Ingreso:</strong> {employee.hireDate}</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-500 mb-4">Historial de Evaluaciones</h2>
          <table className="min-w-full bg-gray-700 text-gray-300">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-600 text-left text-sm font-semibold uppercase tracking-wider">Evaluación</th>
                <th className="px-6 py-3 border-b-2 border-gray-600 text-left text-sm font-semibold uppercase tracking-wider">Puntuación de Comunicación</th>
                <th className="px-6 py-3 border-b-2 border-gray-600 text-left text-sm font-semibold uppercase tracking-wider">Puntuación de Innovación y Creatividad</th>
                <th className="px-6 py-3 border-b-2 border-gray-600 text-left text-sm font-semibold uppercase tracking-wider">Puntuación de Adaptabilidad y Flexibilidad</th>
                <th className="px-6 py-3 border-b-2 border-gray-600 text-left text-sm font-semibold uppercase tracking-wider">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {evaluations.map((evaluation) => (
                <tr key={evaluation.id}>
                  <td className="px-6 py-4 border-b border-gray-600">{evaluation.evaluationName}</td>
                  <td className="px-6 py-4 border-b border-gray-600">{evaluation.scores.communication}</td>
                  <td className="px-6 py-4 border-b border-gray-600">{evaluation.scores.innovationCreativity}</td>
                  <td className="px-6 py-4 border-b border-gray-600">{evaluation.scores.adaptabilityFlexibility}</td>
                  <td className="px-6 py-4 border-b border-gray-600">{evaluation.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between mt-8">
          <button
            onClick={() => router.push('/admin')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
          >
            Administración
          </button>
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md"
          >
            Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
