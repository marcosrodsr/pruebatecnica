"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Notification from '@/components/Notification';

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  position: string;
  department: string;
  hireDate: string;
  profileImage: string;
};

const schema = yup.object().shape({
  email: yup.string().email('Debe ser un correo electrónico válido').required('El correo es requerido'),
  password: yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('La contraseña es requerida'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Las contraseñas deben coincidir').required('Debe confirmar su contraseña'),
  name: yup.string().required('El nombre es requerido'),
  position: yup.string().required('El cargo es requerido'),
  department: yup.string().required('El departamento es requerido'),
  hireDate: yup.string().required('La fecha de ingreso es requerida'),
  profileImage: yup.string().required('La URL de la imagen de perfil es requerida'),
});

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const router = useRouter();
  const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

  const onSubmit = async (data: FormData) => {
    const userId = Date.now().toString(); // Generar un ID único basado en el tiempo actual

    const userData = {
      id: userId,
      email: data.email,
      password: data.password,
      name: data.name,
      position: data.position,
      department: data.department,
      hireDate: data.hireDate,
      profileImage: data.profileImage,
    };

    try {
      const response = await fetch('http://localhost:4000/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Error al registrar el usuario');
      }

      localStorage.setItem('user', JSON.stringify(userData));
      setNotification({ message: 'Usuario registrado exitosamente. Inicie sesión.', type: 'success' });

      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (error) {
      setNotification({ message: 'Hubo un problema al registrar el usuario.', type: 'error' });
      console.error(error);
    }
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
        <h1 className="text-3xl font-bold mb-6 text-center">Registro 360</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-300">Nombre</label>
            <input
              {...register('name')}
              type="text"
              className="mt-1 p-3 w-full border border-gray-600 rounded-md bg-gray-900 text-white"
              placeholder="Nombre completo"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
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
          <div>
            <label className="block text-gray-300">Confirmar Contraseña</label>
            <input
              {...register('confirmPassword')}
              type="password"
              className="mt-1 p-3 w/full border border-gray-600 rounded-md bg-gray-900 text-white"
              placeholder="Confirmar Contraseña"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
          </div>
          <div>
            <label className="block text-gray-300">Cargo</label>
            <input
              {...register('position')}
              type="text"
              className="mt-1 p-3 w-full border border-gray-600 rounded-md bg-gray-900 text-white"
              placeholder="Cargo"
            />
            {errors.position && <p className="text-red-500 text-sm">{errors.position.message}</p>}
          </div>
          <div>
            <label className="block text-gray-300">Departamento</label>
            <input
              {...register('department')}
              type="text"
              className="mt-1 p-3 w-full border border-gray-600 rounded-md bg-gray-900 text-white"
              placeholder="Departamento"
            />
            {errors.department && <p className="text-red-500 text-sm">{errors.department.message}</p>}
          </div>
          <div>
            <label className="block text-gray-300">Fecha de Ingreso</label>
            <input
              {...register('hireDate')}
              type="date"
              className="mt-1 p-3 w/full border border-gray-600 rounded-md bg-gray-900 text-white"
            />
            {errors.hireDate && <p className="text-red-500 text-sm">{errors.hireDate.message}</p>}
          </div>
          <div>
            <label className="block text-gray-300">URL de la Imagen de Perfil</label>
            <input
              {...register('profileImage')}
              type="text"
              className="mt-1 p-3 w/full border border-gray-600 rounded-md bg-gray-900 text-white"
              placeholder="URL de la imagen de perfil"
            />
            {errors.profileImage && <p className="text-red-500 text-sm">{errors.profileImage.message}</p>}
          </div>
          <button type="submit" className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md transition-transform transform hover:scale-105">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}
