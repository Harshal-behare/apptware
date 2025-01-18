import React, { useState } from 'react';
import { Plane as Plant, Droplet } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

interface FormData {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  ph: number;
  state: string;
  city: string;
  area: number;
  selectedCrop: string;
}

const statesAndCities = {
  maharashtra: ['Mumbai', 'Pune', 'Nagpur', 'Nashik'],
  karnataka: ['Bangalore', 'Mysore', 'Hubli', 'Mangalore'],
  punjab: ['Amritsar', 'Ludhiana', 'Jalandhar', 'Patiala'],
  gujarat: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot']
};

const CropRecommendations: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    nitrogen: 0,
    phosphorus: 0,
    potassium: 0,
    ph: 0,
    state: '',
    city: '',
    area: 0,
    selectedCrop: ''
  });

  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [yield_estimate, setYieldEstimate] = useState<{yield: number, duration: number} | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      if (name === 'state') {
        return { ...prev, [name]: value, city: '' };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setRecommendations(['Rice', 'Wheat', 'Maize', 'Cotton']);
      if (formData.selectedCrop) {
        setYieldEstimate({
          yield: 2.5 * formData.area,
          duration: 120
        });
      }
    }, 1000);
  };

  return (
    <div className={`min-h-screen pt-20 ${isDark ? 'bg-gray-800 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">{t('cropRecommendations')}</h1>

        <div className={`p-6 rounded-lg shadow-lg ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">{t('nitrogen')}</label>
                <input
                  type="number"
                  name="nitrogen"
                  value={formData.nitrogen}
                  onChange={handleInputChange}
                  className={`w-full p-2 rounded border ${
                    isDark ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'
                  }`}
                  min="0"
                  max="100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Phosphorus (P)</label>
                <input
                  type="number"
                  name="phosphorus"
                  value={formData.phosphorus}
                  onChange={handleInputChange}
                  className={`w-full p-2 rounded border ${
                    isDark ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'
                  }`}
                  min="0"
                  max="100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Potassium (K)</label>
                <input
                  type="number"
                  name="potassium"
                  value={formData.potassium}
                  onChange={handleInputChange}
                  className={`w-full p-2 rounded border ${
                    isDark ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'
                  }`}
                  min="0"
                  max="100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Soil pH</label>
                <input
                  type="number"
                  name="ph"
                  value={formData.ph}
                  onChange={handleInputChange}
                  className={`w-full p-2 rounded border ${
                    isDark ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'
                  }`}
                  step="0.1"
                  min="0"
                  max="14"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">State</label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className={`w-full p-2 rounded border ${
                      isDark ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'
                    }`}
                  >
                    <option value="">Select State</option>
                    {Object.keys(statesAndCities).map(state => (
                      <option key={state} value={state}>
                        {state.charAt(0).toUpperCase() + state.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">City</label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    disabled={!formData.state}
                    className={`w-full p-2 rounded border ${
                      isDark ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'
                    } ${!formData.state && 'opacity-50 cursor-not-allowed'}`}
                  >
                    <option value="">Select City</option>
                    {formData.state && statesAndCities[formData.state as keyof typeof statesAndCities].map(city => (
                      <option key={city} value={city.toLowerCase()}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Land Area (hectares)</label>
                <input
                  type="number"
                  name="area"
                  value={formData.area}
                  onChange={handleInputChange}
                  className={`w-full p-2 rounded border ${
                    isDark ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'
                  }`}
                  min="0.1"
                  step="0.1"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
            >
              {t('getRecommendations')}
            </button>
          </form>

          {recommendations.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">{t('recommendedCrops')}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {recommendations.map((crop, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg ${
                      isDark ? 'bg-gray-600' : 'bg-gray-50'
                    } flex flex-col items-center`}
                  >
                    <Plant className="w-8 h-8 mb-2 text-green-500" />
                    <span className="text-center">{crop}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {yield_estimate && (
            <div className={`mt-8 p-4 rounded-lg ${isDark ? 'bg-gray-600' : 'bg-gray-50'}`}>
              <h2 className="text-xl font-semibold mb-4">Yield Estimation</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Plant className="w-5 h-5 text-green-500" />
                  <span>Estimated Yield: {yield_estimate.yield} tons</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Droplet className="w-5 h-5 text-blue-500" />
                  <span>Growth Duration: {yield_estimate.duration} days</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CropRecommendations;