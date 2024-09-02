interface Evaluation {
  id: string; // Cambiado a string
  name: string;
  dueDate: string;
}

interface EvaluationListProps {
  evaluations: Evaluation[];
}

export default function EvaluationList({ evaluations }: EvaluationListProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
              Evaluación
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
              Fecha Límite
            </th>
          </tr>
        </thead>
        <tbody>
          {evaluations.map((evaluation) => (
            <tr key={evaluation.id}>
              <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-800">
                {evaluation.name}
              </td>
              <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-800">
                {evaluation.dueDate}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
