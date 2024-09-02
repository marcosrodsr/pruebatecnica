"use client";
import React from 'react';
import { useRouter } from 'next/navigation';


export default function Home() {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-black via-gray-900 to-black text-white">
      <h1 className="text-5xl font-bold mb-6 text-center">Bienvenidos al Sistema de Evaluación 360 Grados</h1>
      <p className="text-lg text-center mb-8">Evalúa y mejora el rendimiento de tu equipo con nuestras herramientas innovadoras.</p>
      <button
        onClick={handleLoginClick}
        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold text-lg rounded-md transition-transform transform hover:scale-105"
      >
        Iniciar Sesión
      </button>
      <div className="mt-16 w-full flex justify-center">
        <div className="grid grid-cols-2 gap-4 max-w-lg">
          <div className="flex items-center justify-center">
            <img src="/react-logo.svg" alt="React Logo" className="h-24 w-24 animate-pulse" />
          </div>
          <div className="flex items-center justify-center">
            <img src="/nextjs-logo.svg" alt="Next.js Logo" className="h-24 w-24 animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
}
