import type { PlantData } from '../types/sensor';
import { SensorCard } from './SensorCard';
import { ExternalDataCard } from './ExternalDataCard';

interface PlantCardProps {
  plant: PlantData;
}

export const PlantCard = ({ plant }: PlantCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{plant.name}</h2>
          <p className="text-gray-600">{plant.location}</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">Health</div>
          <div className="text-xl font-bold text-green-600">{plant.health}%</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sensors Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sensors</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {plant.sensors.map((sensor) => (
              <SensorCard key={sensor.id} sensor={sensor} />
            ))}
          </div>
        </div>

        {/* External Data Section */}
        <div>
          <ExternalDataCard data={plant.externalData} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm mt-6">
        <div>
          <p className="text-gray-500">Last Watered</p>
          <p className="font-medium">{new Date(plant.lastWatered).toLocaleString()}</p>
        </div>
        <div>
          <p className="text-gray-500">Next Watering</p>
          <p className="font-medium">{new Date(plant.nextWatering).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}; 