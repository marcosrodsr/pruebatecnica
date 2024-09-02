"use client";

import React, { useState } from 'react';
import { useGlobalDispatch } from '../../context/GlobalState';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Notification from '@/components/Notification';

type FormData = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup.string().email('Debe ser un correo electrónico válido').required('El correo es requerido'),
  password: yup.string().required('La contraseña es requerida'),
});

export default function Login() {
  const dispatch = useGlobalDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const router = useRouter();
  const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

  const onSubmit = (data: FormData) => {
    console.log('Iniciando sesión con:', data);
  
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
  
    if (storedUser.email !== data.email || storedUser.password !== data.password) {
      setNotification({ message: 'El usuario no está registrado o la contraseña es incorrecta', type: 'error' });
      return;
    }
  
    // Almacenar el ID del usuario en el localStorage
    localStorage.setItem('loggedInUserId', storedUser.id);
  
    // Actualizar el estado global
    dispatch({ type: 'LOGIN' });
  
    // Redirigir al perfil
    router.push('/profile');
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-black via-gray-900 to-black text-white">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <div className="w-full max-w-md p-8 bg-gray-800 shadow-md rounded-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Inicio de Sesión 360</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-300">Email</label>
            <input
              {...register('email')}
              type="email"
              className="mt-1 p-3 w-full border border-gray-600 rounded-md bg-gray-900 text-white"
              placeholder="Correo electrónico"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-gray-300">Contraseña</label>
            <input
              {...register('password')}
              type="password"
              className="mt-1 p-3 w-full border border-gray-600 rounded-md bg-gray-900 text-white"
              placeholder="Contraseña"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
          <button type="submit" className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md transition-transform transform hover:scale-105">
            Iniciar Sesión
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-400">¿No tienes una cuenta?</p>
          <button
            onClick={() => router.push('/register')}
            className="mt-2 text-blue-500 hover:text-blue-600 font-semibold transition-colors"
          >
            Regístrate
          </button>
        </div>
      </div>
    </div>
  );
}
