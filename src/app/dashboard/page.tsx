"use client";

import React, { useEffect, useState } from 'react';
import EvaluationList from '@/components/EvaluationList';
import StatisticsCard from '@/components/StadisticsCards';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ProtectedRoute from '@/components/ProtectedRoute';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Evaluation {
  id: string;
  employeeId?: string;
  evaluationName: string;
  scores: {
    communication: number;
    innovationCreativity: number;
    adaptabilityFlexibility: number;
  };
  teamworkSupport?: string[];
  professionalDevelopment?: string;
  selfAssessmentStrengths?: string;
  selfAssessmentImprovements?: string;
  dueDate: string;
  name: string;
  [key: string]: any;
}

export default function Dashboard() {
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [statistics, setStatistics] = useState<{
    totalCompleted: number;
    averageScores: {
      communication: number;
      innovationCreativity: number;
      adaptabilityFlexibility: number;
    };
  } | null>(null);

  const fetchEvaluations = () => {
    fetch('http://localhost:4000/evaluations')
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((evaluation: any) => ({
          ...evaluation,
          name: `Evaluación de ${evaluation.employeeId || evaluation.evaluationName}`,
          dueDate: new Date().toISOString().split('T')[0],
        }));
        setEvaluations(formattedData);
        calculateStatistics(formattedData);
      })
      .catch((error) => console.error('Error fetching evaluations:', error));
  };

  useEffect(() => {
    fetchEvaluations();
  }, []);

  const calculateStatistics = (evaluations: Evaluation[]) => {
    const totalCompleted = evaluations.length;

    const averageScores = evaluations.reduce(
      (acc, evaluation) => {
        acc.communication += Number(evaluation.scores.communication);
        acc.innovationCreativity += Number(evaluation.scores.innovationCreativity);
        acc.adaptabilityFlexibility += Number(evaluation.scores.adaptabilityFlexibility);
        return acc;
      },
      { communication: 0, innovationCreativity: 0, adaptabilityFlexibility: 0 }
    );

    averageScores.communication /= totalCompleted;
    averageScores.innovationCreativity /= totalCompleted;
    averageScores.adaptabilityFlexibility /= totalCompleted;

    setStatistics({ totalCompleted, averageScores });
  };

  return (
    <ProtectedRoute>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-black via-gray-900 to-black text-white">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-500">Dashboard</h1>
        <div className="w-full max-w-4xl p-8 bg-gray-800 shadow-md rounded-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <StatisticsCard
              title="Evaluaciones Completadas"
              value={statistics?.totalCompleted || 0}
              icon={<i className="fas fa-check-circle"></i>}
            />
            <StatisticsCard
              title="Promedio de Comunicación"
              value={statistics?.averageScores.communication.toFixed(2) || 0}
              icon={<i className="fas fa-comments"></i>}
            />
            <StatisticsCard
              title="Promedio de Adaptabilidad y Flexibilidad"
              value={statistics?.averageScores.adaptabilityFlexibility.toFixed(2) || 0}
              icon={<i className="fas fa-sync-alt"></i>}
            />
            <StatisticsCard
              title="Promedio de Innovación y Creatividad"
              value={statistics?.averageScores.innovationCreativity.toFixed(2) || 0}
              icon={<i className="fas fa-lightbulb"></i>}
            />
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-blue-400">Evaluaciones Recientes</h2>
            <EvaluationList evaluations={evaluations} />
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-blue-400">Distribución de Evaluaciones</h2>
            <Bar
              data={{
                labels: ['Comunicación', 'Adaptabilidad y Flexibilidad', 'Innovación y Creatividad'],
                datasets: [
                  {
                    label: 'Promedio de Evaluaciones',
                    data: [
                      statistics?.averageScores.communication || 0,
                      statistics?.averageScores.adaptabilityFlexibility || 0,
                      statistics?.averageScores.innovationCreativity || 0,
                    ],
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                  },
                ],
              }}
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>

          <div className="mb-8">
  <h2 className="text-2xl font-bold mb-4 text-blue-400">Detalles de Evaluaciones</h2>
  <div className="space-y-4">
    {evaluations.map((evaluation) => (
      <div key={evaluation.id} className="p-4 bg-gray-700 rounded-md shadow-md">
        <h3 className="text-lg font-bold text-blue-300">{evaluation.name}</h3>
        
        {/* Mostrar los campos por defecto */}
        <p className="text-sm text-gray-300">
          Comunicación: {evaluation.scores.communication ?? 'No disponible'}
        </p>
        <p className="text-sm text-gray-300">
          Innovación y Creatividad: {evaluation.scores.innovationCreativity ?? 'No disponible'}
        </p>
        <p className="text-sm text-gray-300">
          Adaptabilidad y Flexibilidad: {evaluation.scores.adaptabilityFlexibility ?? 'No disponible'}
        </p>

        {/* Mostrar los campos adicionales */}
        {Object.keys(evaluation)
          .filter((key) => !['id', 'employeeId', 'evaluationName', 'scores', 'name', 'dueDate'].includes(key))
          .map((key) => (
            <p key={key} className="text-sm text-gray-300">
              {/* Acceso seguro con 'as' */}
              {key}: {(evaluation as any)[key] ?? 'No disponible'}
            </p>
          ))}
      </div>
    ))}
  </div>
</div>


        </div>
      </div>
    </ProtectedRoute>
  );
}
