import type { ExternalData } from '../types/sensor';

interface ExternalDataCardProps {
  data: ExternalData;
}

export const ExternalDataCard = ({ data }: ExternalDataCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">External Data</h3>
      
      {/* Weather Section */}
      <div className="mb-4">
        <h4 className="text-md font-medium text-gray-700 mb-2">Weather</h4>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-gray-500">Temperature:</span>
            <span className="ml-2">{data.weather.temperature}°C</span>
          </div>
          <div>
            <span className="text-gray-500">Precipitation:</span>
            <span className="ml-2">{data.weather.precipitation}mm</span>
          </div>
          <div>
            <span className="text-gray-500">Cloud Cover:</span>
            <span className="ml-2">{data.weather.cloudCover}%</span>
          </div>
          <div>
            <span className="text-gray-500">Air Quality:</span>
            <span className="ml-2">{data.weather.airQuality}</span>
          </div>
          <div>
            <span className="text-gray-500">Moon Phase:</span>
            <span className="ml-2">{data.weather.moonPhase}</span>
          </div>
        </div>
      </div>

      {/* News Section */}
      <div className="mb-4">
        <h4 className="text-md font-medium text-gray-700 mb-2">Latest News</h4>
        <div className="space-y-2">
          {Object.entries(data.news).map(([category, items]) => (
            <div key={category} className="text-sm">
              <span className="font-medium capitalize">{category.replace(/([A-Z])/g, ' $1').trim()}:</span>
              <ul className="list-disc list-inside ml-2">
                {items.map((item, index) => (
                  <li key={index} className="text-gray-600">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Image Section */}
      <div>
        <h4 className="text-md font-medium text-gray-700 mb-2">Latest Image</h4>
        <div className="aspect-w-16 aspect-h-9">
          <img
            src={data.lastImageUrl}
            alt="Plant"
            className="object-cover rounded-lg w-full h-48"
          />
        </div>
      </div>
    </div>
  );
}; 