import type { SensorData } from '../types/sensor';

interface SensorCardProps {
  sensor: SensorData;
}

const getStatusColor = (status: SensorData['status']) => {
  switch (status) {
    case 'normal':
      return 'bg-green-100 text-green-800';
    case 'warning':
      return 'bg-yellow-100 text-yellow-800';
    case 'critical':
      return 'bg-red-100 text-red-800';
  }
};

export const SensorCard = ({ sensor }: SensorCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{sensor.name}</h3>
          <p className="text-2xl font-bold mt-2">
            {sensor.value} {sensor.unit}
          </p>
        </div>
        <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(sensor.status)}`}>
          {sensor.status}
        </span>
      </div>
      <p className="text-sm text-gray-500 mt-2">
        Last updated: {new Date(sensor.lastUpdated).toLocaleString()}
      </p>
    </div>
  );
}; 