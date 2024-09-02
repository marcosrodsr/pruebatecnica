import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AdminEvaluationForm from 'src/app/adminEvaluationForm/page';

describe('AdminEvaluationForm', () => {
  const mockOnSave = jest.fn();
  const mockOnCancel = jest.fn();

  test('renderiza el formulario correctamente con los campos por defecto', () => {
    const { getByPlaceholderText, getByText } = render(
      <AdminEvaluationForm onSave={mockOnSave} onCancel={mockOnCancel} />
    );

    expect(getByPlaceholderText('Título del formulario')).toBeInTheDocument();
    expect(getByText('Guardar')).toBeInTheDocument();
    expect(getByText('Cancelar')).toBeInTheDocument();
  });

  test('agrega una nueva pregunta correctamente', () => {
    const { getByText, getByPlaceholderText } = render(
      <AdminEvaluationForm onSave={mockOnSave} onCancel={mockOnCancel} />
    );

    fireEvent.click(getByText('Añadir Pregunta'));

    const nuevaPregunta = getByPlaceholderText('Pregunta');
    expect(nuevaPregunta).toBeInTheDocument();
  });

  test('guarda el formulario con los campos correctos', () => {
    const { getByPlaceholderText, getByText } = render(
      <AdminEvaluationForm onSave={mockOnSave} onCancel={mockOnCancel} />
    );

    fireEvent.change(getByPlaceholderText('Título del formulario'), { target: { value: 'Nueva Evaluación' } });
    fireEvent.click(getByText('Guardar'));

    expect(mockOnSave).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Nueva Evaluación',
      fields: expect.arrayContaining([
        expect.objectContaining({ question: 'Promedio de Comunicación' })
      ])
    }));
  });
});
