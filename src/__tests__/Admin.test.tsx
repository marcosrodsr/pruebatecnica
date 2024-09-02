import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Admin from 'src/app/admin/page';

describe('Admin', () => {
  test('permite crear un nuevo empleado y un nuevo formulario de evaluación', async () => {
    const { getByText, getByPlaceholderText } = render(<Admin />);

    // Crear un nuevo empleado
    fireEvent.click(getByText('Crear Nuevo Empleado'));
    fireEvent.change(getByPlaceholderText('Nombre del empleado'), { target: { value: 'María López' } });
    fireEvent.change(getByPlaceholderText('Rol del empleado'), { target: { value: 'Tester' } });
    fireEvent.click(getByText('Guardar'));

    await waitFor(() => expect(getByText('María López - Tester')).toBeInTheDocument());

    // Crear un nuevo formulario de evaluación
    fireEvent.click(getByText('Crear Nuevo Formulario'));
    fireEvent.change(getByPlaceholderText('Título del formulario'), { target: { value: 'Evaluación de Desempeño' } });
    fireEvent.click(getByText('Añadir Pregunta'));
    fireEvent.change(getByPlaceholderText('Pregunta'), { target: { value: 'Puntualidad' } });
    fireEvent.click(getByText('Guardar'));

    await waitFor(() => expect(getByText('Evaluación de Desempeño')).toBeInTheDocument());
  });
});
