"use client";

import React from 'react';
import { Radar, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, BarElement, CategoryScale, LinearScale);

export default function ResultsPage() {
  // Datos simulados
  const radarData = {
    labels: ['Comunicación', 'Trabajo en equipo', 'Liderazgo', 'Innovación', 'Adaptabilidad'],
    datasets: [
      {
        label: 'Evaluación Actual',
        data: [4, 3, 5, 4, 3],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Evaluación Anterior',
        data: [3, 4, 4, 3, 4],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels: ['Comunicación', 'Trabajo en equipo', 'Liderazgo', 'Innovación', 'Adaptabilidad'],
    datasets: [
      {
        label: 'Evaluación Actual',
        data: [4, 3, 5, 4, 3],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Evaluación Anterior',
        data: [3, 4, 4, 3, 4],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-black via-gray-900 to-black text-white">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-500">Resultados de Evaluación</h1>
      <div className="w-full max-w-4xl p-8 bg-gray-800 shadow-md rounded-md space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-center mb-4 text-blue-400">Gráfico de Radar</h2>
          <Radar data={radarData} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-center mb-4 text-blue-400">Gráfico de Barras</h2>
          <Bar data={barData} />
        </div>
      </div>
    </div>
  );
}
