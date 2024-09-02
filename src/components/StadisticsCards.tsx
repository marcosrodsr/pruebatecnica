import React from 'react';

interface StatisticsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  bgColor?: string;
}

export default function StatisticsCard({ title, value, icon, bgColor = "bg-blue-500" }: StatisticsCardProps) {
  return (
    <div className={`flex items-center p-4 rounded-md shadow-md ${bgColor} text-white`}>
      <div className="mr-4">{icon}</div>
      <div>
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}
