// src/components/Calendar.tsx
import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Importa los estilos por defecto

interface Evaluation {
  id: string;
  evaluationName: string;
  dueDate: string; // Asegúrate de que las fechas estén en formato "YYYY-MM-DD"
}

interface EvaluationCalendarProps {
  evaluations: Evaluation[];
}

const EvaluationCalendar: React.FC<EvaluationCalendarProps> = ({ evaluations }) => {
  // Función para resaltar las fechas que tienen evaluaciones
  const tileClassName = ({ date }: { date: Date }) => {
    const formattedDate = date.toISOString().split('T')[0];
    return evaluations.some(evaluation => evaluation.dueDate === formattedDate)
      ? 'highlight'
      : '';
  };

  return (
    <div className="calendar-container">
      <Calendar
        tileClassName={tileClassName}
        onClickDay={(date) => {
          const formattedDate = date.toISOString().split('T')[0];
          const evaluationsOnDate = evaluations.filter(evaluation => evaluation.dueDate === formattedDate);
          if (evaluationsOnDate.length > 0) {
            alert(`Evaluaciones para ${formattedDate}: ${evaluationsOnDate.map(e => e.evaluationName).join(', ')}`);
          } else {
            alert(`No hay evaluaciones para ${formattedDate}`);
          }
        }}
      />
    </div>
  );
};

export default EvaluationCalendar;
