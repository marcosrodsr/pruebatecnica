import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import EmployeeForm from 'src/app/employeeForm/page';

describe('EmployeeForm', () => {
  const mockOnSave = jest.fn();
  const mockOnCancel = jest.fn();

  const initialEmployee = { id: '', name: '', role: '' };

  test('renderiza el formulario correctamente', () => {
    const { getByLabelText } = render(
      <EmployeeForm initialEmployee={initialEmployee} onSave={mockOnSave} onCancel={mockOnCancel} />
    );

    expect(getByLabelText('Nombre:')).toBeInTheDocument();
    expect(getByLabelText('Rol:')).toBeInTheDocument();
  });

  test('guarda el formulario con los datos del empleado', () => {
    const { getByLabelText, getByText } = render(
      <EmployeeForm initialEmployee={initialEmployee} onSave={mockOnSave} onCancel={mockOnCancel} />
    );

    fireEvent.change(getByLabelText('Nombre:'), { target: { value: 'Juan Pérez' } });
    fireEvent.change(getByLabelText('Rol:'), { target: { value: 'Desarrollador' } });
    fireEvent.click(getByText('Guardar'));

    expect(mockOnSave).toHaveBeenCalledWith(expect.objectContaining({
      name: 'Juan Pérez',
      role: 'Desarrollador',
    }));
  });
});
